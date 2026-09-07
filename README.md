# EggFlow

A single-page storefront for a four-tier rolling egg shelf. Next.js 16 (App
Router), Tailwind v4, framer-motion.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # must pass clean before any deploy
pnpm lint
pnpm test
```

## The two rules

**1. No marketplace is ever named on this site.** Not in copy, not as a link,
not as a ratings source. This is the product's own storefront, and where the
operator sources stock is not the customer's business. Before finishing any
change:

```bash
grep -rin meesho src/ docs/ *.md
```

That must return nothing.

**2. `src/lib/product.ts` is the single source of truth.** Every number and
claim rendered anywhere comes from it. If a value is not printed on the
supplier's own material or measured by you in person, it does not go in the
file — and therefore cannot appear on the site. Unverified values render as
"not measured yet" rather than a plausible guess.

## Layout

```
src/
  app/
    (site)/          layout + the single page
    layout.tsx       fonts, metadata
    globals.css      Tailwind v4 @theme tokens
    opengraph-image.tsx  robots.ts  sitemap.ts  not-found.tsx
  components/landing/
    ProductHero      product-led, image-based hero
    StorageSection   refrigerator context and concise benefits
    MechanismScroll  pinned three-image product sequence
    SizeFit          fit summary + scrollable specifications
    ProductGallery   colour and image selection
    FaqSection       scrollable desktop questions panel
    ViewportSection  shared full-viewport composition
    ScrollTextPanel  accessible dense-content scroller
    Cta  StickyBuyBar
    SiteHeader  SiteFooter
  lib/
    product.ts       SINGLE SOURCE OF TRUTH
    landing-motion.ts pure story/header state rules
    site.ts          nav, metadata, contact
```

The page is one route. Everything in the header and footer nav is an anchor,
not a page.

## Design

Direction and tokens are in [docs/05-design-system.md](docs/05-design-system.md).
Short version: a warm "moulded pulp" ground, ink for everything structural, and
exactly one saturated colour — yolk — used only on things you can act on.
Bricolage Grotesque for display, Instrument Sans for text.

## Known gaps

These are tracked, not forgotten.

- **AI product visualisations need real-photo replacement before launch.** The
  hero, gallery, refrigerator and scroll-story images are wired from
  `public/images/`. They are design assets, not measured product evidence.
  Brief: [docs/06-photography-brief.md](docs/06-photography-brief.md).
- **No ordering.** The buy section says so plainly instead of staging a fake
  checkout. Design for the real thing:
  [docs/specs](docs/specs/2026-09-04-direct-commerce-design.md).
- **No contact details.** `site.ts` has `contact` fields set to `null`. A
  storefront with no reachable contact is rejected by ad platforms and payment
  gateways, and it is the first thing a cautious buyer looks for.
- **Physical behaviour still needs a real-unit check.** The inaccurate rail
  illustration has been removed. The current story uses matched AI frames based
  on supplier material; use real footage or photography before treating the
  sequence as performance evidence.
- **No reviews.** The ratings that used to be here belonged to a marketplace
  listing and could not honestly be presented as ours. They come back when
  there are real EggFlow reviews.

Full documentation index: [docs/README.md](docs/README.md).
