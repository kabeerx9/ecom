import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { auth } from "@/lib/auth";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user || session.user.role !== "admin") return error("Forbidden", 403);

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: "asc" } },
      variants: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
        select: {
          id: true,
          sku: true,
          size: true,
          color: true,
          priceMinor: true,
          salePriceMinor: true,
          stock: true,
          isDefault: true,
        },
      },
    },
  });
  if (!product) return error("Not found", 404);
  return ok(product);
}

const patchBody = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).optional(),
  isFeatured: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
  addImages: z
    .array(z.object({ url: z.string().min(1), alt: z.string().optional().nullable(), sortOrder: z.number().int().min(0).optional() }))
    .optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user || session.user.role !== "admin") return error("Forbidden", 403);

  const body = await req.json().catch(() => null);
  const parsed = patchBody.safeParse(body ?? {});
  if (!parsed.success) return error("Invalid body", 400, { issues: parsed.error.flatten() });
  const { slug, name, description, status, isFeatured, categoryId, addImages } = parsed.data;

  const data: any = {};
  if (slug !== undefined) data.slug = slug;
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description ?? null;
  if (status !== undefined) data.status = status;
  if (isFeatured !== undefined) data.isFeatured = isFeatured;
  if (categoryId !== undefined) data.categoryId = categoryId ?? null;

  await prisma.product.update({ where: { id }, data });

  if (addImages && addImages.length) {
    await prisma.product_image.createMany({
      data: addImages.map((img, i) => ({
        productId: id,
        url: img.url,
        alt: img.alt ?? undefined,
        sortOrder: img.sortOrder ?? i,
      })),
    });
  }

  const updated = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: "asc" } },
      variants: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
        select: { id: true, sku: true, size: true, color: true, priceMinor: true, salePriceMinor: true, stock: true, isDefault: true },
      },
    },
  });
  return ok(updated);
}

