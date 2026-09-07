"use client";

import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { mechanism } from "@/lib/product";
import { Channel, ChannelWall, Egg, RackDefs } from "./RackArt";
import {
  BACK_X,
  EGG_RY,
  FRONT_X,
  PER_TIER,
  POST_OVERLAP,
  railY,
  slotCentre,
} from "./rack-geometry";

/**
 * The one piece of motion on this page that the reader did not click for.
 *
 * It earns that because it is not decoration: it is the product explaining
 * itself. Scrolling advances the line of eggs, which is precisely what the
 * object does. Nothing else on the page animates on scroll.
 *
 * Under `prefers-reduced-motion` the whole thing degrades to three static
 * frames stacked vertically, with the same words. The information survives;
 * only the movement goes.
 */
export function MechanismScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Three stages across the pinned scroll, with the last third held so the
    // final state is readable before the section releases.
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setStage((prev) => (prev === next ? prev : next));
  });

  if (reduced) {
    return (
      <section className="on-ink bg-ink py-20 text-shell" aria-labelledby="mechanism-heading">
        <div className="mx-auto max-w-5xl px-6">
          <Heading />
          <ol className="mt-14 flex flex-col gap-16">
            {mechanism.map((step, i) => (
              <li key={step.step}>
                <div className="h-[150px]">
                  <Lane taken={i} reduced />
                </div>
                <div className="mt-6 max-w-xl">
                  <h3 className="font-display text-h3 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-shell/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="on-ink relative bg-ink text-shell"
      style={{ height: "300vh" }}
      aria-labelledby="mechanism-heading"
    >
      {/* Pinned below the header, and everything inside is sized in viewport
          units so it fits a short laptop window as well as a tall monitor. */}
      <div className="sticky top-[var(--header-h)] flex h-[calc(100dvh-var(--header-h))] items-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-[clamp(0.75rem,2.6vh,2.25rem)] px-6 py-[clamp(1rem,3vh,2.5rem)]">
          <Heading />

          <div className="h-[clamp(104px,24vh,230px)]">
            <Lane taken={stage} />
          </div>

          <div className="relative min-h-[7.5rem]">
            {mechanism.map((step, i) => (
              <motion.div
                key={step.step}
                aria-hidden={stage !== i}
                initial={false}
                animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 10 }}
                transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                className="absolute inset-x-0 top-0 max-w-xl"
                style={{ pointerEvents: stage === i ? "auto" : "none" }}
              >
                <h3 className="font-display text-h3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-shell/70">{step.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Three marks. This content genuinely is a sequence, so counting it
              carries information. */}
          <ol className="flex gap-2" aria-hidden>
            {mechanism.map((step, i) => (
              <li
                key={step.step}
                className={`h-[3px] w-10 rounded-full transition-colors duration-300 ${
                  i <= stage ? "bg-yolk" : "bg-shell/25"
                }`}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <div className="max-w-2xl">
      <h2
        id="mechanism-heading"
        className="font-display text-[clamp(1.6rem,1.1rem+2vw,2.75rem)] font-bold"
      >
        There is no motor. There is a slope.
      </h2>
      <p className="mt-2 text-shell/70">
        Scroll, and the line moves the way it moves on your shelf.
      </p>
    </div>
  );
}

/**
 * A single channel from the rack, drawn with the same geometry as the hero so
 * it is recognisably the same object. `taken` is how many eggs have been
 * lifted off the front.
 */
function Lane({ taken, reduced = false }: { taken: number; reduced?: boolean }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const filling = inView && !reduced;
  const entry = { x: BACK_X - 12, y: railY(0, BACK_X) - EGG_RY * 0.82 - 34 };
  const remaining = Math.max(PER_TIER - taken, 0);
  const eggs = Array.from({ length: remaining }, (_, i) => i + taken);

  // Frame from the geometry, not from a guessed margin. The highest point in
  // the drawing is the top of the egg at the raised BACK of the rail, which
  // sits RISE higher than the front — miss that and the back eggs get cropped.
  const PAD = 14;
  const top = slotCentre(0, PER_TIER - 1).y - EGG_RY - PAD;
  const bottom = railY(0, FRONT_X) + 16 + PAD;
  const left = FRONT_X - POST_OVERLAP - PAD;
  const right = BACK_X + POST_OVERLAP + PAD;

  return (
    <svg
      ref={ref}
      viewBox={`${left} ${top} ${right - left} ${bottom - top}`}
      className="block h-full w-full text-yolk"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <RackDefs id={id} tone="dark" />
      <Channel id={id} tier={0} />
      <AnimatePresence initial={false}>
        {(inView || reduced) &&
          eggs.map((eggId, i) => {
            const { x, y } = slotCentre(0, i);
            return (
              <Egg
                key={eggId}
                id={id}
                x={x}
                y={y}
                seed={eggId + 3}
                animate={!reduced}
                enter={filling ? entry : undefined}
                delay={filling ? i * 0.16 : 0}
              />
            );
          })}
      </AnimatePresence>
      <ChannelWall id={id} tier={0} />
    </svg>
  );
}
