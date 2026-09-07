# Design: direct ordering + full visual rebuild

Date: 2026-09-04
Status: approved for spec review
Supersedes: the marketplace-referral architecture described in `README.md`

---

## 1. Why this work exists

The site as built is a **referral page**. Its entire architecture assumes the
sale happens on the marketplace: `BuyPanel.tsx` carries the comment "Deliberately not a
checkout", `product.fulfilment.note` says "We do not ship this product
ourselves", and `/shipping-and-returns` attributes every term to the marketplace by name.

The goal now is the opposite. Customers place the order here, so the marketplace is
removed from the path entirely. That inverts the core premise of the site,
which is why this is a rebuild rather than a feature.

Second goal: the visual design should read as a modern direct-to-consumer store
rather than a well-written essay about a product.

## 2. Decisions taken

Each of these was chosen explicitly. Reversing one is allowed; doing it
accidentally is not.

| Decision | Choice | Consequence |
|---|---|---|
| Fulfilment | Supplier drop-ships | We own the customer relationship; we do not control delivery timelines. Shipping copy must say so. |
| Payment at launch | **None online.** Manual, off-site, after contact | No gateway, no PCI surface, no webhook. Also no fraud filter — see §7. |
| Payment later | Razorpay | Dodo Payments was rejected: its Merchant Acceptance Policy prohibits physical goods outright. |
| Order model | Order **request**, not a sale | Status machine starts at `new`, not `paid`. Confirmation copy promises contact, not dispatch. |
| Commerce scope | Single product, Buy Now | No cart UI, no accounts. Line items are an array from day one so a cart is additive later. |
| Data | Supabase Postgres | Orders survive redeploys; admin auth comes with it. |
| Host | Vercel | Native Next.js target. |
| Admin | Dashboard at `/admin` | Orders are worked from the site, not from an inbox. |
| Email | Not built | A `notify()` seam is defined so Resend drops in without touching the order layer. |
| Styling | Tailwind v4 + `@theme` tokens | Already a devDependency, currently unused. `eggflow.css` is retired. |
| Direction | Modern DTC — warm, photo-led | Requires photography we do not yet own. See §6. |
| Motion | Rich, scroll-driven | Fully disabled under `prefers-reduced-motion`. |
| GST | None yet (sole proprietor) | Documents issued are receipts, not tax invoices. A GST switch is left in place. |

## 3. Architecture

```
Browser                      Next.js (Vercel)                  Supabase
  |                                |                               |
  |-- GET /product --------------->| static, ISR                   |
  |-- POST /api/orders ----------->| validate (zod)                |
  |                                | rate-limit + honeypot         |
  |                                | price from product.ts ------->| INSERT orders
  |                                |                               | INSERT order_items
  |                                |                               | INSERT order_events
  |<-- { orderCode } --------------|                               |
  |-- GET /order/[code] ---------->| server component ------------>| SELECT by code
  |                                |                               |
Admin                              |                               |
  |-- GET /admin/orders ---------->| middleware: session gate ---->| SELECT all
  |-- POST status transition ----->| server action --------------->| UPDATE + INSERT event
```

**Pricing is never accepted from the client.** The request body carries a
quantity and a colour id; every rupee figure is recomputed on the server from
`src/lib/product.ts`. A tampered payload changes nothing.

### Routes

| Path | Type | Purpose |
|---|---|---|
| `/` | static | Hero, mechanism, proof, CTA |
| `/product` | static | Full PDP with the order form entry point |
| `/how-it-works` | static | The scroll-driven mechanism story |
| `/faq` | static | `<details>` accordion, unchanged approach |
| `/shipping` | static | Delivery expectations. Rewritten: we are the seller |
| `/refunds` | static | Return and refund policy that we own |
| `/privacy` | static | DPDP Act 2023 notice. Real content, not a stub |
| `/terms` | static | Terms of sale. Real content, not a stub |
| `/contact` | static | Monitored email, phone, address |
| `/order` | dynamic | The order request form |
| `/order/[code]` | dynamic | Confirmation and status lookup |
| `/admin/login` | dynamic | Supabase Auth |
| `/admin/orders` | dynamic | Order queue |
| `/admin/orders/[id]` | dynamic | Detail, status transitions, supplier relay block |

### Folder layout

```
src/
  app/
    (marketing)/        home, product, how-it-works, faq, contact
    (legal)/            privacy, terms, shipping, refunds
    order/              form + [code] confirmation
    admin/              login, orders, orders/[id]
    api/orders/route.ts
  components/
    marketing/          Hero, MechanismScroll, ProofRow, Gallery, StickyBuyBar
    order/              OrderForm, AddressFields, QuantityStepper, OrderSummary
    admin/              OrderTable, StatusControl, RelayBlock
    ui/                 Button, Field, Disclosure, Badge, Money
  lib/
    product.ts          SINGLE SOURCE OF TRUTH (retained)
    site.ts             nav + metadata
    orders/             schema.ts, service.ts, status.ts, notify.ts
    supabase/           server.ts, admin.ts
    pricing.ts          server-side money math
  styles/globals.css    Tailwind v4 @theme tokens
```

`lib/orders/` is deliberately four small files rather than one: validation,
persistence, the status machine, and notification each have one job and can be
tested without the others.

## 4. Data model

Full SQL in [../03-data-model.md](../03-data-model.md). Summary:

- `orders` — `id`, `code` (human-readable, e.g. `EF-7QK4M2`), `status`,
  `subtotal_paise`, `shipping_paise`, `total_paise`, `currency`, contact fields,
  `notes`, timestamps.
- `order_items` — `order_id`, `sku`, `colour_id`, `unit_price_paise`, `qty`.
- `order_events` — append-only audit: `order_id`, `from_status`, `to_status`,
  `actor`, `note`, `created_at`. Nothing mutates history.

Money is stored in **paise as integers**. No floats anywhere.

### Status machine

```
new ──accept──> accepted ──payment──> payment_received ──relay──> relayed
 |                  |                                                |
 |                  |                                          ship  v
 |                  |                                             shipped
 |                  |                                                |
 |                  |                                                v
 |                  |                                            delivered
 |                  v
 |              cancelled  <── cancel, from any pre-shipped state
 v
cancelled
```

Transitions are validated server-side in `lib/orders/status.ts`. An invalid
transition is rejected, not silently applied.

## 5. The order request flow

1. Customer taps **Order now** on `/product` or the sticky mobile bar.
2. `/order` collects: name, phone (Indian format, validated), email (optional),
   address lines, city, state, 6-digit pincode, colour, quantity, optional note.
3. `POST /api/orders` validates with zod, checks the honeypot field, applies the
   rate limit, computes pricing server-side, writes `orders` + `order_items` +
   an initial `order_events` row, returns the order code.
4. Customer lands on `/order/[code]`:

   > **Order request received — EF-7QK4M2.** We will contact you on
   > +91 XXXXX XXXXX within one working day to confirm availability and arrange
   > payment. Nothing has been charged.

5. Operator works the queue in `/admin/orders`. See
   [../04-order-flow.md](../04-order-flow.md) for the runbook.

**No payment is taken, and the page says so in those words.** Silence on that
point would be the dishonest option, because a form that looks like a checkout
but takes no money leaves the customer unsure whether they have bought anything.

## 6. Visual design

Direction: **modern DTC — warm, confident, photo-led.** Tokens, type scale and
component inventory are specified in [../05-design-system.md](../05-design-system.md).

The dependency worth naming: the direction is photo-led and we own no
photography. `product.images` currently hotlinks the marketplace image CDN, which was
defensible for a page pointing at the marketplace and is not defensible on our own
storefront — it is another party's imagery, and the URLs can disappear.

Mitigation, in this order:

1. Every image slot is defined as a contract — id, aspect ratio, minimum pixel
   width, alt text — in [../06-photography-brief.md](../06-photography-brief.md).
2. Until real files exist, each slot renders a labelled SVG placeholder at the
   exact aspect ratio, so layout is final and swapping in a real file is a
   one-line change in `product.images`.
3. The interactive rack component carries the hero. It is a real, working
   demonstration of the mechanism and does not depend on photography at all.
4. All the marketplace image URLs and the `remotePatterns` entry are deleted.

## 7. Risks, and what is done about each

| Risk | Mitigation |
|---|---|
| **Junk orders.** No payment step means no cost to submitting a fake address. | Honeypot field, per-IP rate limit on `/api/orders`, Indian phone-format validation, and a `cancelled` path that costs one click. Volume is watched; if abuse appears, phone OTP is the next step. |
| **AI images misrepresenting a physical product.** | The brief marks every shot `AI-OK` or `REAL-PHOTO-REQUIRED`. Primary product shots are the second category. |
| **Personal data with no payment gateway to hide behind.** Name, phone and address are personal data under the DPDP Act 2023 the moment they are collected. | Real `/privacy` page, stated retention period, service-role key never exposed to the browser, RLS denying anonymous reads. |
| **Drop-ship timelines we do not control.** | `/shipping` gives a range attributed to the supplier and states plainly that we do not operate the courier. No promised date anywhere. |
| **the marketplace ratings on our own storefront.** 4.3 from 28 ratings belongs to a marketplace listing, not to us. | `AggregateRating` structured data is removed. Reviews may be quoted only with the source named on-screen. |
| **Manual payment is unauditable.** | `order_events` records who marked payment received and when, with a free-text reference field for the UPI transaction id. |

## 8. Testing

Vitest, on the parts where being wrong costs money or trust:

- `lib/pricing.ts` — totals, quantity multiples, integer paise, no float drift.
- `lib/orders/status.ts` — every legal transition allowed, every illegal one rejected.
- `lib/orders/schema.ts` — pincode, phone, required fields, honeypot rejection.
- `POST /api/orders` — happy path, tampered price payload ignored, rate limit trips.

Not tested: visual appearance, and the Supabase client itself.

## 9. Explicitly out of scope

Accounts and login for customers · cart and multi-product catalogue · online
payment · courier API integration · automated tracking emails · discount codes ·
inventory counts · analytics and pixels (they trigger DPDP consent obligations;
add deliberately, later) · internationalisation.

## 10. Open items for you

1. Generate the images in [../06-photography-brief.md](../06-photography-brief.md).
2. **Measure a physical unit** — length, width, height, weight. Shelf fit is the
   single most common unanswered question and the top return reason for fridge
   organisers. Fill `dimensionsCm` and `weightG` in `product.ts`.
3. Confirm the supplier relay channel and their realistic dispatch window.
4. Provide a monitored email, phone and address for `/contact` and `/privacy`.
5. Set `site.url` to the real origin.
