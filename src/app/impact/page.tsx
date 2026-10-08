import { ExternalLink, Info } from "lucide-react";
import { BarList, ColumnChart } from "@/components/bar-chart";
import { OrcidIcon, ScholarIcon } from "@/components/icons";
import { LinkButton } from "@/components/link-button";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { profile } from "@/data/profile";
import {
  highestImpactArticle,
  metrics,
  presentationsByYear,
  publicationsByYear,
  quartileDistribution,
  topVenues,
} from "@/lib/metrics";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research Impact Dashboard",
  description: `Publication output, journal quartiles, venues, grants and supervision metrics for ${profile.fullName}, computed from the CV, with live citation metrics on Google Scholar.`,
  path: "/impact",
});

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="min-w-0 rounded-2xl border bg-card p-5 sm:p-6">
      <h2 className="font-sans text-base font-semibold tracking-normal">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ImpactPage() {
  const byYear = publicationsByYear();
  const peak = byYear.reduce((m, d) => (d.value > m.value ? d : m), byYear[0]);
  const recent5 = byYear.filter((d) => Number(d.label) >= 2021 && Number(d.label) <= 2025).reduce((s, d) => s + d.value, 0);

  return (
    <>
      <PageHeader
        eyebrow="Research impact"
        title="Research impact dashboard"
        description="Output and reach of the research programme, computed directly from the CV. Citation counts, h-index and i10-index change continuously and are maintained live on Google Scholar."
        crumbs={[{ name: "Research Impact", path: "/impact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={profile.googleScholar} external variant="gold">
            <ScholarIcon /> Live citations on Google Scholar
          </LinkButton>
          <LinkButton href={profile.orcid} external variant="onInk">
            <OrcidIcon /> ORCID record
          </LinkButton>
        </div>
      </PageHeader>

      <Section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard value={metrics.totalPublished} label="Published works" detail={`${metrics.journalArticles} journal · ${metrics.conferencePapers} proceedings · ${metrics.bookChapters} chapter`} />
          <StatCard value={metrics.q1} label="Q1 journal articles" detail="Quartile as listed in the CV" />
          <StatCard value={metrics.correspondingAuthor} label="Corresponding* / PI papers" detail="Entries marked * in the CV" />
          <StatCard value={highestImpactArticle.impactFactor} label="Highest impact factor" detail={`${highestImpactArticle.venue} (${highestImpactArticle.year}), per CV`} />
          <StatCard value={recent5} label="Works 2021–2025" detail={`Peak year: ${peak.label} (${peak.value})`} />
          <StatCard value={metrics.presentations} label="Conference presentations" detail="2003–2026" />
          <StatCard value={`≈ ₹${metrics.grantLakh} L`} label="Research funding" detail={`${metrics.researchGrants} projects, ${metrics.ongoingGrants} ongoing`} />
          <StatCard value={`${metrics.phdAwarded} + ${metrics.phdOngoing}`} label="Ph.D. scholars" detail="Awarded + under supervision" />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Panel title="Publications per year" subtitle={`Journal articles, proceedings and book chapter, ${byYear[0].label}–${byYear[byYear.length - 1].label}`}>
            <ColumnChart data={byYear} caption="Number of published works per year" labelEvery={3} />
          </Panel>
          <Panel title="Journal quartile distribution" subtitle={`${metrics.journalArticles} published journal articles`}>
            <BarList data={quartileDistribution} caption="Journal articles by quartile" unit="articles" />
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Most frequent journals" subtitle="Published journal articles per venue">
            <BarList data={topVenues(8)} caption="Top journals by number of articles" unit="articles" />
          </Panel>
          <Panel title="Conference presentations per year" subtitle="Presentations by the research group">
            <ColumnChart data={presentationsByYear()} caption="Conference presentations per year" unit="presentations" labelEvery={3} />
          </Panel>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center rounded-2xl border border-gold/40 bg-accent/40 p-6">
          <div className="flex gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
            <div className="text-sm leading-relaxed">
              <p className="font-semibold">About these numbers</p>
              <p className="mt-1 text-muted-foreground">
                All counts are generated from the structured CV data on this site; impact factors and quartiles are
                reproduced exactly as listed in the CV. Citation-based indicators are intentionally not copied here so
                they never go stale — open the Google Scholar profile for current values.
              </p>
            </div>
          </div>
          <a
            href={profile.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Open Google Scholar <ExternalLink className="size-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Section>
    </>
  );
}
