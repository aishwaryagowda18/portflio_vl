import type { ResearchAreaId } from "./types";

/**
 * Research themes. Each theme is a grouping of the CV's own publication,
 * grant and thesis titles — the summaries only restate what those titles say.
 * Publications are linked to themes through the `areas` field in publications.ts.
 */

export interface ResearchArea {
  id: ResearchAreaId;
  title: string;
  short: string;
  summary: string;
  keywords: string[];
  /** CV sources the theme is drawn from (grants, theses, project work). */
  sources: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: "manganites",
    title: "Perovskite Manganites & Magnetocalorics",
    short: "Magnetotransport, magnetic interactions and magnetocaloric effects in perovskite and layered manganites.",
    summary:
      "Electrical, magnetic and magneto-transport properties of La-, Bi-, Sr-, Ca- and Pr-based manganites — including Griffiths phase, critical behaviour, spin-glass behaviour, phase coexistence, spin-polarized tunnelling in nanoparticles, and magnetocaloric effects in perovskite and Ruddlesden–Popper layered manganites.",
    keywords: [
      "LCMO",
      "La–Bi–Mn–O",
      "Pr–Sr–Mn–O",
      "Ruddlesden–Popper",
      "Griffiths phase",
      "Critical behaviour",
      "Magnetocaloric effect",
      "Magnetoresistance",
    ],
    sources: [
      "Ph.D. thesis: LCMO manganites (BIT Mesra)",
      "CRS project (UGC-DAE-CSR Indore), 2014–2019: Ferromagnetic Metallic/Insulating Manganite Nanocomposite",
      "Ph.D. supervision: Bismuth-based manganites; manganite nanocomposites",
    ],
  },
  {
    id: "multiferroics",
    title: "Multiferroics & Magnetoelectric Coupling",
    short: "Ferromagnetic/ferroelectric heterostructures, composites and ferrites for magnetoelectric control.",
    summary:
      "Strain-mediated electrical control over magnetism in ferromagnetic/ferroelectric heterostructures and composites — PMN-PT/LSMO thin films, PMN-PT–CoFe2O4 composites for magnetoelectric response and energy harvesting, cation distribution in substituted cobalt and copper ferrites, and multiferroic perovskite oxides such as BiFeO3 and modified BaTiO3.",
    keywords: [
      "PMN-PT",
      "CoFe2O4",
      "LSMO thin films",
      "BiFeO3",
      "BaTiO3",
      "Spinel ferrites",
      "Strain-mediated coupling",
      "Energy harvesting",
    ],
    sources: [
      "SERB-DST project, 2017–2021: Strain Mediated Electrical Control over Magnetism in FM/FE Heterostructure",
      "DAE-BRNS Young Scientist Research Award project, 2011–2015: Multiferroic perovskite oxides",
      "UGC-DAE CSR CRS project, 2024–2027 (ongoing): BiFeO3 and Zr-Ca modified BaTiO3 composites",
    ],
  },
  {
    id: "superconductors",
    title: "High-Temperature Superconductors",
    short: "Transport, AC-susceptibility and thermal studies of Bi-based (BSCCO) cuprate superconductors.",
    summary:
      "Synthesis of single-phase Bi-2223 and Bi-2212 superconductors and investigation of their transport, thermal, thermoelectric power and AC-susceptibility behaviour, including the effect of gamma irradiation — the subject of the doctoral research at BIT Mesra.",
    keywords: ["BSCCO", "Bi-2223", "Bi-2212", "AC susceptibility", "Thermoelectric power"],
    sources: [
      "Ph.D. thesis: BSCCO High-Temperature Superconducting Samples (BIT Mesra)",
      "UGC Major Research Project (Project Fellow): High-Pressure Investigations on Oxide Superconductors to obtain higher Tc",
    ],
  },
  {
    id: "thermoelectrics",
    title: "Thermoelectric Materials",
    short: "Silicides, cobaltites and alloys for thermoelectric performance.",
    summary:
      "Structural, transport and thermoelectric properties of higher manganese silicides synthesized by arc melting, Mg2(Si,Sn) intermetallic alloys, Si0.8Ge0.2 alloys and Bi–Pb–Sr–Ca–Co–O cobaltites, including Li+ doping and electron-beam irradiation.",
    keywords: ["Manganese silicides", "Mg2Si–Sn", "SiGe", "Cobaltites", "Seebeck coefficient"],
    sources: [
      "Ph.D. supervision: Thermoelectric behaviour of Transition Metal Silicide and Cobaltites",
    ],
  },
  {
    id: "microwave-dielectrics",
    title: "Microwave Dielectric Ceramics & Antennas",
    short: "Vanadate and niobate ceramics for cylindrical dielectric resonator antennas.",
    summary:
      "Synthesis and microwave dielectric characterization of Sr3(VO4)2, Ba3V2O8, Li3MgNbO5 and Li3MgNbO5–Sr3V2O8 composite ceramics, and their use in the design, simulation and fabrication of cylindrical dielectric resonator antennas.",
    keywords: ["Sr3(VO4)2", "Ba3V2O8", "Li3MgNbO5", "Dielectric resonator antenna"],
    sources: ["Ph.D. supervision: Microwave dielectric materials"],
  },
  {
    id: "photocatalysis",
    title: "Photocatalytic Semiconductors",
    short: "Visible- and sunlight-active photocatalysts for dye degradation and water treatment.",
    summary:
      "Synthesis and characterization of semiconductor photocatalysts — MgSb2O6, Sn–Sb–Zr co-doped ZnO, ZnWO4 and α-Bi2O3/Bi18Mg8O36 composites — and their efficiency in degrading cationic and anionic dyes under visible light and natural sunlight.",
    keywords: ["MgSb2O6", "Doped ZnO", "ZnWO4", "Bi2O3 composites", "Dye degradation"],
    sources: [
      "Ph.D. supervision: Novel Photocatalytic Semiconductors for Water Treatment",
    ],
  },
  {
    id: "phosphors",
    title: "Magnetic Luminescent Nanophosphors",
    short: "Eu3+/Bi3+-activated phosphors for anti-counterfeiting applications.",
    summary:
      "Structural and spectroscopic analysis of reddish-orange emitting Eu3+ and Bi3+ substituted Y2WO6 and Y2O3 magnetic nanophosphors and fluorescent pigments for anti-counterfeiting applications.",
    keywords: ["Y2WO6", "Y2O3", "Eu3+", "Bi3+", "Anti-counterfeiting"],
    sources: ["Journal publications, 2024–2025"],
  },
  {
    id: "irradiation",
    title: "Radiation Effects in Materials",
    short: "Gamma, electron-beam and heavy-ion irradiation of functional materials.",
    summary:
      "Effects of gamma irradiation on Bi-2223 superconductors, high-energy electron-beam irradiation on cobaltites and SiGe thermoelectrics, and heavy-ion irradiation of nonmagnetic oxides to explore magnetism.",
    keywords: ["Gamma irradiation", "Electron beam", "Heavy ion irradiation"],
    sources: ["Book chapter (Elsevier, 2023): Heavy ion irradiation in nonmagnetic oxides"],
  },
  {
    id: "instrumentation",
    title: "Laboratory Instrumentation",
    short: "Automated low-temperature measurement systems and LabVIEW-based experimentation.",
    summary:
      "Design and fabrication of an automated low-temperature resistivity measurement set-up, and LabVIEW-augmented experimentation (subject of workshops organised in 2021 and 2022).",
    keywords: ["LabVIEW", "Low-temperature resistivity", "Automation"],
    sources: ["Workshops: LabVIEW Augmented Experimentation (2021, 2022)"],
  },
];

export const researchAreaById = Object.fromEntries(
  researchAreas.map((a) => [a.id, a]),
) as Record<ResearchAreaId, ResearchArea>;
