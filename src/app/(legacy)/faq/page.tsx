import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Disclosure } from "@/components/ui/Disclosure";
import { FaqJsonLd } from "@/components/eggflow/StructuredData";
import { faqs } from "@/lib/product";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Straight answers about capacity, shelf fit, the plastic grade, cleaning and who actually fulfils the order.",
  alternates: { canonical: "/faq" },
};

/** Stable anchor per question so a specific answer can be linked to directly. */
const slug = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <section className="ef-section">
        <Container narrow>
          <div className="ef-stack-lg">
            <h1 className="ef-h2">Questions</h1>
            <p className="ef-lead">
              Including the ones with answers we would rather not have to give. Every question below
              has its own link, so you can send someone straight to the answer.
            </p>

            <div>
              {faqs.map((faq) => (
                <Disclosure key={faq.q} question={faq.q} id={slug(faq.q)}>
                  <p>{faq.a}</p>
                </Disclosure>
              ))}
            </div>

            <p className="ef-body">
              Something not covered here? <Link href="/contact">Ask us</Link> and the answer gets
              added to this page.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
