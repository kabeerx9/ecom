"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/lib/demo-data";

export default function Page({ params }: { params: { slug: string } }) {
  const title = params.slug === "sneakers" ? "Sneakers" : params.slug === "merchandise" ? "Merchandise" : params.slug;
  const isSneakers = title === "Sneakers";
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState("popular");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => (isSneakers ? p.category === "Sneakers" : p.category === "Merchandise"));
    if (onSale) list = list.filter((p) => (p.originalPrice ?? p.price) > p.price);
    switch (sort) {
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "newest": list.sort((a,b)=>Number(b.isNew)-Number(a.isNew)); break;
      default: list.sort((a,b)=>(b.rating??0)-(a.rating??0));
    }
    return list;
  }, [isSneakers, onSale, sort]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6" style={{ background: isSneakers ? "linear-gradient(135deg,#e0f2fe,#f0f9ff)" : "linear-gradient(135deg,#f3f4f6,#e5e7eb)" }}>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{isSneakers ? "From courts to campus—find your perfect pair." : "Official BITS Pilani apparel and essentials."}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-xs text-muted-foreground">
          <Badge variant="secondary">{items.length}</Badge> items
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(Boolean(v))} /> On sale
          </label>
        </div>
        <div className="ml-auto">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Static pagination placeholder */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
