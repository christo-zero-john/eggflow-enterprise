import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Marker } from "@/components/ui/Marker";
import { product } from "@/lib/product";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach us about the product, and where to go instead for order problems.",
  alternates: { canonical: "/contact" },
};

/**
 * Deliberately not a form. A contact form that posts nowhere is worse than no
 * form at all. Replace the placeholders below with real details before launch —
 * a published address and a working email are a listing requirement for Meta
 * and Google Shopping ads, and buyers check for them.
 */
export default function ContactPage() {
  return (
    <>
      <section className="ef-section">
        <Container narrow>
          <div className="ef-stack-lg">
            <h1 className="ef-h2">Contact</h1>
            <p className="ef-lead">
              For anything about the product itself &mdash; a spec we have not published, a question
              this site does not answer &mdash; write to us. For anything about an order, go to{" "}
              {product.fulfilment.provider} instead, because they can act on it and we cannot.
            </p>
          </div>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="reach">Reaching us</Marker>
          <dl className="ef-stack">
            <div>
              <dt className="ef-small" style={{ fontWeight: 600 }}>Email</dt>
              {/* TODO: replace with a real, monitored address. */}
              <dd style={{ margin: 0 }}>
                <a href="mailto:hello@example.com">hello@example.com</a>
              </dd>
            </div>
            <div>
              <dt className="ef-small" style={{ fontWeight: 600 }}>Reply time</dt>
              <dd style={{ margin: 0 }} className="ef-body">
                {/* TODO: state a window you can actually keep. */}
                Within two working days.
              </dd>
            </div>
            <div>
              <dt className="ef-small" style={{ fontWeight: 600 }}>Registered address</dt>
              {/* TODO: a published address is required for ad platforms and expected by buyers. */}
              <dd style={{ margin: 0 }} className="ef-body">
                Add your registered business address here before launch.
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="ef-section ef-section--divided">
        <Container narrow>
          <Marker id="orders">Order problems</Marker>
          <div className="ef-stack">
            <p>
              Delivery delays, damaged units, refunds and returns are handled inside your{" "}
              {product.fulfilment.provider} account, on the order itself. The{" "}
              <span className="ef-num">{product.fulfilment.returnWindowDays}</span>-day return window
              runs from delivery.
            </p>
            <a
              className="ef-btn ef-btn--ghost"
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the listing on {product.fulfilment.provider}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
