import { RackDemo } from "@/components/landing/RackDemo";
import { MechanismScroll } from "@/components/landing/MechanismScroll";
import { PhotoSlot } from "@/components/landing/PhotoSlot";
import { product, notClaims, faqs } from "@/lib/product";

export default function LandingPage() {
  return (
    <>
      {/* ================================================================ */}
      {/* Hero. The demo is the hero — the only question anyone has about  */}
      {/* this object is whether the next egg really comes forward, and    */}
      {/* the fastest way to answer it is to let them try.                 */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        {/* On a phone the rack sits directly under the headline: the product is
            the argument, and it should not be three scrolls down. On a wide
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
              Four tilted tiers, one moulded piece of plastic, about{" "}
              <span className="tnum font-medium text-ink">{product.capacity.eggs}</span> eggs. No
              motor, nothing to plug in, nothing to assemble. The slope is the whole mechanism.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#buy"
                className="rounded-full bg-yolk px-6 py-3 font-semibold text-ink transition-colors hover:bg-yolk-deep"
              >
                Where to buy it
              </a>
              <a
                href="#mechanism"
                className="rounded-full border border-line-strong px-6 py-3 font-medium text-ink transition-colors hover:border-ink hover:bg-shell"
              >
                Watch the slope work
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <dt className="text-[0.85rem] text-ink-faint">Price</dt>
                <dd className="tnum font-display text-[1.4rem] font-bold">
                  {product.price.display}
                </dd>
              </div>
              <div>
                <dt className="text-[0.85rem] text-ink-faint">Rated by buyers</dt>
                <dd className="tnum font-display text-[1.4rem] font-bold">
                  {product.ratings.average}
                  <span className="text-[0.95rem] font-medium text-ink-soft">
                    {" "}
                    from {product.ratings.count}
                  </span>
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

      <Rail />

      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 className="font-display text-h2 font-bold">What you are actually buying</h2>
            <div className="mt-6 max-w-[62ch] space-y-4 text-ink-soft">
              <p>
                A rack that sits on a fridge shelf and holds eggs in four sloped lines instead of a
                carton or a loose pile. Each tier is angled a few degrees toward an open slot at the
                front, so eggs settle forward on their own and stay in order. Raised walls along each
                groove stop them rolling off the side.
              </p>
              <p>
                That is the entire product. It arrives in one piece, and because nothing on it
                moves, there is nothing on it that can wear out. The marketplace listing calls this
                &ldquo;automatic scrolling&rdquo;. It is gravity, and we would rather say so.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Fact label="Tiers" value={String(product.tiers)} />
              <Fact label="Shelf depth needed" value={`${product.dimensionsCm.baseLength} cm`} />
              <Fact label="Clearance needed" value={`${product.dimensionsCm.height} cm`} />
              <Fact label="Power required" value="None" />
            </div>
          </div>

          <div className="rounded-[18px] border border-line bg-shell p-7">
            <h3 className="font-display text-h3 font-bold">What it does not do</h3>
            <ul className="mt-5 space-y-4">
              {notClaims.map((claim) => (
                <li
                  key={claim}
                  className="border-l-2 border-line-strong pl-4 text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  {claim}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      <div id="mechanism">
        <MechanismScroll />
      </div>

      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24" id="specs">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-bold">Specifications</h2>
            <p className="mt-4 max-w-[54ch] text-ink-soft">
              The size figures come from the supplier&rsquo;s own dimensioned photographs, not from
              the listing&rsquo;s spec field, which claims a 10 cm cube and is plainly a placeholder.
              We have not put a tape measure on one ourselves, so it says so.
            </p>

            <table className="mt-8 w-full text-[0.95rem]">
              <tbody>
                <SpecRow label="Capacity" value={`${product.capacity.eggs} eggs`} />
                <SpecRow label="Tiers" value={String(product.tiers)} />
                <SpecRow label="Eggs per tier" value={`about ${product.eggsPerTier}`} />
                <SpecRow label="Material" value={product.material.value} />
                <SpecRow label="Pack quantity" value={product.packQuantity} />
                <SpecRow label="Assembly" value={product.assembly} />
                <SpecRow label="Power" value="Not required" />
                <SpecRow label="Country of origin" value={product.countryOfOrigin} />
                <SpecRow label="Width across the top" value={`${product.dimensionsCm.length} cm`} />
                <SpecRow label="Depth" value={`${product.dimensionsCm.width} cm`} />
                <SpecRow label="Height" value={`${product.dimensionsCm.height} cm`} />
                <SpecRow
                  label="Base length"
                  value={`${product.dimensionsCm.baseLength} cm`}
                />
                <SpecRow
                  label="Weight"
                  value={product.weightG ? `${product.weightG} g` : null}
                  last
                />
              </tbody>
            </table>

            <p className="mt-6 max-w-[58ch] text-[0.85rem] leading-relaxed text-ink-faint">
              {product.dimensionsCm.note}
            </p>
            <p className="mt-3 max-w-[58ch] text-[0.85rem] leading-relaxed text-ink-faint">
              {product.material.note}
            </p>
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

      <Rail />

      {/* ================================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-bold">What buyers said</h2>
            <p className="mt-4 max-w-[42ch] text-ink-soft">
              {product.ratings.count} ratings is a small sample, and one of the two written reviews
              is unhappy. Both are here, because a page showing only the good one tells you nothing.
            </p>
            <p className="mt-6 text-[0.85rem] text-ink-faint">
              From the {product.ratings.source.toLowerCase()}, read on{" "}
              <span className="tnum">{product.ratings.fetchedOn}</span>.
            </p>
          </div>

          <div>
            <div className="flex items-end gap-5 border-b border-line pb-6">
              <p className="tnum font-display text-[3.5rem] font-extrabold leading-none">
                {product.ratings.average}
              </p>
              <div className="pb-1">
                <Stars value={product.ratings.average} />
                <p className="tnum mt-1 text-[0.9rem] text-ink-soft">
                  {product.ratings.count} ratings, {product.ratings.reviewCount} written
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {product.ratings.breakdown.map((row) => (
                <li key={row.stars} className="flex items-center gap-4">
                  <span className="tnum w-4 text-[0.9rem] text-ink-soft">{row.stars}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-shell-deep">
                    <span
                      className="block h-full rounded-full bg-yolk"
                      style={{ width: `${(row.count / product.ratings.count) * 100}%` }}
                    />
                  </span>
                  <span className="tnum w-6 text-right text-[0.9rem] text-ink-soft">
                    {row.count}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {product.reviews.map((review) => (
                <li
                  key={review.author + review.date}
                  className="rounded-[14px] border border-line bg-shell p-5"
                >
                  <Stars value={review.stars} />
                  <p className="mt-3 text-[1.05rem] font-medium">{review.body}</p>
                  <p className="tnum mt-3 text-[0.85rem] text-ink-faint">
                    {review.author}, {review.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24" id="questions">
        <h2 className="font-display text-h2 font-bold">Questions worth asking first</h2>
        <div className="mt-8">
          {faqs.slice(0, 5).map((faq) => (
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
        <p className="mt-8 text-[0.95rem]">
          <a href="/faq" className="text-ink underline underline-offset-4 hover:text-ink-soft">
            All {faqs.length} questions
          </a>
        </p>
      </section>

      {/* ================================================================ */}
      {/* Interim buy section. Ordering on this site is not built yet, and  */}
      {/* the page says exactly that rather than staging a fake checkout.   */}
      {/* ================================================================ */}
      <section className="bg-ink py-20 text-shell sm:py-24" id="buy">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="tnum font-display text-[4rem] font-extrabold leading-none">
            {product.price.display}
          </p>
          <h2 className="mt-5 font-display text-h2 font-bold">
            Ordering here is not open yet.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-shell/70">
            We are building the order page. Until it is live, the only way to actually buy this is
            the marketplace listing it is sold on, where {product.seller.name} handles payment,
            delivery and the {product.fulfilment.returnWindowDays}-day return window under{" "}
            {product.fulfilment.provider}&rsquo;s policies.
          </p>
          <div className="mt-9">
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-yolk px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-yolk-deep"
            >
              Open the listing on {product.fulfilment.provider}
            </a>
          </div>
          <p className="mt-6 text-[0.85rem] text-shell/50">
            That link leaves this site. We do not take payment here, and nothing on this page
            charges you.
          </p>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The section rule descends left to right and ends in an egg, at the angle the
 * rails actually sit at. It is the only ornament on the page, and it is the
 * mechanism drawn small: things travel down the slope and gather at the front.
 */
function Rail() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="relative py-2">
        <hr className="rail" />
        <span className="rail-dot" aria-hidden />
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-line bg-shell px-4 py-3">
      <p className="text-[0.8rem] text-ink-faint">{label}</p>
      <p className="tnum mt-0.5 font-display text-[1.15rem] font-bold">{value}</p>
    </div>
  );
}

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

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6z"
            fill={i <= Math.round(value) ? "var(--color-yolk)" : "var(--color-line-strong)"}
          />
        </svg>
      ))}
    </span>
  );
}
