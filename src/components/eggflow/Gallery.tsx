"use client";

import Image from "next/image";
import { useState } from "react";
import { product } from "@/lib/product";

export function Gallery() {
  const [active, setActive] = useState(0);
  // Only slots that actually have a photograph. Every slot is null today, so
  // this page renders the honest note below and no gallery at all.
  const shots = product.images.filter(
    (i): i is (typeof product.images)[number] & { src: string } => i.src !== null,
  );
  const current = shots[active];

  if (!current) {
    return (
      <p className="ef-note">
        Photographs of this product are being shot. We removed the marketplace seller&rsquo;s
        images because we do not hold the rights to them.
      </p>
    );
  }

  return (
    <div>
      <div className="ef-gallery__stage">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 62rem) 46vw, 92vw"
          priority={active === 0}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="ef-gallery__thumbs" role="group" aria-label="Product images">
        {shots.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className="ef-gallery__thumb"
            aria-current={i === active}
            aria-label={image.alt}
            onClick={() => setActive(i)}
          >
            <Image src={image.src} alt="" fill sizes="72px" style={{ objectFit: "contain" }} />
          </button>
        ))}
      </div>

      <p className="ef-micro" style={{ marginTop: "0.75rem" }}>
        Our own photographs. Not retouched, not staged.
      </p>
    </div>
  );
}
