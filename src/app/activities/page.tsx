import { Building2, ExternalLink, GraduationCap, Mic, Presentation, School, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import {
  institutionalRoles,
  invitedTalks,
  professionalDevelopment,
  sessionChairs,
  universityRoles,
} from "@/data/activities";
import { conferencesOrganised, workshopsOrganised } from "@/data/conferences";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Academic Activities",
  description: `Invited talks, session chairs, conferences and workshops organised, institutional leadership and university service of ${profile.fullName}.`,
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Service & leadership"
        title="Academic activities"
        description="Invited talks, events organised, institutional leadership and university-level responsibilities."
        crumbs={[{ name: "Academic Activities", path: "/activities" }]}
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2 text-xs">
          {[
            ["#talks", "Invited talks"],
            ["#chairs", "Session chairs"],
            ["#organised", "Events organised"],
            ["#leadership", "Leadership"],
            ["#development", "Professional development"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-on-ink/20 px-3 py-1.5 text-on-ink/85 hover:bg-on-ink/10">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Section id="talks" labelledBy="talks-title" className="scroll-mt-16">
        <SectionHeading id="talks-title" eyebrow="Speaking" title="Invited talks" />
        <div className="grid gap-4 md:grid-cols-2">
          {invitedTalks.map((t, i) => (
            <Reveal key={t.title + t.date} delay={(i % 2) * 0.05}>
              <article className="flex h-full gap-4 rounded-2xl border bg-card p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Mic className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{t.date}</p>
                  <h3 className="mt-0.5 font-semibold">{t.title === "Invited Talk" ? t.event : `“${t.title}”`}</h3>
                  {t.title !== "Invited Talk" && <p className="mt-1 text-sm">{t.event}</p>}
                  <p className="mt-1 text-sm text-muted-foreground">{t.host}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section id="chairs" aria-labelledby="chairs-title" className="scroll-mt-16 bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="chairs-title" eyebrow="Conferences" title="Session chair" />
          <div className="grid gap-4 md:grid-cols-2">
            {sessionChairs.map((s) => (
              <article key={s.event} className="rounded-2xl border bg-card p-5">
                <p className="text-xs font-medium text-muted-foreground">{s.date}</p>
                <h3 className="mt-1 font-semibold">{s.event}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.host}</p>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    Conference website <ExternalLink className="size-3.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section id="organised" labelledBy="organised-title" className="scroll-mt-16">
        <SectionHeading
          id="organised-title"
          eyebrow="Events"
          title="Conferences & workshops organised"
          description="As Main Coordinator and Convener."
        />
        <ul className="space-y-3">
          {conferencesOrganised.map((c) => (
            <li key={c.name} className="flex gap-4 rounded-2xl border border-gold/40 bg-accent/40 p-5">
              <Presentation className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">
                  {c.dates} · {c.venue} · {c.role} ({c.support})
                </p>
              </div>
            </li>
          ))}
          {workshopsOrganised.map((w) => (
            <li key={w.title + w.dates} className="flex gap-4 rounded-2xl border bg-card p-5">
              <Users className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
              <div>
                <p className="font-semibold">{w.title}</p>
                <p className="text-sm text-muted-foreground">
                  {w.dates}
                  {"venue" in w && ` · ${w.venue}`}
                  {"note" in w && ` · ${w.note}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section id="leadership" aria-labelledby="leadership-title" className="scroll-mt-16 bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="leadership-title" eyebrow="Leadership" title="Institutional & university roles" />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Building2 className="size-5 text-gold-ink" aria-hidden /> At MITM
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {institutionalRoles.map((r) => (
                  <li key={r} className="border-b border-border/60 pb-2.5 last:border-0 last:pb-0">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <School className="size-5 text-gold-ink" aria-hidden /> VTU Belagavi & other institutions
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {universityRoles.map((r) => (
                  <li key={r} className="border-b border-border/60 pb-2.5 last:border-0 last:pb-0">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section id="development" labelledBy="development-title" className="scroll-mt-16">
        <SectionHeading
          id="development-title"
          eyebrow="Learning"
          title="Short-term courses, FDPs & workshops attended"
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {professionalDevelopment.map((d) => (
            <li key={d.title} className="flex gap-3 rounded-xl border bg-card p-4 text-sm">
              <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
              <span>
                <span className="font-medium">{d.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {["by" in d ? d.by : null, "date" in d ? d.date : null].filter(Boolean).join(" · ")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
