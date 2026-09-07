"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Channel, ChannelWall, Egg, RackDefs, RackFrame } from "./RackArt";
import {
  BACK_X,
  EGG_RY,
  PER_TIER,
  TIERS,
  VIEW_H,
  VIEW_W,
  VIEW_X,
  VIEW_Y,
  railY,
  slotCentre,
} from "./rack-geometry";

/**
 * Eggs are loaded at the raised back of the rail and roll down from there.
 * The entry starts just above the back stop — not off the edge of the drawing,
 * which made them look like they were arriving from nowhere.
 */
function entryPoint(tier: number) {
  return { x: BACK_X - 12, y: railY(tier, BACK_X) - EGG_RY * 0.82 - 34 };
}

/**
 * Eggs carry stable ids so the ones that stay can travel to their new slot
 * rather than being torn down and rebuilt.
 *
 * The ids are derived from position, not from a counter. A module-level
 * counter would keep incrementing across renders on the server while starting
 * from zero on the client, and the per-egg size variation derived from the id
 * would then differ between the two — a hydration mismatch.
 */
type Tier = number[];

const fullRack = (): Tier[] =>
  Array.from({ length: TIERS }, (_, t) =>
    Array.from({ length: PER_TIER }, (_, i) => t * PER_TIER + i),
  );

/**
 * The hero is the mechanism, not a headline.
 *
 * Rather than assert that the line advances, the page lets you do it: lift the
 * front egg out and watch the rest travel down the slope into the space.
 *
 * Only the front egg is interactive. An earlier version made the whole tier
 * clickable, which meant clicking empty space removed an egg — it read as a
 * bug rather than as a mechanism.
 */
export function RackDemo() {
  const id = useId().replace(/:/g, "");
  const [rack, setRack] = useState<Tier[]>(fullRack);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The rack loads itself the first time it is seen. It is the one thing on
  // this page that animates unprompted, and it earns that by showing the
  // mechanism: every egg enters at the raised back and rolls down the slope.
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const filling = inView && !reduced;

  const total = rack.reduce((sum, t) => sum + t.length, 0);

  function take(tier: number) {
    setRack((prev) => prev.map((t, i) => (i === tier ? t.slice(1) : t)));
  }

  return (
    <figure ref={ref} className="w-full">
      <div className="rounded-[22px] border border-line bg-shell p-4 shadow-[0_30px_70px_-38px_rgba(60,45,25,0.5)] sm:p-6">
        <svg
          viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
          className="block w-full"
          role="group"
          aria-label="Interactive drawing of the four-tier rack. Lift the front egg from a tier and the next one rolls forward."
        >
          <RackDefs id={id} tone="light" />
          <RackFrame id={id} />

          {rack.map((eggs, tier) => (
            <g key={tier}>
              <Channel id={id} tier={tier} />

              <AnimatePresence initial={false}>
                {(inView || reduced) &&
                  eggs.map((eggId, i) => {
                    const { x, y } = slotCentre(tier, i);
                    return (
                      <Egg
                        key={eggId}
                        id={id}
                        x={x}
                        y={y}
                        seed={eggId}
                        animate={!reduced}
                        enter={filling ? entryPoint(tier) : undefined}
                        delay={filling ? tier * 0.22 + i * 0.16 : 0}
                      />
                    );
                  })}
              </AnimatePresence>

              <ChannelWall id={id} tier={tier} />

              {/* Only the leading egg can be lifted, and the target is the egg
                  itself rather than the whole row. */}
              {eggs.length > 0 && (
                <FrontEggTarget tier={tier} count={eggs.length} onTake={() => take(tier)} />
              )}
            </g>
          ))}
        </svg>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4">
          <p className="text-[0.9rem] text-ink-soft">
            {total === 0
              ? "Empty. You reload it at the raised end at the back."
              : "Lift the front egg off any tier."}
          </p>
          <div className="flex items-center gap-4">
            <p className="tnum text-[0.9rem] text-ink-soft">
              <span className="font-semibold text-ink">{total}</span> left
            </p>
            <button
              type="button"
              onClick={() => setRack(fullRack())}
              className="cursor-pointer rounded-full border border-line-strong px-3.5 py-1.5 text-[0.85rem] font-medium text-ink transition-colors hover:border-ink hover:bg-carton"
            >
              Refill
            </button>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {total} eggs remaining across {TIERS} tiers.
      </p>
    </figure>
  );
}

/**
 * The hit target for one tier's leading egg: a circle over the egg, with a
 * quiet halo that appears on hover and focus so it is discoverable without a
 * permanent marker sitting on every tier.
 */
function FrontEggTarget({
  tier,
  count,
  onTake,
}: {
  tier: number;
  count: number;
  onTake: () => void;
}) {
  const { x, y } = slotCentre(tier, 0);

  return (
    <g className="group">
      <circle
        cx={x}
        cy={y - 2}
        r={EGG_RY + 3}
        fill="var(--color-yolk)"
        className="opacity-0 transition-opacity duration-200 group-hover:opacity-25 group-focus-within:opacity-25"
      />
      <circle
        cx={x}
        cy={y - 2}
        r={EGG_RY + 4}
        fill="transparent"
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Lift the front egg off tier ${tier + 1}. ${count} remaining.`}
        onClick={onTake}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onTake();
          }
        }}
      />
    </g>
  );
}
