import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { siteDescription } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.fullName} — Physics Research`,
    short_name: "Prof. Dayal",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#1d2540",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
