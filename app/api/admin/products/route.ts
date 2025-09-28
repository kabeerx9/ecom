import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { z } from "zod";
import { auth } from "@/lib/auth";

const listQuery = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(50).default(20).optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user || session.user.role !== "admin") return error("Forbidden", 403);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = listQuery.safeParse(params);
  if (!parsed.success) return error("Invalid query", 400, { issues: parsed.error.flatten() });
  const { search, page = 1, pageSize = 20 } = parsed.data;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }

  const skip = (page - 1) * pageSize;
  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        name: true,
        status: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        category: { select: { id: true, slug: true, name: true } },
      },
    }),
  ]);

  return ok({ items, page, pageSize, total, hasNextPage: skip + items.length < total });
}

const createBody = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]).default("draft").optional(),
  isFeatured: z.boolean().default(false).optional(),
  categoryId: z.string().optional().nullable(),
  images: z
    .array(
      z.object({ url: z.string().min(1), alt: z.string().optional().nullable(), sortOrder: z.number().int().min(0).optional() })
    )
    .optional()
    .default([]),
  initialVariant: z
    .object({
      sku: z.string().min(1).optional(),
      priceMinor: z.number().int().min(0),
      salePriceMinor: z.number().int().min(0).optional().nullable(),
      stock: z.number().int().min(0).default(0),
      size: z.string().optional().nullable(),
      color: z.string().optional().nullable(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user || session.user.role !== "admin") return error("Forbidden", 403);

  const body = await req.json().catch(() => null);
  const parsed = createBody.safeParse(body ?? {});
  if (!parsed.success) return error("Invalid body", 400, { issues: parsed.error.flatten() });
  const { slug, name, description, status = "draft", isFeatured = false, categoryId, images = [], initialVariant } = parsed.data;

  const product = await prisma.product.create({
    data: {
      slug,
      name,
      description: description ?? undefined,
      status,
      isFeatured,
      categoryId: categoryId ?? undefined,
      images: { create: images.map((img, i) => ({ url: img.url, alt: img.alt ?? undefined, sortOrder: img.sortOrder ?? i })) },
      variants: initialVariant
        ? {
            create: {
              sku: initialVariant.sku ?? `SKU-${Math.random().toString(36).slice(2, 10)}`,
              priceMinor: initialVariant.priceMinor,
              salePriceMinor: initialVariant.salePriceMinor ?? undefined,
              stock: initialVariant.stock ?? 0,
              size: initialVariant.size ?? undefined,
              color: initialVariant.color ?? undefined,
              isDefault: true,
            },
          }
        : undefined,
    },
    select: { id: true },
  });

  return ok({ id: product.id });
}

