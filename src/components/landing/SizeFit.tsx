import Image from "next/image";
import { product } from "@/lib/product";
import { ScrollTextPanel } from "./ScrollTextPanel";

const d = product.dimensionsCm;

const specs = [
  ["Capacity", `About ${product.capacity.eggs} eggs; larger eggs may reduce capacity`],
  ["Tiers", String(product.tiers)],
  ["Body length", `${d.length} cm / ${d.lengthIn} in`],
  ["Total base length", `${d.baseLength} cm / ${d.baseLengthIn} in`],
  ["Height", `${d.height} cm / ${d.heightIn} in`],
  ["Narrow side", `${d.depth} cm / ${d.depthIn} in`],
  ["Material", product.material.value],
  ["Pack contents", `${product.packQuantity} egg holder; eggs not included`],
  ["Assembly", product.assembly],
  ["Power", "Not required"],
  ["Country of origin", product.countryOfOrigin],
] as const;

export function SizeFit() {
  return (
    <section id="size" className="dense-section bg-shell" aria-labelledby="size-heading">
      <div className="dense-section__inner mx-auto grid w-full max-w-[1200px] items-start gap-10 px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-16">
        {/* Content starts at the top and the figure absorbs whatever height
            is left, so the column always fits the pinned viewport. */}
        <div className="max-w-[500px] lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">Size and details</p>
          <h2 id="size-heading" className="mt-3 font-display text-[clamp(2.2rem,3.4vw,3rem)] font-bold">Find its place in your fridge.</h2>
          <p className="mt-3 max-w-[43ch] text-[0.95rem] leading-relaxed text-ink-soft">Measure the space where the holder will sit, including room to load eggs from the open top.</p>

          <dl className="mt-5 grid grid-cols-3 gap-3">
            <Measure label="Total length" value={d.baseLength} />
            <Measure label="Height" value={d.height} />
            <Measure label="Narrow side" value={d.depth} />
          </dl>

          <figure className="size-figure relative mt-5 aspect-[16/10] max-h-[300px] w-full overflow-hidden rounded-[18px] bg-carton">
            <Image src="/images/gallery/white.png" alt="Full white egg shelf shown for product shape; measurements are listed alongside" fill sizes="(min-width: 1024px) 500px, 90vw" className="object-contain p-2" />
          </figure>
        </div>

        <div className="dense-copy min-h-0 self-stretch">
          <div>
            <h3 className="font-display text-[1.6rem] font-bold">Product specifications</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">Every measurement you need to know it fits, in centimetres and inches.</p>
          </div>
          <ScrollTextPanel label="Product specifications">
            <table className="w-full text-[0.95rem]">
              <tbody>{specs.map(([label, value]) => <SpecRow key={label} label={label} value={value} />)}</tbody>
            </table>
            <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">BPA-free plastic, safe for food contact. Rinse it under the tap, dry it, and refill from the open top.</p>
          </ScrollTextPanel>
          <a href="#colours" className="text-sm font-semibold underline decoration-line-strong underline-offset-4">Next: choose a colour</a>
        </div>
      </div>
    </section>
  );
}

function Measure({ label, value }: { label: string; value: number }) {
  return <div className="rounded-[14px] border border-line bg-carton px-4 py-3"><dt className="text-xs text-ink-faint">{label}</dt><dd className="tnum mt-1 font-display text-xl font-bold">{value}<span className="ml-1 text-sm">cm</span></dd></div>;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return <tr className="border-b border-line"><th scope="row" className="w-[38%] py-3 pr-4 text-left font-normal text-ink-soft">{label}</th><td className="py-3 font-medium">{value}</td></tr>;
}
