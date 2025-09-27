Backend Plan (MVP)

Scope
- Make products, categories, collections, cart, addresses, and orders fully dynamic.
- Admin manages products (variants, images), collections, basic sales, and stock.
- No coupon codes for MVP; per‑variant sale price and optional deal‑of‑day flag only.
- Payments (Razorpay + college gateway) deferred to a later phase.

Data Model (Prisma)
- Conventions: minor currency units (paise), lowercase model names (matches repo), timestamps via `@default(now())` and `@updatedAt`.

```prisma
// Product catalog
model product {
  id          String             @id @default(cuid())
  slug        String             @unique
  name        String
  description String?
  status      product_status     @default(published)
  isFeatured  Boolean            @default(false)

  categoryId  String?
  category    category?          @relation(fields: [categoryId], references: [id], onDelete: SetNull)

  images      product_image[]
  variants    product_variant[]
  collections product_collection[]

  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt
}

model product_image {
  id        String   @id @default(cuid())
  productId String
  url       String
  alt       String?
  sortOrder Int      @default(0)
  product   product  @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model product_variant {
  id                 String   @id @default(cuid())
  productId          String
  product            product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  sku                String   @unique
  size               String?
  color              String?
  priceMinor         Int
  salePriceMinor     Int?
  stock              Int      @default(0)
  isDefault          Boolean  @default(false)
  // MVP "deal of the day" (UI only, can filter/highlight)
  isDealOfDay        Boolean  @default(false)
  dealStartAt        DateTime?
  dealEndAt          DateTime?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model category {
  id       String    @id @default(cuid())
  slug     String    @unique
  name     String
  products product[]
}

model collection {
  id          String              @id @default(cuid())
  slug        String              @unique
  title       String
  description String?
  color       String?
  products    product_collection[]
}

model product_collection {
  productId   String
  collectionId String
  product     product    @relation(fields: [productId], references: [id], onDelete: Cascade)
  collection  collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  @@id([productId, collectionId])
}

// Account data
model address {
  id          String   @id @default(cuid())
  userId      String
  user        user     @relation(fields: [userId], references: [id], onDelete: Cascade)
  label       String
  name        String
  line1       String
  line2       String?
  city        String
  state       String
  postalCode  String
  country     String
  phone       String?
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Cart (one active cart per user)
model cart {
  id        String      @id @default(cuid())
  userId    String      @unique
  user      user        @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     cart_item[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model cart_item {
  id               String          @id @default(cuid())
  cartId           String
  productVariantId String
  quantity         Int             @default(1)
  cart             cart            @relation(fields: [cartId], references: [id], onDelete: Cascade)
  variant          product_variant @relation(fields: [productVariantId], references: [id], onDelete: Restrict)
}

// Orders (payments will be added later)
model order {
  id               String        @id @default(cuid())
  number           String        @unique
  userId           String
  user             user          @relation(fields: [userId], references: [id], onDelete: Cascade)
  status           order_status  @default(pending)
  paymentStatus    payment_status @default(pending)
  currency         String        @default("INR")
  subtotalMinor    Int
  discountMinor    Int           @default(0)
  shippingMinor    Int           @default(0)
  taxMinor         Int           @default(0)
  totalMinor       Int
  placedAt         DateTime?

  // Shipping snapshot
  shipName         String?
  shipLine1        String?
  shipLine2        String?
  shipCity         String?
  shipState        String?
  shipPostalCode   String?
  shipCountry      String?
  shipPhone        String?

  items            order_item[]
  payments         payment[]

  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}

model order_item {
  id               String   @id @default(cuid())
  orderId          String
  productId        String?
  productVariantId String?
  nameSnapshot     String
  priceMinor       Int
  quantity         Int       @default(1)
  order            order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product          product?  @relation(fields: [productId], references: [id], onDelete: SetNull)
  variant          product_variant? @relation(fields: [productVariantId], references: [id], onDelete: SetNull)
}

model payment {
  id               String           @id @default(cuid())
  orderId          String
  order            order            @relation(fields: [orderId], references: [id], onDelete: Cascade)
  provider         payment_provider
  providerOrderId  String?
  providerPaymentId String?
  amountMinor      Int
  status           payment_status
  payload          Json?
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
}

enum product_status { draft published }
enum order_status { pending paid shipped delivered cancelled }
enum payment_status { pending authorized captured failed }
enum payment_provider { razorpay college_gateway }
```

API Plan (Route Handlers) — TODO
- Standards: Zod validation, use `lib/prisma`, session via Better Auth. JSON responses `{ ok, data?, error? }`.

0) Prep — Schema & Seed
- [ ] Update `prisma/schema.prisma` with the models above
- [ ] `npx prisma migrate dev` and `npx prisma generate`
- [ ] Seed categories (`sneakers`, `merchandise`), a few collections, products + variants + images

1) Public Read APIs (wire Products/Category/Collections UI)
- [ ] GET `app/api/products/route.ts`
  - Query: `search?`, `category?`, `collection?`, `onSale?`, `sort?`, `page?`, `pageSize?`
  - Used by: `app/(app)/products/page.tsx`, `app/(app)/category/[slug]/page.tsx`, `app/(app)/discounts/page.tsx`
- [ ] GET `app/api/products/[slug]/route.ts`
  - Used by: `app/(app)/product/[slug]/page.tsx`
- [ ] GET `app/api/collections/route.ts`
  - Returns collections (+ optional product counts)
  - Used by: `app/(app)/collections/page.tsx`
- [ ] GET `app/api/collections/[slug]/route.ts`
  - Returns collection meta and/or product slugs
  - Used by: `app/(app)/collections/[slug]/page.tsx`

2) Cart (authenticated)
- [ ] GET `app/api/cart/route.ts` → return active cart (create if missing)
  - Used by: `app/(app)/cart/page.tsx`, navbar badge (later)
- [ ] POST `app/api/cart/items/route.ts` → add item `{ productVariantId, quantity }`
  - Used by: ProductCard “Add to cart”
- [ ] PATCH `app/api/cart/items/[id]/route.ts` → update quantity
  - Used by: cart page quantity controls
- [ ] DELETE `app/api/cart/items/[id]/route.ts` → remove item
  - Used by: cart page remove action

3) Addresses (authenticated)
- [ ] GET/POST `app/api/account/addresses/route.ts`
  - Used by: `app/(app)/account/addresses/page.tsx`
- [ ] PATCH/DELETE `app/api/account/addresses/[id]/route.ts`
  - Used by: `app/(app)/account/addresses/page.tsx` (edit/remove)
- [ ] POST `app/api/account/addresses/[id]/default/route.ts`
  - Used by: set default on addresses page

4) Orders (authenticated; payments later)
- [ ] POST `app/api/orders/route.ts` → create order from cart (compute totals, snapshot line items, decrement stock)
  - Used by: `app/(app)/checkout/page.tsx`
- [ ] GET `app/api/orders/route.ts` → list user orders
  - Used by: `app/(app)/account/orders/page.tsx`
- [ ] GET `app/api/orders/[id]/route.ts` → order detail (user)
  - Used by: `app/(app)/account/orders/[id]/page.tsx`

5) Admin — Products & Collections
- [ ] POST `app/api/admin/products/route.ts` → create product (+ optional initial variant/images)
- [ ] PATCH `app/api/admin/products/[id]/route.ts` → update product fields
- [ ] DELETE `app/api/admin/products/[id]/route.ts` → delete product (soft delete optional)
- [ ] POST `app/api/admin/products/[id]/variants/route.ts` → add variant
- [ ] PATCH `app/api/admin/variants/[id]/route.ts` → update variant (priceMinor, salePriceMinor, stock, isDefault, isDealOfDay, dealStart/End)
- [ ] DELETE `app/api/admin/variants/[id]/route.ts` → delete variant
- [ ] POST `app/api/admin/products/[id]/images/route.ts` → add image (url, alt, sortOrder)
- [ ] PATCH/DELETE `app/api/admin/images/[id]/route.ts` → update/remove image
- [ ] POST `app/api/admin/collections/route.ts` → create collection
- [ ] PATCH/DELETE `app/api/admin/collections/[id]/route.ts` → update/remove collection
- [ ] POST `app/api/admin/collections/[id]/products/route.ts` → link products (body: productIds[])
- [ ] DELETE `app/api/admin/collections/[id]/products/route.ts` → unlink products (body: productIds[])

6) Wiring Frontend to API — TODO
- [ ] Products page → fetch from `/api/products` (server component or client fetch); replace demo data
- [ ] Category pages → fetch from `/api/products?category=...`
- [ ] Discounts page → fetch from `/api/products?onSale=true`
- [ ] Collections list → fetch from `/api/collections`
- [ ] Collection detail → fetch `/api/collections/[slug]` + `/api/products?collection=...`
- [ ] Product detail → fetch `/api/products/[slug]`; show images/variants
- [ ] Add to cart → call `POST /api/cart/items`
- [ ] Cart page → `GET /api/cart`; support update/remove
- [ ] Addresses page → use addresses CRUD endpoints
- [ ] Orders list/detail → use orders endpoints
- [ ] Admin pages → wire to admin CRUD endpoints

7) Auth & Guardrails
- [ ] In every handler, get session via `auth.api.getSession({ headers: request.headers })`
- [ ] Protect admin routes by `session.user.role === 'admin'`
- [ ] Validate payloads with Zod; return `{ ok: false, error }` with 4xx for validation/auth failures

Later — Payments Phase (Outline)
- [ ] POST `/api/checkout/create` → create provider order (Razorpay or college), create `payment` row, return client params
- [ ] POST `/api/checkout/callback` → verify signature/callback, update `payment` + `order` status
- [ ] Webhooks for provider events where applicable

DTO Notes (high level)
- Product listing response: `{ items: ProductListItem[], page, pageSize, total }`
- Product detail response: `{ product, variants, images }`
- Cart response: `{ id, items: [{ id, variantId, quantity, priceMinor, product: { name, slug }, variant: { size, color } }] }`
- Address CRUD: standard create/update payloads; return full address list on write for simple UI updates
- Order detail: line item snapshots + totals; never trust client prices

Implementation Tips
- Keep handlers thin; move logic to `lib/services/*` (e.g., `lib/services/cart.ts`)
- Use database transactions for order creation + stock decrement
- Keep `salePriceMinor`/`isDealOfDay` on variants to avoid complex discount joins
- Add necessary Prisma indexes before large queries (slug, sku, joins)

