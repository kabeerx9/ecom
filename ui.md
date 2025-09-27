UI/UX Guidelines — BITS Pilani Store

Status: v1 (MVP)
Purpose: Ensure a clean, consistent, and accessible UI across the app. Use shadcn/ui primitives, Tailwind v4 utilities, and a simple visual system.

Core Principles
- Consistency over cleverness: repeat familiar patterns across pages.
- Clear hierarchy: title, subtitle, primary action(s), content.
- Compact, friendly defaults: comfortable spacing without bloat.
- Accessible by default: proper contrast, focus states, and semantics.

Layout & Spacing
- Page container: wrap content in `container mx-auto px-4 py-6`.
- Section header: use `h1.text-xl.font-semibold` and a follow-up `p.text-sm.text-muted-foreground`.
- Vertical rhythm: prefer `space-y-6` at page level; `gap-4` within sections.
- Grid: two-column at `lg:` for related cards; `grid gap-6 lg:grid-cols-2`.

Cards & Sections
- Use `Card` for major sections (forms, lists, detail blocks).
- Structure: `CardHeader` → `CardTitle` (avoid descriptions unless necessary), then `CardContent`.
- Use `Separator` to divide dense content within a card.

Typography
- Titles: `text-xl font-semibold` for page titles; `CardTitle` for section titles.
- Body: default size; secondary info: `text-sm text-muted-foreground`.
- Avoid excessive text weight variety; keep it simple and readable.

Buttons & Actions
- Primary action: `Button` (default). Secondary: `variant="outline"`. Destructive: `variant="destructive"`.
- Sizes: default or `size="sm"` for compact toolbars.
- Link actions: use underline with `underline underline-offset-4` for in-table links.

Tables & Lists
- Use `Table` for tabular data. Keep columns minimal.
- Status indicators: use `Badge` variants (default/secondary/outline) for states.
- In responsive layouts, hide less important columns using `hidden sm:table-cell`.

Forms
- Structure fields as `Label` above `Input`; group as `grid gap-2`.
- Use read-only inputs for display when editing is not implemented.
- Group related fields in a `grid gap-4 md:grid-cols-2`.

Feedback & States
- Loading: use `Skeleton` components, not spinners, for skeletonable pages.
- Empty state: concise message with optional primary action.
- Errors: `Alert variant="destructive"` with a clear, short message.

Navigation
- Store & account: top `Navbar` with primary links and user menu.
- Admin: left `Sidebar` with clear sections (Products, Collections, Discounts).
- Keep paths short and meaningful; avoid deep nesting in nav.

Icons & Visuals
- Use Tabler icons where helpful; keep icons subtle and not overbearing.
- Avatars: square with rounded-lg for brand consistency.

Responsiveness
- Mobile-first; ensure key actions are visible without scrolling.
- Hide non-essential columns in tables under `sm` and `md`.

Theming
- Support light/dark using existing ThemeProvider.
- Avoid hard-coded colors; rely on `text-muted-foreground`, `bg-muted`, and component variants.

Background
- A global decorative background exists via `<Background />` and `.app-bg`.
- Keep page sections on default `bg-background` cards; do not set opaque backgrounds on wrappers that would hide the global background.
- Avoid adding competing page-level backgrounds. If needed, use subtle gradients within cards only.

Code Conventions (UI)
- Keep client components minimal; move data fetching server-side unless using `authClient` or interactions.
- Reuse patterns: page header block + card sections.
- Prefer composition of shadcn/ui primitives; avoid bespoke one-off styles.

Examples
- Page header:
  - `<h1 className="text-xl font-semibold">Title</h1>`
  - `<p className="text-sm text-muted-foreground">Subtitle</p>`
- Two-column card grid:
  - `<div className="grid gap-6 lg:grid-cols-2">...</div>`
- Skeleton page:
  - Three skeleton blocks with varied heights; avoid spinner unless needed.

Review Checklist
- Title/subtitle present
- Sensible spacing and grid
- Buttons sized consistently
- Text contrast and accessible labels
- Responsive checks for sm/md/lg
