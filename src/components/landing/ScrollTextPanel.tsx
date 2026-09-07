"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ScrollTextPanel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;
    const update = () => setHasMore(panel.scrollTop + panel.clientHeight < panel.scrollHeight - 4);
    update();
    panel.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(panel);
    return () => { panel.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  return (
    <div className="scroll-panel-wrap min-h-0">
      <div ref={ref} className="desktop-scroll-panel" role="region" aria-label={label} tabIndex={0}>{children}</div>
      <p className={`scroll-panel-hint ${hasMore ? "opacity-100" : "opacity-0"}`} aria-hidden>Scroll for more</p>
    </div>
  );
}
