import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
import { z } from "zod";
import { auth } from "@/lib/auth";

async function fetchCartResponse(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          variant: {
            select: {
              id: true,
              sku: true,
              size: true,
              color: true,
              priceMinor: true,
              salePriceMinor: true,
              stock: true,
              product: {
                select: {
                  slug: true,
                  name: true,
                  images: {
                    orderBy: { sortOrder: "asc" },
                    take: 1,
                    select: { url: true, alt: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) return { id: null, items: [], subtotalMinor: 0, itemCount: 0 };

  const items = cart.items.map((it) => {
    const v = it.variant;
    const p = v.product;
    const cover = p.images?.[0];
    const unit = v.salePriceMinor ?? v.priceMinor;
    return {
      id: it.id,
      quantity: it.quantity,
      variant: {
        id: v.id,
        sku: v.sku,
        size: v.size,
        color: v.color,
        priceMinor: v.priceMinor,
        salePriceMinor: v.salePriceMinor,
        stock: v.stock,
      },
      product: {
        slug: p.slug,
        name: p.name,
        image: cover?.url || null,
        imageAlt: cover?.alt || null,
      },
      lineTotalMinor: unit * it.quantity,
    };
  });

  const subtotalMinor = items.reduce((sum, i) => sum + i.lineTotalMinor, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { id: cart.id, items, subtotalMinor, itemCount };
}

const patchBody = z.object({ quantity: z.coerce.number().int() });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) return error("Unauthorized", 401);

  const json = await req.json().catch(() => null);
  const parsed = patchBody.safeParse(json ?? {});
  if (!parsed.success) return error("Invalid body", 400, { issues: parsed.error.flatten() });
  const desiredQty = parsed.data.quantity;

  const item = await prisma.cart_item.findFirst({
    where: { id, cart: { userId: session.user.id } },
    include: { variant: { select: { stock: true } } },
  });
  if (!item) return error("Cart item not found", 404);

  const maxQty = Math.max(item.variant.stock, 0);
  const newQty = Math.max(0, Math.min(desiredQty, maxQty));

  if (newQty <= 0) {
    await prisma.cart_item.delete({ where: { id: item.id } });
  } else {
    await prisma.cart_item.update({ where: { id: item.id }, data: { quantity: newQty } });
  }

  const data = await fetchCartResponse(session.user.id);
  return ok(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) return error("Unauthorized", 401);

  const item = await prisma.cart_item.findFirst({ where: { id, cart: { userId: session.user.id } } });
  if (!item) return error("Cart item not found", 404);

  await prisma.cart_item.delete({ where: { id: item.id } });
  const data = await fetchCartResponse(session.user.id);
  return ok(data);
}

