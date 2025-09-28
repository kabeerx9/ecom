import { ProductsResponse, ProductListQuery, ProductDetail } from "@/features/products/types";

function toParams(input: ProductListQuery) {
  const params = new URLSearchParams();
  if (input.search) params.set("search", input.search);
  if (input.category) params.set("category", input.category);
  if (input.collection) params.set("collection", input.collection);
  if (typeof input.onSale === "boolean") params.set("onSale", String(input.onSale));
  if (input.sort) params.set("sort", input.sort);
  if (input.page) params.set("page", String(input.page));
  if (input.pageSize) params.set("pageSize", String(input.pageSize));
  return params.toString();
}

async function fetchProductsFn(vars: ProductListQuery): Promise<ProductsResponse> {
  const qs = toParams(vars);
  const res = await fetch(`/api/products${qs ? `?${qs}` : ""}`, { cache: "no-store" });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Failed to load products");
  return json.data as ProductsResponse;
}

export const productQueries = {
  fetchProducts: (vars: ProductListQuery = {}) => ({
    queryKey: ["products", vars] as const,
    queryFn: () => fetchProductsFn(vars),
  }),
  fetchProduct: (slug: string) => ({
    queryKey: ["product", slug] as const,
    queryFn: async (): Promise<ProductDetail> => {
      const res = await fetch(`/api/products/${encodeURIComponent(slug)}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Not found");
      return json.data as ProductDetail;
    },
  }),
};
