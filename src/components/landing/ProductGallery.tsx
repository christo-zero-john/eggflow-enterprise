"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { product } from "@/lib/product";
import { Cta, CtaRow } from "./Cta";

const views = [
  { id: "studio", label: "Studio", alt: "four-tier rolling egg shelf filled with brown eggs" },
  { id: "detail", label: "Outlet", alt: "egg shelf dispensing chute close-up" },
  { id: "fridge", label: "In fridge", alt: "egg shelf inside a refrigerator" },
  { id: "kitchen", label: "Kitchen", alt: "egg shelf on a kitchen counter" },
  { id: "loading", label: "Loading", alt: "egg shelf with a hand loading an egg into the top" },
  { id: "empty", label: "Empty", alt: "empty egg shelf showing its open tiers" },
  { id: "hero", label: "Wide view", alt: "egg shelf on a cream stone surface" },
] as const;

export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const [colour, setColour] = useState<(typeof product.colors)[number]>(product.colors[0]);
  const stripRef = useRef<HTMLDivElement>(null);
  const view = views[selected];
  const imageSrc = (id: string) => `/images/product/${colour.id}/${id}.png`;

  /** Wraps at both ends, so the arrows never dead-end. */
  function step(delta: number) {
    const next = (selected + delta + views.length) % views.length;
    setSelected(next);
    // Keep the matching thumbnail in view when the strip is scrolled.
    stripRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }

  return (
    <div className="product-gallery grid items-center gap-10">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">Two colours</p>
        <h2 id="colours-heading" className="mt-4 font-display text-h2 font-bold">Choose your finish.</h2>
        <p className="mt-5 max-w-[40ch] text-lead text-ink-soft">White or charcoal. The same compact design.</p>

        <div className="mt-7 flex gap-3" aria-label="Choose product colour">
          {product.colors.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={colour.id === option.id}
              onClick={() => setColour(option)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-full border px-4 py-2 font-semibold transition-colors ${colour.id === option.id ? "border-ink bg-shell" : "border-line-strong hover:border-ink"}`}
            >
              <span className="h-7 w-7 rounded-full border border-line-strong" style={{ backgroundColor: option.hex }} aria-hidden />
              {option.label}
            </button>
          ))}
        </div>

        <p className="mt-7 text-sm text-ink-soft">{product.packQuantity}. Eggs pictured are not included.</p>
        <div className="mt-7"><CtaRow><Cta href="#buy">Buy now &mdash; {product.price.display}</Cta></CtaRow></div>
      </div>

      <div className="gallery-media min-w-0">
        {/* Main view, with the arrows sitting on it. */}
        <figure className="gallery-main group relative aspect-square w-full overflow-hidden rounded-[20px] bg-shell">
          <Image
            key={imageSrc(view.id)}
            src={imageSrc(view.id)}
            alt={`${colour.label} ${view.alt}`}
            fill
            sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, 92vw"
            className="object-contain"
          />

          <Arrow direction="prev" onClick={() => step(-1)} />
          <Arrow direction="next" onClick={() => step(1)} />

          <figcaption aria-live="polite" aria-atomic="true" className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-shell">
            <span className="tnum">{selected + 1}</span> / {views.length} &middot; {colour.label} &middot; {view.label}
          </figcaption>
        </figure>

        {/* Desktop shares one height between the main image and seven rows. */}
        <div
          ref={stripRef}
          className="gallery-strip"
          role="group"
          aria-label={`Choose ${colour.label.toLowerCase()} product view`}
        >
          {views.map((item, index) => (
            <button
              key={`${colour.id}-${item.id}`}
              type="button"
              aria-pressed={selected === index}
              aria-label={`Show ${colour.label.toLowerCase()} ${item.label.toLowerCase()} view`}
              onClick={() => setSelected(index)}
              className={`gallery-thumb relative cursor-pointer overflow-hidden rounded-[10px] border-2 bg-shell transition-[border-color,opacity] duration-150 ${
                selected === index ? "border-yolk opacity-100" : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <Image src={imageSrc(item.id)} alt="" fill sizes="(min-width: 1024px) 84px, 72px" className="object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous image" : "Next image"}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-carton/90 text-ink shadow-[0_2px_10px_-2px_rgba(60,45,25,0.35)] backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-carton active:scale-95 ${
        isPrev ? "left-3" : "right-3"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
