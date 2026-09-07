"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { product } from "@/lib/product";
import { Cta, CtaRow } from "./Cta";

const views = [
  { id: "white", label: "White", src: "/images/gallery/white.png", alt: "White four-tier rolling egg shelf filled with brown eggs", fit: "contain" },
  { id: "charcoal", label: "Charcoal", src: "/images/gallery/charcoal.png", alt: "Charcoal four-tier rolling egg shelf filled with brown eggs", fit: "contain" },
  { id: "detail", label: "Outlet", src: "/images/detail.png", alt: "Close view of the curved egg outlet", fit: "cover" },
  { id: "fridge", label: "In fridge", src: "/images/lifestyle/fridge.png", alt: "White egg shelf in a refrigerator", fit: "cover" },
] as const;

export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const view = views[selected];

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
    <div className="grid items-center gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">Two colours</p>
        <h2 id="colours-heading" className="mt-4 font-display text-h2 font-bold">Choose your finish.</h2>
        <p className="mt-5 max-w-[40ch] text-lead text-ink-soft">White or charcoal. The same compact design.</p>

        <div className="mt-7 flex gap-3" aria-label="Choose product colour">
          {product.colors.map((colour, index) => (
            <button
              key={colour.id}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-full border px-4 py-2 font-semibold transition-colors ${selected === index ? "border-ink bg-shell" : "border-line-strong hover:border-ink"}`}
            >
              <span className="h-7 w-7 rounded-full border border-line-strong" style={{ backgroundColor: colour.hex }} aria-hidden />
              {colour.label}
            </button>
          ))}
        </div>

        <p className="mt-7 text-sm text-ink-soft">{product.packQuantity}. Eggs pictured are not included.</p>
        <div className="mt-7"><CtaRow><Cta href="#buy">Buy now &mdash; {product.price.display}</Cta></CtaRow></div>
      </div>

      <div className="min-w-0">
        {/* Main view, with the arrows sitting on it. */}
        <figure className="gallery-main group relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[20px] bg-shell">
          <Image
            key={view.src}
            src={view.src}
            alt={view.alt}
            fill
            sizes="(min-width: 1024px) 520px, 92vw"
            className={view.fit === "contain" ? "object-contain" : "object-cover"}
          />

          <Arrow direction="prev" onClick={() => step(-1)} />
          <Arrow direction="next" onClick={() => step(1)} />

          <figcaption className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-shell">
            <span className="tnum">{selected + 1}</span> / {views.length} &middot; {view.label}
          </figcaption>
        </figure>

        {/* Thumbnails run under the main view and scroll sideways when they
            do not fit, rather than shrinking to unreadable squares. */}
        <div
          ref={stripRef}
          className="gallery-strip mx-auto mt-4 flex max-w-[520px] gap-3 overflow-x-auto pb-1"
          role="group"
          aria-label="Choose product view"
        >
          {views.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-label={`Show ${item.label} view`}
              onClick={() => setSelected(index)}
              className={`relative aspect-square w-[88px] shrink-0 cursor-pointer overflow-hidden rounded-[12px] border-2 bg-shell transition-[border-color,opacity,transform] duration-150 hover:-translate-y-px sm:w-[104px] ${
                selected === index ? "border-yolk opacity-100" : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <Image src={item.src} alt="" fill sizes="104px" className={item.fit === "contain" ? "object-contain" : "object-cover"} />
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
