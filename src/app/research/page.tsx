import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { researchAreas } from "@/data/research-areas";
import { allPublications, isPublished } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  description: `Research areas of ${profile.fullName}: perovskite manganites and magnetocalorics, multiferroics and magnetoelectric coupling, high-temperature superconductors, thermoelectrics, microwave dielectric ceramics, photocatalysis and luminescent nanophosphors.`,
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research areas"
        description="Experimental condensed-matter and materials physics — synthesis, structure, and the electrical, magnetic, dielectric, thermoelectric and optical properties of functional materials."
        crumbs={[{ name: "Research", path: "/research" }]}
      >
        <nav aria-label="Research areas" className="flex flex-wrap gap-2">
          {researchAreas.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="rounded-full border border-on-ink/20 px-3 py-1.5 text-xs text-on-ink/85 transition-colors hover:bg-on-ink/10"
            >
              {a.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Section>
        <div className="space-y-6">
          {researchAreas.map((a, i) => {
            const pubs = allPublications.filter((p) => p.areas.includes(a.id) && isPublished(p));
            const years = pubs.map((p) => p.year);
            return (
              <Reveal key={a.id}>
                <article
                  id={a.id}
                  aria-labelledby={`${a.id}-title`}
                  className="grid scroll-mt-24 gap-8 rounded-3xl border bg-card p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]"
                >
                  <div>
                    <p className="font-heading text-sm text-gold-ink tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(researchAreas.length).padStart(2, "0")}
                    </p>
                    <h2 id={`${a.id}-title`} className="mt-2 text-2xl font-semibold">
                      {a.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-foreground/85">{a.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Keywords">
                      {a.keywords.map((k) => (
                        <li key={k} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          {k}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <h3 className="font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Drawn from
                      </h3>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {a.sources.map((s) => (
                          <li key={s} className="flex gap-2">
                            <FlaskConical className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-surface p-5">
                    <p className="text-sm">
                      <span className="font-heading text-3xl font-semibold text-primary">{pubs.length}</span>{" "}
                      <span className="text-muted-foreground">
                        publication{pubs.length === 1 ? "" : "s"}
                        {pubs.length > 0 && ` · ${Math.min(...years)}–${Math.max(...years)}`}
                      </span>
                    </p>
                    {pubs.length > 0 && (
                      <>
                        <h3 className="mt-4 font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          Recent work
                        </h3>
                        <ul className="mt-2 space-y-3">
                          {pubs.slice(0, 3).map((p) => (
                            <li key={p.slug}>
                              <Link href={`/publications/${p.slug}`} className="text-sm leading-snug font-medium hover:underline">
                                {p.title}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {p.venue ? `${p.venue}, ` : ""}
                                {p.year}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <LinkButton href={`/publications?area=${a.id}`} variant="outline" size="sm" className="mt-5">
                          Browse in publications <span className="sr-only">: {a.title}</span>
                          <ArrowRight aria-hidden />
                        </LinkButton>
                      </>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
