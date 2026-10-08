import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import {
  citeAPA,
  isDayal,
  locator,
  primaryLink,
  TYPE_LABEL,
  type PublicationEntry,
} from "@/lib/publications";
import { cn } from "@/lib/utils";

export function AuthorList({ authors, className }: { authors: string[]; className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      {authors.map((a, i) => (
        <span key={`${a}-${i}`}>
          {isDayal(a) ? <strong className="font-semibold text-foreground">{a}</strong> : a}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

export function QuartileBadge({ q }: { q?: string }) {
  if (!q) return null;
  const tone =
    q === "Q1"
      ? "bg-gold/20 text-gold-ink ring-gold/40"
      : q === "NSCI"
        ? "bg-muted text-muted-foreground ring-border"
        : "bg-primary/8 text-primary ring-primary/20";
  return (
    <span className={cn("inline-flex h-5 items-center rounded-full px-2 text-[11px] font-semibold ring-1", tone)}>
      {q}
    </span>
  );
}

export function PublicationCard({ pub, headingLevel = 3 }: { pub: PublicationEntry; headingLevel?: 2 | 3 }) {
  const link = primaryLink(pub);
  const loc = locator(pub);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative rounded-2xl border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-black/[0.04] sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-foreground tabular-nums">{pub.year}</span>
        <span className="text-muted-foreground" aria-hidden>
          ·
        </span>
        <span className="text-muted-foreground">{TYPE_LABEL[pub.type]}</span>
        <QuartileBadge q={pub.quartile} />
        {pub.impactFactor && pub.status !== "under-review" && (
          <span className="inline-flex h-5 items-center rounded-full bg-muted px-2 text-[11px] font-medium text-muted-foreground">
            IF {pub.impactFactor}
          </span>
        )}
        {pub.status === "under-review" && (
          <span className="inline-flex h-5 items-center rounded-full bg-accent px-2 text-[11px] font-semibold text-accent-foreground">
            Under review
          </span>
        )}
        {pub.corresponding && (
          <span
            className="inline-flex h-5 items-center rounded-full border px-2 text-[11px] text-muted-foreground"
            title="Marked * in the CV: PI of the grant / corresponding author / supervision / equal credit"
          >
            Corresponding*
          </span>
        )}
      </div>
      <Heading className="mt-3 font-heading text-lg leading-snug font-semibold">
        <Link
          href={`/publications/${pub.slug}`}
          className="rounded-sm decoration-gold/60 underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {pub.title}
        </Link>
      </Heading>
      <AuthorList authors={pub.authors} className="mt-2" />
      {pub.venue && (
        <p className="mt-1 text-sm">
          <em className="text-foreground/90">{pub.venue}</em>
          {loc && <span className="text-muted-foreground">, {loc}</span>}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ExternalLink className="size-3.5" aria-hidden />
            {pub.doi ? "DOI" : "View"}
            <span className="sr-only">for “{pub.title}” (opens in a new tab)</span>
          </a>
        )}
        <CopyButton text={citeAPA(pub)} label="Copy citation" />
        <Link
          href={`/publications/${pub.slug}`}
          className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Details <ArrowUpRight className="size-3.5" aria-hidden />
          <span className="sr-only">about “{pub.title}”</span>
        </Link>
      </div>
    </article>
  );
}
