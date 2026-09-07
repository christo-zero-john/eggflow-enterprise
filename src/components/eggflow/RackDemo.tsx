"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { product } from "@/lib/product";

/**
 * The hero.
 *
 * The single most characteristic thing about this product is the tilt, and the
 * only real question a buyer has is "does the next egg actually come forward?".
 * So the hero is not a headline over a stock photo — it is the mechanism,
 * working, driven by the reader.
 *
 * All motion here answers a click. Nothing animates on load or on scroll.
 */

const TIERS = product.tiers;
const PER_TIER = product.eggsPerTier;

type Tier = number[]; // stable ids so exit/enter animations stay correct

function fullRack(): Tier[] {
  return Array.from({ length: TIERS }, (_, t) =>
    Array.from({ length: PER_TIER }, (_, i) => t * 100 + i)
  );
}

export function RackDemo() {
  const [tiers, setTiers] = useState<Tier[]>(fullRack);
  const [taken, setTaken] = useState(0);
  const reduce = useReducedMotion();

  const remaining = tiers.reduce((n, t) => n + t.length, 0);

  function takeFrom(tierIndex: number) {
    setTiers((prev) =>
      prev.map((tier, i) => (i === tierIndex ? tier.slice(0, -1) : tier))
    );
    setTaken((n) => n + 1);
  }

  function reset() {
    setTiers(fullRack());
    setTaken(0);
  }

  return (
    <figure className="ef-panel" style={{ padding: "1rem" }}>
      <div className="ef-rack">
        {tiers.map((tier, tierIndex) => {
          const frontId = tier[tier.length - 1];
          return (
            <div className="ef-rack__tier" key={tierIndex}>
              <span className="ef-rack__slot" aria-hidden="true" />
              <AnimatePresence initial={false} mode="popLayout">
                {tier.map((id) => {
                  const isFront = id === frontId;
                  return (
                    <motion.button
                      key={id}
                      layout={!reduce}
                      type="button"
                      className={`ef-rack__egg${isFront ? " ef-rack__egg--live" : ""}`}
                      disabled={!isFront}
                      onClick={() => takeFrom(tierIndex)}
                      aria-label={
                        isFront
                          ? `Take the front egg from tier ${tierIndex + 1}`
                          : `Egg waiting on tier ${tierIndex + 1}`
                      }
                      initial={false}
                      exit={reduce ? {} : { x: 26, y: 20, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 520, damping: 34, mass: 0.5 }
                      }
                    />
                  );
                })}
              </AnimatePresence>
              {tier.length === 0 ? (
                <span className="ef-micro" style={{ paddingRight: "0.25rem" }}>
                  empty
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <figcaption
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          borderTop: "1px solid var(--ef-rail)",
          paddingTop: "0.875rem",
          marginTop: "0.5rem",
        }}
      >
        <p className="ef-micro" aria-live="polite">
          {taken === 0
            ? "Take the outlined egg at the front of any tier."
            : `${taken} taken \u00B7 ${remaining} of ${TIERS * PER_TIER} still on the rack`}
        </p>
        <button type="button" className="ef-btn ef-btn--ghost" onClick={reset} disabled={taken === 0}>
          Refill
        </button>
      </figcaption>
    </figure>
  );
}
