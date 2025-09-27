"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { COLLECTIONS, PRODUCTS } from "@/lib/demo-data";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  const [sort, setSort] = useState("popular");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.collections?.includes(slug));
    switch (sort) {
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "newest": list.sort((a,b)=>Number(b.isNew)-Number(a.isNew)); break;
      default: list.sort((a,b)=>(b.rating??0)-(a.rating??0));
    }
    return list;
  }, [sort, slug]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/collections">Collections</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{collection?.title ?? slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div
        className="rounded-lg p-6 border"
        style={{ background: collection?.color || "linear-gradient(135deg,#f8fafc,#e2e8f0)" }}
      >
        <div className="backdrop-blur-[1px]">
          <h1 className="text-xl font-semibold">{collection?.title ?? slug}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{collection?.description ?? "A curated selection for campus."}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-xs text-muted-foreground">
          <Badge variant="secondary">{items.length}</Badge> items in this collection
        </div>
        <div className="ml-auto flex items-center gap-2">
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
    </div>
  );
}
