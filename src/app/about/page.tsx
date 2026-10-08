import Image from "next/image";
import { Download, FileText, GraduationCap, Briefcase } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { OrcidIcon, ScholarIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LinkButton } from "@/components/link-button";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { education, experience, memberships, profile, technicalSkills } from "@/data/profile";
import { profilePageJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { shortBio } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `Biography, education and academic career of ${profile.fullName}, ${profile.jobTitle}, ${profile.department}, ${profile.institution}.`,
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Biography & academic career"
        description={`${profile.jobTitle}, ${profile.department}, ${profile.institution} — ${profile.affiliation}.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section labelledBy="bio-title">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-5">
            <div className="overflow-hidden rounded-2xl border bg-card">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.fullName}`}
                width={201}
                height={295}
                sizes="288px"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="p-4">
                <p className="font-heading font-semibold">{profile.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {profile.jobTitle}, {profile.department}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <LinkButton href={profile.cvFile} download>
                <Download aria-hidden /> Download full CV (PDF)
              </LinkButton>
              <LinkButton href="/short-bio.txt" download variant="outline">
                <FileText aria-hidden /> Download short bio (TXT)
              </LinkButton>
              <LinkButton href={profile.googleScholar} external variant="ghost">
                <ScholarIcon /> Google Scholar profile
              </LinkButton>
              <LinkButton href={profile.orcid} external variant="ghost">
                <OrcidIcon /> ORCID {profile.orcidId}
              </LinkButton>
            </div>
          </aside>

          <div>
            <h2 id="bio-title" className="text-2xl font-semibold sm:text-3xl">
              Short biography
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-foreground/90">
              {shortBio.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <div className="mt-6">
              <CopyButton text={shortBio.join("\n\n")} label="Copy bio" copiedLabel="Bio copied" />
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border bg-card p-5">
                <h3 className="font-sans text-sm font-semibold tracking-wider text-muted-foreground uppercase">Technical skills</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {technicalSkills.map((s) => (
                    <div key={s.label} className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-right font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border bg-card p-5">
                <h3 className="font-sans text-sm font-semibold tracking-wider text-muted-foreground uppercase">Memberships</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {memberships.map((m) => (
                    <li key={m.body}>
                      <span className="font-medium">{m.body}</span>
                      <span className="block text-xs text-muted-foreground">{m.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section aria-labelledby="education-title" className="bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="education-title" eyebrow="Education" title="Academic qualifications" />
          <div className="grid gap-4 lg:grid-cols-3">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.05}>
                <article className="h-full rounded-2xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <GraduationCap className="size-5" aria-hidden />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">{e.period}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    {e.degree} <span className="font-normal text-muted-foreground">— {e.field}</span>
                  </h3>
                  {"thesis" in e && (
                    <p className="mt-2 text-sm leading-relaxed">
                      <span className="text-muted-foreground">Thesis: </span>
                      <em>{e.thesis}</em>
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">{e.institution}</p>
                  <p className="mt-3 text-xs font-medium text-gold-ink">{e.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section id="experience" labelledBy="experience-title">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Academic timeline"
          description={`Total experience (teaching and research): ${profile.experienceSummary.teachingAndResearchYears} years; administrative experience: ${profile.experienceSummary.administrativeYears} years.`}
        />
        <ol className="relative ml-3 space-y-8 border-l-2 border-border pl-8">
          {experience.map((e, i) => (
            <li key={e.period} className="relative">
              <span
                className={`absolute top-1 -left-[2.6rem] grid size-7 place-items-center rounded-full ring-4 ring-background ${"current" in e ? "bg-gold text-ink" : "bg-card text-muted-foreground ring-offset-0"} border`}
                aria-hidden
              >
                <Briefcase className="size-3.5" />
              </span>
              <Reveal delay={Math.min(i, 4) * 0.04}>
                <div className="rounded-2xl border bg-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    <span className="text-xs font-medium text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {e.unit}, {e.organisation}
                  </p>
                  {"note" in e && <p className="mt-2 text-sm">{e.note}</p>}
                </div>
              </Reveal>
            </li>
          ))}
          {education.map((e) => (
            <li key={`edu-${e.degree}`} className="relative">
              <span
                className="absolute top-1 -left-[2.6rem] grid size-7 place-items-center rounded-full border bg-card text-muted-foreground ring-4 ring-background"
                aria-hidden
              >
                <GraduationCap className="size-3.5" />
              </span>
              <div className="rounded-2xl border border-dashed p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {e.degree}, {e.field}
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{e.institution}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <JsonLd data={profilePageJsonLd("/about", `About ${profile.fullName}`)} />
    </>
  );
}
