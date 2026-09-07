"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { getStepTarget, getStoryState } from "@/lib/landing-motion";

const steps = [
  { title: "Ready at the front", body: "The curved outlet keeps the foremost egg separate and easy to reach.", src: "/images/story/ready.png", alt: "White four-tier egg shelf with an egg ready at the curved outlet" },
  { title: "Take one", body: "Lift the front egg directly from the tray—no lid to open and no stack to move.", src: "/images/story/take.png", alt: "A hand lifting the foremost egg from the white holder" },
  { title: "The next one arrives", body: "The inclined channel lets the next egg settle into the available space using gravity.", src: "/images/story/next.png", alt: "The next brown egg resting at the outlet after one has been taken" },
] as const;

export function MechanismScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [story, setStory] = useState(() => getStoryState(0));
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) =>
    setStory((previous) => getStoryState(progress, previous.active)),
  );

  function goToStep(index: number) {
    const track = trackRef.current;
    if (!track) return;
    // `offsetTop` is measured from the nearest positioned ancestor, not the
    // document, so it pointed at the wrong place and the click appeared to do
    // nothing. The rect plus current scroll is the actual document position.
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, track.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: trackTop + travel * getStepTarget(index),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  if (reducedMotion) {
    return (
      <section id="how" className="on-ink bg-ink px-8 py-24 text-shell" aria-labelledby="story-heading">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shell/55">Everyday use</p>
          <h2 id="story-heading" className="mt-4 font-display text-h2 font-bold">See what makes it useful.</h2>
          <ol className="mt-12 grid gap-14">
            {steps.map((step) => (
              <li key={step.title} className="grid items-center gap-7 lg:grid-cols-2">
                <div><h3 className="font-display text-[1.65rem] font-bold">{step.title}</h3><p className="mt-3 text-shell/70">{step.body}</p></div>
                <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#ede6da]"><Image src={step.src} alt={step.alt} fill sizes="(min-width: 1024px) 450px, 90vw" className="object-cover" /></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={trackRef} id="how" className="story-track on-ink relative bg-ink text-shell" aria-labelledby="story-heading">
      <div className="story-stage">
        <div className="story-layout mx-auto grid w-full max-w-[1200px] items-center gap-10 px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shell/55">Everyday use</p>
            <h2 id="story-heading" className="mt-4 font-display text-h2 font-bold">See what makes it useful.</h2>

            <div className="story-copy-stack mt-7 grid">
              {steps.map((step, index) => (
                  <div key={step.title} className="col-start-1 row-start-1 transition-opacity duration-300" style={{ opacity: story.active === index ? 1 : 0, pointerEvents: story.active === index ? "auto" : "none" }} aria-hidden={story.active !== index}>
                  <h3 className="font-display text-[1.65rem] font-bold">{step.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-shell/70">{step.body}</p>
                </div>
              ))}
            </div>

            {/* Crumbs rather than numbers. Three marks show where you are and
                how much is left; the number was information nobody needed. */}
            <ol className="mt-8 flex items-center gap-2" aria-label="Product story steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <button
                    type="button"
                    aria-current={story.active === index ? "step" : undefined}
                    aria-label={`Step ${index + 1} of ${steps.length}: ${step.title}`}
                    onClick={() => goToStep(index)}
                    className="group flex h-10 cursor-pointer items-center px-1"
                  >
                    <span
                      className={`block h-[5px] rounded-full transition-all duration-300 ease-out ${
                        story.active === index
                          ? "w-14 bg-yolk"
                          : "w-7 bg-shell/25 group-hover:bg-shell/55"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ol>
            <a href="#size" className="mt-7 inline-flex text-sm text-shell/65 underline decoration-shell/30 underline-offset-4 hover:text-shell">Skip to size</a>
          </div>

          <figure className="story-media relative mx-auto aspect-square w-full max-w-[550px] overflow-hidden rounded-[20px] bg-[#ede6da]">
            {steps.map((step, index) => (
              <Image key={step.src} src={step.src} alt={story.active === index ? step.alt : ""} aria-hidden={story.active !== index} fill sizes="(min-width: 1280px) 550px, (min-width: 1024px) 48vw, 90vw" className="object-cover" style={{ opacity: story.opacity[index], transition: "opacity 120ms linear" }} />
            ))}
          </figure>
        </div>
      </div>
    </section>
  );
}
