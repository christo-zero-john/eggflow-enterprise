# Content and copy

## Voice

Plain, specific, unhurried. Short sentences. Concrete nouns. The tone of someone
who knows the product well enough to tell you what it is bad at.

**Do**

- "Your next egg, within reach."
- "Lift the front egg directly from the tray."
- "We have not measured one yet, so we are not going to guess."

**Do not**

- "Revolutionise your fridge organisation!"
- "Premium quality, superior durability" — unmeasurable, so meaningless.
- "Hurry, limited stock!" — false, and a dark pattern.
- Exclamation marks. There is nothing here to shout about.

## The claims register

This is enforceable. If a claim is not in the left column, it does not go on the
site.

### Allowed — sourced from the supplier listing

| Claim | Source |
|---|---|
| Four tiers | Listing |
| Approximately 28 eggs | Supplier spec sheet (the conservative of three conflicting figures) |
| Plastic | Listing, no grade stated |
| No assembly, single moulded piece | Listing |
| Pack of 1 | Listing |
| Two colours: grey, off-white | Listing |
| Country of origin: India | Listing |
| ₹222 | Our price |

### Allowed — observable and true

Gravity-fed, no motor, no power, no batteries · the supplier describes eggs as
rolling forward when the front one is removed · raised side walls · not
insulated · no lid · not designed to stack. Avoid absolute durability claims.

### Forbidden until evidence exists

| Claim | Blocked on |
|---|---|
| BPA-free | A supplier test report |
| Food-grade / food-safe | A supplier test report |
| Dishwasher safe | A heat rating |
| Any dimension or weight | Measuring a physical unit |
| "Fits any fridge shelf" | Measuring, then checking against common shelf depths |
| Works with duck or quail eggs | Testing it |
| A delivery date | A confirmed supplier dispatch window |
| A discount or "was" price | An actual prior price, with the dates it was live |

### Forbidden outright

Countdown timers · stock counters · "N people are viewing this" · fabricated
testimonials · a struck-through price never charged · pre-ticked consent boxes ·
"only X left" without a real inventory count.

The last five are named in India's CCPA 2023 dark-pattern guidelines. The rest
are simply lies.

## Copy that must change now we are the seller

This is the largest content task in the rebuild. Every one of these currently
names the marketplace.

| Location | Was | Becomes |
|---|---|---|
| `product.buyUrl` | Marketplace listing URL | Deleted. Replaced by `/order`. |
| `product.fulfilment.provider` | the marketplace name (removed) | Us as seller; supplier named as the party who dispatches. |
| `product.fulfilment.note` | "We do not ship this product ourselves." | "Your order is placed with us and dispatched by our supply partner." |
| `BuyPanel` | "Buy on the marketplace" + "Deliberately not a checkout" | `OrderPanel`: colour, quantity, **Order now**. |
| Home closing section | "₹222, sold through the marketplace." | "₹222. Ordered here." |
| `/shipping-and-returns` | the marketplace 7-day window, attributed to it | `/shipping` + `/refunds`, both owned by us. |
| FAQ "Who am I buying from?" | "The order is placed on the marketplace…" | Us, with the supply partner named and the manual-payment step explained. |
| Footer | the marketplace attribution | Our legal seller details. |
| `StructuredData` | `AggregateRating` from the marketplace | Removed. `Offer` only. |
| Hero micro-line | "₹222 on the marketplace · COD · 7-day returns" | "₹222 · dispatched in N days · X-day returns" — real values only. |

**A partial migration is worse than none.** A page that takes your order and
then says "we do not ship this ourselves" three sections later destroys exactly
the trust the site is built to create. This is a search-and-replace on the word
"the marketplace" across `src/`, done deliberately, with the result read end to end.

## Reviews and ratings

The ratings are the marketplace's. We are not the marketplace.

- `AggregateRating` structured data is **removed**. Emitting a rating you did not
  collect risks a Google manual action, and asserting another platform's rating
  as your own is misrepresentation.
- The two verbatim reviews may stay **only** with the source named on screen:
  "From the marketplace listing for this product, fetched 2026-09-03."
- The three-star "No satisfaction" review stays. It is the most credible element
  on the page, and removing it while keeping the four-star one is cherry-picking.
- As real orders complete, collect your own reviews. Then this section becomes
  yours and the structured data can return.

## New copy this build needs

1. **Order confirmation** — see [04-order-flow.md](04-order-flow.md). The
   "nothing has been charged" line is the single most important sentence on the
   site.
2. **`/shipping`** — who dispatches, realistic range, what we do not control,
   what happens if it is late.
3. **`/refunds`** — window, condition, who pays return postage, how a manual UPI
   refund works and how long it takes.
4. **`/privacy`** — what is collected, why, how long it is kept, who sees it, how
   to have it deleted. Written to be read, not to be survived.
5. **`/terms`** — that an order request is not a contract until we confirm it,
   that pricing errors may be corrected, governing law.
6. **`/contact`** — a monitored email, a phone number, an address. Placeholders
   are not acceptable here; a store with no contact details is not a store.
7. **The manual payment explanation**, on `/product` near the order button:
   > **How payment works.** Place your order here and we will call you within one
   > working day to confirm it and share payment details. Nothing is charged on
   > this website.

   Saying this *before* the form, not only after, is what stops it feeling like a
   bait and switch.

## Microcopy rules

- Buttons say what happens: "Order now", not "Submit". "Place order request",
  not "Continue".
- Errors describe the fix: "Pincode must be 6 digits", not "Invalid input".
- Never "Oops!" or "Something went wrong". Say what went wrong and what to do.
- Numbers are numerals: "4 tiers", "28 eggs", "₹222".
- Currency always `₹` with tabular numerals, never "Rs." or "INR" in body copy.
