import { BookOpen, FlaskRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { laboratoryContribution, teaching } from "@/data/teaching";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Teaching",
  description: `Courses taught by ${profile.fullName}: Ph.D. coursework (VTU and University of Mysore), Applied and Engineering Physics at MITM and VTU, and laboratory development.`,
  path: "/teaching",
});

export default function TeachingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Teaching"
        title="Teaching & curriculum"
        description="Doctoral coursework and undergraduate physics teaching since 2001, together with physics laboratory development at MITM."
        crumbs={[{ name: "Teaching", path: "/teaching" }]}
      />
      <Section>
        <ol className="relative space-y-5 border-l-2 pl-8">
          {teaching.map((t, i) => (
            <li key={`${t.institution}-${t.period}`} className="relative">
              <span
                className="absolute top-6 -left-[2.55rem] grid size-7 place-items-center rounded-full border bg-card text-gold-ink ring-4 ring-background"
                aria-hidden
              >
                <BookOpen className="size-3.5" />
              </span>
              <Reveal delay={i * 0.04}>
                <article className="rounded-2xl border bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-semibold">{t.level}</h2>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">{t.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.institution}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.courses.map((c) => (
                      <li key={c} className="rounded-xl bg-surface px-3 py-2 text-sm">
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex gap-4 rounded-2xl border border-gold/40 bg-accent/40 p-6">
          <FlaskRound className="mt-0.5 size-6 shrink-0 text-gold-ink" aria-hidden />
          <div>
            <h2 className="text-lg font-semibold">Laboratory development</h2>
            <p className="mt-1 text-sm leading-relaxed">{laboratoryContribution}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
