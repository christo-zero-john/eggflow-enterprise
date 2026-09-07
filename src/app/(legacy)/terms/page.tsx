import type { Metadata } from "next";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

/** STUB. Replace with reviewed terms before launch. */
export default function TermsPage() {
  return (
    <section className="ef-section">
      <Container narrow>
        <div className="ef-stack-lg">
          <h1 className="ef-h2">Terms</h1>
          <p className="ef-note ef-note--flag">
            Placeholder. Because sales complete on a third-party marketplace, these terms should be
            clear that this site is informational, that the sale contract is between the buyer and
            the marketplace seller, and what your liability is for the product information published
            here.
          </p>
        </div>
      </Container>
    </section>
  );
}
