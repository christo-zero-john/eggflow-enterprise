# Payments: today, and the road to automatic

## Today: manual, by design

No payment is taken on the website. The customer submits an order request, you
call them, they pay by UPI, you record the reference and dispatch.

Reasons this is the right call for launch:

- No gateway KYC on the critical path. You can take an order this week.
- No PCI surface, no webhook, no signature verification, no reconciliation bugs.
- At single-digit daily volume, a phone call is not a bottleneck — and it tells
  you more about why people buy than any funnel report will.
- It defers a decision that is easier to make with twenty real orders of data.

What it costs, stated honestly: conversion. Every hour between "I want this" and
"I have paid" loses buyers, and a form that takes no money converts worse than a
checkout that does. Watch the `new` → `payment_received` median in
[04-order-flow.md](04-order-flow.md); that number is the argument for the next
phase.

## Why not Dodo Payments

It was considered and rejected on a factual blocker, not a preference. Dodo's
own Merchant Acceptance Policy prohibits physical goods:

> "We only support digital delivery. Physical goods include merchandise packaged
> with digital bundles. No T-shirts, mugs, books, supplements, or computer
> hardware."

Dodo is a merchant-of-record built for SaaS, AI tools and digital downloads. A
shipped egg rack is squarely in their prohibited list. Onboarding anyway risks
account termination and frozen settlements *after* customer money is involved,
which is the worst available failure mode.

Source: https://docs.dodopayments.com/miscellaneous/merchant-acceptance

## Next: Razorpay

Chosen for physical goods in India: UPI, cards, netbanking and wallets, a
documented Node SDK, reliable webhooks, and a hosted checkout that removes the
card fields from our origin entirely.

### What onboarding needs

- PAN and bank account (a proprietor account is accepted)
- Live, reachable Privacy, Terms, Refund/Cancellation and Shipping pages
- Contact details and a clear product description

Everything in that second bullet is built now. See
[08-legal-and-compliance.md](08-legal-and-compliance.md).

### The integration, when it happens

The order flow is already shaped for it. Payment slots in between order creation
and `accepted`; nothing before or after it changes.

```
today:   POST /api/orders -> status: new -> you call -> accepted

later:   POST /api/orders -> status: new
                          -> create Razorpay order (amount from OUR pricing)
                          -> hosted checkout opens
                          -> POST /api/razorpay/webhook (HMAC verified)
                          -> status: payment_received
```

New code, and only this:

```
src/app/api/razorpay/webhook/route.ts   signature verify, idempotent handler
src/lib/payments/razorpay.ts            order create, amount from lib/pricing
src/lib/payments/verify.ts              HMAC comparison, timing-safe
```

New columns: `razorpay_order_id`, `razorpay_payment_id`, `payment_status`.
`payment_ref` stays for the manual path, which does not go away — some customers
will still want to pay by transfer.

### Three rules for that work

1. **The webhook is the source of truth, never the browser callback.** A client
   that closes the tab after paying must still result in a paid order.
2. **The amount sent to Razorpay comes from `lib/pricing.ts`**, computed from
   `product.ts`, never from the request body. Same rule as today.
3. **The webhook must be idempotent.** Razorpay retries. Handling the same
   payment twice must not create two orders or two dispatches. Key on
   `razorpay_payment_id`.

### Migration is additive

`new` gains a second exit: `payment_received` directly, alongside `accepted`.
Every existing status and transition survives. No data migration, no rewrite of
the admin dashboard — it gains a payment column.

## Decision point

Move to Razorpay when any of these is true:

- More than ~5 orders a day, and the calls are eating your day.
- Median `new` → `payment_received` exceeds ~24 hours.
- Cancellations attributed to payment friction pass ~20%.

Below those, manual is genuinely cheaper and tells you more.

## Not on the roadmap

**COD.** With a drop-ship supplier and a ₹222 item, return-to-origin on a
refused delivery costs more than the margin, and you do not control the courier
that would collect the cash. Revisit only if the supplier operates COD
themselves and remits reliably.
