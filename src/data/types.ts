/**
 * Shared types for all CV-derived content.
 *
 * Every data file in `src/data` is transcribed from the CV
 * (public/files/CV-Dr-Vijaylakshmi-Dayal-2026.pdf). To update the website,
 * edit those files only — pages, metrics, sitemap and structured data are all
 * computed from them.
 */

export type ResearchAreaId =
  | "manganites"
  | "multiferroics"
  | "superconductors"
  | "thermoelectrics"
  | "microwave-dielectrics"
  | "photocatalysis"
  | "phosphors"
  | "irradiation"
  | "instrumentation";

export type PublicationType = "journal" | "conference" | "book-chapter";

export type Quartile = "Q1" | "Q2" | "Q3" | "Q4" | "NSCI";

export interface Publication {
  /** Serial number as printed in the CV (per section). */
  cvNo: number;
  type: PublicationType;
  /** International / national grouping as given in the CV. */
  scope: "international" | "national";
  authors: string[];
  /** True when the CV marks Prof. Dayal's name with an asterisk (*). */
  corresponding?: boolean;
  title: string;
  /** Journal, proceedings or book series name. */
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  /** Article number / e-locator where the CV gives one. */
  articleNo?: string;
  publisher?: string;
  isbn?: string;
  year: number;
  doi?: string;
  /** Non-DOI link given in the CV. */
  url?: string;
  /** Impact factor exactly as listed in the CV. */
  impactFactor?: string;
  quartile?: Quartile;
  status?: "published" | "under-review";
  areas: ResearchAreaId[];
  /** Short note reproduced from the CV (e.g. "Review"). */
  note?: string;
}

export interface Presentation {
  cvNo: number;
  title: string;
  authors?: string[];
  event: string;
  eventFullName?: string;
  dates: string;
  year: number;
  place: string;
  format?: "Oral" | "Poster";
  note?: string;
}
