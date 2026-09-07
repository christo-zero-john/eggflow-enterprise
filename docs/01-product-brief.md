# Product brief

## What we sell

A four-tier gravity-fed egg rack for a refrigerator. One moulded piece of
plastic, four tilted channels, roughly seven eggs per channel. You take the
front egg, the next one rolls down into its place. No motor, no power, no
assembly, no lid.

Price: ₹222. Two colours: grey and off-white. Pack of 1.

## What changed on 2026-09-04

The site was a **referral page** that sent buyers to a marketplace listing. It is now
a **store**. We take the order; a supplier drop-ships the unit.

Three things follow from that, and they are not optional:

1. **We are the seller of record.** Delivery questions, damage, and refunds come
   to us, not to the marketplace. Every line of copy that says otherwise is wrong now.
2. **The marketplace ratings are not ours.** The 4.3 from 28 ratings belongs to a
   marketplace listing. It cannot be presented as this store's rating, and the
   `AggregateRating` structured data comes out.
3. **We do not control the courier.** The supplier ships. Our delivery copy
   gives a range and says who ships it, rather than promising a date.

## Who buys it

Someone who keeps eggs in the fridge, is mildly annoyed by the carton, and is
spending ₹222 — a low-consideration purchase made on a phone, probably in under
two minutes, probably while already doing something else.

Design consequences: the page must load fast, the mechanism must be obvious
without reading, the order form must be short, and the size question must be
answered before it is asked. Shelf fit is the number-one return reason for
fridge organisers and currently the number-one unanswered question on the site.

## The positioning

The marketplace listing calls it "automatic scrolling". There is no motor. We
call it gravity-fed and say so plainly, because:

- It is true.
- "Nothing can break because there is nothing moving" is a stronger selling
  point than a word that sets an expectation the product cannot meet.
- A buyer expecting a motorised dispenser for ₹222 is a return waiting to
  happen.

## Honesty as the product strategy

This is not a moral position, it is a commercial one. At ₹222 with an unknown
brand, the only thing that converts is credibility, and the only cheap source of
credibility is being visibly willing to say unflattering things.

Four commitments, carried over from the previous build and kept:

- **No invented numbers.** If it is not on the supplier listing or measured by
  you, it does not appear. Unverified values render as "not verified yet"
  instead of a plausible guess.
- **No fake urgency.** No countdown timers, no stock counters, no "N people
  viewing", no struck-through price that was never charged. Several of these are
  explicitly cited as dark patterns in India's CCPA 2023 guidelines.
- **Unflattering reviews stay.** The three-star "No satisfaction" review is the
  most credible thing on the page.
- **A "what it does not do" section**, on the page, on purpose.

See [07-content-and-copy.md](07-content-and-copy.md) for the enforceable version
of these as a claims register.

## Known gaps

| Gap | Effect | Fix |
|---|---|---|
| Dimensions and weight unmeasured | Cannot answer shelf fit; the listing's 10×10×10 cm and 0.3 g are placeholder junk | Measure a unit, fill `dimensionsCm` and `weightG` |
| No material test report | Cannot say BPA-free or food-grade | Request from supplier |
| No owned photography | Photo-led design running on placeholders | [06-photography-brief.md](06-photography-brief.md) |
| No confirmed dispatch window | Shipping copy stays a range | Confirm with supplier |
