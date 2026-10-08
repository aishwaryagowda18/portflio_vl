import { profile } from "@/data/profile";
import { shortBio, siteUrl } from "@/lib/site";

/** Downloadable plain-text short biography, generated from the CV data. */
export function GET() {
  const text = [
    profile.fullName,
    `${profile.jobTitle}, ${profile.department}`,
    `${profile.institution}, ${profile.location}`,
    "",
    ...shortBio.flatMap((p) => [p, ""]),
    `Google Scholar: ${profile.googleScholar}`,
    `ORCID: ${profile.orcid}`,
    `Email: ${profile.emails[1].address}`,
    `Web: ${siteUrl}`,
    "",
  ].join("\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Prof-Vijaylakshmi-Dayal-short-bio.txt"',
    },
  });
}
