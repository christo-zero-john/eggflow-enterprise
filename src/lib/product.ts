/**
 * SINGLE SOURCE OF TRUTH for all product facts.
 *
 * Every number and claim rendered anywhere on the site comes from this file.
 * Rule for editing: if a value is not printed on the supplier listing or
 * measured by you in person, it does not go in here. No rounding up, no
 * invented review counts, no "up to".
 *
 * Source listing (fetched 2026-09-03):
 * https://www.meesho.com/s/p/bik9nv
 */

export type Verified = "listing" | "measured" | "unverified";

export const product = {
  name: "EggFlow 4-Tier Egg Rack",
  // The supplier's listing title, kept close to verbatim so a buyer can match
  // this page against the marketplace listing.
  listingTitle:
    "4 Tiers Egg Holder for Fridge, Automatic Scrolling Egg Rack Holder, Space-Saving Egg Dispenser, 30 Egg Storage for Fridge",
  tagline: "A tilted four-tier tray. Take the front egg, the next one rolls down.",

  price: { amount: 222, currency: "INR", display: "\u20B9222" },

  /**
   * NOTE: no strikethrough / "was" price anywhere on this site.
   * India's CCPA 2023 dark-pattern guidelines treat a reference price that was
   * never actually charged as a false-urgency violation. If you have a genuine
   * prior price, add it here together with the dates it was live.
   */
  compareAtPrice: null as null | { amount: number; display: string; validFrom: string },

  colors: [
    { id: "grey", label: "Grey", hex: "#8E959B", listingUrl: "https://www.meesho.com/s/p/bik9nv" },
    { id: "white", label: "White", hex: "#EDEFF0", listingUrl: "https://www.meesho.com/s/p/bik9nw" },
  ],

  capacity: {
    eggs: 28,
    verified: "listing" as Verified,
    note: "The supplier's spec sheet states 28. The description says 25\u201330 and the title says 30, because the real number depends on egg size. We publish the spec-sheet figure, which is the conservative one.",
  },

  tiers: 4,
  eggsPerTier: 7,

  /**
   * NOTE, unresolved. The supplier's photographs show a serpentine cascade:
   * four channels sloping in alternating directions, loaded from an open
   * trough along the top, with a single chute at the bottom right that one egg
   * presents itself in. The illustration and the copy on this page describe
   * four independent tiers instead, which is the earlier reading.
   *
   * This was reverted deliberately on request after the cascade drawing was
   * rejected. Before launch, either the drawing or this note has to change.
   */

  material: {
    value: "Plastic",
    verified: "listing" as Verified,
    note: "The supplier states 'Plastic' without naming a grade. We do not claim BPA-free, food-grade or PP certification, because no test report has been supplied. Get one before adding any such claim to this page.",
  },

  /**
   * The listing's SPEC FIELD says 10 x 10 x 10 cm, which is a placeholder: a
   * four-tier dispenser holding 28 eggs cannot be a 10 cm cube.
   *
   * The supplier's own listing PHOTOGRAPHS, however, are dimensioned drawings,
   * and print these figures directly on the product:
   *   30 cm / 11.8 in   across the top
   *   19.9 cm / 7.83 in high
   *   7 cm / 2.76 in    deep
   *   35.9 cm / 14.13 in along the sloped base
   *
   * These are supplier-published, not measured by us, and are marked as such.
   * Shelf fit is the most-asked question about this product, so publishing the
   * supplier's own figure with its provenance beats publishing nothing.
   * Measure a unit and switch `verified` to "measured".
   */
  dimensionsCm: {
    length: 30,
    width: 7,
    height: 19.9,
    baseLength: 35.9,
    verified: "listing" as Verified,
    note: "Printed on the supplier's dimensioned listing photographs. The 10 x 10 x 10 cm in the listing's spec field is a placeholder and is wrong. We have not measured a unit ourselves yet.",
  },
  weightG: null as null | number,

  packQuantity: "Pack of 1",
  assembly: "None. Single moulded piece.",
  footprintNote:
    "It stands upright and narrow rather than lying flat, which is the point: it takes 7 cm of shelf depth instead of the width a carton needs.",
  powered: false,
  countryOfOrigin: "India",
  genericName: "Egg tray",

  seller: { name: "USHA MALL 12", platform: "Meesho", rating: 4.0, ratingCount: 771 },

  /** Real marketplace ratings. Small numbers, shown as they are. */
  ratings: {
    average: 4.3,
    count: 28,
    reviewCount: 6,
    breakdown: [
      { stars: 5, label: "Excellent", count: 15 },
      { stars: 4, label: "Very good", count: 7 },
      { stars: 3, label: "Good", count: 6 },
      { stars: 2, label: "Average", count: 0 },
      { stars: 1, label: "Poor", count: 0 },
    ],
    source: "Meesho product listing",
    fetchedOn: "2026-09-03",
  },

  /**
   * Verbatim from the listing, including the three-star one.
   * Never add a testimonial that was not written by a real buyer.
   */
  reviews: [
    { author: "Meesho User", stars: 4, date: "2026-08-15", body: "Satisfied" },
    { author: "Usha Rani", stars: 3, date: "2026-08-18", body: "No satisfaction" },
  ],

  /**
   * Image slots.
   *
   * `src` is null until a real file exists at `public/images/product/<id>.webp`,
   * and a null slot renders a labelled placeholder at the right aspect ratio.
   * The layout is therefore final now, and adding a photograph is a one-word
   * change here rather than a layout change.
   *
   * The marketplace image URLs that used to live here have been removed. We do
   * not hold the rights to them, and a storefront should not hotlink another
   * company's photography.
   *
   * Every slot below, with the prompt to generate or the brief to shoot it, is
   * documented in docs/06-photography-brief.md.
   */
  images: [
    {
      id: "pdp-front",
      src: null as string | null,
      ratio: "1/1",
      alt: "The rack seen straight on, all four tiers loaded",
    },
    {
      id: "pdp-side-tilt",
      src: null as string | null,
      ratio: "1/1",
      alt: "The four tiers seen from the side, each sloping down toward the front",
    },
    {
      id: "pdp-front-slot",
      src: null as string | null,
      ratio: "1/1",
      alt: "The open front slot, with one egg resting at the low end of the channel",
    },
    {
      id: "context-in-fridge",
      src: null as string | null,
      ratio: "4/5",
      alt: "The rack on a refrigerator shelf, with the clearance above it visible",
    },
  ],

  /**
   * INTERIM. Ordering on this site is not built yet, so the only way to
   * actually buy the product today is the marketplace listing. The landing page
   * says that in those words rather than dressing it up as our own checkout.
   * Delete this once /order exists.
   */
  buyUrl: "https://www.meesho.com/s/p/bik9nv",

  /** Fulfilment terms belong to the marketplace, not to us. Attributed on-page. */
  fulfilment: {
    provider: "Meesho",
    cashOnDelivery: true,
    returnWindowDays: 7,
    note: "Delivery, payment and returns are handled by Meesho under Meesho's policies. We do not ship this product ourselves.",
  },
} as const;

/** Things the product does not do. On the page on purpose. */
export const notClaims = [
  "It has no motor and no electronics. “Automatic” in the marketplace title means gravity — the tiers are tilted, so eggs roll forward on their own.",
  "It is not insulated and does not keep eggs cooler. It organises them inside a fridge you already have.",
  "There is no lid. Eggs sit open on the rails.",
  "It is not designed to stack with a second unit.",
  "We have not tested it with duck or quail eggs.",
] as const;

export const mechanism = [
  {
    step: 1,
    title: "Load from the back",
    body: "Each of the four tiers takes about seven eggs. You load them at the raised rear end of the rail.",
  },
  {
    step: 2,
    title: "The tilt does the sorting",
    body: "Each rail sits at a slight downward angle, so eggs settle toward the open slot at the front and hold a single line instead of a heap.",
  },
  {
    step: 3,
    title: "Take one, the next comes forward",
    body: "Lift the front egg out through the open slot. The egg behind rolls into the empty position. Raised side walls on each groove stop eggs rolling off sideways.",
  },
] as const;

export const faqs = [
  {
    q: "Is it actually automatic? Does it need power?",
    a: "No power, no motor, no batteries. The marketplace title says \u201Cautomatic\u201D but the mechanism is gravity: each tier is tilted, so when you remove the front egg the next one rolls into its place. That is the whole mechanism, and it is why there is nothing on it that can break.",
  },
  {
    q: "How many eggs does it really hold?",
    a: "The supplier's spec sheet says 28 \u2014 four tiers of about seven. The description on the same listing says 25\u201330, because it depends on egg size. Large eggs sit wider on the rail and you will fit fewer. We publish 28 because it is the lower, more realistic figure.",
  },
  {
    q: "Will it fit my fridge shelf?",
    a: "We cannot answer this yet, and we would rather say so than guess. The dimensions printed on the marketplace listing are placeholder values (10 \u00D7 10 \u00D7 10 cm), which cannot be right for a four-tier rack. We are measuring a unit and will publish the real length, width and height here. Until then, treat shelf fit as unconfirmed.",
  },
  {
    q: "What plastic is it made from?",
    a: "The supplier states \u201CPlastic\u201D and nothing more specific. We are not going to call it BPA-free or food-grade on this page, because we have not been shown a test report. If that matters to you, it is worth waiting until we can publish one.",
  },
  {
    q: "Does it need assembly?",
    a: "No. It arrives as one moulded piece. There are no separate parts to lose or snap.",
  },
  {
    q: "How do I clean it?",
    a: "By hand, with warm water and dish soap, dried fully before you reload it. We do not recommend a dishwasher or water above roughly 60 \u00B0C, because no heat rating has been supplied for the plastic.",
  },
  {
    q: "Who am I actually buying from?",
    a: "The order is placed on Meesho and fulfilled by the seller listed there, USHA MALL 12. Payment, delivery and the 7-day return window are governed by Meesho's policies, not ours. The buy link on this site takes you to that listing.",
  },
  {
    q: "What if it arrives damaged?",
    a: "Raise the return on Meesho within 7 days of delivery, from the order in your Meesho account. Keep the packaging until you have checked the unit.",
  },
] as const;
