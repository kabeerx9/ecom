"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { PRODUCTS } from "@/lib/demo-data";

export default function Page() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | "Sneakers" | "Merchandise">("All");
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let items = PRODUCTS.slice();
    if (query) {
      const q = query.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (category !== "All") {
      items = items.filter((p) => p.category === category);
    }
    if (onSale) {
      items = items.filter((p) => (p.originalPrice ?? p.price) > p.price);
    }
    switch (sort) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        items.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return items;
  }, [query, category, onSale, sort]);

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-xs text-muted-foreground">Category</Label>
        <div className="mt-2 flex flex-col gap-2">
          {["All", "Sneakers", "Merchandise"].map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox checked={category === (c as any)} onCheckedChange={() => setCategory(c as any)} />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Filters</Label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={onSale} onCheckedChange={(v) => setOnSale(Boolean(v))} />
          On sale
        </label>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Sort by</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popularity</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" onClick={() => { setQuery(""); setCategory("All"); setOnSale(false); setSort("popular"); }}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-sm text-muted-foreground">Explore official BITS Pilani sneakers and merchandise.</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-1/2">
          <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="pl-8" />
        </div>
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden lg:flex items-center gap-2">
            <Badge variant={category === "All" ? "default" : "outline"} className="cursor-pointer" onClick={() => setCategory("All")}>All</Badge>
            <Badge variant={category === "Sneakers" ? "default" : "outline"} className="cursor-pointer" onClick={() => setCategory("Sneakers")}>Sneakers</Badge>
            <Badge variant={category === "Merchandise" ? "default" : "outline"} className="cursor-pointer" onClick={() => setCategory("Merchandise")}>Merchandise</Badge>
          </div>
        </div>

        {/* Mobile filter trigger */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden ml-auto">
              <IconFilter size={16} className="mr-1" /> Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-base">Filters</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <FiltersPanel />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden md:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <FiltersPanel />
            </CardContent>
          </Card>
        </aside>

        {/* Products grid */}
        <section>
          <div className="mb-3 text-xs text-muted-foreground">{filtered.length} products</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination (static) */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
