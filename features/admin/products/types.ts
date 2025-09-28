export type AdminProductListItem = {
  id: string;
  slug: string;
  name: string;
  status: "draft" | "published";
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category: { id: string; slug: string; name: string } | null;
};

export type AdminProductListResponse = {
  items: AdminProductListItem[];
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
};

export type AdminProductDetail = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: "draft" | "published";
  isFeatured: boolean;
  category: { id: string; slug: string; name: string } | null;
  images: { id: string; url: string; alt: string | null; sortOrder: number }[];
  variants: { id: string; sku: string; size: string | null; color: string | null; priceMinor: number; salePriceMinor: number | null; stock: number; isDefault: boolean }[];
};

export type CategoryOption = { id: string; name: string; slug: string };

