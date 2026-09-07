# Roadmap

## Phase 1 — this build

**Goal:** take an order on our own site, and look like a store while doing it.

### Foundation
- Tailwind v4 set up with `@theme` tokens; `eggflow.css` retired
- Fraunces + Instrument Sans via `next/font`
- `ui/` primitives: Button, Field, Badge, Money, Disclosure, Placeholder
- Placeholder generator for the image manifest

### Commerce
- Supabase schema, RLS, admin user
- `lib/pricing.ts`, `lib/orders/{schema,status,service,code,notify}.ts`
- `POST /api/orders` with zod validation, honeypot, rate limit
- `/order` form, `/order/[code]` confirmation and status
- `/admin` login, order queue, detail, status transitions, supplier relay block

### Content and rebuild
- Home, `/product`, `/how-it-works`, `/faq`, `/contact` rebuilt in the new direction
- `/privacy`, `/terms`, `/shipping`, `/refunds` written as real pages
- Every marketplace reference removed
- `AggregateRating` structured data removed
- Marketplace imagery and `remotePatterns` deleted

### Verification
- Vitest suite per [11-testing.md](11-testing.md)
- Manual script run on a phone
- Lighthouse ≥ 95 performance and accessibility

**Done when:** you can place an order on your phone, see it in `/admin`, move it
to `delivered`, and the customer's page tracks every step.

## Phase 2 — the things only you can do

Not code. Nothing in Phase 1 reaches its full value without these.

1. **Measure a unit.** Length, width, height, weight into `product.ts`. The four
   "not verified yet" rows become real values automatically. This is the
   highest-value single action available — shelf fit is the top unanswered
   question and the top return reason.
2. **Replace the AI design assets with real product photography** per
   [06-photography-brief.md](06-photography-brief.md). The generated hero,
   gallery, refrigerator and story frames are integrated for design review;
   purchase-decision images and mechanism proof still need the physical unit.
3. **Fill in contact and manufacturer details.** Launch blockers.
4. **Confirm the supplier relay channel** and a realistic dispatch window, so
   `/shipping` can carry a number instead of a hedge.

## Phase 3 — once orders are flowing

Ordered by value per unit of work.

| Item | Trigger | Notes |
|---|---|---|
| **Transactional email** | First customer asks "did it go through?" | Resend + React Email. `notify.ts` already exists as the seam; only that file changes. |
| **Razorpay** | >5 orders/day, or `new` → `payment_received` median >24h | See [09-payments-roadmap.md](09-payments-roadmap.md). Additive, no migration. |
| **Your own reviews** | 20 delivered orders | Replaces the borrowed marketplace ratings. `AggregateRating` can return once the ratings are genuinely ours. |
| **Real dimensions on the page** | Immediately after measuring | Already wired; needs only the data. |
| **WhatsApp order link** | If phone follow-up is the bottleneck | A `wa.me` deep link pre-filled with the order code. Cheap, and how a lot of Indian D2C actually operates. |
| **Dark mode** | When photography exists on transparent backgrounds | Deferred honestly in [05-design-system.md](05-design-system.md) rather than half-built. |

## Phase 4 — only with evidence

Do none of these speculatively. Each needs a real signal first.

| Item | The signal that justifies it |
|---|---|
| Cart and second product | An actual second product. Line items are already arrays, so this is UI work, not a migration. |
| Customer accounts | Repeat buyers asking for order history. Until then, accounts are friction with no benefit. |
| Analytics | A specific question you cannot answer from the orders table. It brings DPDP consent obligations and a cookie banner, so it must be worth that. |
| Courier API | Pasting tracking numbers becomes the bottleneck. |
| Inventory tracking | You hold stock yourself. Meaningless while drop-shipping. |
| Discount codes | A campaign that needs one. They invite the exact dark patterns this site refuses. |
| Multi-language | Evidence of non-English-reading buyers. Real work, so it needs real demand. |

## What will not be built

Countdown timers, stock counters, "N people viewing", exit-intent popups,
newsletter modals, fabricated reviews, struck-through prices that were never
charged, or a chatbot.

Some of these would raise conversion in the short term. All of them contradict
the reason this site is worth trusting, and several are named in India's CCPA
2023 dark-pattern guidelines. See
[08-legal-and-compliance.md](08-legal-and-compliance.md).
