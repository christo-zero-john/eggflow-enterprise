import { product } from "@/lib/product";

const { ratings, reviews } = product;
const max = Math.max(...ratings.breakdown.map((b) => b.count), 1);

export function Ratings() {
  return (
    <div className="ef-split ef-split--aside">
      <div className="ef-stack">
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
          <span className="ef-num" style={{ fontSize: "3rem", fontWeight: 640, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {ratings.average}
          </span>
          <span className="ef-body ef-small ef-num">
            from {ratings.count} ratings and {ratings.reviewCount} written reviews
          </span>
        </div>

        <ul className="ef-stack" style={{ ["--ef-s4" as string]: "0.5rem", maxWidth: "26rem" }}>
          {ratings.breakdown.map((row) => (
            <li key={row.stars} style={{ display: "grid", gridTemplateColumns: "5.5rem 1fr 2rem", gap: "0.75rem", alignItems: "center" }}>
              <span className="ef-micro">{row.label}</span>
              <span
                aria-hidden="true"
                style={{ height: 6, background: "var(--ef-rail)", borderRadius: 3, overflow: "hidden" }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${(row.count / max) * 100}%`,
                    background: row.count ? "var(--ef-chill)" : "transparent",
                  }}
                />
              </span>
              <span className="ef-micro ef-num" style={{ textAlign: "right" }}>{row.count}</span>
            </li>
          ))}
        </ul>

        <p className="ef-note">
          Twenty-eight ratings is a small sample and we are not going to dress it up as more than
          that. Both written reviews on the listing are reproduced here, including the three-star
          one. Figures taken from the {ratings.source} on {ratings.fetchedOn}.
        </p>
      </div>

      <div className="ef-stack">
        {reviews.map((review) => (
          <blockquote key={review.author + review.date} className="ef-panel ef-stack" style={{ ["--ef-s4" as string]: "0.5rem" }}>
            <p style={{ fontSize: "var(--ef-t-h3)", letterSpacing: "-0.01em" }}>&ldquo;{review.body}&rdquo;</p>
            <footer className="ef-micro ef-num">
              {review.author} &nbsp;{review.stars} out of 5 &nbsp;
              <time dateTime={review.date}>{review.date}</time>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
