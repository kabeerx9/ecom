"use client";

import { useQuery } from "@tanstack/react-query";
import { collectionQueries } from "@/features/collections/queries";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = useQuery(
    slug ? collectionQueries.detail(slug, { withProducts: true }) : { queryKey: ["collection", "missing", false], queryFn: async () => { throw new Error("Missing slug"); } }
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-2/3 bg-accent animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-accent animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-sm text-destructive">{String((error as Error)?.message || "Collection not found")}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          {data.title}
          {data.color ? <span className="inline-block w-3 h-3 rounded-full" style={{ background: data.color }} /> : null}
        </h1>
        {data.description ? (
          <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
        ) : null}
      </div>

      <div>
        <a href={`/products?collection=${encodeURIComponent(data.slug)}`} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-primary text-primary-foreground">
          Browse products in this collection
        </a>
      </div>

      {data.productSlugs && data.productSlugs.length > 0 ? (
        <div>
          <h2 className="text-base font-semibold mb-2">Product Slugs</h2>
          <div className="flex flex-wrap gap-2">
            {data.productSlugs.map((ps) => (
              <a key={ps} href={`/product/${ps}`} className="text-xs border px-2 py-1 rounded hover:bg-accent">
                {ps}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No products linked yet.</p>
      )}
    </div>
  );
}
