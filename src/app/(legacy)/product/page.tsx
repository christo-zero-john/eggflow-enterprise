import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Marker } from "@/components/ui/Marker";
import { SpecTable, type SpecRow } from "@/components/ui/SpecTable";
import { Gallery } from "@/components/eggflow/Gallery";
import { BuyPanel } from "@/components/eggflow/BuyPanel";
import { Ratings } from "@/components/eggflow/Ratings";
import { ProductJsonLd } from "@/components/eggflow/StructuredData";
import { product } from "@/lib/product";

export const metadata: Metadata = {
  title: "The product",
  description:
    "Full specifications, photographs and verified figures for the EggFlow four-tier gravity-fed egg rack.",
  alternates: { canonical: "/product" },
};

const rows: SpecRow[] = [
  { label: "Capacity", value: `About ${product.capacity.eggs} eggs, ${product.tiers} tiers of roughly ${product.eggsPerTier}` },
  { label: "Material", value: product.material.value },
  { label: "Colours", value: product.colors.map((c) => c.label).join(" or ") },
  { label: "Assembly", value: product.assembly },
  { label: "Power", value: "None. Gravity-fed." },
  { label: "Length", value: null, unverified: true },
  { label: "Width", value: null, unverified: true },
  { label: "Height", value: null, unverified: true },
  { label: "Weight", value: null, unverified: true },
  { label: "Pack contents", value: `${product.packQuantity}. No lid, no separate parts.` },
  { label: "Country of origin", value: product.countryOfOrigin },
  { label: "Generic name", value: product.genericName },
];

export default function ProductPage() {
  return (
    <>
      <ProductJsonLd />

      <section className="ef-section">
        <Container>
          <div className="ef-split ef-split--aside">
            <div className="ef-stack-lg">
              <div className="ef-stack">
                <h1 className="ef-h2">{product.name}</h1>
                <p className="ef-lead ef-measure">{product.tagline}</p>
              </div>
              <Gallery />
            </div>
            <BuyPanel />
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container>
          <Marker id="specifications">Specifications</Marker>
          <div className="ef-split">
            <SpecTable
              rows={rows}
              caption="Figures taken from the supplier's specification sheet unless marked otherwise."
            />

            <div className="ef-stack">
              <div>
                <h3 className="ef-h3">Why four rows say &ldquo;not verified&rdquo;</h3>
                <p className="ef-body ef-small" style={{ marginTop: "0.5rem" }}>
                  The marketplace listing gives the dimensions as 10 &times; 10 &times; 10 cm and the
                  weight as 0.3 g. Neither can be true &mdash; a four-tier rack holding{" "}
                  {product.capacity.eggs} eggs is not a ten-centimetre cube, and it does not weigh
                  a third of a gram. Those are placeholder values left in the listing form.
                </p>
                <p className="ef-body ef-small" style={{ marginTop: "0.75rem" }}>
                  Rather than repeat numbers we know are wrong, or invent plausible ones, we are
                  measuring a unit and will publish the real figures here. If shelf fit is the thing
                  that decides your purchase, this is the honest state of play: we do not know yet.
                </p>
              </div>

              <div>
                <h3 className="ef-h3">On the capacity figure</h3>
                <p className="ef-body ef-small" style={{ marginTop: "0.5rem" }}>
                  {product.capacity.note}
                </p>
              </div>

              <div>
                <h3 className="ef-h3">On the material</h3>
                <p className="ef-body ef-small" style={{ marginTop: "0.5rem" }}>
                  {product.material.note}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container>
          <Marker id="care">Looking after it</Marker>
          <div className="ef-grid ef-grid--3">
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">Washing</h3>
              <p className="ef-body ef-small">
                Hand wash with warm water and dish soap. Dry it fully before reloading &mdash; a wet
                rail slows the roll and traps residue in the grooves.
              </p>
            </div>
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">Heat</h3>
              <p className="ef-body ef-small">
                Keep it away from dishwashers, boiling water and hot surfaces. No heat rating has
                been supplied for the plastic, so we will not tell you it is safe above roughly
                60&nbsp;&deg;C.
              </p>
            </div>
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">Loading</h3>
              <p className="ef-body ef-small">
                Set eggs onto the rear of a rail rather than dropping them in. Cracked shells on a
                shared rail can contaminate the eggs below them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container>
          <Marker id="ratings">Ratings and reviews</Marker>
          <Ratings />
          <p style={{ marginTop: "var(--ef-s5)" }}>
            <Link href="/faq">Questions about the product</Link>
          </p>
        </Container>
      </section>
    </>
  );
}
