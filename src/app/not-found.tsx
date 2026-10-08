import Link from "next/link";
import { LinkButton } from "@/components/link-button";
import { moreNav, primaryNav } from "@/lib/nav";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you are looking for doesn’t exist or may have moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <LinkButton href="/">Go to homepage</LinkButton>
        <LinkButton href="/publications" variant="outline">
          Browse publications
        </LinkButton>
      </div>
      <nav aria-label="Site pages" className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
        {[...primaryNav, ...moreNav, { href: "/contact", label: "Contact" }].map((n) => (
          <Link key={n.href} href={n.href} className="rounded-full border px-3 py-1.5 text-sm hover:bg-muted">
            {n.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
