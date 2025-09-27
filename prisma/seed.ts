import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A few stock image URLs (Unsplash) to reuse across products
const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60", // sneakers
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=60", // hoodie
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=60", // t-shirt
  "https://images.unsplash.com/photo-1543351611-58f69d87c403?auto=format&fit=crop&w=1200&q=60", // cap
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=60", // bag
  "https://images.unsplash.com/photo-1510591509091-5f7f18b874f8?auto=format&fit=crop&w=1200&q=60", // watch
];

const COLORS = ["Black", "White", "Red", "Blue", "Green", "Gray"];
const SIZES = ["XS", "S", "M", "L", "XL"];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function ensureBaseData() {
  // Categories
  const sneakers = await prisma.category.upsert({
    where: { slug: "sneakers" },
    update: {},
    create: { slug: "sneakers", name: "Sneakers" },
  });

  const merchandise = await prisma.category.upsert({
    where: { slug: "merchandise" },
    update: {},
    create: { slug: "merchandise", name: "Merchandise" },
  });

  // Collections
  const arrivals = await prisma.collection.upsert({
    where: { slug: "new-arrivals" },
    update: {},
    create: {
      slug: "new-arrivals",
      title: "New Arrivals",
      description: "Fresh products just dropped",
      color: "#1d4ed8",
    },
  });

  const best = await prisma.collection.upsert({
    where: { slug: "best-sellers" },
    update: {},
    create: {
      slug: "best-sellers",
      title: "Best Sellers",
      description: "Fan favorites",
      color: "#16a34a",
    },
  });

  const deals = await prisma.collection.upsert({
    where: { slug: "hot-deals" },
    update: {},
    create: {
      slug: "hot-deals",
      title: "Hot Deals",
      description: "Discounted picks",
      color: "#dc2626",
    },
  });

  return { categories: [sneakers, merchandise], collections: [arrivals, best, deals] };
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedProducts(count = 100) {
  const { categories, collections } = await ensureBaseData();

  let created = 0;
  for (let i = 1; i <= count; i++) {
    const isSneaker = i % 2 === 1; // alternate category for variety
    const category = isSneaker ? categories[0] : categories[1];
    const productName = isSneaker ? `Sneaker Model ${i.toString().padStart(3, "0")}` : `Merch Pack ${i.toString().padStart(3, "0")}`;
    const slug = slugify(productName);

    // Skip existing to keep seed idempotent-ish for dev
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      continue;
    }

    const imageCount = 3;
    const imageStart = i % STOCK_IMAGES.length; // stagger images
    const images = Array.from({ length: imageCount }, (_, idx) => {
      const url = STOCK_IMAGES[(imageStart + idx) % STOCK_IMAGES.length];
      return {
        url,
        alt: `${productName} image ${idx + 1}`,
        sortOrder: idx,
      };
    });

    const variantCount = randomInt(1, 3);
    const variants = Array.from({ length: variantCount }, (_, vIdx) => {
      const basePrice = randomInt(1499, 9999); // in minor currency units (INR paise)
      const onSale = Math.random() < 0.3;
      const sale = onSale ? Math.floor(basePrice * randomInt(70, 90) / 100) : null;
      const size = isSneaker ? ["7", "8", "9", "10", "11"][randomInt(0, 4)] : SIZES[randomInt(0, SIZES.length - 1)];
      const color = COLORS[randomInt(0, COLORS.length - 1)];
      return {
        sku: `SKU-${i}-${vIdx}-${Math.random().toString(36).slice(2, 8)}`,
        size,
        color,
        priceMinor: basePrice,
        salePriceMinor: sale ?? undefined,
        stock: randomInt(0, 50),
        isDefault: vIdx === 0,
        isDealOfDay: Math.random() < 0.05,
      };
    });

    const chosenCollections = collections.filter(() => Math.random() < 0.5);

    const createdProduct = await prisma.product.create({
      data: {
        slug,
        name: productName,
        description: isSneaker ? "Comfortable and stylish sneakers for everyday wear." : "Quality merchandise pack with assorted goodies.",
        isFeatured: Math.random() < 0.15,
        category: { connect: { id: category.id } },
        images: { create: images },
        variants: { create: variants },
        collections: {
          create: chosenCollections.map((c) => ({ collection: { connect: { id: c.id } } })),
        },
      },
      select: { id: true, slug: true },
    });

    created++;
    if (i % 20 === 0) {
      console.log(`Seeded ${created} products...`);
    }
  }

  console.log(`Done. Created ${created} new products (skipped existing).`);
}

async function main() {
  const arg = process.argv[2];
  const envCount = process.env.SEED_COUNT;
  const count = Number(arg ?? envCount ?? 100);
  await seedProducts(Number.isFinite(count) && count > 0 ? count : 100);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
