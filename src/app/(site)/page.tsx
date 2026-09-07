import { RackDemo } from "@/components/landing/RackDemo";
import { MechanismScroll } from "@/components/landing/MechanismScroll";
import { BenefitStrip } from "@/components/landing/BenefitStrip";
import { Comparison } from "@/components/landing/Comparison";
import { SizeFit } from "@/components/landing/SizeFit";
import { StickyBuyBar } from "@/components/landing/StickyBuyBar";
import { PhotoSlot } from "@/components/landing/PhotoSlot";
import { Cta, CtaRow } from "@/components/landing/Cta";
import { product, notClaims, faqs, useCases } from "@/lib/product";

export default function LandingPage() {
  return (
    <>
      {/* ================================================================ */}
      {/* Hero. The demo is the hero — the only question anyone has about  */}
      {/* this object is whether the next egg really comes forward, and    */}
      {/* the fastest way to answer it is to let them try.                 */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        {/* On a phone the shelf sits directly under the headline: the product
            is the argument, and it should not be three scrolls down. On a wide
            screen it moves into its own column beside the copy. */}
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.05fr_1fr]">
          <h1 className="font-display text-display font-extrabold lg:col-start-1 lg:row-start-1 lg:self-end">
            Take the front egg.
            <br />
            The next one rolls down.
          </h1>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <RackDemo />
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className="max-w-[46ch] text-lead text-ink-soft">
              Four tilted tiers, about{" "}
              <span className="tnum font-medium text-ink">{product.capacity.eggs}</span> eggs, and{" "}
              <span className="tnum font-medium text-ink">{product.dimensionsCm.depth} cm</span> of
              shelf. No motor, nothing to plug in, nothing to assemble. The slope is the whole
              mechanism.
            </p>

            <div className="mt-9">
              <CtaRow id="hero-cta">
                <Cta href="#buy">Buy now &mdash; {product.price.display}</Cta>
                <Cta href="#how" variant="secondary">
                  See how it works
                </Cta>
              </CtaRow>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <dt className="text-[0.85rem] text-ink-faint">Holds</dt>
                <dd className="tnum font-display text-[1.4rem] font-bold">
                  {product.capacity.eggs} eggs
                </dd>
              </div>
              <div>
                <dt className="text-[0.85rem] text-ink-faint">Shelf depth</dt>
                <dd className="tnum font-display text-[1.4rem] font-bold">
                  {product.dimensionsCm.depth} cm
                </dd>
              </div>
              <div>
                <dt className="text-[0.85rem] text-ink-faint">Assembly</dt>
                <dd className="font-display text-[1.4rem] font-bold">None</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <BenefitStrip />

      <Comparison />

      <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
        <CtaRow>
          <Cta href="#buy">Buy now</Cta>
          <Cta href="#size" variant="secondary">
            Check it fits my fridge
          </Cta>
        </CtaRow>
      </div>

      {/* ================================================================ */}
      <div id="how">
        <MechanismScroll />
      </div>

      <SizeFit />

      {/* ================================================================ */}
      {/* Colours and where it goes. Both are decisions a buyer makes right */}
      {/* before ordering, so they sit close to the final call to action.   */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-bold">Two colours, one product</h2>
            <p className="mt-4 max-w-[46ch] text-ink-soft">
              White disappears into a fridge interior. Charcoal does not. Nothing else about them
              differs.
            </p>

            <ul className="mt-8 flex flex-wrap gap-4">
              {product.colors.map((colour) => (
                <li
                  key={colour.id}
                  className="flex items-center gap-3 rounded-full border border-line bg-shell py-2 pl-2 pr-5"
                >
                  <span
                    aria-hidden
                    className="block h-9 w-9 rounded-full border border-line-strong"
                    style={{ background: colour.hex }}
                  />
                  <span className="font-medium">{colour.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <CtaRow>
                <Cta href="#buy">Buy now</Cta>
                <Cta href="#specs" variant="secondary">
                  Full specifications
                </Cta>
              </CtaRow>
            </div>

            <h3 className="mt-12 font-display text-h3 font-bold">Where it earns its place</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {useCases.map((use) => (
                <li
                  key={use.id}
                  className="rounded-full bg-yolk-wash px-4 py-1.5 text-[0.9rem] font-medium text-ink"
                >
                  {use.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {product.images.slice(0, 3).map((slot, i) => (
              <div key={slot.id} className={i === 0 ? "col-span-2" : ""}>
                <PhotoSlot slot={slot} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* The honesty block. It is here, before the specs and the buy       */}
      {/* button, because volunteering the limitations is the cheapest      */}
      {/* credibility available to an unknown brand at this price.          */}
      {/* ================================================================ */}
      <section className="border-y border-line bg-shell">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <h2 className="font-display text-h2 font-bold">What it does not do</h2>
              <p className="mt-4 max-w-[42ch] text-ink-soft">
                Everything a product page usually leaves out. If any of these matter to you, it is
                better that you know now than after it arrives.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {notClaims.map((claim) => (
                <li
                  key={claim}
                  className="rounded-[14px] border border-line bg-carton p-5 text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  {claim}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24" id="specs">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-bold">Specifications</h2>
            <p className="mt-4 max-w-[54ch] text-ink-soft">
              Every figure here comes from the supplier&rsquo;s own dimensioned drawings. Where we
              have not verified something ourselves, the row says so rather than sounding
              confident.
            </p>

            <table className="mt-8 w-full text-[0.95rem]">
              <tbody>
                <SpecRow label="Capacity" value={`about ${product.capacity.eggs} eggs`} />
                <SpecRow label="Tiers" value={String(product.tiers)} />
                <SpecRow label="Width" value={`${product.dimensionsCm.length} cm`} />
                <SpecRow label="Height" value={`${product.dimensionsCm.height} cm`} />
                <SpecRow label="Depth" value={`${product.dimensionsCm.depth} cm`} />
                <SpecRow label="Base length" value={`${product.dimensionsCm.baseLength} cm`} />
                <SpecRow label="Material" value={product.material.value} />
                <SpecRow label="Pack quantity" value={product.packQuantity} />
                <SpecRow label="Assembly" value={product.assembly} />
                <SpecRow label="Power" value="Not required" />
                <SpecRow label="Country of origin" value={product.countryOfOrigin} />
                <SpecRow label="Weight" value={product.weightG ? `${product.weightG} g` : null} last />
              </tbody>
            </table>

            <p className="mt-6 max-w-[58ch] text-[0.85rem] leading-relaxed text-ink-faint">
              {product.material.note}
            </p>

            <div className="mt-9">
              <CtaRow>
                <Cta href="#buy">Buy now</Cta>
                <Cta href="#questions" variant="secondary">
                  Read the questions
                </Cta>
              </CtaRow>
            </div>
          </div>

          <div className="self-start lg:pt-4">
            <PhotoSlot slot={product.images[3]} />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24" id="questions">
        <h2 className="font-display text-h2 font-bold">Questions worth asking first</h2>
        <div className="mt-8">
          {faqs.map((faq) => (
            <details key={faq.q} name="faq" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] font-medium marker:hidden">
                {faq.q}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1v14M1 8h14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-ink-soft">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <CtaRow>
            <Cta href="#buy">Buy now &mdash; {product.price.display}</Cta>
          </CtaRow>
        </div>
      </section>

      {/* ================================================================ */}
      {/* The close. Ordering on this site is not built yet, and the page   */}
      {/* says exactly that rather than staging a checkout that goes        */}
      {/* nowhere. Replace this block with the order form when it exists.   */}
      {/* ================================================================ */}
      <section className="bg-ink py-20 text-shell sm:py-24" id="buy">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="tnum font-display text-[4rem] font-extrabold leading-none">
            {product.price.display}
          </p>
          <p className="mt-2 text-shell/60">{product.packQuantity}, delivered</p>

          <h2 className="mt-7 font-display text-h2 font-bold">Ordering opens shortly.</h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-shell/70">
            We are finishing the order page. Leave us a message and we will tell you the moment it
            is live &mdash; or reserve one now and we will confirm it with you directly.
          </p>

          <div className="mt-9">
            <CtaRow centered>
              <Cta href="#buy">Buy now &mdash; {product.price.display}</Cta>
              <Cta href="#questions" variant="onInk">
                Know more
              </Cta>
            </CtaRow>
          </div>

          <p className="mt-8 text-[0.85rem] text-shell/50">
            Nothing on this page charges you, and there is no checkout behind it yet.
          </p>
        </div>
      </section>

      <StickyBuyBar />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function SpecRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string | null;
  last?: boolean;
}) {
  return (
    <tr className={last ? "" : "border-b border-line"}>
      <th scope="row" className="w-[45%] py-3 text-left font-normal text-ink-soft">
        {label}
      </th>
      <td className="tnum py-3">
        {value ?? (
          <span className="rounded-full bg-yolk-wash px-2.5 py-1 text-[0.8rem] font-medium text-ink">
            not measured yet
          </span>
        )}
      </td>
    </tr>
  );
}
