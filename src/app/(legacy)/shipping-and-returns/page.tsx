import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Marker } from "@/components/ui/Marker";
import { product } from "@/lib/product";

export const metadata: Metadata = {
  title: "Delivery and returns",
  description:
    "Who fulfils the order, what the 7-day return window covers, and what this site is and is not responsible for.",
  alternates: { canonical: "/shipping-and-returns" },
};

export default function ShippingPage() {
  const p = product.fulfilment.provider;

  return (
    <>
      <section className="ef-section">
        <Container narrow>
          <div className="ef-stack-lg">
            <h1 className="ef-h2">Delivery and returns</h1>
            <p className="ef-lead">
              This page is short because the answer is short: the order is placed on {p} and
              fulfilled by {product.seller.name}. {p}&rsquo;s policies apply, not ours.
            </p>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="who">Who does what</Marker>
          <div className="ef-stack">
            <p>
              <strong>{p}</strong> takes the payment, arranges the shipment, tracks the delivery and
              processes any return. Delivery times and charges are the ones shown at their checkout
              for your pincode.
            </p>
            <p>
              <strong>{product.seller.name}</strong> is the seller of record, rated{" "}
              <span className="ef-num">{product.seller.rating}</span> across{" "}
              <span className="ef-num">{product.seller.ratingCount}</span> ratings on the platform.
            </p>
            <p>
              <strong>This site</strong> describes the product and links to that listing. We do not
              hold stock, take payment, or have access to your order. If something goes wrong with a
              delivery, {p}&rsquo;s support can act on it and we cannot.
            </p>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="returns">The return window</Marker>
          <div className="ef-stack">
            <p>
              {p} lists a{" "}
              <strong>
                <span className="ef-num">{product.fulfilment.returnWindowDays}</span>-day return
                window
              </strong>{" "}
              from delivery for this product, and cash on delivery is available. Returns are raised
              from the order inside your {p} account.
            </p>
            <p className="ef-body">
              Two practical notes. Keep the packaging until you have checked the unit &mdash; a
              return is simpler with it. And check the rails for moulding flash or a cracked tier as
              soon as it arrives rather than after the window closes, because a defect found on day
              nine is your problem and one found on day one is not.
            </p>
            <p className="ef-note">
              Terms can change. The window above was accurate on the listing as of{" "}
              {product.ratings.fetchedOn}; the figure shown at {p} checkout is the one that governs.
            </p>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="pricing">On pricing</Marker>
          <div className="ef-stack">
            <p>
              The price shown across this site is{" "}
              <span className="ef-num">{product.price.display}</span>, the listed price on {p}. You
              will not find a struck-through &ldquo;original price&rdquo; anywhere here, because
              there has not been one and inventing one to manufacture a discount is a dark pattern
              under India&rsquo;s 2023 CCPA guidelines.
            </p>
            <p>
              There are no countdown timers, no stock-scarcity counters and no &ldquo;12 people are
              viewing this&rdquo; badges on this site, for the same reason.
            </p>
            <div className="ef-btn-row">
              <a
                className="ef-btn ef-btn--primary"
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the {p} listing
              </a>
              <Link href="/contact" className="ef-btn ef-btn--ghost">
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
