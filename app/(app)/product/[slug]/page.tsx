"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { productQueries } from "@/features/products/queries";
import { cartMutations, cartQueries } from "@/features/cart/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading, isError, error } = useQuery(
    slug ? productQueries.fetchProduct(slug) : { queryKey: ["product", "missing"], queryFn: async () => { throw new Error("Missing slug"); } }
  );
  const qc = useQueryClient();
  const { data: cart, isLoading: cartLoading } = useQuery(cartQueries.getCart());

  const addItem = useMutation({
    ...cartMutations.addItem(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["cartCount"] });
    },
  });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const updateItem = useMutation({
    ...cartMutations.updateItem(),
    onMutate: (vars) => setUpdatingId(vars.id),
    onSettled: () => setUpdatingId(null),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["cartCount"] });
    },
  });
  const removeItem = useMutation({
    ...cartMutations.removeItem(),
    onMutate: (vars) => setRemovingId(vars.id),
    onSettled: () => setRemovingId(null),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["cartCount"] });
    },
  });


  const cover = data?.images?.[0];
  const v = data?.variants?.[0];
  const existingItem = useMemo(() => {
    if (!v || !cart) return undefined;
    return cart.items.find((it) => it.variant.id === v.id);
  }, [cart, v]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-accent/50 animate-pulse rounded" />
        <div className="space-y-3">
          <div className="h-7 w-2/3 bg-accent animate-pulse rounded" />
          <div className="h-4 w-24 bg-accent animate-pulse rounded" />
          <div className="h-6 w-32 bg-accent animate-pulse rounded" />
          <div className="h-4 w-full bg-accent animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-accent animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-sm text-destructive">{String((error as Error)?.message || "Product not found")}</div>;
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-square bg-muted rounded overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.url} alt={cover.alt || data.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          {data.category ? (
            <p className="text-xs text-muted-foreground">{data.category.name}</p>
          ) : null}
        </div>
        <div className="text-lg">
          {v?.salePriceMinor != null ? (
            <>
              <span className="font-semibold">₹{(v.salePriceMinor / 100).toFixed(2)}</span>
              <span className="ml-2 line-through text-muted-foreground">₹{(v.priceMinor / 100).toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">{v ? `₹${(v.priceMinor / 100).toFixed(2)}` : "—"}</span>
          )}
        </div>
        {data.description ? (
          <p className="text-sm text-muted-foreground whitespace-pre-line">{data.description}</p>
        ) : null}
        <div className="pt-2">
          {existingItem ? (
            <div className="flex items-center gap-2">
              <button
                className="h-8 w-8 border rounded disabled:opacity-50"
                disabled={updatingId === existingItem.id}
                onClick={() => updateItem.mutate({ id: existingItem.id, quantity: existingItem.quantity - 1 })}
              >
                −
              </button>
              <div className="min-w-6 text-center text-sm">
                {updatingId === existingItem.id ? "…" : existingItem.quantity}
              </div>
              <button
                className="h-8 w-8 border rounded disabled:opacity-50"
                disabled={updatingId === existingItem.id || (v ? existingItem.quantity >= v.stock : true)}
                onClick={() => updateItem.mutate({ id: existingItem.id, quantity: existingItem.quantity + 1 })}
              >
                +
              </button>
              <button
                className="ml-3 text-xs text-destructive underline disabled:opacity-50"
                disabled={removingId === existingItem.id}
                onClick={() => removeItem.mutate({ id: existingItem.id })}
              >
                {removingId === existingItem.id ? "Removing…" : "Remove"}
              </button>
            </div>
          ) : (
            <>
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
                disabled={!v || addItem.isPending}
                onClick={() => v && addItem.mutate({ productVariantId: v.id, quantity: 1 })}
              >
                {addItem.isPending ? "Adding..." : "Add to cart"}
              </button>
              {addItem.isError ? (
                <p className="text-xs text-destructive mt-2">{String((addItem.error as Error)?.message || "Failed to add to cart")}</p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
