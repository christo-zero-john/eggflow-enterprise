import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-carton/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <Link
          href="/"
          className="font-display text-[1.35rem] font-extrabold tracking-tight text-ink"
        >
          EggFlow
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#buy"
          className="rounded-full bg-yolk px-4 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-yolk-deep sm:px-5"
        >
          Order one
        </a>
      </div>
    </header>
  );
}
