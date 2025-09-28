import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return error("Missing slug", 400);

  const url = new URL(req.url);
  const withProducts = (() => {
    const v = url.searchParams.get("withProducts");
    return v === "1" || v === "true";
  })();

  const collection = await prisma.collection.findFirst({
    where: { slug },
    include: withProducts
      ? {
          products: {
            include: { product: { select: { slug: true } } },
          },
        }
      : undefined,
  });

  if (!collection) return error("Collection not found", 404);

  const productSlugs = withProducts
    ? (collection as typeof collection & { products: { product: { slug: string } }[] }).products.map((pc) => pc.product.slug)
    : undefined;

  return ok({
    id: collection.id,
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    color: collection.color,
    productSlugs,
  });
}
