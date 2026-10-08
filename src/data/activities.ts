/** Invited talks, session chairs, leadership roles and professional development — from the CV. */

export const invitedTalks = [
  {
    title: "Invited Talk",
    event:
      "International Conference on Recent Trends in Materials Science & Devices 2023 (ICRTMD2023), Online Mode",
    host: "Research Plateau Publishers in association with G.A.V. Degree College, Patauda, Jhajjar, Haryana, India",
    date: "22–23 July 2023",
    year: 2023,
  },
  {
    title: "Multiferroic Composite",
    event: "Lecture Series",
    host: "Vidyavardhaka College of Engineering, Mysore, Karnataka",
    date: "7th June 2021",
    year: 2021,
  },
  {
    title: "How to write a Research Proposal",
    event: "Department of ECE",
    host: "Maharaja Institute of Technology Mysore",
    date: "11th May 2022",
    year: 2022,
  },
  {
    title: "High-temperature superconductivity and research opportunities",
    event: "Lecture Series",
    host: "Vidyavardhaka College of Engineering, Mysore, Karnataka",
    date: "7th August 2020",
    year: 2020,
  },
  {
    title: "Preparation of the Research Proposal for the Grant Application",
    event:
      "One Week Faculty Development Programme (FDP) on Research Proposal Writing and Opportunities in the field of Science, Engineering and Management",
    host: "Bangalore Institute of Technology (BIT), Bangalore, Karnataka (Virtual)",
    date: "09/07/2020",
    year: 2020,
  },
].sort((a, b) => b.year - a.year);

export const sessionChairs = [
  {
    event: "International Conference on Emerging Trends in Magnetism and Magnetic Materials, 2023",
    host: "HBTU Kanpur, India",
    date: "July 6–8, 2023",
    url: "https://hbtu.ac.in/wp-content/uploads/2023/07/ICTEMM23%20program.pdf",
  },
  {
    event:
      "International Conference on “Nanotechnology for Sustainable Living and Environment (NSLE-2022)”",
    host: "Dept. of Chemical Engineering, Birla Institute of Technology and Science, Pilani; Pilani Regional Center – Indian Institute of Chemical Engineers (IIChE); and AIChE Pilani student chapter",
    date: "April 14–16, 2022",
    // CV link https://iconnslebitsp.in/ no longer resolves (checked 2026-10-07), so it is not linked.
    url: undefined,
  },
] as const;

export const institutionalRoles = [
  "Chairperson: Anti Sexual Harassment Committee – Internal Complaints Committee, 2014 – till date",
  "Chairperson: Board of Studies (BOS): Physics Board",
  "Chairperson: Board of Examination (BOE): Physics Board",
  "Member: Academic Council and College Council",
  "Member: Hostel Squad: Girls’ Hostel",
  "Member: Anti-Ragging Cell, 2018 – till date",
  "Main Coordinator: Criterion 9 and 10: NBA, 2020–2022",
  "Chairperson: Internal Audit (Assets), 2018–2023",
] as const;

export const universityRoles = [
  "Member, Board of Examination (BOE), Physics Composite Board (2020–21 and 2021–22)",
  "VTU E-Shikshana Subject Expert, Physics Board (2021 onwards)",
  "VTU-RRC, Doctoral Committee Member, Physics Board",
  "MIT-Manipal Doctoral Committee, Dept. of Physics",
  "Panel Question Paper Setter: UG and Ph.D.",
  "Recognized Research Supervisor",
  "Recognized Researcher: Maharaja Research Foundation, Affiliated to University of Mysore, Mysuru",
] as const;

export const professionalDevelopment = [
  { title: "FDP on Feel Teacher", by: "CHLRD, MIT Mysore", date: "28.09.2021 – 30.09.2021" },
  { title: "Webinar on “Practical applications of LCR meter”", date: "8/27/2020" },
  {
    title: "National Webinar on “Two-Dimensional Materials for Diverse Applications”",
    by: "Cambridge Institution of Technology, Bengaluru",
    date: "23rd May 2020",
  },
  {
    title: "AICTE Sponsored Short Term Course on Two-dimensional Materials: Physics and Applications",
    by: "IIT Madras, Chennai",
    date: "September 21–26, 2019",
  },
  {
    title: "NPTEL short-term course on “Fundamentals of Electronic Materials and Devices” (8-week course)",
    by: "IIT Madras",
    date: "24-02-2019 to 15-04-2019",
  },
  {
    title:
      "Workshop on “New model curriculum for the first year BE/B.Tech CBCS detailed syllabus as per OBE format including CO and Bloom’s taxonomy”",
    by: "VTU Belagavi, at Mangalore",
  },
  {
    title: "Two-week main workshop on control systems",
    by: "National Mission on Education through ICT, IIT Kharagpur (held at MITM)",
    date: "December 2–12, 2015",
  },
  {
    title: "Faculty Development Program on “Shock Waves and Materials Science”",
    by: "Vidya Vikas Institute of Technology, Mysore, with Physics Association, Mysore",
    date: "23rd August 2014",
  },
  {
    title: "ISTE Workshop on Introduction to Research Methodologies",
    by: "IIT Bombay, under the National Mission on Education through ICT (MHRD), at MITM",
    date: "25th June – 4th July 2012",
  },
  {
    title: "ISTE Workshop on AAKASH for Education",
    by: "IIT Bombay, under the National Mission on Education through ICT (MHRD), at MITM",
    date: "10th and 11th November 2012",
  },
  { title: "Mission 10X Education (2 days)", by: "VVIET Mysore", date: "Dec 2013" },
  { title: "Mission 10X (Education) (1 day)", by: "VVCE Mysore", date: "June 2007" },
] as const;
