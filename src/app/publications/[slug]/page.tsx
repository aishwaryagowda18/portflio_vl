import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CitationPanel } from "@/components/citation-panel";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { AuthorList, QuartileBadge } from "@/components/publication-card";
import { Meta, Section } from "@/components/section";
import { researchAreaById } from "@/data/research-areas";
import { scholarlyArticleJsonLd } from "@/lib/jsonld";
import {
  allPublications,
  citeAPA,
  citeBibTeX,
  citeRIS,
  doiUrl,
  getPublication,
  primaryLink,
  TYPE_LABEL,
} from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return allPublications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/publications/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) return { title: "Publication not found" };
  const base = pageMetadata({
    title: pub.title.length > 70 ? `${pub.title.slice(0, 67)}…` : pub.title,
    description: `${TYPE_LABEL[pub.type]} (${pub.year})${pub.venue ? ` in ${pub.venue}` : ""} by ${pub.authors.join(", ")}.`,
    path: `/publications/${pub.slug}`,
    type: "article",
  });
  return {
    ...base,
    other: {
      citation_title: pub.title,
      citation_author: pub.authors,
      citation_publication_date: String(pub.year),
      ...(pub.venue && { [pub.type === "journal" ? "citation_journal_title" : "citation_conference_title"]: pub.venue }),
      ...(pub.volume && { citation_volume: pub.volume }),
      ...(pub.issue && { citation_issue: pub.issue }),
      ...(pub.doi && { citation_doi: pub.doi }),
      ...(pub.isbn && { citation_isbn: pub.isbn }),
    },
  };
}

export default function PublicationPage({ params }: PageProps<"/publications/[slug]">) {
  return (
    <Suspense fallback={<PublicationSkeleton />}>
      <PublicationDetail params={params} />
    </Suspense>
  );
}

/** Shown only while an uncached publication URL renders; prerendered pages never display it. */
function PublicationSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading publication">
      <div className="bg-ink">
        <div className="container-page space-y-4 py-14 sm:py-20">
          <div className="h-3 w-40 animate-pulse rounded bg-on-ink/15" />
          <div className="h-10 w-full max-w-3xl animate-pulse rounded bg-on-ink/15" />
          <div className="h-10 w-2/3 max-w-2xl animate-pulse rounded bg-on-ink/15" />
        </div>
      </div>
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

async function PublicationDetail({ params }: Pick<PageProps<"/publications/[slug]">, "params">) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const index = allPublications.findIndex((p) => p.slug === pub.slug);
  const newer = allPublications[index - 1];
  const older = allPublications[index + 1];
  const link = primaryLink(pub);
  const related = allPublications
    .filter((p) => p.slug !== pub.slug && p.areas.some((a) => pub.areas.includes(a)))
    .slice(0, 4);

  const formats = [
    { id: "apa", label: "APA", text: citeAPA(pub) },
    { id: "bibtex", label: "BibTeX", text: citeBibTeX(pub), filename: `${pub.slug}.bib`, mime: "application/x-bibtex" },
    { id: "ris", label: "RIS", text: citeRIS(pub), filename: `${pub.slug}.ris`, mime: "application/x-research-info-systems" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${TYPE_LABEL[pub.type]} · ${pub.year}`}
        title={pub.title}
        crumbs={[
          { name: "Publications", path: "/publications" },
          { name: pub.title.length > 48 ? `${pub.title.slice(0, 45)}…` : pub.title, path: `/publications/${pub.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium text-ink hover:brightness-105"
            >
              <ExternalLink className="size-4" aria-hidden />
              {pub.doi ? "Read via DOI" : "View article"}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <Link
            href="/publications"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-on-ink/25 px-5 text-sm font-medium text-on-ink hover:bg-on-ink/10"
          >
            <ArrowLeft className="size-4" aria-hidden /> All publications
          </Link>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-8">
            <div>
              <h2 className="font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase">Authors</h2>
              <AuthorList authors={pub.authors} className="mt-2 text-base" />
              {pub.corresponding && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Marked * in the CV — PI of the grant / corresponding author / supervision / author with equal credit.
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-3 font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase">Cite this work</h2>
              <CitationPanel formats={formats} />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase">Related publications</h2>
                <ul className="mt-3 divide-y rounded-2xl border bg-card">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/publications/${r.slug}`} className="block p-4 transition-colors hover:bg-muted/60">
                        <span className="block text-sm font-medium">{r.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {r.venue ? `${r.venue} · ` : ""}
                          {r.year}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside aria-label="Publication details">
            <dl className="space-y-4 rounded-2xl border bg-card p-5">
              <Meta label="Type">{TYPE_LABEL[pub.type]}</Meta>
              <Meta label="Status">{pub.status === "under-review" ? "Under review" : "Published"}</Meta>
              {pub.venue && (
                <Meta label={pub.type === "book-chapter" ? "Series" : pub.type === "journal" ? "Journal" : "Proceedings"}>
                  <em>{pub.venue}</em>
                </Meta>
              )}
              {pub.volume && <Meta label="Volume">{pub.volume}</Meta>}
              {pub.issue && <Meta label="Issue / Part">{pub.issue}</Meta>}
              {pub.articleNo && <Meta label="Article no.">{pub.articleNo}</Meta>}
              {pub.pages && <Meta label="Pages">{pub.pages}</Meta>}
              {pub.publisher && <Meta label="Publisher">{pub.publisher}</Meta>}
              {pub.isbn && <Meta label="ISBN">{pub.isbn}</Meta>}
              <Meta label="Year">{pub.year}</Meta>
              {pub.doi && (
                <Meta label="DOI">
                  <a href={doiUrl(pub.doi)} target="_blank" rel="noopener noreferrer" className="link-underline break-all">
                    {pub.doi}
                  </a>
                </Meta>
              )}
              {!pub.doi && pub.url && (
                <Meta label="Link">
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="link-underline break-all">
                    {pub.url}
                  </a>
                </Meta>
              )}
              {(pub.impactFactor || pub.quartile) && pub.status !== "under-review" && (
                <Meta label="Impact factor / Quartile (CV)">
                  <span className="inline-flex items-center gap-2">
                    {pub.impactFactor ?? "—"} <QuartileBadge q={pub.quartile} />
                  </span>
                </Meta>
              )}
              <Meta label="Scope">{pub.scope === "international" ? "International" : "National"}</Meta>
              {pub.areas.length > 0 && (
                <Meta label="Research area">
                  <ul className="space-y-1">
                    {pub.areas.map((a) => (
                      <li key={a}>
                        <Link href={`/research#${a}`} className="link-underline">
                          {researchAreaById[a].title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Meta>
              )}
            </dl>
          </aside>
        </div>

        <nav aria-label="Adjacent publications" className="mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2">
          {newer ? (
            <Link href={`/publications/${newer.slug}`} className="group rounded-2xl border p-4 hover:bg-muted/60">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden /> Newer
              </span>
              <span className="mt-1 line-clamp-2 block text-sm font-medium">{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {older && (
            <Link href={`/publications/${older.slug}`} className="group rounded-2xl border p-4 text-right hover:bg-muted/60">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Older <ArrowRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1 line-clamp-2 block text-sm font-medium">{older.title}</span>
            </Link>
          )}
        </nav>
      </Section>

      <JsonLd data={scholarlyArticleJsonLd(pub)} />
    </>
  );
}
