import {
  bookChapters,
  conferencePapers,
  journalArticles,
} from "@/data/publications";
import type { Publication, PublicationType } from "@/data/types";

export interface PublicationEntry extends Publication {
  slug: string;
}

const TYPE_PREFIX: Record<PublicationType, string> = {
  journal: "j",
  conference: "c",
  "book-chapter": "b",
};

export const TYPE_LABEL: Record<PublicationType, string> = {
  journal: "Journal Article",
  conference: "Conference Proceedings",
  "book-chapter": "Book Chapter",
};

function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .split("-")
    .filter(Boolean)
    .slice(0, 9)
    .join("-");
}

function withSlugs(list: Publication[]): PublicationEntry[] {
  const seen = new Set<string>();
  return list.map((p) => {
    let slug = `${p.year}-${TYPE_PREFIX[p.type]}${p.cvNo}-${slugify(p.title)}`;
    while (seen.has(slug)) slug += "-x";
    seen.add(slug);
    return { ...p, slug };
  });
}

/** All publications, newest first (stable within a year by CV order). */
export const allPublications: PublicationEntry[] = withSlugs([
  ...journalArticles,
  ...bookChapters,
  ...conferencePapers,
]).sort((a, b) => b.year - a.year);

export function getPublication(slug: string) {
  return allPublications.find((p) => p.slug === slug);
}

export const isPublished = (p: Publication) => p.status !== "under-review";

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function primaryLink(p: Publication) {
  if (p.doi) return doiUrl(p.doi);
  return p.url;
}

export function isDayal(author: string) {
  return /dayal/i.test(author);
}

/** "vol(issue), pages" style locator built only from fields given in the CV. */
export function locator(p: Publication) {
  const parts: string[] = [];
  if (p.volume) parts.push(p.issue ? `${p.volume}(${p.issue})` : p.volume);
  else if (p.issue) parts.push(`(${p.issue})`);
  if (p.articleNo) parts.push(p.articleNo);
  if (p.pages) parts.push(p.type === "book-chapter" ? `pp. ${p.pages}` : p.pages);
  return parts.join(", ");
}

function joinAuthors(authors: string[]) {
  if (authors.length <= 1) return authors.join("");
  return `${authors.slice(0, -1).join(", ")}, & ${authors[authors.length - 1]}`;
}

export function citeAPA(p: Publication) {
  const loc = locator(p);
  const venue = p.venue ? ` ${p.venue}${loc ? `, ${loc}` : ""}.` : "";
  const status = p.status === "under-review" ? " Manuscript under review." : "";
  const publisher =
    p.type === "book-chapter" && p.publisher ? ` ${p.publisher}.` : "";
  const link = primaryLink(p) ? ` ${primaryLink(p)}` : "";
  return `${joinAuthors(p.authors)} (${p.year}). ${p.title}.${venue}${publisher}${status}${link}`.trim();
}

function bibKey(p: PublicationEntry) {
  const first = p.authors[0]
    .replace(/[^A-Za-z ]/g, "")
    .trim()
    .split(/\s+/)
    .sort((a, b) => b.length - a.length)[0]
    ?.toLowerCase();
  return `${first ?? "dayal"}${p.year}${TYPE_PREFIX[p.type]}${p.cvNo}`;
}

export function citeBibTeX(p: PublicationEntry) {
  const kind =
    p.type === "journal"
      ? p.status === "under-review"
        ? "unpublished"
        : "article"
      : p.type === "conference"
        ? "inproceedings"
        : "incollection";
  const venueField =
    p.type === "journal" ? "journal" : p.type === "conference" ? "booktitle" : "series";
  const fields: [string, string | undefined][] = [
    ["author", p.authors.map((a) => `{${a}}`).join(" and ")],
    ["title", `{${p.title}}`],
    [venueField, p.venue],
    ["volume", p.volume],
    ["number", p.issue],
    ["pages", p.pages ?? p.articleNo],
    ["publisher", p.publisher],
    ["isbn", p.isbn],
    ["year", String(p.year)],
    ["doi", p.doi],
    ["url", p.doi ? undefined : p.url],
    ["note", p.status === "under-review" ? "Under review" : undefined],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${kind}{${bibKey(p)},\n${body}\n}`;
}

export function citeRIS(p: PublicationEntry) {
  const ty =
    p.type === "journal" ? (p.status === "under-review" ? "UNPB" : "JOUR") : p.type === "conference" ? "CPAPER" : "CHAP";
  const lines: string[] = [`TY  - ${ty}`];
  p.authors.forEach((a) => lines.push(`AU  - ${a}`));
  lines.push(`TI  - ${p.title}`);
  if (p.venue) lines.push(`${p.type === "journal" ? "JO" : "T2"}  - ${p.venue}`);
  if (p.volume) lines.push(`VL  - ${p.volume}`);
  if (p.issue) lines.push(`IS  - ${p.issue}`);
  const pages = p.pages ?? p.articleNo;
  if (pages) {
    const [sp, ep] = pages.split(/[-–]/);
    lines.push(`SP  - ${sp}`);
    if (ep) lines.push(`EP  - ${ep}`);
  }
  if (p.publisher) lines.push(`PB  - ${p.publisher}`);
  if (p.isbn) lines.push(`SN  - ${p.isbn}`);
  lines.push(`PY  - ${p.year}`);
  if (p.doi) lines.push(`DO  - ${p.doi}`);
  const link = primaryLink(p);
  if (link) lines.push(`UR  - ${link}`);
  lines.push("ER  - ");
  return lines.join("\n");
}

export const publicationYears = Array.from(
  new Set(allPublications.map((p) => p.year)),
).sort((a, b) => b - a);
