import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Marker } from "@/components/ui/Marker";
import { RackDemo } from "@/components/eggflow/RackDemo";
import { product, mechanism, notClaims } from "@/lib/product";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The mechanism is a tilt, not a motor. What the four tiers do, what the raised rails do, and where the design has limits.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="ef-section">
        <Container>
          <div className="ef-split">
            <div className="ef-stack-lg">
              <h1 className="ef-hero-title" style={{ fontSize: "var(--ef-t-h2)" }}>
                The mechanism is a tilt.
              </h1>
              <p className="ef-lead ef-measure">
                Each of the four rails slopes a few degrees down toward an open slot at the front.
                An egg on a slope rolls until something stops it &mdash; usually the egg in front.
                Remove that egg and the line advances by one position.
              </p>
              <p className="ef-body ef-measure">
                There is no spring, no ratchet, no dispenser mechanism and no power. That is worth
                stating plainly, because &ldquo;automatic&rdquo; in the marketplace title implies
                something the product does not contain. What it does contain is a moulded slope,
                which is why it has nothing to break.
              </p>
            </div>
            <RackDemo />
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container>
          <Marker id="steps">Three things happen, in order</Marker>
          <ol className="ef-grid ef-grid--3">
            {mechanism.map((step) => (
              <li key={step.step} className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
                <p className="ef-num ef-micro" style={{ color: "var(--ef-chill)", fontWeight: 640 }}>
                  Step {step.step}
                </p>
                <h3 className="ef-h3">{step.title}</h3>
                <p className="ef-body ef-small">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container>
          <Marker id="design">The three design decisions that matter</Marker>
          <div className="ef-grid ef-grid--3">
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">The slope angle</h3>
              <p className="ef-body ef-small">
                Shallow enough that eggs do not gather speed, steep enough that they still move when
                the rail is nearly empty. If the rack sits on an uneven or already-tilted shelf, this
                is the thing that gets thrown off &mdash; level it before you blame the rack.
              </p>
            </div>
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">Raised side walls</h3>
              <p className="ef-body ef-small">
                Each groove has heightened walls along its length. They keep eggs tracking in a
                single line and stop one tipping sideways off the rail when the fridge door swings.
              </p>
            </div>
            <div className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              <h3 className="ef-h3">One moulded piece</h3>
              <p className="ef-body ef-small">
                Four tiers, no fasteners, no assembly. The trade-off is that it cannot be taken apart
                for cleaning &mdash; you wash it whole, and the grooves need a brush to get into.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="limits">Where it stops working</Marker>
          <ul className="ef-stack">
            {notClaims.map((claim) => (
              <li key={claim} className="ef-note">
                {claim}
              </li>
            ))}
            <li className="ef-note">
              Very large eggs sit wider on the rail, so you will fit fewer than the{" "}
              {product.capacity.eggs} on the spec sheet. Very small eggs can occasionally roll past
              each other rather than queueing.
            </li>
          </ul>
          <p style={{ marginTop: "var(--ef-s6)" }}>
            <Link href="/product">Specifications and photographs</Link>
          </p>
        </Container>
      </section>
    </>
  );
}
