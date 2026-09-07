import { product } from "@/lib/product";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-shell">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-[1.35rem] font-extrabold tracking-tight">EggFlow</p>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{product.tagline}</p>
          </div>

          <nav aria-label="Sections" className="flex flex-col gap-2 text-[0.95rem]">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-2xl text-[0.8rem] leading-relaxed text-ink-faint">
            Dimensions and the BPA-free description are the supplier&rsquo;s own published
            figures. We have not measured a unit or been shown a test report, and this line
            stays here until we have.
          </p>
        </div>
      </div>
    </footer>
  );
}
