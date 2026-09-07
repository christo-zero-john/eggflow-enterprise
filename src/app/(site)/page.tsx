import { ProductHero } from "@/components/landing/ProductHero";
import { StorageSection } from "@/components/landing/StorageSection";
import { MechanismScroll } from "@/components/landing/MechanismScroll";
import { SizeFit } from "@/components/landing/SizeFit";
import { ProductGallery } from "@/components/landing/ProductGallery";
import { FaqSection } from "@/components/landing/FaqSection";
import { StickyBuyBar } from "@/components/landing/StickyBuyBar";
import { ViewportSection } from "@/components/landing/ViewportSection";
import { Cta, CtaRow } from "@/components/landing/Cta";
import { product } from "@/lib/product";

export default function LandingPage() {
  return (
    <>
      <ProductHero />
      <StorageSection />
      <MechanismScroll />
      <SizeFit />

      <ViewportSection id="colours" labelledBy="colours-heading">
        <ProductGallery />
      </ViewportSection>

      <FaqSection />

      <section className="closing-section bg-ink text-shell" id="buy" aria-labelledby="buy-heading">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shell/55">{product.name}</p>
          <p className="tnum mt-5 font-display text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-none">{product.price.display}</p>
          <p className="mt-2 text-shell/60">{product.packQuantity}, delivered</p>
          <h2 id="buy-heading" className="mt-7 font-display text-h2 font-bold">Ordering opens shortly.</h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-shell/70">The order flow is being finalised. The product details above are ready to review while purchasing remains unavailable.</p>
          <div className="mt-8"><CtaRow centered><Cta href="#buy">Buy now &mdash; {product.price.display}</Cta><Cta href="#questions" variant="onInk">Review questions</Cta></CtaRow></div>
        </div>
      </section>

      <StickyBuyBar />
    </>
  );
}
