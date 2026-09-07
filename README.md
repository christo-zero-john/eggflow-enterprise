# EggFlow

A single-page storefront for a four-tier rolling egg shelf. Next.js 16 (App
Router), Tailwind v4, framer-motion.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # must pass clean before any deploy
pnpm lint
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
    RackDemo         the interactive hero illustration
    RackArt          shared SVG primitives + rack-geometry.ts
    MechanismScroll  the pinned scroll sequence
    BenefitStrip  Comparison  SizeFit  PhotoSlot  Cta  StickyBuyBar
    SiteHeader  SiteFooter
  lib/
    product.ts       SINGLE SOURCE OF TRUTH
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

- **No photography.** Every image is a labelled placeholder at the correct
  aspect ratio. Drop files into `public/images/product/` and set `src` in
  `product.ts`. Brief: [docs/06-photography-brief.md](docs/06-photography-brief.md).
- **No ordering.** The buy section says so plainly instead of staging a fake
  checkout. Design for the real thing:
  [docs/specs](docs/specs/2026-09-04-direct-commerce-design.md).
- **No contact details.** `site.ts` has `contact` fields set to `null`. A
  storefront with no reachable contact is rejected by ad platforms and payment
  gateways, and it is the first thing a cautious buyer looks for.
- **The hero illustration draws four independent tiers.** The supplier's flyers
  show a serpentine cascade — loaded at the top, one egg presented at a chute at
  the bottom. The current drawing was chosen on aesthetic grounds knowing it is
  inaccurate. Mechanism copy is kept to wording that does not assert a specific
  routing. Resolve before launch.
- **No reviews.** The ratings that used to be here belonged to a marketplace
  listing and could not honestly be presented as ours. They come back when
  there are real EggFlow reviews.

Full documentation index: [docs/README.md](docs/README.md).
