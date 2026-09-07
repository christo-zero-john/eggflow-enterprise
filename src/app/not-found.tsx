import Link from "next/link";
import { Container } from "@/components/site/Container";

export default function NotFound() {
  return (
    <section className="ef-section">
      <Container narrow>
        <div className="ef-stack-lg">
          <h1 className="ef-h2">That page is not here</h1>
          <p className="ef-lead">
            The link may be old, or mistyped. The product page has the specifications and
            photographs.
          </p>
          <div className="ef-btn-row">
            <Link href="/product" className="ef-btn ef-btn--primary">
              Go to the product
            </Link>
            <Link href="/" className="ef-btn ef-btn--ghost">
              Back to the start
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
