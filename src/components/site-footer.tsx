import Link from "next/link";
import { Download, FileText, Mail } from "lucide-react";
import { ScholarIcon, OrcidIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { moreNav, primaryNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-xl font-semibold">{profile.fullName}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.jobTitle}, {profile.department}
            <br />
            {profile.institution}, {profile.location}
            <br />
            {profile.affiliation}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={profile.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
            >
              <ScholarIcon className="size-3.5" /> Google Scholar
            </a>
            <a
              href={profile.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
            >
              <OrcidIcon className="size-3.5" /> ORCID
            </a>
            <a
              href={`mailto:${profile.emails[1].address}`}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
            >
              <Mail className="size-3.5" aria-hidden /> Email
            </a>
          </div>
        </div>
        <nav aria-label="Footer: research">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer: more">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">More</p>
          <ul className="mt-3 space-y-2 text-sm">
            {moreNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold-ink">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-gold-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {profile.fullName}. Content sourced from the 2026 curriculum vitae.</p>
          <div className="flex gap-4">
            <a href={profile.cvFile} download className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Download className="size-3.5" aria-hidden /> CV (PDF)
            </a>
            <a href="/short-bio.txt" download className="inline-flex items-center gap-1.5 hover:text-foreground">
              <FileText className="size-3.5" aria-hidden /> Short bio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
