**BITS Pilani Store — Routes Plan**

- Status: Draft (MVP)
- Nav: Top navbar only (no sidebar)

**Store (Authenticated)**
- `/` — Home: hero, featured products/collections, promo banner.
- `/products` — All products with filters/sort.
- `/product/[slug]` — Product details page (images, price, sizes).
- `/category/[slug]` — Category listing; use slugs like `sneakers`, `merchandise`.
- `/collections` — List of curated collections.
- `/collections/[slug]` — Collection details with products.
- `/discounts` — Discount hub: all discounted items and current offers.
- `/cart` — Cart page (authenticated; items, totals, update/remove).
- `/checkout` — Checkout flow: shipping address, shipping method, payment review.

**Account (Authenticated)**
- `/account` — Redirect to `/account/orders` or overview.
- `/account/profile` — Manage name, email, avatar.
- `/account/orders` — Order history list.
- `/account/orders/[id]` — Order details: items, totals, status, address.
- `/account/addresses` — Manage shipping addresses (add/edit/remove, set default).

**Admin (Role = admin)**
- `/admin` — Redirect to `/admin/products`.
- `/admin/products` — List/manage products.
- `/admin/products/new` — Create product.
- `/admin/products/[id]` — Edit product (status, price, inventory, images).
- `/admin/collections` — List/manage collections.
- `/admin/collections/new` — Create collection.
- `/admin/collections/[id]` — Edit collection (title, description, products).
- `/admin/discounts` — Manage discounts (code, %/fixed, active window, scopes).
- (Later) `/admin/orders` — View/manage orders (fulfillment, refunds).

**Auth & Access**
- Global rule: all routes require auth except `/login`, `/signup`, and `/403`.
- Admin required: `/admin/*` (via Better Auth `role === "admin"`).
- Keep existing `/login` and `/403` pages.

**Middleware Notes**
- Middleware guards all routes (except internals and API) and redirects unauthenticated users to `/login`.
- Authenticated users are redirected away from `/login` and `/signup`.

**Top Navbar (Shared Layout)**
- Left: “BITS Pilani Store” logo.
- Center: Products (All, Sneakers, Merchandise), Collections, Discounts.
- Right: Search, Cart, Login/Avatar (Avatar menu: Account, Admin if role=admin, Logout).

**API (Skeleton, for later)**
- `/api/products` — GET list, POST create (admin).
- `/api/products/[id]` — GET detail, PUT/PATCH, DELETE (admin).
- `/api/collections` and `/api/collections/[id]` — CRUD (admin), GET for public.
- `/api/discounts` and `/api/discounts/[id]` — CRUD (admin), GET for public.
- `/api/cart` — Optional server cart; MVP can be client-side.
- `/api/orders` and `/api/orders/[id]` — Create/GET for user; list/manage for admin.
- `/api/account/addresses` — CRUD for authenticated user addresses.

**Implementation Groups (App Router)**
- `(store)` — Home, products, product, category, collections, discounts, cart, checkout.
- `(account)` — Account pages (profile, orders, addresses).
- `admin` — Admin pages.

**Open Decisions**
- Guest checkout vs. require login: currently set to require login.
- Category set: start with `sneakers`, `merchandise`; expand as needed.
- Cart storage: client-only MVP vs. server/session-backed.
