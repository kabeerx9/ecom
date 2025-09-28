import type { CollectionDetail, CollectionListItem } from "@/features/collections/types";

export const collectionQueries = {
  list: (includeCounts = true) => ({
    queryKey: ["collections", { includeCounts }] as const,
    queryFn: async (): Promise<CollectionListItem[]> => {
      const qs = includeCounts ? "?includeCounts=1" : "";
      const res = await fetch(`/api/collections${qs}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load collections");
      return json.data as CollectionListItem[];
    },
  }),
  detail: (slug: string, opts?: { withProducts?: boolean }) => ({
    queryKey: ["collection", slug, opts?.withProducts ?? false] as const,
    queryFn: async (): Promise<CollectionDetail> => {
      const qs = opts?.withProducts ? "?withProducts=1" : "";
      const res = await fetch(`/api/collections/${encodeURIComponent(slug)}${qs}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Collection not found");
      return json.data as CollectionDetail;
    },
  }),
};

