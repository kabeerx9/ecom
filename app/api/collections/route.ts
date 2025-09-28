import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const includeCounts = (() => {
    const v = url.searchParams.get("includeCounts");
    return v === "1" || v === "true";
  })();

  const collections = await prisma.collection.findMany({
    orderBy: { title: "asc" },
    include: includeCounts ? { _count: { select: { products: true } } } : undefined,
  });

  const data = collections.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    color: c.color,
    count: includeCounts ? (c as any)._count?.products ?? 0 : undefined,
  }));

  return ok(data);
}

