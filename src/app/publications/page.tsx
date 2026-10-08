import { OrcidIcon, ScholarIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LinkButton } from "@/components/link-button";
import { PageHeader } from "@/components/page-header";
import { PublicationExplorer } from "@/components/publication-explorer";
import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { metrics } from "@/lib/metrics";
import { allPublications } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Publications",
  description: `Searchable list of ${allPublications.length} publications by ${profile.fullName} — ${metrics.journalArticles} journal articles, ${metrics.conferencePapers} conference proceedings and ${metrics.bookChapters} book chapter — with DOI links and citation export.`,
  path: "/publications",
});

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Publications"
        description={
          <>
            {metrics.journalArticles} journal articles (plus {metrics.underReview} under review), {metrics.conferencePapers}{" "}
            refereed conference papers and {metrics.bookChapters} book chapter. Impact factors and quartiles are shown as
            listed in the CV. Search, filter, copy citations or export BibTeX.
          </>
        }
        crumbs={[{ name: "Publications", path: "/publications" }]}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={profile.googleScholar} external variant="gold">
            <ScholarIcon /> Google Scholar
          </LinkButton>
          <LinkButton href={profile.orcid} external variant="onInk">
            <OrcidIcon /> ORCID
          </LinkButton>
        </div>
      </PageHeader>

      <Section>
        <PublicationExplorer />
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          Author names in bold indicate Prof. Dayal. “Corresponding*” reproduces the CV’s asterisk: PI of the grant /
          corresponding author / supervision / author with equal credit.
        </p>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Publications of ${profile.fullName}`,
          url: `${siteUrl}/publications`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: allPublications.length,
            itemListElement: allPublications.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteUrl}/publications/${p.slug}`,
              name: p.title,
            })),
          },
        }}
      />
    </>
  );
}
