"use client";

import Image from "next/image";
import { useState } from "react";
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
  const view = views[selected];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">Two colours</p>
        <h2 id="colours-heading" className="mt-4 font-display text-h2 font-bold">Choose your finish.</h2>
        <p className="mt-5 max-w-[40ch] text-lead text-ink-soft">White or charcoal. The same compact design.</p>

        <div className="mt-7 flex gap-3" aria-label="Choose product colour">
          {product.colors.map((colour, index) => (
            <button key={colour.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-full border px-4 py-2 font-semibold ${selected === index ? "border-ink bg-shell" : "border-line-strong"}`}>
              <span className="h-7 w-7 rounded-full border border-line-strong" style={{ backgroundColor: colour.hex }} aria-hidden />
              {colour.label}
            </button>
          ))}
        </div>

        <p className="mt-7 text-sm text-ink-soft">{product.packQuantity}. Eggs pictured are not included.</p>
        <div className="mt-7"><CtaRow><Cta href="#buy">Buy now &mdash; {product.price.display}</Cta></CtaRow></div>
      </div>

      {/* Main image and thumbnails sit side by side: the thumbnails run down
          the right edge so the main image can be as large as the column allows
          instead of losing height to a strip underneath it. */}
      <div className="min-w-0">
        <div className="mx-auto flex w-full max-w-[660px] items-start gap-4">
          <figure className="gallery-main relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[20px] bg-shell">
            <Image
              key={view.src}
              src={view.src}
              alt={view.alt}
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className={view.fit === "contain" ? "object-contain" : "object-cover"}
            />
          </figure>

          <div
            className="flex w-[92px] shrink-0 flex-col gap-3 xl:w-[108px]"
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
                className={`relative aspect-square w-full cursor-pointer overflow-hidden rounded-[12px] border-2 bg-shell transition-[border-color,opacity,transform] duration-150 hover:-translate-y-px ${
                  selected === index
                    ? "border-yolk opacity-100"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="108px"
                  className={item.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
