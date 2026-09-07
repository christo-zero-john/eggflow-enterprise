# EggFlow — documentation

Everything that is not code lives here. If a decision was made, it is written
down in one of these files, together with the reason for it.

Read them in this order the first time.

| # | File | What it answers |
|---|---|---|
| 00 | [specs/2026-09-04-direct-commerce-design.md](specs/2026-09-04-direct-commerce-design.md) | The approved design for this phase of work. Start here. |
| 01 | [01-product-brief.md](01-product-brief.md) | What we sell, who buys it, and the rules about what we may claim. |
| 02 | [02-architecture.md](02-architecture.md) | Stack, routes, folder layout, data flow, where each concern lives. |
| 03 | [03-data-model.md](03-data-model.md) | Supabase schema, the order status machine, RLS policy, migration SQL. |
| 04 | [04-order-flow.md](04-order-flow.md) | The full lifecycle of an order, and the daily runbook for operating it. |
| 05 | [05-design-system.md](05-design-system.md) | Tokens, type, colour, spacing, motion rules, component inventory. |
| 06 | [06-photography-brief.md](06-photography-brief.md) | **Every image the site needs, with a ready-to-paste AI prompt each.** |
| 07 | [07-content-and-copy.md](07-content-and-copy.md) | Voice, the claims register, and copy that must change now we are the seller. |
| 08 | [08-legal-and-compliance.md](08-legal-and-compliance.md) | DPDP Act 2023, CCPA dark-pattern rules, required pages, GST position. |
| 09 | [09-payments-roadmap.md](09-payments-roadmap.md) | Why payment is manual today and exactly how Razorpay drops in later. |
| 10 | [10-setup-and-deployment.md](10-setup-and-deployment.md) | Environment variables, Supabase setup, Vercel deploy, go-live checklist. |
| 11 | [11-testing.md](11-testing.md) | What is tested, how, and what is deliberately not tested. |
| 12 | [12-roadmap.md](12-roadmap.md) | Phases, what is in this build, what is explicitly deferred. |

## The one rule

`src/lib/product.ts` is the single source of truth for every product fact on
the site. If a number is not on the supplier listing or measured by you in
person, it does not go in that file, and therefore cannot appear on the site.

This rule predates the current work and survives it. See
[07-content-and-copy.md](07-content-and-copy.md) for the claims register.
