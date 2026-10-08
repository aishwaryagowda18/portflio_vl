import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/jsonld";

interface Crumb {
  name: string;
  path: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-on-ink">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden />
      <div
        className="absolute -top-32 right-[-10%] size-[28rem] rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-on-ink/65">
            <li>
              <Link href="/" className="hover:text-on-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                <ChevronRight className="size-3" aria-hidden />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-on-ink/90">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-on-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold sm:text-5xl">{title}</h1>
        {description && (
          <div className="mt-4 max-w-3xl text-base leading-relaxed text-on-ink/75 sm:text-lg">{description}</div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </section>
  );
}
