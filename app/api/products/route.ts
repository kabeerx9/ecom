import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { NextRequest } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  search: z.string().trim().min(1).optional(),
  category: z.string().trim().min(1).optional(), // category slug
  collection: z.string().trim().min(1).optional(), // collection slug
  onSale: z
    .string()
    .transform((v) => v === "true" || v === "1")
    .optional(),
  sort: z
    .enum(["newest", "name-asc", "name-desc", "featured"]) // extend later as needed
    .optional()
    .default("newest"),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const parsed = querySchema.safeParse(params);
  if (!parsed.success) {
    return error("Invalid query", 400, { issues: parsed.error.flatten() });
  }
  const { search, category, collection, onSale, sort, page, pageSize } = parsed.data;

  const where: any = { status: "published" };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }
  if (typeof onSale === "boolean" && onSale) {
    where.variants = { some: { salePriceMinor: { not: null } } };
  }
  if (category) {
    where.category = { slug: category };
  }
  if (collection) {
    where.collections = { some: { collection: { slug: collection } } };
  }

  const orderBy = (() => {
    switch (sort) {
      case "name-asc":
        return [{ name: "asc" as const }];
      case "name-desc":
        return [{ name: "desc" as const }];
      case "featured":
        return [{ isFeatured: "desc" as const }, { createdAt: "desc" as const }];
      case "newest":
      default:
        return [{ createdAt: "desc" as const }];
    }
  })();

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1, select: { url: true, alt: true } },
        variants: {
          orderBy: [{ isDefault: "desc" }, { priceMinor: "asc" }],
          take: 1,
          select: { id: true, priceMinor: true, salePriceMinor: true, sku: true },
        },
        category: { select: { slug: true, name: true } },
      },
    }),
  ]);

  const data = items.map((p) => {
    const cover = p.images?.[0];
    const v = p.variants?.[0];
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      isFeatured: p.isFeatured,
      image: cover?.url || null,
      imageAlt: cover?.alt || null,
      priceMinor: v?.priceMinor ?? null,
      salePriceMinor: v?.salePriceMinor ?? null,
      category: p.category,
    };
  });

  return ok({
    items: data,
    page,
    pageSize,
    total,
    hasNextPage: skip + data.length < total,
  });
}

