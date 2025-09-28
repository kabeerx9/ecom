"use client";

import { useQuery } from "@tanstack/react-query";
import { adminProductQueries } from "@/features/admin/products/queries";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [q, setQ] = useState("");
  const { data, isLoading, isError, error, refetch } = useQuery(adminProductQueries.list({ search: q || undefined }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && refetch()} />
          <Button size="sm" onClick={() => refetch()}>Search</Button>
        </div>
        <Button asChild>
          <a href="/admin/products/new">New Product</a>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-accent animate-pulse rounded" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-sm text-destructive">{String((error as Error)?.message || "Failed to load")}</div>
      ) : (
        <div className="space-y-2">
          {data?.items.map((p) => (
            <div key={p.id} className="grid grid-cols-12 items-center gap-2 border rounded p-2 bg-card">
              <div className="col-span-4">
                <a href={`/admin/products/${p.id}`} className="font-medium hover:underline">{p.name}</a>
                <div className="text-xs text-muted-foreground">{p.slug}</div>
              </div>
              <div className="col-span-3 text-sm">{p.category?.name ?? "—"}</div>
              <div className="col-span-2 text-xs">
                <span className="inline-block rounded px-2 py-0.5 border text-[10px] uppercase">{p.status}</span>
              </div>
              <div className="col-span-3 text-right text-xs text-muted-foreground">
                {new Date(p.updatedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

