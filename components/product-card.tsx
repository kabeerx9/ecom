"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconHeart, IconShoppingCart, IconStar, IconStarFilled } from "@tabler/icons-react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  color?: string; // for placeholder bg
  rating?: number; // 0-5
  isNew?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const addToCart = () => {
    toast.success("Added to cart", { description: product.name });
  };

  const Rating = ({ value = 0 }: { value?: number }) => {
    return (
      <div className="flex items-center gap-0.5 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) =>
          i < Math.round(value) ? (
            <IconStarFilled key={i} size={14} />
          ) : (
            <IconStar key={i} size={14} />
          )
        )}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden group transition-shadow duration-200 hover:shadow-sm">
      <div className="relative w-full pb-[125%] bg-muted">
        {/* Image placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: product.color ||
              "linear-gradient(135deg, oklch(0.98 0 0) 0%, oklch(0.96 0 0) 100%)",
          }}
        >
          <span className="text-4xl font-semibold opacity-20">{product.name[0]}</span>
        </div>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex gap-1">
          {discount > 0 && <Badge className="bg-red-500 text-white">-{discount}%</Badge>}
          {product.isNew && <Badge variant="secondary">New</Badge>}
        </div>
        <Button variant="secondary" size="icon" className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconHeart size={16} />
        </Button>
      </div>
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate font-medium leading-tight">{product.name}</div>
            <div className="text-xs text-muted-foreground">{product.category}</div>
          </div>
          <Rating value={product.rating ?? 0} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="font-semibold">₹{product.price.toLocaleString("en-IN")}</div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" className="flex-1" onClick={addToCart}>
            <IconShoppingCart size={16} className="mr-1" /> Add to cart
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={`/product/${product.id}`}>View</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
