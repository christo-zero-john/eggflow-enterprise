# Architecture

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16.3.4, App Router | Already in place. Server components keep the client bundle small. |
| Runtime | React 19.2.8 | Ships with Next 16. |
| Styling | Tailwind v4 + `@theme` tokens | Already a devDependency, previously unused. Tokens in CSS, utilities in markup. |
| Motion | framer-motion 13 | Already installed. Used for scroll-driven sequences only. |
| Database | Supabase Postgres | Orders must survive redeploys. Auth for `/admin` comes bundled. |
| Auth | Supabase Auth, single admin user | No customer accounts exist. |
| Validation | zod | One schema shared by client form and server route. |
| Host | Vercel | Native Next.js target. |
| Tests | Vitest | Fast, no config fight with Next. |

Deliberately absent: no payment SDK (see
[09-payments-roadmap.md](09-payments-roadmap.md)), no email provider, no
analytics, no UI component library, no state manager.

## The layer rule

```
app/          routing, layout, data fetching. Thin.
components/   presentation. No database calls, no business rules.
lib/          all logic. Testable without React.
```

A React component never talks to Supabase directly and never computes a price.
If a component needs a number, a `lib/` function produced it.

## Folder layout

```
src/
  app/
    (marketing)/
      page.tsx                  home
      product/page.tsx          PDP
      how-it-works/page.tsx     scroll-driven mechanism story
      faq/page.tsx
      contact/page.tsx
    (legal)/
      privacy/page.tsx
      terms/page.tsx
      shipping/page.tsx
      refunds/page.tsx
    order/
      page.tsx                  the order request form
      [code]/page.tsx           confirmation + status lookup
    admin/
      login/page.tsx
      orders/page.tsx
      orders/[id]/page.tsx
    api/
      orders/route.ts           POST only
    layout.tsx
    sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx

  components/
    marketing/  Hero  MechanismScroll  ProofRow  Gallery  StickyBuyBar  FaqList
    order/      OrderForm  AddressFields  QuantityStepper  OrderSummary
    admin/      OrderTable  StatusControl  RelayBlock  EventLog
    ui/         Button  Field  Badge  Disclosure  Money  Placeholder

  lib/
    product.ts            SINGLE SOURCE OF TRUTH for product facts
    site.ts               nav, metadata, contact details
    pricing.ts            money math, integer paise
    orders/
      schema.ts           zod schemas, shared client + server
      status.ts           the status machine
      service.ts          persistence: create, fetch, transition
      notify.ts           the notification seam (no-op today)
      code.ts             human-readable order code generation
    supabase/
      server.ts           request-scoped client, anon key
      admin.ts            service-role client. SERVER ONLY.
    ratelimit.ts

  styles/globals.css      Tailwind v4 + @theme tokens
```

### Why `lib/orders/` is five files and not one

Each has a single job and can be tested alone:

- `schema.ts` — is this input valid? No database, no side effects.
- `status.ts` — is this transition legal? A pure function over two strings.
- `code.ts` — generate `EF-7QK4M2`. Pure.
- `service.ts` — the only file that writes to the database.
- `notify.ts` — the only file that will ever send email.

When email is added, exactly one of these files changes.

## Request flows

### Placing an order

```
POST /api/orders
  |
  1. rate-limit by IP            -> 429 if tripped
  2. parse body with zod         -> 400 with field errors
  3. honeypot field non-empty?   -> 202 with a fake code, silently dropped
  4. resolve colour id against product.ts
  5. compute pricing SERVER-SIDE from product.ts + qty
  6. generate order code
  7. INSERT orders / order_items / order_events   (single transaction)
  8. notify.orderCreated()       -> no-op today
  -> 201 { code }
```

Client redirects to `/order/[code]`.

**Step 5 is the security boundary.** The request body has no price field at all.
There is nothing to tamper with, because the client never states what the order
costs.

The honeypot returns success rather than an error on purpose — a bot that is
told it failed will retry with the field removed.

### Viewing an order

`/order/[code]` is a server component. It looks the order up by `code`, which is
random and non-sequential, and renders status and contact details. No auth: the
code is the capability. This is the standard guest-order pattern, and the reason
codes are random rather than incrementing integers.

It shows the address back to the customer but never the internal id, the event
log, or the admin notes.

### Admin

`middleware.ts` gates everything under `/admin` on a Supabase session. Order
lists and detail views are server components using the request-scoped client;
status transitions are server actions that call `service.transition()`, which
validates against `status.ts` before writing, and appends an `order_events` row
in the same transaction.

## Rendering strategy

| Route | Strategy | Reason |
|---|---|---|
| Marketing + legal | Static | Product facts change only on deploy. Fast, cacheable, indexable. |
| `/order` | Static shell, client form | The form needs no server data. |
| `/order/[code]` | Dynamic, no cache | Status must be current. |
| `/admin/*` | Dynamic, no cache | Session-gated, always fresh. |

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL          browser-safe
NEXT_PUBLIC_SUPABASE_ANON_KEY     browser-safe
SUPABASE_SERVICE_ROLE_KEY         SERVER ONLY — never NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL              canonicals, sitemap, OG
ADMIN_EMAIL                       the single admin account
```

`lib/supabase/admin.ts` starts with `import "server-only"`, so importing it from
a client component fails the build rather than leaking the service-role key.

## What this architecture does not do

No customer accounts, no cart, no online payment, no courier API, no inventory
tracking, no caching layer beyond Next's own, no background jobs, no analytics.
Each is listed in [12-roadmap.md](12-roadmap.md) as a deliberate deferral rather
than an oversight.
