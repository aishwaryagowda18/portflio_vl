import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Globe2,
  Landmark,
  Mic,
  Users,
} from "lucide-react";
import { OrcidIcon, ScholarIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { LinkButton } from "@/components/link-button";
import { PublicationCard } from "@/components/publication-card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { StatCard } from "@/components/stat-card";
import { experience, profile } from "@/data/profile";
import { news } from "@/data/news";
import { researchAreas } from "@/data/research-areas";
import { profilePageJsonLd } from "@/lib/jsonld";
import { metrics } from "@/lib/metrics";
import { allPublications, isPublished } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Professor of Physics, MIT Mysore",
    description: siteDescription,
    path: "/",
    type: "profile",
  }),
  title: { absolute: `${profile.fullName} | Professor of Physics, MIT Mysore` },
};

const highlights = [
  {
    icon: Award,
    title: "DAE Young Scientist Award",
    body: "Awarded by the Board of Research in Nuclear Sciences – Bhabha Atomic Research Centre (BRNS-BARC), Mumbai.",
    href: "/awards",
  },
  {
    icon: Landmark,
    title: `${metrics.researchGrants} funded research projects`,
    body: "From DAE-BRNS, UGC-DAE Consortium for Scientific Research and SERB-DST — including an ongoing CRS project (2024–2027).",
    href: "/grants",
  },
  {
    icon: Globe2,
    title: "International presentations",
    body: "Intermag (Beijing 2015, Singapore 2018, Sendai 2023), MMM (Denver 2013, Pittsburgh 2017), APS March Meeting (Baltimore 2016).",
    href: "/conferences",
  },
  {
    icon: Mic,
    title: "Convener, ICMSAA-2026",
    body: "International Conference on Materials Science and Advanced Applications at MITM, supported by UGC-DAE-CSR.",
    href: "/activities",
  },
  {
    icon: BookOpen,
    title: `Reviewer for ${metrics.reviewerJournals} journals`,
    body: "Including Journal of Alloys and Compounds, Journal of Applied Physics, and Journal of Magnetism and Magnetic Materials.",
    href: "/awards",
  },
  {
    icon: Users,
    title: `${metrics.phdAwarded} Ph.D.s awarded, ${metrics.phdOngoing} in progress`,
    body: "Doctoral research in manganites, FM/FE heterostructures, thermoelectrics, microwave dielectrics and photocatalysis.",
    href: "/phd-scholars",
  },
];

export default function HomePage() {
  const recent = allPublications.filter(isPublished).slice(0, 3);
  const latestNews = [...news].sort((a, b) => b.sortDate.localeCompare(a.sortDate)).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-on-ink" aria-labelledby="hero-title">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]" aria-hidden />
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-primary/40 blur-3xl dark:bg-primary/15" aria-hidden />
        <div className="absolute right-[-12%] -bottom-48 size-[30rem] rounded-full bg-gold/20 blur-3xl" aria-hidden />

        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700">
              <p className="inline-flex items-center gap-2 rounded-full border border-on-ink/15 bg-on-ink/5 px-3 py-1 text-xs font-medium text-on-ink/80">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                {profile.department} · {profile.institution}
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 delay-50">
              <h1 id="hero-title" className="mt-6 text-4xl leading-[1.05] font-semibold sm:text-6xl">
                <span className="block text-2xl font-normal text-on-ink/70 sm:text-3xl">Prof. Dr.</span>
                Vijaylakshmi Dayal
              </h1>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 delay-100">
              <p className="mt-5 text-lg text-gold sm:text-xl">
                {profile.jobTitle}, {profile.department}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-ink/75 sm:text-lg">
                Condensed-matter and materials physics research spanning perovskite manganites, multiferroic and
                magnetoelectric composites, thermoelectrics, microwave dielectric ceramics, luminescent nanophosphors
                and photocatalytic semiconductors — with about {metrics.experience.replace("~", "")} years of teaching
                and research experience.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 delay-150 mt-8 flex flex-wrap gap-3">
              <LinkButton href="/publications" variant="gold" size="lg">
                Explore publications <ArrowRight aria-hidden />
              </LinkButton>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 delay-200 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-on-ink/75">
              <a
                href={profile.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-on-ink"
              >
                <ScholarIcon className="size-4" /> Google Scholar
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={profile.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-on-ink"
              >
                <OrcidIcon className="size-4" /> ORCID {profile.orcidId}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-700 delay-150 relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.6rem] bg-on-ink/5 ring-1 ring-on-ink/15">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.fullName}`}
                width={201}
                height={295}
                priority
                sizes="(min-width: 1024px) 384px, 90vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-on-ink/15 bg-ink/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-8">
              <p className="text-[11px] tracking-wider text-gold uppercase">Honour</p>
              <p className="text-sm font-medium">DAE Young Scientist Award</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified statistics */}
      <Section labelledBy="stats-title" className="pb-0 sm:pb-0">
        <h2 id="stats-title" className="sr-only">
          Academic statistics
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {[
            { value: metrics.journalArticles, label: "Journal articles", detail: `${metrics.q1} in Q1 journals` },
            { value: metrics.conferencePapers + metrics.bookChapters, label: "Proceedings & chapters", detail: `${metrics.conferencePapers} proceedings, ${metrics.bookChapters} book chapter` },
            { value: metrics.researchGrants, label: "Research grants", detail: `≈ ₹${metrics.grantLakh} lakh in total` },
            { value: metrics.phdAwarded, label: "Ph.D.s awarded", detail: `${metrics.phdOngoing} scholars in progress` },
            { value: metrics.presentations, label: "Conference presentations", detail: "By the research group" },
            { value: metrics.experience, label: "Years of experience", detail: `Teaching & research; ${metrics.adminExperience} yrs administrative` },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.04}>
              <StatCard {...s} className="h-full" />
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Counts are computed from the 2026 CV.{" "}
          <Link href="/impact" className="link-underline">
            See the research impact dashboard
          </Link>{" "}
          or view live citation metrics on{" "}
          <a href={profile.googleScholar} target="_blank" rel="noopener noreferrer" className="link-underline">
            Google Scholar
          </a>
          .
        </p>
      </Section>

      {/* Research areas */}
      <Section labelledBy="areas-title">
        <SectionHeading
          id="areas-title"
          eyebrow="Research"
          title="Research areas"
          description="Themes drawn from funded projects, doctoral theses and publications."
          action={
            <LinkButton href="/research" variant="outline">
              All research <ArrowRight aria-hidden />
            </LinkButton>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.slice(0, 6).map((a, i) => {
            const count = allPublications.filter((p) => p.areas.includes(a.id)).length;
            return (
              <Reveal key={a.id} delay={(i % 3) * 0.05}>
                <Link
                  href={`/research#${a.id}`}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg hover:shadow-black/[0.04] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="font-heading text-sm text-gold-ink tabular-nums">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.short}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {count} publications <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Highlights */}
      <section aria-labelledby="highlights-title" className="bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading id="highlights-title" eyebrow="Recognition" title="Achievements & leadership" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) * 0.05}>
                <Link
                  href={h.href}
                  className="flex h-full gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-gold/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <h.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">{h.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{h.body}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent publications */}
      <Section labelledBy="recent-title">
        <SectionHeading
          id="recent-title"
          eyebrow="Publications"
          title="Recent publications"
          action={
            <LinkButton href="/publications" variant="outline">
              All {allPublications.length} publications <ArrowRight aria-hidden />
            </LinkButton>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {recent.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="h-full [&>article]:h-full">
              <PublicationCard pub={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Career + news */}
      <section aria-label="Career and news" className="border-t py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Career" title="Academic journey" className="mb-6 sm:mb-6" />
            <ol className="relative space-y-6 border-l pl-6">
              {experience.slice(0, 5).map((e) => (
                <li key={e.period} className="relative">
                  <span
                    className={`absolute top-1.5 -left-[1.95rem] size-3 rounded-full ring-4 ring-background ${"current" in e ? "bg-gold" : "bg-primary/40"}`}
                    aria-hidden
                  />
                  <p className="text-xs font-medium text-muted-foreground">{e.period}</p>
                  <p className="font-semibold">{e.role}</p>
                  <p className="text-sm text-muted-foreground">{e.organisation}</p>
                </li>
              ))}
            </ol>
            <Link href="/about#experience" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Full timeline <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Updates" title="Latest news" className="mb-6 sm:mb-6" />
            <ul className="space-y-4">
              {latestNews.map((n) => (
                <li key={n.title} className="rounded-2xl border bg-card p-5">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-gold-ink">{n.category}</span> · {n.dateLabel}
                  </p>
                  <p className="mt-1 font-semibold">{n.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{n.body}</p>
                </li>
              ))}
            </ul>
            <Link href="/news" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              All news <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-on-ink sm:px-12">
            <div className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 id="cta-title" className="text-2xl font-semibold sm:text-3xl">
                  Research collaboration & doctoral supervision
                </h2>
                <p className="mt-3 text-on-ink/75">
                  Recognized Research Supervisor, and Recognized Researcher at Maharaja Research Foundation (affiliated to
                  University of Mysore, Mysuru).
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/contact" variant="gold" size="lg">
                  Get in touch <ArrowRight aria-hidden />
                </LinkButton>
                <LinkButton href="/collaborations" variant="onInk" size="lg">
                  Collaborations
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={profilePageJsonLd("/", profile.fullName)} />
    </>
  );
}
