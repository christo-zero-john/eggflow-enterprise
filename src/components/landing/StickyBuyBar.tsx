"use client";

import { useEffect, useState } from "react";
import { product } from "@/lib/product";

/**
 * On a phone the hero call to action scrolls away after a few hundred pixels
 * and never comes back, so the only way to act is to scroll all the way down.
 * This puts the price and the action back within thumb reach once the hero is
 * gone, and gets out of the way again at the bottom of the page where the real
 * call to action lives.
 *
 * Desktop does not need it — the header carries a persistent action there.
 */
export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const foot = document.getElementById("buy");
    if (!hero || !foot) return;

    let heroGone = false;
    let atFooter = false;
    const update = () => setVisible(heroGone && !atFooter);

    const heroWatcher = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting;
        update();
      },
      { rootMargin: "-8px 0px 0px 0px" },
    );
    const footWatcher = new IntersectionObserver(([entry]) => {
      atFooter = entry.isIntersecting;
      update();
    });

    heroWatcher.observe(hero);
    footWatcher.observe(foot);
    return () => {
      heroWatcher.disconnect();
      footWatcher.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-carton/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from assistive tech and from tab order while it is off-screen.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div>
          <p className="tnum font-display text-[1.35rem] font-extrabold leading-none">
            {product.price.display}
          </p>
          <p className="text-[0.8rem] text-ink-faint">{product.packQuantity}</p>
        </div>
        <a
          href="#buy"
          className="rounded-full bg-yolk px-6 py-3 font-semibold text-ink transition-colors hover:bg-yolk-deep"
        >
          Order one
        </a>
      </div>
    </div>
  );
}
