"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getHeaderVisibility, type HeaderMotionState } from "@/lib/landing-motion";
import { site } from "@/lib/site";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const stateRef = useRef<HeaderMotionState>({ visible: true, direction: 0, distance: 0, y: 0 });
  const interactingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const ownsFocus = interactingRef.current || Boolean(headerRef.current?.contains(document.activeElement));
      stateRef.current = getHeaderVisibility(stateRef.current, window.scrollY, ownsFocus);
      setVisible(stateRef.current.visible);
    };
    const onScroll = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
    };
    stateRef.current = { ...stateRef.current, y: window.scrollY };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function reveal() {
    interactingRef.current = true;
    stateRef.current = { ...stateRef.current, visible: true, distance: 0, direction: 0 };
    setVisible(true);
  }

  return (
    <header ref={headerRef} data-visible={visible} onFocus={reveal} onPointerEnter={reveal} onPointerLeave={() => { interactingRef.current = false; }} className="site-header fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-carton/90 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-6 px-8">
        <Link href="/" className="font-display text-[1.35rem] font-extrabold tracking-tight text-ink">EggFlow</Link>
        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => <a key={item.href} href={item.href} className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink">{item.label}</a>)}
        </nav>
        <a href="#buy" className="rounded-full bg-yolk px-5 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-yolk-deep">Order one</a>
      </div>
    </header>
  );
}
