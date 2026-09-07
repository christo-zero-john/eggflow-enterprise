# EggFlow — product site

A multi-page Next.js (App Router) marketing site for the 4-tier gravity-fed egg
rack listed at https://www.meesho.com/s/p/bik9nv

Verified: `next build` passes clean. 11 routes, all statically prerendered.
First Load JS is 103 kB shared; the two pages carrying the interactive demo
come to 145 kB.

---

## Dropping this into an existing app

Copy these directories in. Nothing is namespaced to a route group, so they merge
with a standard App Router tree:

```
app/eggflow.css              design tokens + all component styles
app/layout.tsx               MERGE — see note below
app/page.tsx                 home
app/product/page.tsx
app/how-it-works/page.tsx
app/faq/page.tsx
app/shipping-and-returns/page.tsx
app/contact/page.tsx
app/privacy/page.tsx         STUB — replace before launch
app/terms/page.tsx           STUB — replace before launch
app/not-found.tsx
app/sitemap.ts
app/robots.ts
components/site/             Header, Footer, Container
components/ui/               Marker, Disclosure, SpecTable
components/eggflow/          RackDemo, Gallery, BuyPanel, Ratings, StructuredData
lib/product.ts               all product facts live here
lib/site.ts                  nav + site metadata
```

**`app/layout.tsx` is the one file to merge rather than overwrite.** If you
already have a root layout, take three things from ours: the `import
"./eggflow.css"`, the `Archivo` font variable on `<html>`, and the
`className="ef"` on `<body>`. That last one is what scopes the design tokens —
without it nothing is styled.

### Dependencies

```bash
npm i framer-motion
```

That is the only runtime dependency added. Everything else is Next.js, React and
CSS. No Tailwind, no UI kit, no icon library — the handful of icons are inline
SVG or CSS pseudo-elements.

If your project already uses `motion` (the renamed successor package), change
the two imports in `components/eggflow/RackDemo.tsx` from `"framer-motion"` to
`"motion/react"`; the API is identical.

### `next.config.mjs`

Merge the `images.remotePatterns` entry for `images.meesho.com`. You can delete
it once you replace the supplier photographs with your own.

### Path alias

Components import via `@/`. If your `tsconfig.json` does not have it:
`"paths": { "@/*": ["./*"] }`

---

## Why it is built this way

**Plain CSS, not Tailwind.** You said this is going into an existing
boilerplate whose setup is unknown. Tailwind v3 and v4 differ enough in config
that generated utility classes are a coin flip. Everything here is scoped under
`.ef` with `--ef-` tokens, so it cannot collide with whatever you already have
and needs no build-tool config at all.

**The hero is the mechanism, not a headline.** The only real question a buyer
has about this product is whether the next egg actually comes forward.
`RackDemo` lets them click the front egg and watch the line advance. All motion
on the site answers a click — nothing animates on scroll or page load, and
`useReducedMotion` disables the layout animation entirely for users who ask.

**`<details>` for the FAQ, not a JS accordion.** Answers stay findable by the
browser's Find-in-page, stay indexable, deep-link by anchor, and work with
JavaScript off. The `name` attribute makes them mutually exclusive natively.

**Design direction: cold storage.** The palette comes from a fridge interior —
cool white, tempered glass, grey polypropylene, with a deep teal accent. Warm
colour appears exactly once on the entire site: the yolk gold of the illustrated
eggs. The amber-everything treatment on the previous draft is the default move
for an egg product, and it reads as generic.

**Contrast.** Every text/background pair was measured. Lowest is 5.06:1
(secondary text), all others 5.6:1 to 14.9:1. Light and dark schemes both pass
WCAG AA. Focus rings are visible on every interactive element.

---

## Editing product facts

`lib/product.ts` is the single source of truth. Every number rendered anywhere
comes from it. The rule when editing: **if it is not on the supplier listing or
measured by you, it does not go in the file.**

---

## What was deliberately NOT claimed

These are the substantive differences from the supplier listing and your earlier
draft. Each was a decision, so you can reverse any of them knowingly.

| Listing says | This site says | Why |
|---|---|---|
| "Automatic scrolling" | "Gravity-fed", with an explicit "no motor, no power" | There is no motor. Saying so is a stronger trust signal than the word "automatic", and it explains why nothing can break. |
| 30 eggs (title) / 25–30 (body) / 28 (spec sheet) | 28, with the discrepancy explained | 28 is the conservative figure. The FAQ says why the three numbers differ. |
| 10 × 10 × 10 cm | **Not published** — renders a "Not verified yet" tag | A four-tier 28-egg rack is not a 10 cm cube. It is a placeholder value left in the listing form. |
| Weight 0.3 G | **Not published** | Same — 0.3 grams is impossible. |
| — (your old draft) | "BPA-free" **removed entirely** | The listing says only "Plastic". No grade, no test report. This claim was invented in the previous draft. |
| — | Strikethrough "was" price **removed entirely** | A reference price never actually charged is a dark pattern under India's CCPA 2023 guidelines. `compareAtPrice` is `null` and the UI says so out loud. |
| 4.3 from 28 ratings | Shown as 4.3 from 28 ratings, with both real reviews including the 3-star "No satisfaction" | 28 is a small sample. Publishing the unflattering review is the single most credible element on the page. |
| COD, 7-day returns | Attributed to Meesho by name on every page that mentions them | You are not the fulfiller. Implying otherwise breaks on first contact with a delivery problem. |

There are no countdown timers, stock counters, "N people viewing" badges or
fabricated testimonials anywhere in this codebase, and adding them would
contradict the copy on `/shipping-and-returns`.

---

## Before you launch

1. **Measure a unit.** Fill in `dimensionsCm` and `weightG` in `lib/product.ts`.
   The four "Not verified yet" rows on `/product` become real values
   automatically once those are non-null. Shelf fit is the number-one return
   reason for fridge organisers and the number-one unanswered question here.
2. **Shoot your own photographs**, self-host in `/public`, update
   `product.images`, and delete the `remotePatterns` entry. You do not hold the
   rights to marketplace imagery. A short looping video of an egg rolling
   forward is worth more than all the copy on the site.
3. **Get a material test report** from the supplier if you want to say
   food-grade or BPA-free. Until then the honest line in `material.note` stands.
4. **Fill in `/contact`** — a real monitored email and a registered address.
   Both Meta and Google Shopping reject stores without them.
5. **Write `/privacy` and `/terms`.** Required for ad eligibility, and under the
   DPDP Act 2023 if you run any analytics or pixel.
6. **Set `site.url`** in `lib/site.ts` to your real origin; `metadataBase`,
   canonicals, `sitemap.xml` and `robots.txt` all derive from it.
7. **Add an OG image** at `app/opengraph-image.png` (1200×630). The Twitter card
   is declared as `summary_large_image` and currently has no image to show.
8. **Re-check the ratings.** `ratings.fetchedOn` is 2026-09-03 and is printed in
   the footer. Structured data marks up only what is visible on the page —
   keep it that way, or you risk a Search manual action.