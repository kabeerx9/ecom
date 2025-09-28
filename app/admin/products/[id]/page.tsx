"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminProductMutations, adminProductQueries } from "@/features/admin/products/queries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery(id ? adminProductQueries.detail(id) : { queryKey: ["admin", "product", "missing"], queryFn: async () => { throw new Error("Missing id"); } });
  const { data: categories } = useQuery(adminProductQueries.categories());
  const qc = useQueryClient();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | "">("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSlug(data.slug);
      setDescription(data.description ?? "");
      setCategoryId(data.category?.id ?? "");
      setStatus(data.status);
      setIsFeatured(data.isFeatured);
    }
  }, [data]);

  const update = useMutation({
    ...adminProductMutations.update(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["admin", "product", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <div className="h-7 w-2/3 bg-accent animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-accent animate-pulse rounded" />
        <div className="h-4 w-full bg-accent animate-pulse rounded" />
      </div>
    );
  }
  if (isError || !data) {
    return <div className="text-sm text-destructive">{String((error as Error)?.message || "Failed to load product")}</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <div className="text-xs text-muted-foreground">ID: {id}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label>Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Label>Category</Label>
          <select className="mt-1 w-full border rounded h-9 px-2 bg-background" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">None</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Status</Label>
          <select className="mt-1 w-full border rounded h-9 px-2 bg-background" value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>
        <div>
          <Label>Featured</Label>
          <div className="mt-1 flex items-center gap-2">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <span className="text-sm">Mark as featured</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() =>
            update.mutate({
              id,
              name,
              slug,
              description,
              categoryId: categoryId || null,
              status,
              isFeatured,
            })
          }
          disabled={update.isPending}
        >
          {update.isPending ? "Saving…" : "Save"}
        </Button>
      </div>

      {/* Images will be added later via Firebase uploads */}
    </div>
  );
}
