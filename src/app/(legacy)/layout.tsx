import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "../eggflow.css";

/**
 * TRANSITIONAL.
 *
 * These are the pages from the previous multi-page build. They still run on
 * `eggflow.css`, which is scoped entirely under `.ef` and therefore cannot
 * collide with the new landing page's tokens.
 *
 * They are grouped here rather than deleted so that nothing 404s while the
 * rest of the site is rebuilt. When each page is rewritten in the new design,
 * move it out of this group. When the group is empty, delete `eggflow.css`,
 * `components/site/` and this file.
 */
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ef">
      <div className="ef-shell">
        <Header />
        <main className="ef-main" id="content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
