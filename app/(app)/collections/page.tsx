"use client";

import CollectionCard from "@/components/collection-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { COLLECTIONS, PRODUCTS } from "@/lib/demo-data";

export default function Page() {
  const counts = COLLECTIONS.map((c) => ({
    ...c,
    count: PRODUCTS.filter((p) => p.collections?.includes(c.slug)).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Collections</h1>
        <p className="text-sm text-muted-foreground">Curated sets for campus life.</p>
      </div>
      <Separator />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((c) => (
          <CollectionCard key={c.slug} slug={c.slug} title={c.title} description={c.description} color={c.color} count={c.count} />
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        <Badge variant="secondary">Tip</Badge> Open a collection to browse matching products.
      </div>
    </div>
  );
}
