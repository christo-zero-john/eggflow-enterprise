import { product } from "@/lib/product";
import { site } from "@/lib/site";
import { faqs } from "@/lib/product";

/**
 * Only facts that appear on the page go in here. Marking up a rating you do not
 * display, or an offer you do not honour, is a manual-action risk in Google
 * Search and is also just lying in a machine-readable format.
 */
export function ProductJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: site.description,
    image: product.images
      .map((i) => i.src)
      .filter((src): src is string => src !== null),
    material: product.material.value,
    countryOfOrigin: product.countryOfOrigin,
    offers: {
      "@type": "Offer",
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: "https://schema.org/InStock",
      url: product.buyUrl,
      seller: { "@type": "Organization", name: product.seller.name },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratings.average,
      ratingCount: product.ratings.count,
      reviewCount: product.ratings.reviewCount,
    },
    review: product.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
