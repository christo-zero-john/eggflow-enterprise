export const site = {
  name: "EggFlow",
  description:
    "A four-tier rolling egg shelf for the fridge. Take one, the next rolls down. No motor, no assembly, 7 cm of shelf.",
  // TODO before launch: replace with your production origin.
  url: "https://eggflow.example",

  /**
   * TODO before launch. A storefront with no reachable contact details is
   * rejected by every ad platform and payment gateway, and it is the first
   * thing a cautious buyer looks for.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
  },

  /** In-page sections. This is a single page; these are anchors, not routes. */
  nav: [
    { href: "#how", label: "How it works" },
    { href: "#size", label: "Will it fit" },
    { href: "#specs", label: "Specifications" },
    { href: "#questions", label: "Questions" },
  ],
} as const;
