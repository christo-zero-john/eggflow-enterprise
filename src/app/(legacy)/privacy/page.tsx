import type { Metadata } from "next";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

/**
 * STUB. Do not ship as-is.
 * A published privacy policy is a prerequisite for advertising on Meta and
 * Google, and is required under India's DPDP Act 2023 if you collect any
 * personal data at all — including through analytics or a pixel.
 */
export default function PrivacyPage() {
  return (
    <section className="ef-section">
      <Container narrow>
        <div className="ef-stack-lg">
          <h1 className="ef-h2">Privacy</h1>
          <p className="ef-note ef-note--flag">
            Placeholder. Replace this page with a real policy before launch: what you collect, why,
            how long you keep it, who you share it with, and how someone asks for deletion. If you
            add analytics or an advertising pixel, that must be disclosed here.
          </p>
        </div>
      </Container>
    </section>
  );
}
