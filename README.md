# Kontrok.com — Marketplace Frontend (prototype)

A high-density, Lazada-style marketplace homepage for **Kontrok.com**, built with
**Next.js 15 (App Router) + TypeScript + Tailwind CSS + lucide-react**.

It is a standalone frontend with **mock data** (`lib/data.ts`). It is not connected
to the Kontrok shop API, payments, or accounts.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3100
```

Production build:

```bash
npm run build
npm start          # http://localhost:3100
```

Requires Node 18.18+.

## What's included

| Section | Notes |
|---|---|
| Utility bar | Sell / Track Order / Customer Care / Download App, **EN ⇄ ខ្មែរ** and **USD ⇄ KHR** (1 USD = 4,050 KHR, riel rounded to 100) |
| Sticky header | Logo, search with live autocomplete (↑/↓/Enter/Esc), trending tags, cart badge, Login / Sign Up |
| Hero | 220px multi-level category menu with hover flyout + auto-playing carousel (pauses on hover, swipe on touch, respects reduced motion) |
| Channel pills | Free Shipping, Kontrok Mall, Vouchers, Top-Up & Bills, Under $5, Global Collection |
| Flash Sale | Live `HH:MM:SS` countdown to midnight, 6 deals with sold-progress bars |
| Categories | 2 × 8 tile grid; each tile filters the feed |
| Just For You | Sticky tabs (All / Best Sellers / Top Rated / Local Stock), filter chips, infinite scroll on "All" |
| Quick-View modal | Color swatches, sizes, quantity, Add to Cart / Buy Now |
| Cart drawer | Quantity controls, voucher **`KONTROK10`** (10% off), free delivery over $15, totals |
| Footer | Customer care, about, payment badges (ABA Pay, Wing, KHQR, Visa, Mastercard, COD), delivery partners |
| Mobile | 2-column feed and fixed bottom nav (Home / Categories / Cart / Account) |

Language, currency, and cart persist in `localStorage` per browser.

## Structure

```
app/            layout (fonts: Inter + Noto Sans Khmer), page, global styles
components/     one file per section + shared ui.tsx
lib/data.ts     24 sample products, categories, tiles, search matcher
lib/i18n.ts     English + Khmer UI strings
lib/store.tsx   React context: language, currency, cart, filters, overlays, toast
lib/format.ts   price formatting (USD / KHR)
```

Product photos come from Unsplash. Any image that fails to load falls back to a
`placehold.co` placeholder.
