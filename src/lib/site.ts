import { profile } from "@/data/profile";
import { metrics } from "@/lib/metrics";

/** Set NEXT_PUBLIC_SITE_URL to the production domain before deploying. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = `${profile.fullName} — Physics Research`;

export const siteDescription = `${profile.fullName}, ${profile.jobTitle}, ${profile.department}, ${profile.institution}. Research in perovskite manganites, multiferroics and magnetoelectric composites, thermoelectrics, microwave dielectrics, photocatalysis and luminescent nanophosphors.`;

/** Short biography — every statement is taken from, or counted from, the CV. */
export const shortBio = [
  `${profile.fullName} is ${profile.jobTitle} of the ${profile.department} at ${profile.institution} (${profile.institutionShort}), Mandya, Karnataka, India, an institution affiliated to Visvesvaraya Technological University (VTU), Belagavi.`,
  `Prof. Dayal earned the Ph.D. in Physics from Birla Institute of Technology, Mesra, Ranchi (degree awarded March 2009) for research on the transport and magnetic properties of BSCCO high-temperature superconductors and LCMO manganites, and the M.Sc. in Physics from Vinoba Bhave University, Hazaribag, as University Topper. Prof. Dayal has about ${metrics.experience.replace("~", "")} years of teaching and research experience and ${metrics.adminExperience} years of administrative experience.`,
  `Prof. Dayal's research spans perovskite manganites and magnetocalorics, multiferroic and magnetoelectric composites and ferromagnetic/ferroelectric heterostructures, thermoelectric materials, microwave dielectric ceramics, magnetic luminescent nanophosphors and photocatalytic semiconductors. Prof. Dayal has published ${metrics.journalArticles} journal articles, ${metrics.bookChapters} book chapter and ${metrics.conferencePapers} conference proceedings papers, and the research group has made ${metrics.presentations} conference presentations in India and abroad.`,
  `A recipient of the DAE Young Scientist Award (BRNS-BARC), Prof. Dayal has received ${metrics.researchGrants} research grants from DAE-BRNS, UGC-DAE CSR and SERB-DST, has guided ${metrics.phdAwarded} Ph.D. scholars to the award of the degree with ${metrics.phdOngoing} currently under supervision, and reviews for journals including the Journal of Alloys and Compounds, Journal of Applied Physics and Journal of Magnetism and Magnetic Materials.`,
];

/** Date the site content was last synchronised with the CV (used for sitemap lastModified). */
export const contentUpdated = "2026-10-07";
