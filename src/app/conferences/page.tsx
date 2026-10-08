import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeading } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { conferencesOrganised, presentations } from "@/data/conferences";
import { profile } from "@/data/profile";
import { metrics } from "@/lib/metrics";
import { isDayal } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conferences",
  description: `${metrics.presentations} conference presentations by the research group of ${profile.fullName} — including Intermag, MMM, APS March Meeting and DAE Solid State Physics Symposium — and conferences organised.`,
  path: "/conferences",
});

export default function ConferencesPage() {
  const years = Array.from(new Set(presentations.map((p) => p.year))).sort((a, b) => b - a);
  const orals = presentations.filter((p) => p.format === "Oral").length;
  const events = new Set(presentations.map((p) => p.event)).size;

  return (
    <>
      <PageHeader
        eyebrow="Conferences"
        title="Conferences & presentations"
        description="Paper presentations by the research group at national and international conferences, 2003–2026."
        crumbs={[{ name: "Conferences", path: "/conferences" }]}
      />

      <Section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard value={metrics.presentations} label="Presentations" detail="Listed in the CV" />
          <StatCard value={events} label="Distinct events" />
          <StatCard value={orals} label="Marked oral" detail="Where the CV specifies format" />
          <StatCard value={conferencesOrganised.length} label="Conference convened" detail="ICMSAA-2026" />
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Organised" title="Conference organised" className="mb-6 sm:mb-6" />
          {conferencesOrganised.map((c) => (
            <article key={c.name} className="rounded-2xl border border-gold/40 bg-accent/40 p-6">
              <p className="text-xs font-semibold tracking-wider text-gold-ink uppercase">{c.role}</p>
              <h3 className="mt-2 text-xl font-semibold">{c.name}</h3>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden /> {c.dates}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden /> {c.venue}
                </span>
              </p>
              <p className="mt-2 text-sm font-medium">{c.support}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Presentations" title="Paper presentations by year" className="mb-6 sm:mb-6" />
          <nav aria-label="Jump to year" className="mb-8 flex flex-wrap gap-1.5">
            {years.map((y) => (
              <a key={y} href={`#y${y}`} className="rounded-full border px-3 py-1 text-xs tabular-nums hover:bg-muted">
                {y}
              </a>
            ))}
          </nav>
          <div className="space-y-10">
            {years.map((y) => (
              <section key={y} id={`y${y}`} aria-labelledby={`y${y}-h`} className="scroll-mt-24">
                <h3 id={`y${y}-h`} className="flex items-baseline gap-3 text-2xl font-semibold">
                  {y}
                  <span className="text-sm font-normal text-muted-foreground">
                    {presentations.filter((p) => p.year === y).length} presentation(s)
                  </span>
                </h3>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {presentations
                    .filter((p) => p.year === y)
                    .map((p) => (
                      <li key={p.cvNo} className="rounded-2xl border bg-card p-5">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{p.event}</span>
                          {p.format && (
                            <span className="rounded-full bg-gold/20 px-2 py-0.5 font-semibold text-gold-ink">{p.format}</span>
                          )}
                          <span className="text-muted-foreground">{p.dates}</span>
                        </div>
                        <p className="mt-2 leading-snug font-medium">{p.title}</p>
                        {p.authors && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {p.authors.map((a, i) => (
                              <span key={`${a}-${i}`}>
                                {isDayal(a) ? <strong className="text-foreground">{a}</strong> : a}
                                {i < p.authors!.length - 1 && ", "}
                              </span>
                            ))}
                          </p>
                        )}
                        {p.eventFullName && <p className="mt-2 text-xs italic">{p.eventFullName}</p>}
                        <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden /> {p.place}
                        </p>
                        {p.note && <p className="mt-1 text-[11px] text-muted-foreground">{p.note}</p>}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
