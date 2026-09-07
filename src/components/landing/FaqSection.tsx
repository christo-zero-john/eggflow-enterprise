import { faqs, product } from "@/lib/product";
import { Cta, CtaRow } from "./Cta";
import { ScrollTextPanel } from "./ScrollTextPanel";

export function FaqSection() {
  return (
    <section id="questions" className="dense-section bg-shell" aria-labelledby="questions-heading">
      <div className="dense-section__inner mx-auto grid w-full max-w-[1200px] items-start gap-10 px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch lg:gap-20">
        {/* Pinned to the top of the column so it never moves when an
            answer opens on the right. */}
        <div className="max-w-md lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">Before you decide</p>
          <h2 id="questions-heading" className="mt-4 font-display text-h2 font-bold">Questions worth asking.</h2>
          <p className="mt-5 text-ink-soft">Size, capacity, loading, cleaning and material—the practical details in one place.</p>
          <div className="mt-8"><CtaRow><Cta href="#buy">Buy now &mdash; {product.price.display}</Cta></CtaRow></div>
        </div>

        <div className="dense-copy min-h-0 self-stretch">
          <ScrollTextPanel label="Frequently asked questions">
            {faqs.slice(0, 6).map((faq) => (
              <details key={faq.q} name="faq" className="faq-item group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 font-medium marker:hidden">
                  {faq.q}<span aria-hidden className="mt-1 text-ink-faint transition-transform duration-300 ease-out group-open:rotate-45">+</span>
                </summary>
                <div className="faq-answer">
                  <p className="max-w-[62ch] pb-5 text-[0.95rem] leading-relaxed text-ink-soft">{faq.a}</p>
                </div>
              </details>
            ))}
          </ScrollTextPanel>
          <a href="#buy" className="text-sm font-semibold underline decoration-line-strong underline-offset-4">Continue to order</a>
        </div>
      </div>
    </section>
  );
}
