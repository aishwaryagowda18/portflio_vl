import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteName } from "@/lib/site";

/** Per-page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName,
      title: `${title} | ${profile.fullName}`,
      description,
      url: path,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.fullName}`,
      description,
    },
  };
}
