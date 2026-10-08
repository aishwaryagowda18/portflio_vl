export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/grants", label: "Grants" },
  { href: "/phd-scholars", label: "Scholars" },
  { href: "/conferences", label: "Conferences" },
];

export const moreNav: NavItem[] = [
  { href: "/impact", label: "Research Impact", description: "Dashboard of publication metrics" },
  { href: "/awards", label: "Awards & Recognition", description: "Honours, reviewing and grants" },
  { href: "/teaching", label: "Teaching", description: "Courses and laboratory development" },
  { href: "/activities", label: "Academic Activities", description: "Talks, leadership and service" },
  { href: "/collaborations", label: "Collaborations", description: "Collaborators and partners" },
  { href: "/news", label: "News & Updates", description: "Recent milestones" },
];

export const allRoutes = [
  "/",
  ...primaryNav.map((n) => n.href),
  ...moreNav.map((n) => n.href),
  "/contact",
];
