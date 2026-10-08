import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { news } from "@/data/news";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "News & Updates",
  description: `Recent milestones of ${profile.fullName} and the research group: conferences, workshops, Ph.D. awards, grants and publications.`,
  path: "/news",
});

export default function NewsPage() {
  const items = [...news].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  const years = Array.from(new Set(items.map((n) => n.sortDate.slice(0, 4))));
  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="News & updates"
        description="Milestones from the CV — events organised, Ph.D. awards, grants, talks and publications."
        crumbs={[{ name: "News", path: "/news" }]}
      />
      <Section>
        <div className="space-y-12">
          {years.map((y) => (
            <section key={y} aria-labelledby={`news-${y}`} className="grid gap-6 md:grid-cols-[8rem_1fr]">
              <h2 id={`news-${y}`} className="text-3xl font-semibold text-gold-ink md:sticky md:top-24 md:self-start">
                {y}
              </h2>
              <ul className="space-y-4">
                {items
                  .filter((n) => n.sortDate.startsWith(y))
                  .map((n) => (
                    <li key={n.title}>
                      <Reveal>
                        <article className="rounded-2xl border bg-card p-6">
                          <p className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{n.category}</span>
                            <time className="text-muted-foreground">{n.dateLabel}</time>
                          </p>
                          <h3 className="mt-2 text-lg font-semibold">{n.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                          {n.href && (
                            <Link href={n.href} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                              Read more <ArrowRight className="size-3.5" aria-hidden />
                              <span className="sr-only">about {n.title}</span>
                            </Link>
                          )}
                        </article>
                      </Reveal>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
