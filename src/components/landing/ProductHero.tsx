import Image from "next/image";
import { product } from "@/lib/product";
import { Cta, CtaRow } from "./Cta";
import { ViewportSection } from "./ViewportSection";

export function ProductHero() {
  return (
    <ViewportSection className="overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {product.name}
          </p>
          <h1 className="font-display text-display font-extrabold">Your next egg, within reach.</h1>
          <p className="mt-6 max-w-[44ch] text-lead text-ink-soft">
            Keep eggs together in a compact upright holder, with a curved tray that keeps the next
            one easy to reach.
          </p>

          <div className="mt-8" id="hero-cta">
            <CtaRow>
              <Cta href="#buy">Buy now &mdash; {product.price.display}</Cta>
              <Cta href="#how" variant="secondary">See how it works</Cta>
            </CtaRow>
          </div>

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-5 border-t border-line pt-5">
            <HeroFact label="Design" value="Four tiers" />
            <HeroFact label="Colours" value="Two finishes" />
            <HeroFact label="Power" value="Not needed" />
          </dl>
        </div>

        <figure className="hero-product-frame relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[20px] bg-shell">
          <Image
            src="/images/gallery/white.png"
            alt="White four-tier rolling egg shelf filled with brown eggs"
            fill
            priority
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 90vw"
            className="object-contain"
          />
        </figure>
      </div>
    </ViewportSection>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold">{value}</dd>
    </div>
  );
}
