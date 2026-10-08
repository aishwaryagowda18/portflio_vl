/**
 * Identity, education, appointments and recognitions — transcribed from the CV.
 *
 * Privacy note: the CV's residential address and personal mobile number are
 * intentionally not stored in this repository or published on the website.
 */

export const profile = {
  name: "Vijaylakshmi Dayal",
  fullName: "Prof. Dr. Vijaylakshmi Dayal",
  honorificPrefix: "Prof. Dr.",
  shortName: "Prof. Dayal",
  jobTitle: "Professor and Head",
  department: "Department of Physics",
  institution: "Maharaja Institute of Technology Mysore",
  institutionShort: "MITM",
  location: "Mandya-571477, Karnataka, India",
  affiliation: "Affiliated to Visvesvaraya Technological University (VTU), Belagavi",
  emails: [
    { label: "Personal", address: "drvldayal@gmail.com" },
    { label: "Institutional", address: "drvldayal@mitmysore.in" },
    { label: "Head of Department", address: "hodphysics@mitmysore.in" },
  ],
  googleScholar: "https://scholar.google.com/citations?user=tuF6_AUAAAAJ&hl=en",
  googleScholarId: "tuF6_AUAAAAJ",
  orcid: "https://orcid.org/0000-0002-1330-0729",
  orcidId: "0000-0002-1330-0729",
  photo: "/images/dr-vijaylakshmi-dayal.jpg",
  cvFile: "/files/CV-Dr-Vijaylakshmi-Dayal-2026.pdf",
  experienceSummary: {
    teachingAndResearchYears: "~24",
    administrativeYears: "18",
  },
} as const;

export const education = [
  {
    degree: "Ph.D.",
    field: "Physics (Science)",
    thesis:
      "Transport and Magnetic Properties of BSCCO High-Temperature Superconducting Samples and LCMO Manganites",
    institution:
      "Birla Institute of Technology, Mesra, Ranchi, Jharkhand (Deemed University), India",
    period: "2002–2008",
    note: "Provisional Degree: 26th Nov 2008; Degree Awarded: 23rd March 2009",
  },
  {
    degree: "M.Sc.",
    field: "Physics (Spl. Paper – Electronics)",
    institution:
      "St. Columba’s College, Vinoba Bhave University, Hazaribag, Jharkhand, India",
    period: "1998–2001",
    note: "1st class, University Topper — October 2001",
  },
  {
    degree: "B.Sc.",
    field: "Physics Honours",
    institution:
      "St. Columba’s College, Vinoba Bhave University, Hazaribag, Jharkhand, India",
    period: "1994–1998",
    note: "1st class — April 1998",
  },
] as const;

export const experience = [
  {
    role: "Professor and Head",
    unit: "Department of Physics",
    organisation: "Maharaja Institute of Technology Mysore, Mandya, Karnataka, India",
    period: "August 2016 – Present",
    current: true,
  },
  {
    role: "Associate Professor and Head",
    unit: "Department of Physics",
    organisation: "Maharaja Institute of Technology Mysore, Mandya, Karnataka, India",
    period: "August 2011 – July 2016",
  },
  {
    role: "Assistant Professor and Head",
    unit: "Department of Physics",
    organisation: "Maharaja Institute of Technology Mysore, Mandya, Karnataka, India",
    period: "September 2010 – July 2011",
  },
  {
    role: "Senior Lecturer and Head",
    unit: "Department of Physics",
    organisation: "Maharaja Institute of Technology Mysore, Mandya, Karnataka, India",
    period: "July 2008 – August 2010",
  },
  {
    role: "Lecturer",
    unit: "Department of Physics",
    organisation: "Vidya Vardhaka College of Engineering, Mysore, Karnataka, India",
    period: "September 2007 – July 2008",
  },
  {
    role: "Senior Research Fellow",
    unit: "Department of Applied Physics",
    organisation: "Birla Institute of Technology, Mesra, Ranchi, Jharkhand, India",
    period: "April 2005 – June 2006",
  },
  {
    role: "Project Fellow",
    unit: "Department of Applied Physics",
    organisation: "Birla Institute of Technology, Mesra, Ranchi, Jharkhand, India",
    period: "November 2002 – March 2005",
    note: "UGC Major Research Project, “High-Pressure Investigations on Oxide Superconductors to obtain higher Tc”",
  },
] as const;

export const honors = [
  {
    title: "DAE Young Scientist Award",
    body: "Board of Research in Nuclear Sciences – Bhabha Atomic Research Centre (BRNS-BARC), Mumbai, India",
    detail:
      "Associated Young Scientist Research Award project (2011–2015): “Investigation of ferroelectric, ferromagnetic and magnetoelectric properties in some novel multiferroic perovskite oxides”.",
  },
  {
    title: "M.Sc. 1st Rank Holder in Physics (University Topper)",
    body: "Vinoba Bhave University, Hazaribag, Jharkhand, India",
    detail: "M.Sc. Physics, 1st class — October 2001.",
  },
] as const;

export const reviewer = {
  journals: [
    "Journal of Physics: Condensed Matter (Institute of Physics (IOP) Publications)",
    "Journal of Alloys and Compounds (Elsevier Publications)",
    "Solid State Sciences (Elsevier Publications)",
    "Journal of the American Ceramic Society",
    "IEEE Magnetic Letters (IEEE Magnetic Society)",
    "Journal of Applied Physics (American Institute of Physics (AIP) Publications)",
    "Journal of Magnetism and Magnetic Material (Elsevier Publications)",
    "Journal of Physics and Chemistry (Elsevier Publications)",
    "Phase Transition (Taylor & Francis, USA)",
    "Journal of Chemical Physics (American Institute of Physics (AIP) Publications)",
  ],
  conference:
    "DAE SSPS (2015 – till date): Department of Atomic Energy – Solid State Physics Symposium (AIP Conference Proceedings, American Institute of Physics (AIP) publications)",
  book: "“Engineering Physics”, published by Orient Longman Publications, Hyderabad (Universities Press, an associate of Orient Black Swan)",
} as const;

export const memberships = [
  { period: "2012–2013", body: "Materials Research Society Singapore" },
  { period: "Life Member", body: "Indian Society of Technical Education" },
  { period: "5 Years", body: "International Association of Advanced Materials" },
] as const;

export const technicalSkills = [
  { label: "Working platform", value: "Windows" },
  { label: "Scientific tools", value: "Origin and Mathcad 8" },
  { label: "Languages", value: "C" },
  { label: "Instrumentation", value: "LabVIEW 2018" },
] as const;
