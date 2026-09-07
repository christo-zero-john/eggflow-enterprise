# Legal and compliance

Not legal advice. This is an engineering record of what the site does and why,
so a lawyer can review it quickly and so nobody undoes a deliberate decision by
accident.

## Position

You are a **sole proprietor in India, without GST registration**, selling a
physical product directly to consumers, with fulfilment by a supply partner and
payment collected manually outside the website.

That position determines everything below.

## 1. DPDP Act 2023 — the one that actually applies today

The moment the order form collects a name, phone number and address, you are
processing personal data as a Data Fiduciary. No payment gateway sits in front
of it to absorb that obligation.

What the build does:

| Obligation | Implementation |
|---|---|
| Notice at collection | `/privacy` written in plain language, linked directly beneath the submit button — not only in the footer. |
| Purpose limitation | Data is used to fulfil the order. Nothing else. No marketing list, no resale, no enrichment. |
| Data minimisation | Email is optional. No date of birth, no gender, no "how did you hear about us". Every field on the form is needed to deliver a box. |
| Storage limitation | A stated retention period — 3 years from delivery for tax and dispute purposes — then deletion. |
| Security | RLS denying anon access, service-role key server-only, TLS via Vercel, admin behind Supabase Auth. |
| Erasure on request | A named contact on `/privacy`; deletion is a manual SQL operation, documented in the runbook. |
| No dark-pattern consent | No pre-ticked boxes. No consent bundled with the order. |

**Consequence to respect:** adding Google Analytics, a Meta Pixel or any
third-party script creates fresh consent obligations and a cookie banner. That
is why analytics is out of scope in this build — it is a deliberate deferral,
not an oversight. Add it as its own decision, with the consent flow built at the
same time.

## 2. CCPA 2023 dark-pattern guidelines

The Central Consumer Protection Authority's 2023 guidelines name thirteen dark
patterns. The ones this site could plausibly have committed, and what is done:

| Pattern | Position |
|---|---|
| False urgency | No countdown, no stock counter, no "N viewing". |
| Basket sneaking | Nothing is added to an order that the customer did not select. |
| Confirm shaming | The cancel path is neutral. No "No thanks, I hate saving money". |
| Forced action | No account required. No newsletter bundled with ordering. |
| Drip pricing | Total is shown in full before submission. Delivery charge, if any, is stated up front, not revealed later. |
| Bait and switch | The listed price is the price quoted on the call. This is why the manual-payment explanation appears *before* the form. |
| Subscription trap | Nothing recurring exists. |
| SaaS billing / nagging / interface interference | Not applicable. |

The struck-through "was ₹499" price is the tempting one. `compareAtPrice` stays
`null` unless there is a genuine prior price with the dates it was live.

## 3. Legal Metrology (Packaged Commodities) Rules

An e-commerce listing for a packaged commodity must display: name and address of
the manufacturer or packer, common name of the commodity, net quantity, retail
sale price inclusive of all taxes, consumer-care contact, and country of origin.

Current state:

| Required | Status |
|---|---|
| Common name | ✅ "Egg tray" in `product.ts` |
| Net quantity | ✅ "Pack of 1" |
| Retail sale price incl. taxes | ✅ ₹222, stated as inclusive |
| Country of origin | ✅ India |
| Manufacturer / packer name and address | ❌ **Blocked** — needs the supplier's details |
| Consumer-care contact | ❌ **Blocked** — needs your monitored email and phone |

The last two are launch blockers, not nice-to-haves. `/product` renders a
"Seller and manufacturer details" block that reads from `site.ts`, so filling
those fields completes it.

## 4. Consumer Protection (E-Commerce) Rules 2020

As an e-commerce entity you must display legal name, address, customer-care
contact and a grievance officer, and you may not refuse to take back goods that
arrive defective or deficient.

Implementation: `/contact` carries the legal name, address, email and phone;
`/refunds` states the defect policy; the footer carries a grievance contact.

**These pages cannot be stubs.** The current `/privacy` and `/terms` are stubs
and are rewritten as real pages in this build.

## 5. GST — the position and the switch

Below the registration threshold, a proprietor may sell without GSTIN. So:

- Documents issued to customers are **receipts**, not tax invoices.
- No GST is shown as a separate line, and no GSTIN is printed, because printing
  one you do not hold is an offence.
- Prices are stated as inclusive of taxes, which is true either way.

`site.ts` carries a `gst: null` field. When you register, set it, and the receipt
template renders a compliant tax invoice with the rate broken out. Building that
switch now costs nothing; retrofitting it after fifty orders is unpleasant.

**Note:** the threshold applies to turnover, not to intent. Track your revenue.

## 6. Manual payment — the specific exposures

Collecting payment by UPI outside the website is legal and common. It has three
consequences the build accounts for:

1. **No payment audit trail.** Mitigated by `payment_ref` on the order, recorded
   in `order_events` with who marked it and when.
2. **No chargeback protection either way.** A UPI transfer is effectively final.
   `/refunds` must therefore be explicit that refunds are made manually to the
   paying UPI ID, and how long that takes.
3. **The order is not a contract until you confirm it.** `/terms` says this
   plainly, which is what protects you if the supplier is out of stock or a
   price is wrong.

## 7. Payment gateway readiness

When Razorpay is added, activation requires live and reachable Privacy, Terms,
Refund/Cancellation and Shipping pages, plus contact details and a clear
description of the product. Because those pages are built properly now, the
later payments work is integration only, not a documentation scramble.

## 8. Launch blockers

Nothing goes live until every one of these is done.

- [ ] Real content on `/privacy` and `/terms` — the current stubs are unusable
- [ ] `/refunds` and `/shipping` written and reachable from the footer
- [ ] Monitored email, phone and postal address in `site.ts`
- [ ] Manufacturer / packer name and address from the supplier
- [ ] `site.url` set to the real origin
- [ ] Meesho `AggregateRating` structured data removed
- [ ] All Meesho imagery removed and replaced
- [ ] Data retention period stated on `/privacy`
- [ ] Grievance contact in the footer
- [ ] The word "Meesho" appears nowhere except a sourced review attribution
