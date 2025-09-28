export type ProductListItem = {
  id: string;
  slug: string;
  name: string;
  isFeatured: boolean;
  image: string | null;
  imageAlt: string | null;
  priceMinor: number | null;
  salePriceMinor: number | null;
  category: { slug: string; name: string } | null;
};

export type ProductsResponse = {
  items: ProductListItem[];
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
};

export type ProductListQuery = {
  search?: string;
  category?: string; // category slug
  collection?: string; // collection slug
  onSale?: boolean;
  sort?: "newest" | "name-asc" | "name-desc" | "featured";
  page?: number;
  pageSize?: number;
};

