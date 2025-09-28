import type { CartResponse } from "@/features/cart/types";

export const cartQueries = {
  getCart: () => ({
    queryKey: ["cart"] as const,
    queryFn: async (): Promise<CartResponse> => {
      const res = await fetch(`/api/cart`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load cart");
      return json.data as CartResponse;
    },
  }),
};

export const cartMutations = {
  addItem: () => ({
    mutationKey: ["cart", "addItem"] as const,
    mutationFn: async (input: { productVariantId: string; quantity?: number }): Promise<CartResponse> => {
      const res = await fetch(`/api/cart/items`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productVariantId: input.productVariantId, quantity: input.quantity ?? 1 }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to add to cart");
      return json.data as CartResponse;
    },
  }),
  updateItem: () => ({
    mutationKey: ["cart", "updateItem"] as const,
    mutationFn: async (input: { id: string; quantity: number }): Promise<CartResponse> => {
      const res = await fetch(`/api/cart/items/${encodeURIComponent(input.id)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ quantity: input.quantity }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to update cart item");
      return json.data as CartResponse;
    },
  }),
  removeItem: () => ({
    mutationKey: ["cart", "removeItem"] as const,
    mutationFn: async (input: { id: string }): Promise<CartResponse> => {
      const res = await fetch(`/api/cart/items/${encodeURIComponent(input.id)}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to remove cart item");
      return json.data as CartResponse;
    },
  }),
};

export const cartCountQuery = {
  getCount: () => ({
    queryKey: ["cartCount"] as const,
    queryFn: async (): Promise<number> => {
      const res = await fetch(`/api/cart`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load cart count");
      return Number(json.data?.itemCount ?? 0);
    },
    // Keep it fresh but avoid spamming
    staleTime: 10_000,
  }),
};
