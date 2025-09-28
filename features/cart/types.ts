export type CartItem = {
  id: string;
  quantity: number;
  variant: {
    id: string;
    sku: string;
    size: string | null;
    color: string | null;
    priceMinor: number;
    salePriceMinor: number | null;
    stock: number;
  };
  product: {
    slug: string;
    name: string;
    image: string | null;
    imageAlt: string | null;
  };
  lineTotalMinor: number;
};

export type CartResponse = {
  id: string | null;
  items: CartItem[];
  subtotalMinor: number;
  itemCount: number;
};

