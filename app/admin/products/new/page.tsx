"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminProductMutations, adminProductQueries } from "@/features/admin/products/queries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: categories } = useQuery(adminProductQueries.categories());
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | "">("");
  const [priceMinor, setPriceMinor] = useState(0);
  const [stock, setStock] = useState(0);

  const create = useMutation({
    ...adminProductMutations.create(),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      router.push(`/admin/products/${res.id}`);
    },
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">New Product</h1>

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. BITS Hoodie" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="bits-hoodie" />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Initial Price (₹)</Label>
            <Input type="number" value={priceMinor ? priceMinor / 100 : ""} onChange={(e) => setPriceMinor(Math.max(0, Math.round(Number(e.target.value || 0) * 100)))} placeholder="e.g. 999" />
          </div>
          <div>
            <Label>Initial Stock</Label>
            <Input type="number" value={stock} onChange={(e) => setStock(Math.max(0, Number(e.target.value || 0)))} placeholder="e.g. 10" />
          </div>
        </div>
        <div className="pt-2">
          <Button
            onClick={() =>
              create.mutate({
                name,
                slug,
                description,
                categoryId: categoryId || undefined,
                initialVariant: priceMinor > 0 ? { priceMinor, stock } : undefined,
                status: "draft",
              })
            }
            disabled={!name || !slug || create.isPending}
          >
            {create.isPending ? "Creating…" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
