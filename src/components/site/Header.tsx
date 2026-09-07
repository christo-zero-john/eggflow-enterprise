"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { product } from "@/lib/product";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const isCurrent = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className="ef-header">
      <Container>
        <div className="ef-header__inner">
          <Link href="/" className="ef-wordmark">
            {site.name}
          </Link>

          <nav className="ef-header__nav" aria-label="Main">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/product" className="ef-btn ef-btn--primary">
            <span className="ef-num">{product.price.display}</span>
            <span>&middot; See the product</span>
          </Link>
        </div>

        {/* Below the desktop breakpoint the nav becomes a scrollable strip.
            It is never hidden — a hamburger-less mobile header that simply
            drops navigation is the most common failure on pages like this. */}
        <nav className="ef-navstrip" aria-label="Main, compact">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
