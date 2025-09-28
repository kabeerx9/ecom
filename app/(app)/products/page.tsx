"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/features/products/queries";
import type { ProductListQuery } from "@/features/products/types";

function useProductListQuery(): ProductListQuery {
  const sp = useSearchParams();
  return useMemo(() => {
    const obj: ProductListQuery = {};
    const s = sp.get("search");
    const c = sp.get("category");
    const col = sp.get("collection");
    const onSale = sp.get("onSale");
    const sort = sp.get("sort") as ProductListQuery["sort"] | null;
    const page = sp.get("page");
    const pageSize = sp.get("pageSize");
    if (s) obj.search = s;
    if (c) obj.category = c;
    if (col) obj.collection = col;
    if (onSale != null) obj.onSale = onSale === "true" || onSale === "1";
    if (sort) obj.sort = sort;
    if (page) obj.page = Number(page) || 1;
    if (pageSize) obj.pageSize = Number(pageSize) || 12;
    return obj;
  }, [sp]);
}

function ProductsPageContent() {
  const vars = useProductListQuery();
  const { data, isLoading, isError, error } = useQuery(productQueries.fetchProducts(vars));
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          {!isLoading && !isError ? (
            <p className="text-sm text-muted-foreground">Showing {data?.items.length ?? 0} of {data?.total ?? 0}</p>
          ) : null}
          {isLoading ? (
            <div className="mt-1 h-4 w-40 bg-accent animate-pulse rounded" />
          ) : null}
          {isError ? (
            <p className="text-sm text-destructive">{String((error as Error)?.message || "Error loading products")}</p>
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-square bg-accent/50 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-accent animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-accent animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-accent animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.items.map((p) => (
            <a key={p.id} href={`/product/${p.slug}`} className="border rounded-lg overflow-hidden hover:shadow-sm transition bg-card">
              <div className="aspect-square bg-muted relative">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-medium line-clamp-1">{p.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{p.category?.name ?? "Uncategorized"}</div>
                <div className="mt-1 text-sm">
                  {p.salePriceMinor != null ? (
                    <>
                      <span className="font-semibold">₹{(p.salePriceMinor / 100).toFixed(2)}</span>
                      <span className="ml-2 line-through text-muted-foreground">₹{(Number(p.priceMinor) / 100).toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-semibold">{p.priceMinor != null ? `₹${(p.priceMinor / 100).toFixed(2)}` : "—"}</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Simple pager */}
      {data && !isLoading && (
        <div className="flex items-center justify-center gap-3">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={(vars.page ?? 1) <= 1}
            onClick={() => {
              const p = new URLSearchParams(window.location.search);
              const cur = Number(p.get("page") || 1);
              const next = Math.max(cur - 1, 1);
              if (next <= 1) p.delete("page"); else p.set("page", String(next));
              router.push(`/products${p.toString() ? `?${p.toString()}` : ""}`);
            }}
          >
            Previous
          </button>
          <div className="text-sm">Page {vars.page ?? 1}</div>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={!data.hasNextPage}
            onClick={() => {
              const p = new URLSearchParams(window.location.search);
              const cur = Number(p.get("page") || 1);
              const next = cur + 1;
              p.set("page", String(next));
              router.push(`/products${p.toString() ? `?${p.toString()}` : ""}`);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <div className="mt-1 h-4 w-40 bg-accent animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-square bg-accent/50 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-accent animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-accent animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-accent animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
