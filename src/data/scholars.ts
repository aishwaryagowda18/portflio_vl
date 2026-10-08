/** "GRADUATE (PhD) STUDENTS: (SUPERVISED: 04, UNDER SUPERVISION: 05)" from the CV. */

export interface Scholar {
  name: string;
  /** Fellowship / position as written in the CV. */
  position?: string;
  topic: string;
  mode?: "Full Time" | "Part Time";
  registered: string;
  status: "Awarded" | "Pursuing";
  /** Award date or progress note, as written in the CV. */
  outcome: string;
  /** Substring used to find this scholar's co-authored papers. */
  authorMatch?: string;
}

export const scholars: Scholar[] = [
  {
    name: "Punith Kumar V.",
    position: "JRF & SRF in YSR BRNS",
    topic: "Electrical and Magnetic Properties of Bismuth-Based Manganites",
    mode: "Full Time",
    registered: "Dec 2012",
    status: "Awarded",
    outcome: "Awarded: March 2017",
    authorMatch: "Punith",
  },
  {
    name: "Ganesha Channagoudra",
    position: "JRF, SERB-DST",
    topic:
      "Study of Strain Mediated Control over Magnetism in Ferromagnetic/Ferroelectric thin film and composites",
    mode: "Full Time",
    registered: "2018",
    status: "Awarded",
    outcome: "Awarded: August 2023",
    authorMatch: "Channagoudra",
  },
  {
    name: "Sushmitha P. Rao",
    position: "RS, MRF, MITM",
    topic: "Thermoelectric behaviour of Transition Metal Silicide and Cobaltites",
    mode: "Full Time",
    registered: "2018",
    status: "Awarded",
    outcome: "Awarded: Aug 2024",
    authorMatch: "Sushmitha",
  },
  {
    name: "Dinesh M. A.",
    position: "AP, EC, MITM",
    topic: "Microwave dielectric materials",
    mode: "Part Time",
    registered: "2018",
    status: "Awarded",
    outcome: "Awarded: November 2025",
    authorMatch: "Dinesh",
  },
  {
    name: "Maria Pavithra",
    topic: "Magnetic thin film Semiconductors",
    mode: "Part Time",
    registered: "2020",
    status: "Pursuing",
    outcome: "Coursework completed",
    authorMatch: "Maria Pavithra",
  },
  {
    name: "Banan Wahabi",
    topic:
      "Synthesis and Characterization Of Some Novel Photocatalytic Semiconductors for Water Treatment",
    registered: "2023",
    status: "Pursuing",
    outcome: "Coursework completed",
  },
  {
    name: "Poonacha C T",
    position: "CRS Project Fellow 2",
    topic:
      "Local structure studies from high-energy X-ray diffraction and its correlation to understand the multiferroic behaviour in BiFeO3 and Zr-Ca modified BaTiO3 composites",
    registered: "2024",
    status: "Pursuing",
    outcome: "Coursework completed",
  },
  {
    name: "Ajay Kumar Saw",
    position: "Project Fellow, UGC-DAE-CSR, Indore",
    topic:
      "Magnetic and Transport Studies in Ferromagnetic Metallic/Insulating Manganite Nanocomposite",
    mode: "Full Time",
    registered: "2019",
    status: "Pursuing",
    outcome: "Coursework in progress",
    authorMatch: "Ajay Kumar Saw",
  },
  {
    name: "Lokesh N",
    topic: "FM/FE Heterostructure",
    mode: "Part Time",
    registered: "2025",
    status: "Pursuing",
    outcome: "Coursework in progress",
  },
];
