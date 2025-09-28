import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const params = await ctx.params;
  const slug = params?.slug;
  if (!slug) return error("Missing slug", 400);

  const product = await prisma.product.findFirst({
    where: { slug, status: "published" },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
        select: { url: true, alt: true, sortOrder: true },
      },
      variants: {
        orderBy: [{ isDefault: "desc" }, { priceMinor: "asc" }],
        select: {
          id: true,
          sku: true,
          size: true,
          color: true,
          priceMinor: true,
          salePriceMinor: true,
          stock: true,
          isDefault: true,
          isDealOfDay: true,
          dealStartAt: true,
          dealEndAt: true,
        },
      },
      category: { select: { slug: true, name: true } },
      collections: {
        include: { collection: { select: { slug: true, title: true } } },
      },
    },
  });

  if (!product) return error("Product not found", 404);

  const collections = product.collections?.map((pc) => pc.collection) ?? [];

  return ok({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    isFeatured: product.isFeatured,
    images: product.images,
    variants: product.variants,
    category: product.category,
    collections,
  });
}
