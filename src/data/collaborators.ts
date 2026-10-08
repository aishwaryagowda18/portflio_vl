/**
 * Collaborators listed in the CV's "References" section.
 * Personal e-mail addresses of third parties are intentionally not published;
 * only the public profile pages given in the CV are linked.
 */

export const collaborators = [
  {
    name: "Prof. Sunita Keshri",
    relation: "Ph.D. Supervisor",
    role: "Professor (former Head), Department of Physics",
    institution: "Birla Institute of Technology, Mesra, Ranchi, Jharkhand, India",
    country: "India",
    // CV profile link (bitmesra.ac.in/Display_My_Profile_00983KKj893L?id=...) returned HTTP 500 when
    // checked on 2026-10-07, so it is not linked. Add a working URL here to show a profile link.
    url: undefined,
    authorMatch: "Keshri",
  },
  {
    name: "Prof. D. C. Jiles",
    relation: "Collaborator (2013–2018)",
    role: "Distinguished Professor Emeritus; Anson Marston Distinguished Professor",
    institution: "Ames, IA (iastate.edu)",
    country: "USA",
    url: "https://www.engineering.iastate.edu/people/profile/dcjiles/",
    authorMatch: "Jiles",
  },
  {
    name: "Prof. Victorino Franco",
    relation: "Collaborator",
    role: "Departamento de Física de la Materia Condensada",
    institution: "Universidad de Sevilla, Sevilla",
    country: "Spain",
    url: "https://personal.us.es/vfranco/index-en.html",
    authorMatch: "Franco",
  },
  {
    name: "Dr. Ravi L. Hadimani",
    relation: "Collaborator",
    role: "Associate Professor, Director of Biomagnetics Lab; Visiting Assoc. Prof., Harvard Medical School",
    institution:
      "Department of Mechanical and Nuclear Engineering, Virginia Commonwealth University, Richmond, VA",
    country: "USA",
    url: "https://egr.vcu.edu/directory/ravi.hadimani/",
    authorMatch: "Hadimani",
  },
  {
    name: "Prof. Jayshimha Atulasimha",
    relation: "Collaborator",
    role: "Engineering Foundation Professor",
    institution:
      "Department of Mechanical and Nuclear Engineering, Virginia Commonwealth University, Richmond, VA",
    country: "USA",
    url: "https://egr.vcu.edu/directory/jayasimha.atulasimha/",
  },
  {
    name: "Dr. Rajeev Rawat",
    relation: "Principal Collaborator (CRS)",
    role: "Scientist-H",
    institution: "UGC-DAE Consortium for Scientific Research, Indore (M.P.)",
    country: "India",
    url: "https://www.csr.res.in/Faculty/profile/17/17/Dr.RajeevRawat",
  },
  {
    name: "Dr. D. K. Shukla",
    relation: "Principal Collaborator (CRS)",
    role: "Scientist-F",
    institution: "UGC-DAE Consortium for Scientific Research, Indore (M.P.)",
    country: "India",
    url: "https://www.csr.res.in/Faculty/profile/58/62/Dr.DineshKumarShukla",
    authorMatch: "Shukla",
  },
  {
    name: "Dr. Ram Janay Choudhary",
    relation: "Collaborator",
    role: "Scientist-G",
    institution: "UGC-DAE Consortium for Scientific Research, Indore (M.P.)",
    country: "India",
    url: "https://www.csr.res.in/Faculty/profile/5/5/Dr.RamJanayChoudhary",
  },
  {
    name: "Prof. V. Subramanian",
    relation: "Collaborator",
    role: "Microwave Laboratory, Department of Physics",
    institution: "Indian Institute of Technology Madras, Chennai",
    country: "India",
    url: "https://physics.iitm.ac.in/~manianvs/STC2018.html",
    authorMatch: "Subramanian",
  },
] as const;

/** Funding and facility partners named in the CV's grants section. */
export const fundingPartners = [
  { name: "UGC-DAE Consortium for Scientific Research (CSR), Indore", note: "CRS projects 2014–2019 and 2024–2027" },
  { name: "Science and Engineering Research Board (SERB-DST), New Delhi", note: "Research project 2017–2021; ITS travel grant 2023" },
  { name: "DAE – Board of Research in Nuclear Sciences (BRNS), BARC Mumbai", note: "Young Scientist Research Award project 2011–2015" },
  { name: "AICTE", note: "Travel grant 2012 (ICYRAM 2012, Singapore)" },
] as const;
