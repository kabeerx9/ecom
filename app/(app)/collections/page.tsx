"use client";

import { useQuery } from "@tanstack/react-query";
import { collectionQueries } from "@/features/collections/queries";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery(collectionQueries.list(true));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Collections</h1>
        {!isLoading && !isError ? (
          <p className="text-sm text-muted-foreground">{data?.length ?? 0} collections</p>
        ) : null}
        {isLoading ? <div className="mt-1 h-4 w-32 bg-accent animate-pulse rounded" /> : null}
        {isError ? <p className="text-sm text-destructive">{String((error as Error)?.message || "Error loading collections")}</p> : null}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3 bg-card">
              <div className="h-5 w-2/3 bg-accent animate-pulse rounded" />
              <div className="h-4 w-full bg-accent animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-accent animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((c) => (
            <a key={c.slug} href={`/collections/${c.slug}`} className="border rounded-lg p-4 bg-card hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium">{c.title}</h2>
                {c.color ? <span className="inline-block w-3 h-3 rounded-full" style={{ background: c.color }} /> : null}
              </div>
              {c.description ? (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
              ) : null}
              {typeof c.count === "number" ? (
                <p className="text-xs text-muted-foreground mt-2">{c.count} products</p>
              ) : null}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

