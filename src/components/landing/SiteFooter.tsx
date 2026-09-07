import Link from "next/link";
import { product } from "@/lib/product";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-shell">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-[1.35rem] font-extrabold tracking-tight">EggFlow</p>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{product.tagline}</p>
          </div>

          <nav aria-label="Site" className="flex flex-col gap-2 text-[0.95rem]">
            <Link href="/product" className="text-ink-soft transition-colors hover:text-ink">
              Full specifications
            </Link>
            <Link href="/faq" className="text-ink-soft transition-colors hover:text-ink">
              All questions
            </Link>
            <Link
              href="/shipping-and-returns"
              className="text-ink-soft transition-colors hover:text-ink"
            >
              Delivery and returns
            </Link>
            <Link href="/contact" className="text-ink-soft transition-colors hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-2xl text-[0.8rem] leading-relaxed text-ink-faint">
            Ratings and reviews quoted on this page are from the{" "}
            {product.ratings.source.toLowerCase()}, read on{" "}
            <span className="tnum">{product.ratings.fetchedOn}</span>. They are not this
            site&rsquo;s own. Dimensions and weight are not published because a unit has not been
            measured yet &mdash; the figures on the marketplace listing are placeholder values.
          </p>
        </div>
      </div>
    </footer>
  );
}
