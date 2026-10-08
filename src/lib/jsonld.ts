import { education, honors, profile } from "@/data/profile";
import { researchAreas } from "@/data/research-areas";
import {
  doiUrl,
  primaryLink,
  TYPE_LABEL,
  type PublicationEntry,
} from "@/lib/publications";
import { siteUrl, siteDescription, siteName } from "@/lib/site";

const personId = `${siteUrl}/#person`;
const orgId = `${siteUrl}/#organization`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.fullName,
    givenName: "Vijaylakshmi",
    familyName: "Dayal",
    honorificPrefix: profile.honorificPrefix,
    jobTitle: `${profile.jobTitle}, ${profile.department}`,
    description: siteDescription,
    image: `${siteUrl}${profile.photo}`,
    url: siteUrl,
    email: `mailto:${profile.emails[1].address}`,
    sameAs: [profile.googleScholar, profile.orcid],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: profile.orcidId,
    },
    worksFor: {
      "@type": "CollegeOrUniversity",
      "@id": orgId,
      name: profile.institution,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mandya",
        postalCode: "571477",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Birla Institute of Technology, Mesra" },
      { "@type": "CollegeOrUniversity", name: "Vinoba Bhave University" },
    ],
    hasCredential: education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: `${e.degree} ${e.field}`,
    })),
    award: honors.map((h) => h.title),
    knowsAbout: researchAreas.map((a) => a.title),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: "en",
    about: { "@id": personId },
  };
}

export function profilePageJsonLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteUrl}${path}`,
    name,
    mainEntity: { "@id": personId },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function scholarlyArticleJsonLd(p: PublicationEntry) {
  const link = primaryLink(p);
  return {
    "@context": "https://schema.org",
    "@type": p.type === "book-chapter" ? "Chapter" : "ScholarlyArticle",
    headline: p.title.slice(0, 110),
    name: p.title,
    url: `${siteUrl}/publications/${p.slug}`,
    datePublished: String(p.year),
    genre: TYPE_LABEL[p.type],
    creativeWorkStatus: p.status === "under-review" ? "Under review" : "Published",
    author: p.authors.map((name) =>
      /dayal/i.test(name) ? { "@id": personId, "@type": "Person", name } : { "@type": "Person", name },
    ),
    ...(p.venue && {
      isPartOf: {
        "@type": p.type === "journal" ? "Periodical" : p.type === "book-chapter" ? "Book" : "PublicationEvent",
        name: p.venue,
        ...(p.isbn && { isbn: p.isbn }),
      },
    }),
    ...(p.volume && { volumeNumber: p.volume }),
    ...(p.issue && { issueNumber: p.issue }),
    ...(p.pages && { pagination: p.pages }),
    ...(p.publisher && { publisher: { "@type": "Organization", name: p.publisher } }),
    ...(p.doi && {
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
      sameAs: doiUrl(p.doi),
    }),
    ...(!p.doi && link && { sameAs: link }),
  };
}
