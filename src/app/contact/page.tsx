import { Building2, Mail } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { OrcidIcon, ScholarIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { MailtoForm } from "@/components/mailto-form";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${profile.fullName}, ${profile.jobTitle}, ${profile.department}, ${profile.institution}, ${profile.location}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="For research collaboration, doctoral supervision, invited talks or academic enquiries."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="flex items-center gap-2 font-sans text-base font-semibold tracking-normal">
                <Mail className="size-5 text-gold-ink" aria-hidden /> Email
              </h2>
              <ul className="mt-4 space-y-3">
                {profile.emails.map((e) => (
                  <li key={e.address} className="flex flex-wrap items-center justify-between gap-2">
                    <span>
                      <span className="block text-xs text-muted-foreground">{e.label}</span>
                      <a href={`mailto:${e.address}`} className="link-underline text-sm font-medium break-all">
                        {e.address}
                      </a>
                    </span>
                    <CopyButton text={e.address} label="Copy" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h2 className="flex items-center gap-2 font-sans text-base font-semibold tracking-normal">
                <Building2 className="size-5 text-gold-ink" aria-hidden /> Department
              </h2>
              <address className="mt-3 text-sm leading-relaxed not-italic">
                {profile.department}
                <br />
                {profile.institution} ({profile.institutionShort})
                <br />
                {profile.location}
                <br />
                <span className="text-muted-foreground">{profile.affiliation}</span>
              </address>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={profile.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border bg-card p-5 transition-colors hover:border-gold/50"
              >
                <ScholarIcon className="size-6 text-primary" />
                <span>
                  <span className="block text-sm font-semibold">Google Scholar</span>
                  <span className="block text-xs text-muted-foreground">Citations & profile</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={profile.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border bg-card p-5 transition-colors hover:border-gold/50"
              >
                <OrcidIcon className="size-6" />
                <span>
                  <span className="block text-sm font-semibold">ORCID</span>
                  <span className="block text-xs text-muted-foreground">{profile.orcidId}</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Write a message</h2>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">
              Compose an email to the institutional address ({profile.emails[1].address}).
            </p>
            <MailtoForm to={profile.emails[1].address} />
          </div>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${siteUrl}/contact`,
          name: `Contact ${profile.fullName}`,
          mainEntity: { "@id": `${siteUrl}/#person` },
        }}
      />
    </>
  );
}
