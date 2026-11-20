# Kontrok.com — Marketplace Frontend (prototype)

A high-density, Lazada-style marketplace (homepage + product pages) for **Kontrok.com**, built with
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

## Brand

Uses the Kontrok brand from the mobile app (`mobile/src/theme.js`, `mobile/assets/expo`):

- **Logo:** K shopping-bag mark (white bag, gold handle) on brand blue, `public/brand/logo-mark.png`; favicon `app/icon.png`
- **Colors** (`tailwind.config.ts`): brand blue `#0285C9`, deep blue `#0A5D8A`, gold `#F5C556`,
  jade `#57C79E`, lotus `#F58FB0`, saffron `#F0A24E`, warm neutrals (cream `#F6F5F1` background, ink `#1C1B18`)
- **Type:** Manrope + Noto Sans Khmer; rounder corners as in the app
- **Pattern:** Khmer folk pattern from the app splash, on the campaign strip (`public/brand/pattern.jpg`)

## What's included

The layout, UX patterns and category tree follow Lazada (lazada.com.my, Nov 2026).
All brands, stores, products and copy are fictional Kontrok ones. No Lazada logo,
banners, seller photos or listings are used.

### Homepage (`/`), in Lazada's order

| Section | Notes |
|---|---|
| Campaign strip | Full-width "Weekly Grab" banner |
| Utility bar | Feedback / Save more on app / Sell / Customer Care / Track order / Login / Sign Up, **EN ⇄ ខ្មែរ** and **USD ⇄ KHR** (1 USD = 4,050 KHR, riel rounded to 100) |
| Sticky header | Logo, **Categories** dropdown (12 categories + sub-category flyout), search with live autocomplete (↑/↓/Enter/Esc), trending tags, cart badge |
| Hero | Auto-playing carousel (pauses on hover, swipe on touch, respects reduced motion) + "Try the Kontrok app" card |
| Service tiles | Kontrok Mall / Free & Fast Delivery / Official Stores / Blog |
| Flash Sale | Live `HH:MM:SS` countdown to midnight, 6 deals with sold-progress bars |
| Kontrok Mall | 6 official brand stores |
| Categories | 2 × 8 tile grid; each tile filters the feed |
| Just For You | Sticky tabs (All / Best Sellers / Top Rated / Local Stock), filter chips, infinite scroll on "All"; hover a card for **Quick View** |

### Product page (`/product/[id]`), 34 pages pre-rendered

Breadcrumb · gallery with 4 views · price, promotions, colour/size/model, quantity,
Buy Now / Add to Cart · delivery options, return & warranty, seller box with ratings ·
product details + specifications · ratings breakdown + reviews · Q&A ·
"You May Also Like" · sticky Buy/Add bar on phones · 404 for unknown ids.

### Everywhere

Cart drawer (voucher **`KONTROK10`** = 10% off, free delivery over $15), footer with
payment badges (ABA Pay, Wing, KHQR, Visa, Mastercard, COD), fixed bottom nav on
phones. Language, currency, and cart persist in `localStorage` per browser.

## Structure

```
app/                  layout (global chrome; fonts Manrope + Noto Sans Khmer), home page, 404
app/product/[id]/     product page (static params + metadata)
components/           one file per section + ProductDetail.tsx + shared ui.tsx
lib/data.ts           34 sample products in 12 categories, tiles, stores, reviews, Q&A, search
lib/i18n.ts           English + Khmer UI strings
lib/store.tsx         React context: language, currency, cart, filters, overlays, toast
lib/format.ts         price formatting (USD / KHR)
```

Product photos come from Unsplash. Any image that fails to load falls back to a
`placehold.co` placeholder. Photos were checked by eye to avoid visible real brand logos.
