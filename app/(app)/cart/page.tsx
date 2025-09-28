"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartQueries, cartMutations } from "@/features/cart/queries";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery(cartQueries.getCart());
  const qc = useQueryClient();
  const updateItem = useMutation({
    ...cartMutations.updateItem(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["cartCount"] });
    },
  });
  const removeItem = useMutation({
    ...cartMutations.removeItem(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["cartCount"] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-32 bg-accent animate-pulse rounded" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-16 h-16 bg-accent animate-pulse rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-accent animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-sm text-destructive">{String((error as Error)?.message || "Failed to load cart")}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <p className="text-sm text-muted-foreground">{data.itemCount} items</p>
      </div>

      {data.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {data.items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 border rounded p-3 bg-card">
              <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                {it.product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.product.image} alt={it.product.imageAlt || it.product.name} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <a href={`/product/${it.product.slug}`} className="text-sm font-medium hover:underline">
                  {it.product.name}
                </a>
                <div className="text-xs text-muted-foreground">
                  {it.variant.color ?? ""} {it.variant.size ?? ""} {it.variant.sku ? `• ${it.variant.sku}` : ""}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="h-6 w-6 border rounded disabled:opacity-50"
                    disabled={(updateItem.isPending && updateItem.variables?.id === it.id) || (removeItem.isPending && removeItem.variables?.id === it.id)}
                    onClick={() => updateItem.mutate({ id: it.id, quantity: it.quantity - 1 })}
                  >
                    −
                  </button>
                  <div className="text-xs min-w-6 text-center">
                    {(updateItem.isPending && updateItem.variables?.id === it.id) || (removeItem.isPending && removeItem.variables?.id === it.id) ? "…" : it.quantity}
                  </div>
                  <button
                    className="h-6 w-6 border rounded disabled:opacity-50"
                    disabled={(updateItem.isPending && updateItem.variables?.id === it.id) || (removeItem.isPending && removeItem.variables?.id === it.id) || it.quantity >= it.variant.stock}
                    onClick={() => updateItem.mutate({ id: it.id, quantity: it.quantity + 1 })}
                  >
                    +
                  </button>
                  <button
                    className="ml-2 text-xs text-destructive underline disabled:opacity-50"
                    disabled={removeItem.isPending && removeItem.variables?.id === it.id}
                    onClick={() => removeItem.mutate({ id: it.id })}
                  >
                    {removeItem.isPending && removeItem.variables?.id === it.id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold">₹{(it.lineTotalMinor / 100).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right text-base font-semibold">
        Subtotal: ₹{(data.subtotalMinor / 100).toFixed(2)}
      </div>
    </div>
  );
}
