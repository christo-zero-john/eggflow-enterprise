import { ImageResponse } from "next/og";
import { product } from "@/lib/product";

export const alt = "EggFlow — a four-tier gravity-fed egg rack for the fridge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so there is no static asset to keep in sync with the
 * product data. Same palette as the site: cold ground, teal rails, one warm
 * accent for the eggs.
 */
export default function OpengraphImage() {
  const rails = [0, 1, 2, 3];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f1f4f5",
          color: "#16212a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#1f5a6b" }}>
            EggFlow
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
              Take the front egg.
            </div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
              The next one rolls down.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5a6a75" }}>
            {product.tiers} tilted tiers &nbsp;·&nbsp; about {product.capacity.eggs} eggs
            &nbsp;·&nbsp; no motor &nbsp;·&nbsp; {product.price.display}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 34, width: 380 }}>
          {rails.map((r) => (
            <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: 34, height: 44, borderRadius: "50% 50% 46% 46% / 58% 58% 42% 42%", background: "#c88a2b" }}
                />
              ))}
              <div style={{ display: "flex", width: 300, height: 4, background: "#a9b5bc", marginLeft: -286, marginTop: 40 }} />
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
