/**
 * News & updates. Every item restates a dated entry in the CV.
 * `sortDate` is used for ordering only; the visible date is `dateLabel`
 * (year-only entries in the CV are shown as the year alone).
 * Add new items at the top of the array.
 */

export type NewsCategory = "Event" | "Publication" | "Ph.D." | "Grant" | "Talk" | "Conference";

export interface NewsItem {
  sortDate: string;
  dateLabel: string;
  category: NewsCategory;
  title: string;
  body: string;
  href?: string;
}

export const news: NewsItem[] = [
  {
    sortDate: "2026-09-03",
    dateLabel: "September 3–4, 2026",
    category: "Event",
    title: "ICMSAA-2026 at MITM",
    body: "International Conference on Materials Science and Advanced Applications (ICMSAA-2026) at Maharaja Institute of Technology Mysore, with Prof. Dayal as Convener; supported by UGC-DAE-CSR. The group presented four papers at the conference.",
    href: "/conferences",
  },
  {
    sortDate: "2026-09-01",
    dateLabel: "September 1–2, 2026",
    category: "Event",
    title: "Awareness Workshop on CRS Funding Opportunities",
    body: "Utilization of In-House and Large-Scale DAE Facilities — hosted by the Department of Physics, MITM, for UGC-DAE-CSR.",
    href: "/activities",
  },
  {
    sortDate: "2026-03-26",
    dateLabel: "March 26–28, 2026",
    category: "Event",
    title: "Workshop: Lab to Fab — Materials for Advanced Technologies",
    body: "Organised at the Department of Physics, Maharaja Institute of Technology Mysore.",
    href: "/activities",
  },
  {
    sortDate: "2026-01-01",
    dateLabel: "2026",
    category: "Publication",
    title: "Sn–Sb–Zr co-doped ZnO photocatalysts in Materials Science and Engineering: B",
    body: "Sunlight-driven photocatalytic degradation of cationic and anionic dyes using Sn–Sb–Zr co-doped ZnO nanoparticles (Mater Sci Eng B, vol. 328, 119374).",
    href: "/publications",
  },
  {
    sortDate: "2025-11-01",
    dateLabel: "November 2025",
    category: "Ph.D.",
    title: "Ph.D. awarded to Dinesh M. A.",
    body: "Thesis area: Microwave dielectric materials (part-time, registered 2018).",
    href: "/phd-scholars",
  },
  {
    sortDate: "2025-07-24",
    dateLabel: "July 24–26, 2025",
    category: "Conference",
    title: "Oral presentation at 3rd ICAMST-2025",
    body: "Photocatalytic Performance of α-Bi₂O₃ / Bi₁₈Mg₈O₃₆ Nanocomposite in Sunlight-Assisted Degradation of Organic Dyes — Ramaiah University of Applied Sciences, Bengaluru.",
    href: "/conferences",
  },
  {
    sortDate: "2025-01-01",
    dateLabel: "2025",
    category: "Publication",
    title: "MgSb2O6 visible-light photocatalyst in Ceramics International",
    body: "Synthesis, Characterization, and Dye Degradation Efficiency of MgSb2O6 as a Visible-Light-Active Semiconductor Photocatalyst (Ceramics International 51, 27, Part A).",
    href: "/publications",
  },
  {
    sortDate: "2024-08-01",
    dateLabel: "August 2024",
    category: "Ph.D.",
    title: "Ph.D. awarded to Sushmitha P. Rao",
    body: "Thesis area: Thermoelectric behaviour of Transition Metal Silicide and Cobaltites.",
    href: "/phd-scholars",
  },
  {
    sortDate: "2024-01-01",
    dateLabel: "2024–2027",
    category: "Grant",
    title: "UGC-DAE CSR CRS project (ongoing)",
    body: "Local structure studies from high-energy X-ray diffraction and its correlation to understand the multiferroic behaviour in BiFeO3 and Zr-Ca modified BaTiO3 composites (~15 lakhs).",
    href: "/grants",
  },
  {
    sortDate: "2023-08-01",
    dateLabel: "August 2023",
    category: "Ph.D.",
    title: "Ph.D. awarded to Ganesha Channagoudra",
    body: "Thesis area: Strain Mediated Control over Magnetism in Ferromagnetic/Ferroelectric thin film and composites.",
    href: "/phd-scholars",
  },
  {
    sortDate: "2023-07-22",
    dateLabel: "July 22–23, 2023",
    category: "Talk",
    title: "Invited talk at ICRTMD2023",
    body: "International Conference on Recent Trends in Materials Science & Devices 2023 (online).",
    href: "/activities",
  },
  {
    sortDate: "2023-07-06",
    dateLabel: "July 6–8, 2023",
    category: "Talk",
    title: "Session Chair at HBTU Kanpur",
    body: "International Conference on Emerging Trends in Magnetism and Magnetic Materials, 2023.",
    href: "/activities",
  },
  {
    sortDate: "2023-05-15",
    dateLabel: "May 2023",
    category: "Conference",
    title: "Intermag 2023, Sendai, Japan",
    body: "Oral presentation on strain-mediated control over magnetization in CoFe2O4/STO (001) thin film, and a poster on Pr0.48Sr0.52MnO3; supported by an ITS SERB travel grant.",
    href: "/conferences",
  },
];
