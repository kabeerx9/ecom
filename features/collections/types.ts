export type CollectionListItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  color: string | null;
  count?: number;
};

export type CollectionDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  color: string | null;
  productSlugs?: string[];
};

