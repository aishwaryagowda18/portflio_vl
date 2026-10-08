/** "GRANTS ON RESEARCH PROPOSAL (Total: 4)" and "TRAVEL GRANTS (Total: 2)" from the CV. */

export interface ResearchGrant {
  slug: string;
  period: string;
  startYear: number;
  endYear: number;
  status: "Ongoing" | "Completed";
  title: string;
  scheme: string;
  agency: string;
  reference: string;
  /** Amount exactly as stated in the CV. */
  amount: string;
  /** Approximate amount in lakh (₹), used only for the totals shown on the site. */
  amountLakh: number;
}

export const researchGrants: ResearchGrant[] = [
  {
    slug: "crs-bifeo3-batio3",
    period: "2024–2027",
    startYear: 2024,
    endYear: 2027,
    status: "Ongoing",
    title:
      "Local structure studies from high-energy X-ray diffraction and its correlation to understand the multiferroic behaviour in BiFeO3 and Zr-Ca modified BaTiO3 composites",
    scheme: "CRS Project",
    agency: "UGC-DAE Consortium for Scientific Research, India",
    reference: "CRS/2023-24/01/1021",
    amount: "~15 lakhs",
    amountLakh: 15,
  },
  {
    slug: "serb-fm-fe-heterostructure",
    period: "2017–2021",
    startYear: 2017,
    endYear: 2021,
    status: "Completed",
    title:
      "Study of Strain Mediated Electrical Control over Magnetism in Ferromagnetic / Ferroelectric Heterostructure",
    scheme: "SERB-DST",
    agency: "SERB-DST, New Delhi",
    reference: "SERB/EMR/2016/005424 Dt 21.11.2017",
    amount: "~34 lakhs",
    amountLakh: 34,
  },
  {
    slug: "crs-manganite-nanocomposite",
    period: "2014–2019",
    startYear: 2014,
    endYear: 2019,
    status: "Completed",
    title:
      "Magnetic and Transport Studies in Ferromagnetic Metallic/Insulating Manganite Nanocomposite",
    scheme: "Collaborative Research Scheme (CRS)",
    agency: "UGC-DAE-CSR Indore Centre",
    reference: "CSR-IC/CRS-89/2014-2015/596, Dt: 18.09.2014",
    amount: "~10 lakhs",
    amountLakh: 10,
  },
  {
    slug: "brns-ysra-multiferroics",
    period: "2011–2015",
    startYear: 2011,
    endYear: 2015,
    status: "Completed",
    title:
      "Investigation of ferroelectric, ferromagnetic and magnetoelectric properties in some novel multiferroic perovskite oxides",
    scheme: "Young Scientist Research Award (YSRA)",
    agency: "DAE, BRNS, BARC Mumbai",
    reference: "2011/20/37P/01/BRNS/0075 Dt. 13.04.2011",
    amount: "~17 lakhs",
    amountLakh: 17,
  },
];

export const travelGrants = [
  {
    year: 2023,
    sponsor: "ITS SERB",
    purpose:
      "To present a paper in Intermag 2023 (13–18 May 2023), Sendai, Japan",
    amount: "2.5 Lakhs",
  },
  {
    year: 2012,
    sponsor: "AICTE, BRNS and DST (Young Scientist)",
    purpose:
      "For attending International Conference of Young Researchers on Advance Materials [ICYRAM] 2012, Singapore [Claimed from AICTE]",
    amount: "1 Lakh",
  },
] as const;
