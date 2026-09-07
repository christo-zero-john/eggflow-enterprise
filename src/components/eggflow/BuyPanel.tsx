import { product } from "@/lib/product";

/**
 * Deliberately not a checkout. The order is placed on the marketplace, and
 * pretending otherwise on this page would be the exact kind of thing that makes
 * a page like this untrustworthy. The panel says where the money goes.
 */
export function BuyPanel() {
  return (
    <aside className="ef-panel ef-stack" aria-labelledby="buy-heading">
      <div>
        <h2 className="ef-h3" id="buy-heading">
          {product.name}
        </h2>
        <p className="ef-micro">{product.packQuantity}</p>
      </div>

      <p className="ef-num" style={{ fontSize: "2.25rem", fontWeight: 640, letterSpacing: "-0.035em", lineHeight: 1 }}>
        {product.price.display}
      </p>
      <p className="ef-micro">
        Listed price on {product.fulfilment.provider}, inclusive of taxes. Delivery charges, if any,
        are shown at checkout there. We do not display a struck-through &ldquo;original&rdquo; price,
        because there has not been one.
      </p>

      <div>
        <p className="ef-small" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Colour</p>
        <ul style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {product.colors.map((colour) => (
            <li key={colour.id}>
              <a
                href={colour.listingUrl}
                className="ef-btn ef-btn--ghost"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: colour.hex, border: "1px solid var(--ef-rail-strong)",
                  }}
                />
                {colour.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a
        className="ef-btn ef-btn--primary"
        href={product.buyUrl}
        rel="noopener noreferrer"
        target="_blank"
        style={{ width: "100%" }}
      >
        Buy on {product.fulfilment.provider}
      </a>

      <ul className="ef-micro ef-stack" style={{ ["--ef-s4" as string]: "0.375rem" }}>
        <li>Cash on delivery available</li>
        <li>{product.fulfilment.returnWindowDays}-day return window from delivery</li>
        <li>Sold by {product.seller.name}, rated {product.seller.rating} across {product.seller.ratingCount} ratings</li>
      </ul>

      <p className="ef-note">{product.fulfilment.note}</p>
    </aside>
  );
}
