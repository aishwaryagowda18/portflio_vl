import { Plane } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Meta, Section, SectionHeading } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { researchGrants, travelGrants } from "@/data/grants";
import { profile } from "@/data/profile";
import { metrics } from "@/lib/metrics";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Research Grants",
  description: `Funded research projects of ${profile.fullName} from UGC-DAE CSR, SERB-DST and DAE-BRNS (BARC), and international travel grants.`,
  path: "/grants",
});

const span = { min: 2011, max: 2027 };

export default function GrantsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Funding"
        title="Research grants"
        description="Externally funded research projects and travel grants, as listed in the CV."
        crumbs={[{ name: "Grants", path: "/grants" }]}
      />

      <Section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard value={metrics.researchGrants} label="Research grants" detail={`${metrics.ongoingGrants} ongoing`} />
          <StatCard value={`≈ ₹${metrics.grantLakh} L`} label="Total funding" detail="Sum of approximate amounts in the CV" />
          <StatCard value={3} label="Funding agencies" detail="UGC-DAE CSR, SERB-DST, DAE-BRNS" />
          <StatCard value={metrics.travelGrants} label="Travel grants" detail="ITS SERB (2023), AICTE (2012)" />
        </div>

        {/* Gantt-style timeline */}
        <div className="mt-12 rounded-2xl border bg-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold">Project timeline</h2>
          <div className="mt-5 space-y-3">
            {researchGrants.map((g) => {
              const left = ((g.startYear - span.min) / (span.max - span.min)) * 100;
              const width = ((g.endYear - g.startYear) / (span.max - span.min)) * 100;
              // Bars reaching the end of the axis grow leftwards so their label never overflows the track.
              const position = left + width >= 99 ? { right: 0, width: `${width}%` } : { left: `${left}%`, width: `${width}%` };
              return (
                <div key={g.slug} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 text-xs sm:grid-cols-[9rem_1fr]">
                  <span className="truncate text-muted-foreground" title={g.agency}>
                    {g.scheme.replace(/ \(.*\)/, "")}
                  </span>
                  <div className="relative h-7 rounded-full bg-muted">
                    <div
                      className={cn(
                        "absolute inset-y-0 flex min-w-fit items-center justify-center rounded-full px-2.5 font-medium whitespace-nowrap",
                        g.status === "Ongoing" ? "bg-gold text-ink" : "bg-chart-1 text-primary-foreground",
                      )}
                      style={position}
                    >
                      {g.period}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-[6.5rem_1fr] gap-3 text-[10px] text-muted-foreground sm:grid-cols-[9rem_1fr]" aria-hidden>
              <span />
              <div className="flex justify-between tabular-nums">
                <span>{span.min}</span>
                <span>2015</span>
                <span>2019</span>
                <span>2023</span>
                <span>{span.max}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-gold" aria-hidden /> Ongoing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-chart-1" aria-hidden /> Completed
            </span>
          </p>
        </div>

        <div className="mt-12 space-y-5">
          <SectionHeading eyebrow="Projects" title="Funded research projects" className="mb-6 sm:mb-6" />
          {researchGrants.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.04}>
              <article className="grid gap-6 rounded-2xl border bg-card p-6 lg:grid-cols-[1fr_17rem]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 font-semibold",
                        g.status === "Ongoing" ? "bg-gold/25 text-gold-ink" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {g.status}
                    </span>
                    <span className="font-medium tabular-nums">{g.period}</span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug font-semibold">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.agency}</p>
                </div>
                <dl className="grid grid-cols-2 gap-4 rounded-xl bg-surface p-4 lg:grid-cols-1">
                  <Meta label="Scheme">{g.scheme}</Meta>
                  <Meta label="Amount">{g.amount}</Meta>
                  <Meta label="Reference">
                    <span className="break-words">{g.reference}</span>
                  </Meta>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Travel" title="Travel grants" className="mb-6 sm:mb-6" />
          <div className="grid gap-4 md:grid-cols-2">
            {travelGrants.map((t) => (
              <article key={t.year} className="flex gap-4 rounded-2xl border bg-card p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Plane className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.year}</span> · {t.sponsor}
                  </p>
                  <h3 className="mt-1 text-sm leading-relaxed font-medium">{t.purpose}</h3>
                  <p className="mt-2 text-xs font-medium text-gold-ink">{t.amount}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
