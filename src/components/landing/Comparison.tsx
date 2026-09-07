import { comparison } from "@/lib/product";

/**
 * The before-and-after. This is the section that does the persuading, because
 * everyone reading it already owns the thing in the right-hand column.
 *
 * Both columns are written fairly. Cartons are not stupid — they are cheap and
 * they stack — and a comparison that pretends otherwise loses the reader who
 * has one in the fridge right now.
 */
export function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24" aria-labelledby="compare-heading">
      <div className="max-w-2xl">
        <h2 id="compare-heading" className="font-display text-h2 font-bold">
          The carton works. It is just in the way.
        </h2>
        <p className="mt-4 text-ink-soft">
          Cartons are cheap and they stack, and that is genuinely most of what
          anyone needs. Here is the part they are bad at, and what changes.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Column
          title={comparison.ours.title}
          points={comparison.ours.points}
          tone="ours"
        />
        <Column
          title={comparison.theirs.title}
          points={comparison.theirs.points}
          tone="theirs"
        />
      </div>
    </section>
  );
}

function Column({
  title,
  points,
  tone,
}: {
  title: string;
  points: readonly string[];
  tone: "ours" | "theirs";
}) {
  const ours = tone === "ours";

  return (
    <div
      className={
        ours
          ? "rounded-[18px] border border-ink/15 bg-shell p-7 shadow-[0_18px_40px_-30px_rgba(60,45,25,0.6)]"
          : "rounded-[18px] border border-line p-7"
      }
    >
      <h3
        className={`font-display text-h3 font-bold ${ours ? "text-ink" : "text-ink-soft"}`}
      >
        {title}
      </h3>
      <ul className="mt-5 space-y-3.5">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-[0.98rem] leading-relaxed">
            <span aria-hidden className="mt-[3px] shrink-0">
              {ours ? <Tick /> : <Dash />}
            </span>
            <span className={ours ? "text-ink" : "text-ink-soft"}>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="var(--color-yolk)" />
      <path
        d="M6 10.4l2.6 2.6L14 7.6"
        stroke="var(--color-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="var(--color-line-strong)" strokeWidth="1.4" />
      <path d="M6.5 10h7" stroke="var(--color-line-strong)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
