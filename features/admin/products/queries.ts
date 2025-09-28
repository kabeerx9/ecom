import type { AdminProductListResponse, AdminProductDetail, CategoryOption } from "@/features/admin/products/types";

export const adminProductQueries = {
  list: (vars: { search?: string; page?: number; pageSize?: number } = {}) => ({
    queryKey: ["admin", "products", vars] as const,
    queryFn: async (): Promise<AdminProductListResponse> => {
      const p = new URLSearchParams();
      if (vars.search) p.set("search", vars.search);
      if (vars.page) p.set("page", String(vars.page));
      if (vars.pageSize) p.set("pageSize", String(vars.pageSize));
      const res = await fetch(`/api/admin/products${p.toString() ? `?${p.toString()}` : ""}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load products");
      return json.data as AdminProductListResponse;
    },
  }),
  detail: (id: string) => ({
    queryKey: ["admin", "product", id] as const,
    queryFn: async (): Promise<AdminProductDetail> => {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Not found");
      return json.data as AdminProductDetail;
    },
  }),
  categories: () => ({
    queryKey: ["admin", "categories"] as const,
    queryFn: async (): Promise<CategoryOption[]> => {
      const res = await fetch(`/api/admin/categories`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load categories");
      return json.data as CategoryOption[];
    },
    staleTime: 60_000,
  }),
};

export const adminProductMutations = {
  create: () => ({
    mutationKey: ["admin", "product", "create"] as const,
    mutationFn: async (input: {
      slug: string;
      name: string;
      description?: string | null;
      status?: "draft" | "published";
      isFeatured?: boolean;
      categoryId?: string | null;
      images?: { url: string; alt?: string | null; sortOrder?: number }[];
      initialVariant?: { sku?: string; priceMinor: number; salePriceMinor?: number | null; stock?: number; size?: string | null; color?: string | null };
    }): Promise<{ id: string }> => {
      const res = await fetch(`/api/admin/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to create product");
      return json.data as { id: string };
    },
  }),
  update: () => ({
    mutationKey: ["admin", "product", "update"] as const,
    mutationFn: async (input: {
      id: string;
      slug?: string;
      name?: string;
      description?: string | null;
      status?: "draft" | "published";
      isFeatured?: boolean;
      categoryId?: string | null;
      addImages?: { url: string; alt?: string | null; sortOrder?: number }[];
    }): Promise<AdminProductDetail> => {
      const { id, ...rest } = input;
      const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(rest),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to update product");
      return json.data as AdminProductDetail;
    },
  }),
};

