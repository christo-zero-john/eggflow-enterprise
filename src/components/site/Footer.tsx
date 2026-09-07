import Link from "next/link";
import { site } from "@/lib/site";
import { product } from "@/lib/product";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="ef-footer">
      <Container>
        <div className="ef-grid ef-grid--3">
          <div className="ef-stack">
            <p className="ef-wordmark">{site.name}</p>
            <p className="ef-micro" style={{ maxWidth: "34ch" }}>
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ef-stack">
            <p className="ef-micro">
              Sold through {product.fulfilment.provider} by {product.seller.name}. Delivery, payment
              and returns follow {product.fulfilment.provider}&rsquo;s policies.
            </p>
            <p className="ef-micro">
              Ratings shown on this site were taken from the {product.ratings.source} on{" "}
              <time dateTime={product.ratings.fetchedOn}>{product.ratings.fetchedOn}</time>.
            </p>
          </div>
        </div>

        <p className="ef-micro" style={{ marginTop: "2rem" }}>
          &copy; {new Date().getFullYear()} {site.name}. Country of origin: {product.countryOfOrigin}.{" "}
          <Link href="/privacy">Privacy</Link> &nbsp;<Link href="/terms">Terms</Link>
        </p>
      </Container>
    </footer>
  );
}
