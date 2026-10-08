import { ExternalLink, Handshake, Landmark } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { collaborators, fundingPartners } from "@/data/collaborators";
import { profile } from "@/data/profile";
import { allPublications, isPublished } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collaborations",
  description: `Research collaborators and partner institutions of ${profile.fullName} in India, the USA and Spain, including UGC-DAE CSR Indore, IIT Madras, Virginia Commonwealth University and Universidad de Sevilla.`,
  path: "/collaborations",
});

export default function CollaborationsPage() {
  const countries = Array.from(new Set(collaborators.map((c) => c.country)));
  return (
    <>
      <PageHeader
        eyebrow="Network"
        title="Collaborations"
        description={`Research collaborators across ${countries.join(", ")}, and the agencies that have funded the group’s work.`}
        crumbs={[{ name: "Collaborations", path: "/collaborations" }]}
      />
      <Section>
        <SectionHeading eyebrow="People" title="Collaborators" className="mb-6 sm:mb-6" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collaborators.map((c, i) => {
            const match = "authorMatch" in c ? c.authorMatch : undefined;
            const joint = match
              ? allPublications.filter((p) => isPublished(p) && p.authors.some((a) => a.includes(match))).length
              : 0;
            return (
              <Reveal key={c.name} delay={(i % 3) * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border bg-card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Handshake className="size-5" aria-hidden />
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {c.country}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
                  <p className="text-xs font-semibold tracking-wide text-gold-ink uppercase">{c.relation}</p>
                  <p className="mt-2 text-sm">{c.role}</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.institution}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t pt-4 text-xs">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                      >
                        Profile <ExternalLink className="size-3.5" aria-hidden />
                        <span className="sr-only">of {c.name} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span />
                    )}
                    {joint > 0 && (
                      <a href={`/publications?q=${encodeURIComponent(match!)}`} className="text-muted-foreground hover:text-foreground">
                        {joint} joint publication{joint > 1 ? "s" : ""}
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Institutions" title="Funding & facility partners" className="mb-6 sm:mb-6" />
          <ul className="grid gap-3 md:grid-cols-2">
            {fundingPartners.map((f) => (
              <li key={f.name} className="flex gap-4 rounded-2xl border bg-card p-5">
                <Landmark className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
                <div>
                  <p className="font-semibold">{f.name}</p>
                  <p className="text-sm text-muted-foreground">{f.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
