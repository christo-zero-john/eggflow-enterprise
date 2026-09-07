import { product } from "@/lib/product";

const d = product.dimensionsCm;

/**
 * Shelf fit is the number-one reason a fridge organiser gets returned, and the
 * number-one thing someone wants to know before paying. It gets its own
 * section, high on the page, with the two numbers that actually decide it in
 * type large enough to read from across the kitchen.
 */
export function SizeFit() {
  return (
    <section
      id="size"
      className="border-y border-line bg-shell"
      aria-labelledby="size-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="size-heading" className="font-display text-h2 font-bold">
              Measure once, before you buy.
            </h2>
            <p className="mt-5 max-w-[52ch] text-ink-soft">
              This is the thing worth checking, and the most common reason a fridge
              organiser goes back. Two numbers decide it.
            </p>

            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[16px] border border-line bg-carton px-6 py-5">
                <dt className="text-[0.85rem] text-ink-faint">Shelf depth needed</dt>
                <dd className="tnum mt-1 font-display text-[2.4rem] font-extrabold leading-none">
                  {d.baseLength}
                  <span className="text-[1.1rem] font-bold"> cm</span>
                </dd>
                <p className="tnum mt-1 text-[0.85rem] text-ink-faint">{d.baseLengthIn} in</p>
              </div>
              <div className="rounded-[16px] border border-line bg-carton px-6 py-5">
                <dt className="text-[0.85rem] text-ink-faint">Clearance above</dt>
                <dd className="tnum mt-1 font-display text-[2.4rem] font-extrabold leading-none">
                  {d.height}
                  <span className="text-[1.1rem] font-bold"> cm</span>
                </dd>
                <p className="tnum mt-1 text-[0.85rem] text-ink-faint">{d.heightIn} in</p>
              </div>
            </dl>

            <p className="mt-6 max-w-[54ch] text-[0.9rem] leading-relaxed text-ink-soft">
              It only needs <span className="tnum font-medium text-ink">{d.depth} cm</span> of
              depth front-to-back, because it stands upright instead of lying flat. That is the
              whole space-saving argument.
            </p>

            <p className="mt-4 max-w-[54ch] text-[0.85rem] leading-relaxed text-ink-faint">
              {d.note}
            </p>
          </div>

          <Diagram />
        </div>
      </div>
    </section>
  );
}

/**
 * A dimensioned drawing, in the manner of the supplier's own. Every figure is
 * read from `product.ts`, so the drawing cannot drift away from the spec table
 * further down the page.
 */
function Diagram() {
  // Drawing box. The shape is the object in side view: a tall narrow body with
  // a sloped base running out to the chute.
  const L = 132;
  const R = 382;
  const T = 70;
  const B = 252;

  return (
    <figure className="rounded-[20px] border border-line bg-carton p-4 sm:p-6">
      <svg
        viewBox="0 0 500 330"
        className="block w-full"
        role="img"
        aria-label={`Dimensioned drawing: ${d.length} centimetres wide, ${d.height} centimetres high, ${d.depth} centimetres deep, with a sloped base ${d.baseLength} centimetres long.`}
      >
        <defs>
          <linearGradient id="sf-body" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#eef1f2" />
            <stop offset="0.55" stopColor="#ccd3d7" />
            <stop offset="1" stopColor="#a7b1b7" />
          </linearGradient>
        </defs>

        {/* The body, with the base running out to the chute at the bottom right. */}
        <path
          d={`M ${L} ${T} L ${R} ${T} L ${R} ${B - 46}
              Q ${R} ${B} ${R - 54} ${B}
              L ${L + 14} ${B}
              Q ${L} ${B} ${L} ${B - 14} Z`}
          fill="url(#sf-body)"
        />
        {/* Four tiers, drawn as the openings in the face. */}
        {[0, 1, 2, 3].map((i) => {
          const y = T + 26 + i * 42;
          return (
            <rect
              key={i}
              x={L + 16}
              y={y}
              width={R - L - 62}
              height={22}
              rx={11}
              fill="#414a4f"
              opacity="0.85"
            />
          );
        })}

        {/* Width, along the top. */}
        <Dim x1={L} y1={T - 26} x2={R} y2={T - 26} label={`${d.length} cm / ${d.lengthIn} in`} />
        {/* Height, down the left. */}
        <Dim
          x1={L - 46}
          y1={T}
          x2={L - 46}
          y2={B}
          vertical
          label={`${d.height} cm / ${d.heightIn} in`}
        />
        {/* Base length, along the bottom. */}
        <Dim
          x1={L}
          y1={B + 30}
          x2={R}
          y2={B + 30}
          label={`${d.baseLength} cm / ${d.baseLengthIn} in`}
        />
        {/* Depth, as a small note at the right. */}
        <Dim
          x1={R + 42}
          y1={T + 30}
          x2={R + 42}
          y2={T + 118}
          vertical
          label={`${d.depth} cm deep`}
        />
      </svg>
    </figure>
  );
}

/** One dimension line with arrowheads and a label. */
function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  vertical = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  vertical?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const tick = 5;

  return (
    <g stroke="var(--color-ink-faint)" strokeWidth="1.1" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - tick} y1={y1} x2={x1 + tick} y2={y1} />
          <line x1={x2 - tick} y1={y2} x2={x2 + tick} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - tick} x2={x1} y2={y1 + tick} />
          <line x1={x2} y1={y2 - tick} x2={x2} y2={y2 + tick} />
        </>
      )}
      <text
        x={mx}
        y={vertical ? my : my - 9}
        textAnchor="middle"
        dominantBaseline={vertical ? "auto" : "auto"}
        transform={vertical ? `rotate(-90 ${mx} ${my})` : undefined}
        dy={vertical ? -8 : 0}
        fill="var(--color-ink-soft)"
        stroke="none"
        fontSize="13"
        fontWeight="600"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {label}
      </text>
    </g>
  );
}
