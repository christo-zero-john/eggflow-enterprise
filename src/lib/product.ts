/**
 * SINGLE SOURCE OF TRUTH for all product facts.
 *
 * Every number and claim rendered anywhere on the site comes from this file.
 * Rule for editing: if a value is not printed on the supplier's own material or
 * measured by you in person, it does not go in here. No rounding up, no
 * invented review counts, no "up to".
 *
 * HARD RULE: no marketplace is ever named on this site. Not in copy, not as a
 * link, not as a ratings source. This is our own storefront.
 *
 * Facts below come from the supplier's dimensioned product flyers.
 */

export type Verified = "supplier" | "measured" | "unverified";

export const product = {
  name: "EggFlow Rolling Egg Shelf",
  tagline: "A tilted four-tier shelf. Take one, the next rolls down.",

  price: { amount: 222, currency: "INR", display: "₹222" },

  /**
   * No strikethrough / "was" price anywhere on this site.
   * India's CCPA 2023 dark-pattern guidelines treat a reference price that was
   * never actually charged as a false-urgency violation. If you have a genuine
   * prior price, add it here together with the dates it was live.
   */
  compareAtPrice: null as null | { amount: number; display: string; validFrom: string },

  colors: [
    { id: "white", label: "White", hex: "#F2F1EE" },
    { id: "charcoal", label: "Charcoal", hex: "#5A6470" },
  ],

  capacity: {
    eggs: 28,
    verified: "supplier" as Verified,
    note: "Four tiers of roughly seven. The exact number depends on egg size — large eggs sit wider and you will fit fewer.",
  },

  tiers: 4,
  eggsPerTier: 7,

  /**
   * Printed on the supplier's dimensioned flyers, in both centimetres and
   * inches. These are the numbers that answer the single most common question
   * about this product, so they lead the size section.
   */
  dimensionsCm: {
    length: 30,
    lengthIn: 11.81,
    height: 19.8,
    heightIn: 7.83,
    depth: 7,
    depthIn: 2.75,
    baseLength: 35.9,
    baseLengthIn: 14.13,
    verified: "supplier" as Verified,
    note: "Printed on the supplier's dimensioned product drawings. We have not put a tape measure on a unit ourselves yet.",
  },
  weightG: null as null | number,

  material: {
    value: "Plastic",
    verified: "supplier" as Verified,
    /**
     * The supplier's flyers claim "BPA-Free — safe for food contact".
     * That is a marketing claim, not a test report. It is attributed to the
     * supplier everywhere it appears and never stated as our own finding.
     */
    bpaFreeClaimedBySupplier: true,
    note: "The supplier describes it as high-quality, BPA-free plastic that is safe for food contact. We are repeating their claim, not certifying it — we have not been shown a test report.",
  },

  packQuantity: "Pack of 1",
  assembly: "None. Arrives ready to use.",
  powered: false,
  countryOfOrigin: "India",
  genericName: "Egg tray",

  /**
   * Image slots. `src` is null until a real file exists at
   * `public/images/product/<id>.webp`, and a null slot renders a labelled
   * placeholder at the right aspect ratio, so the layout is final now.
   * See docs/06-photography-brief.md.
   */
  images: [
    { id: "hero-white", src: null as string | null, ratio: "1/1", alt: "The shelf in white, loaded with eggs" },
    { id: "in-fridge", src: null as string | null, ratio: "4/5", alt: "The shelf standing on a refrigerator shelf, with the clearance above it visible" },
    { id: "chute-detail", src: null as string | null, ratio: "1/1", alt: "Close view of the curved chute where the next egg arrives" },
    { id: "colour-pair", src: null as string | null, ratio: "3/2", alt: "The white and charcoal versions side by side" },
  ],
} as const;

/**
 * The four claims the supplier leads with. Kept in their order of usefulness to
 * a buyer rather than the order on the flyer.
 */
export const benefits = [
  {
    id: "space",
    title: "Takes 7 cm of shelf",
    body: "It stands upright and narrow instead of lying flat, so it uses a strip of shelf rather than a whole one.",
  },
  {
    id: "rolling",
    title: "The next egg is always there",
    body: "Take one and another rolls into its place on its own. No motor, no batteries, nothing to switch on.",
  },
  {
    id: "durable",
    title: "Nothing on it can wear out",
    body: "One moulded piece of plastic with no hinges, no springs and no moving parts to break.",
  },
  {
    id: "bpa",
    title: "BPA-free, says the supplier",
    body: "The supplier states the plastic is BPA-free and safe for food contact. We are repeating their claim, not certifying it.",
  },
] as const;

/** Where it earns its place. Straight from the flyer's own four use cases. */
export const useCases = [
  { id: "fridge", label: "Fridge storage" },
  { id: "kitchen", label: "Kitchen counter" },
  { id: "organised", label: "Organised and clean" },
  { id: "fresh", label: "Oldest egg first" },
] as const;

/**
 * The comparison the product actually wins on. Both columns must be fair:
 * an unfair comparison is the fastest way to lose someone who owns the thing
 * in the right-hand column.
 */
export const comparison = {
  ours: {
    title: "This shelf",
    points: [
      "One strip of shelf, 7 cm deep",
      "Take an egg without moving anything",
      "The next egg presents itself",
      "Rinse it and put it back",
    ],
  },
  theirs: {
    title: "Cartons and flat trays",
    points: [
      "Spread across the shelf, or stacked so the bottom one is trapped",
      "Lift the stack, open the lid, close it again",
      "You pick whichever egg is easiest to reach",
      "Cardboard absorbs spills and gets thrown away",
    ],
  },
} as const;

/** Things the product does not do. On the page on purpose. */
export const notClaims = [
  "It has no motor and no electronics. “Automatic” means gravity — the tiers are tilted, so eggs roll on their own.",
  "It is not insulated and does not keep eggs cooler. It organises them inside a fridge you already have.",
  "There is no lid. Eggs sit open on the rails.",
  "It is not designed to stack with a second unit.",
  "We have not tested it with duck or quail eggs.",
] as const;

export const mechanism = [
  {
    step: 1,
    title: "Load it up",
    body: "It takes about 28 eggs across four tiers. You load them at the raised end, and they settle into a single line instead of a heap.",
  },
  {
    step: 2,
    title: "The tilt does the sorting",
    body: "Every tier sits at a slight downward angle. Gravity keeps the eggs in order and keeps the next one at the front, with raised side walls so nothing rolls off sideways.",
  },
  {
    step: 3,
    title: "Take one, the next arrives",
    body: "Lift an egg out and another rolls into the space it left. That is the whole mechanism, and it is why there is nothing on it that can break.",
  },
] as const;

export const faqs = [
  {
    q: "Is it actually automatic? Does it need power?",
    a: "No power, no motor, no batteries. “Automatic” means gravity: the tiers are tilted, so when you take an egg the next one rolls into its place. That is the whole mechanism, and it is why there is nothing on it that can break.",
  },
  {
    q: "Will it fit my fridge shelf?",
    a: "Measure 36 cm of shelf depth and 20 cm of clearance above it and you are safe. The full figures are 30 cm wide, 19.8 cm high and 7 cm deep, with a sloped base 35.9 cm long. Those are the supplier's own dimensioned drawings; we have not measured a unit in person yet, and we will say so until we have.",
  },
  {
    q: "How many eggs does it really hold?",
    a: "About 28 — four tiers of roughly seven. Large eggs sit wider on the rail and you will fit fewer, so treat 28 as the comfortable figure rather than a maximum.",
  },
  {
    q: "What plastic is it made from?",
    a: "The supplier describes it as high-quality BPA-free plastic, safe for food contact. We are repeating their claim rather than certifying it, because we have not been shown a test report. If that matters to you, it is worth waiting until we can publish one.",
  },
  {
    q: "Does it need assembly?",
    a: "No. It arrives ready to use. There are no separate parts to lose or snap.",
  },
  {
    q: "How do I clean it?",
    a: "By hand, with warm water and dish soap, dried fully before you reload it. We do not recommend a dishwasher or water above roughly 60 °C, because no heat rating has been supplied for the plastic.",
  },
  {
    q: "What colours does it come in?",
    a: "Two: white and charcoal. They are the same product; only the colour differs.",
  },
] as const;
