import { Award, BookMarked, Medal, Plane, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { travelGrants } from "@/data/grants";
import { honors, profile, reviewer } from "@/data/profile";
import { sessionChairs } from "@/data/activities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Awards & Recognition",
  description: `Honours and recognition of ${profile.fullName}: DAE Young Scientist Award (BRNS-BARC), M.Sc. university first rank, journal and conference reviewing, session chairs and travel grants.`,
  path: "/awards",
});

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Awards & recognition"
        description="Honours, peer-review service and professional recognition."
        crumbs={[{ name: "Awards", path: "/awards" }]}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {honors.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06}>
              <article className="relative h-full overflow-hidden rounded-3xl border bg-card p-7">
                <div className="absolute -top-10 -right-10 size-40 rounded-full bg-gold/15 blur-2xl" aria-hidden />
                <span className="grid size-12 place-items-center rounded-2xl bg-gold text-ink">
                  {i === 0 ? <Award className="size-6" aria-hidden /> : <Medal className="size-6" aria-hidden />}
                </span>
                <h2 className="mt-5 text-2xl font-semibold">{h.title}</h2>
                <p className="mt-2 font-medium text-muted-foreground">{h.body}</p>
                <p className="mt-3 text-sm leading-relaxed">{h.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Peer review" title="Journal reviewer" className="mb-5 sm:mb-5" />
            <ul className="grid gap-2 sm:grid-cols-2">
              {reviewer.journals.map((j) => (
                <li key={j} className="flex gap-2 rounded-xl border bg-card p-3 text-sm">
                  <BookMarked className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                  {j}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <SectionHeading eyebrow="Peer review" title="Conference & book reviewer" className="mb-5 sm:mb-5" />
              <div className="space-y-3">
                <p className="rounded-xl border bg-card p-4 text-sm">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">Conference reviewer</span>
                  {reviewer.conference}
                </p>
                <p className="rounded-xl border bg-card p-4 text-sm">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase">Book reviewer</span>
                  {reviewer.book}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Session chair</h3>
              <ul className="mt-3 space-y-2">
                {sessionChairs.map((s) => (
                  <li key={s.event} className="flex gap-2 text-sm">
                    <ScrollText className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                    <span>
                      {s.event} — {s.host}, {s.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Competitive support" title="Travel grants" className="mb-5 sm:mb-5" />
          <div className="grid gap-4 md:grid-cols-2">
            {travelGrants.map((t) => (
              <div key={t.year} className="flex gap-4 rounded-2xl border bg-card p-5">
                <Plane className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
                <div className="text-sm">
                  <p className="font-semibold">
                    {t.year} · {t.sponsor}
                  </p>
                  <p className="mt-1 text-muted-foreground">{t.purpose}</p>
                  <p className="mt-1 text-xs font-medium">{t.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
