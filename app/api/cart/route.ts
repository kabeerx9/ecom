import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, error } from "@/lib/api";
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

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) return error("Unauthorized", 401);

  let cart = await prisma.cart.findUnique({ where: { userId: session.user.id } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: session.user.id } });
  }

  const data = await fetchCartResponse(session.user.id);
  return ok(data);
}

