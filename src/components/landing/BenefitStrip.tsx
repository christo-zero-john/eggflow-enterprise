import { benefits } from "@/lib/product";

/**
 * The four things the supplier leads with, restated as what they mean for the
 * person buying. Icons are inline SVG — a whole icon library for four glyphs
 * would be more bytes than the rest of the page.
 */
export function BenefitStrip() {
  return (
    <section className="border-y border-line bg-shell" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <h2 id="benefits-heading" className="sr-only">
          Why this shelf
        </h2>
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <li key={benefit.id}>
              <span className="text-ink" aria-hidden>
                <Icon id={benefit.id} />
              </span>
              <h3 className="mt-4 font-display text-[1.1rem] font-bold">{benefit.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Icon({ id }: { id: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "space") {
    // A narrow footprint between two shelves.
    return (
      <svg {...common}>
        <path d="M3 4h18M3 20h18" />
        <rect x="9" y="7" width="6" height="10" rx="1.5" />
        <path d="M6 12h1.5M16.5 12H18" />
      </svg>
    );
  }
  if (id === "rolling") {
    // An egg following a sloped path.
    return (
      <svg {...common}>
        <path d="M3 15h13" />
        <path d="M3 15c0-2 1.5-3.5 4-3.5" opacity="0.45" />
        <ellipse cx="17.5" cy="12" rx="3.2" ry="4" />
        <path d="M4 19h10" opacity="0.45" />
      </svg>
    );
  }
  if (id === "durable") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v6c0 4-3 7.2-7 9-4-1.8-7-5-7-9V6z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </svg>
    );
  }
  // bpa — a leaf.
  return (
    <svg {...common}>
      <path d="M20 4c0 8-4.5 12.5-11 12.5H5.5C5.5 9 11 4 20 4z" />
      <path d="M4 20c2-4.5 5-7 9-8.5" />
    </svg>
  );
}
