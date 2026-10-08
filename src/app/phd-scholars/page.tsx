import Link from "next/link";
import { CheckCircle2, Hourglass } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { profile } from "@/data/profile";
import { scholars, type Scholar } from "@/data/scholars";
import { metrics } from "@/lib/metrics";
import { allPublications, isPublished } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ph.D. Scholars",
  description: `Doctoral scholars supervised by ${profile.fullName}: ${metrics.phdAwarded} Ph.D.s awarded and ${metrics.phdOngoing} under supervision.`,
  path: "/phd-scholars",
});

function ScholarCard({ s }: { s: Scholar }) {
  const pubs = s.authorMatch
    ? allPublications.filter((p) => isPublished(p) && p.authors.some((a) => a.includes(s.authorMatch!)))
    : [];
  const awarded = s.status === "Awarded";
  return (
    <article className="flex h-full flex-col rounded-2xl border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{s.name}</h3>
          {s.position && <p className="text-xs text-muted-foreground">{s.position}</p>}
        </div>
        <span
          className={
            awarded
              ? "inline-flex shrink-0 items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-semibold text-gold-ink"
              : "inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
          }
        >
          {awarded ? <CheckCircle2 className="size-3.5" aria-hidden /> : <Hourglass className="size-3.5" aria-hidden />}
          {s.status}
        </span>
      </div>
      <p className="mt-4 flex-1 font-heading text-[17px] leading-snug italic">{s.topic}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t pt-4 text-xs">
        <div>
          <dt className="text-muted-foreground">Registered</dt>
          <dd className="mt-0.5 font-medium">{s.registered}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mode</dt>
          <dd className="mt-0.5 font-medium">{s.mode ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{awarded ? "Outcome" : "Progress"}</dt>
          <dd className="mt-0.5 font-medium">{s.outcome.replace("Awarded: ", "")}</dd>
        </div>
      </dl>
      {pubs.length > 0 && (
        <p className="mt-4 text-xs">
          <Link
            href={`/publications?q=${encodeURIComponent(s.authorMatch!)}`}
            className="font-medium text-primary hover:underline"
          >
            {pubs.length} co-authored publication{pubs.length > 1 ? "s" : ""} →
          </Link>
        </p>
      )}
    </article>
  );
}

export default function ScholarsPage() {
  const awarded = scholars.filter((s) => s.status === "Awarded");
  const pursuing = scholars.filter((s) => s.status === "Pursuing");
  return (
    <>
      <PageHeader
        eyebrow="Supervision"
        title="Ph.D. scholars"
        description="Doctoral research supervised in manganites, ferromagnetic/ferroelectric heterostructures, thermoelectrics, microwave dielectrics, magnetic thin films and photocatalysis."
        crumbs={[{ name: "Ph.D. Scholars", path: "/phd-scholars" }]}
      />
      <Section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard value={metrics.phdAwarded} label="Ph.D.s awarded" detail="2017 – 2025" />
          <StatCard value={metrics.phdOngoing} label="Under supervision" detail="Registered 2019 – 2025" />
          <StatCard value={scholars.filter((s) => s.mode === "Full Time").length} label="Full-time scholars" />
          <StatCard value={scholars.filter((s) => s.mode === "Part Time").length} label="Part-time scholars" />
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Completed" title="Ph.D. awarded" className="mb-6 sm:mb-6" />
          <div className="grid gap-4 md:grid-cols-2">
            {awarded.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04} className="h-full">
                <ScholarCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Ongoing" title="Currently under supervision" className="mb-6 sm:mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pursuing.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04} className="h-full">
                <ScholarCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
