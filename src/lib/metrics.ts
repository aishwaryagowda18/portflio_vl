/**
 * Academic statistics, computed from the CV data files — never hand-entered.
 * Citation counts / h-index are deliberately not reproduced here; they change
 * continuously and are linked live on Google Scholar instead.
 */
import { invitedTalks, sessionChairs } from "@/data/activities";
import { presentations, workshopsOrganised } from "@/data/conferences";
import { researchGrants, travelGrants } from "@/data/grants";
import { profile, reviewer } from "@/data/profile";
import { scholars } from "@/data/scholars";
import type { Quartile } from "@/data/types";
import { allPublications, isPublished } from "@/lib/publications";

const journals = allPublications.filter((p) => p.type === "journal");
const publishedJournals = journals.filter(isPublished);

const quartileOrder: Quartile[] = ["Q1", "Q2", "Q3", "Q4", "NSCI"];

export const metrics = {
  journalArticles: publishedJournals.length,
  underReview: journals.length - publishedJournals.length,
  bookChapters: allPublications.filter((p) => p.type === "book-chapter").length,
  conferencePapers: allPublications.filter((p) => p.type === "conference").length,
  get totalPublished() {
    return this.journalArticles + this.bookChapters + this.conferencePapers;
  },
  presentations: presentations.length,
  correspondingAuthor: allPublications.filter((p) => p.corresponding && isPublished(p)).length,
  q1: publishedJournals.filter((p) => p.quartile === "Q1").length,
  researchGrants: researchGrants.length,
  ongoingGrants: researchGrants.filter((g) => g.status === "Ongoing").length,
  grantLakh: researchGrants.reduce((s, g) => s + g.amountLakh, 0),
  travelGrants: travelGrants.length,
  phdAwarded: scholars.filter((s) => s.status === "Awarded").length,
  phdOngoing: scholars.filter((s) => s.status === "Pursuing").length,
  experience: profile.experienceSummary.teachingAndResearchYears,
  adminExperience: profile.experienceSummary.administrativeYears,
  invitedTalks: invitedTalks.length,
  sessionChairs: sessionChairs.length,
  eventsOrganised: workshopsOrganised.length + 1,
  reviewerJournals: reviewer.journals.length,
  firstPublicationYear: Math.min(...allPublications.map((p) => p.year)),
};

/** Journal article with the highest impact factor as listed in the CV. */
export const highestImpactArticle = [...publishedJournals]
  .filter((p) => !Number.isNaN(Number(p.impactFactor)))
  .sort((a, b) => Number(b.impactFactor) - Number(a.impactFactor))[0];

export const quartileDistribution = quartileOrder.map((q) => ({
  label: q,
  value: publishedJournals.filter((p) => p.quartile === q).length,
}));

/** Publications per year (journal articles, book chapter and proceedings). */
export function publicationsByYear() {
  const published = allPublications.filter(isPublished);
  const min = Math.min(...published.map((p) => p.year));
  const max = Math.max(...published.map((p) => p.year));
  const rows = [];
  for (let y = min; y <= max; y++) {
    const inYear = published.filter((p) => p.year === y);
    rows.push({
      label: String(y),
      value: inYear.length,
      journal: inYear.filter((p) => p.type === "journal").length,
      other: inYear.filter((p) => p.type !== "journal").length,
    });
  }
  return rows;
}

export function topVenues(limit = 8) {
  const counts = new Map<string, number>();
  publishedJournals.forEach((p) => {
    if (p.venue) counts.set(p.venue, (counts.get(p.venue) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export function presentationsByYear() {
  const years = presentations.map((p) => p.year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  const rows = [];
  for (let y = min; y <= max; y++) {
    rows.push({ label: String(y), value: presentations.filter((p) => p.year === y).length });
  }
  return rows;
}
