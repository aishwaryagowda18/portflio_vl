"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, RotateCcw, Search, X } from "lucide-react";
import { PublicationCard } from "@/components/publication-card";
import { Input } from "@/components/ui/input";
import { researchAreas } from "@/data/research-areas";
import type { PublicationType, Quartile, ResearchAreaId } from "@/data/types";
import {
  allPublications,
  citeBibTeX,
  publicationYears,
  TYPE_LABEL,
} from "@/lib/publications";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "oldest" | "impact";

interface Filters {
  q: string;
  type: PublicationType | "all";
  year: string;
  quartile: Quartile | "all";
  area: ResearchAreaId | "all";
  corresponding: boolean;
  sort: SortKey;
}

const DEFAULTS: Filters = {
  q: "",
  type: "all",
  year: "all",
  quartile: "all",
  area: "all",
  corresponding: false,
  sort: "newest",
};

const QUARTILES: Quartile[] = ["Q1", "Q2", "Q3", "Q4", "NSCI"];

function normalize(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[₀-₉]/g, (d) => String(d.charCodeAt(0) - 0x2080))
    .toLowerCase();
}

const searchIndex = new Map(
  allPublications.map((p) => [
    p.slug,
    normalize([p.title, p.authors.join(" "), p.venue, p.year, p.doi, p.publisher].filter(Boolean).join(" ")),
  ]),
);

function readFiltersFromUrl(): Partial<Filters> {
  const params = new URLSearchParams(window.location.search);
  const out: Partial<Filters> = {};
  const q = params.get("q");
  if (q) out.q = q;
  const type = params.get("type");
  if (type && type in TYPE_LABEL) out.type = type as PublicationType;
  const year = params.get("year");
  if (year && publicationYears.includes(Number(year))) out.year = year;
  const quartile = params.get("quartile");
  if (quartile && QUARTILES.includes(quartile as Quartile)) out.quartile = quartile as Quartile;
  const area = params.get("area");
  if (area && researchAreas.some((a) => a.id === area)) out.area = area as ResearchAreaId;
  if (params.get("corresponding") === "1") out.corresponding = true;
  const sort = params.get("sort");
  if (sort === "oldest" || sort === "impact") out.sort = sort;
  return out;
}

function writeFiltersToUrl(f: Filters) {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.type !== "all") params.set("type", f.type);
  if (f.year !== "all") params.set("year", f.year);
  if (f.quartile !== "all") params.set("quartile", f.quartile);
  if (f.area !== "all") params.set("area", f.area);
  if (f.corresponding) params.set("corresponding", "1");
  if (f.sort !== "newest") params.set("sort", f.sort);
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

const selectCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function PublicationExplorer() {
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const deferredQuery = useDeferredValue(filters.q);

  // Restore filters from a shared URL (e.g. /publications?area=manganites).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL, an external source
    setFilters({ ...DEFAULTS, ...readFiltersFromUrl() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeFiltersToUrl(filters);
  }, [filters, hydrated]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const results = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
    const list = allPublications.filter((p) => {
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.year !== "all" && String(p.year) !== filters.year) return false;
      if (filters.quartile !== "all" && p.quartile !== filters.quartile) return false;
      if (filters.area !== "all" && !p.areas.includes(filters.area)) return false;
      if (filters.corresponding && !p.corresponding) return false;
      if (terms.length) {
        const hay = searchIndex.get(p.slug) ?? "";
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
    if (filters.sort === "oldest") return [...list].sort((a, b) => a.year - b.year);
    if (filters.sort === "impact")
      return [...list].sort(
        (a, b) => (Number(b.impactFactor) || 0) - (Number(a.impactFactor) || 0) || b.year - a.year,
      );
    return list;
  }, [deferredQuery, filters]);

  const activeCount =
    Number(!!filters.q) +
    Number(filters.type !== "all") +
    Number(filters.year !== "all") +
    Number(filters.quartile !== "all") +
    Number(filters.area !== "all") +
    Number(filters.corresponding);

  function exportBibTeX() {
    const text = results.map(citeBibTeX).join("\n\n");
    const blob = new Blob([text], { type: "application/x-bibtex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dayal-publications.bib";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside aria-label="Publication filters" className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-5 rounded-2xl border bg-card p-5">
          <div>
            <label htmlFor="pub-search" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Search
            </label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                id="pub-search"
                type="search"
                value={filters.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Title, author, journal, DOI…"
                className="h-10 bg-background pr-8 pl-9"
              />
              {filters.q && (
                <button
                  type="button"
                  onClick={() => set("q", "")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="pub-type" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Type
            </label>
            <select
              id="pub-type"
              className={cn(selectCls, "mt-2")}
              value={filters.type}
              onChange={(e) => set("type", e.target.value as Filters["type"])}
            >
              <option value="all">All types</option>
              {(Object.keys(TYPE_LABEL) as PublicationType[]).map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABEL[t]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pub-area" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Research area
            </label>
            <select
              id="pub-area"
              className={cn(selectCls, "mt-2")}
              value={filters.area}
              onChange={(e) => set("area", e.target.value as Filters["area"])}
            >
              <option value="all">All areas</option>
              {researchAreas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <div>
              <label htmlFor="pub-year" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Year
              </label>
              <select
                id="pub-year"
                className={cn(selectCls, "mt-2")}
                value={filters.year}
                onChange={(e) => set("year", e.target.value)}
              >
                <option value="all">All years</option>
                {publicationYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pub-sort" className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Sort by
              </label>
              <select
                id="pub-sort"
                className={cn(selectCls, "mt-2")}
                value={filters.sort}
                onChange={(e) => set("sort", e.target.value as SortKey)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="impact">Impact factor (CV)</option>
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Quartile (as listed in CV)
            </legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(["all", ...QUARTILES] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  aria-pressed={filters.quartile === q}
                  onClick={() => set("quartile", q)}
                  className={cn(
                    "h-8 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    filters.quartile === q
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted",
                  )}
                >
                  {q === "all" ? "All" : q}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.corresponding}
              onChange={(e) => set("corresponding", e.target.checked)}
              className="mt-0.5 size-4 accent-[var(--primary)]"
            />
            <span>
              Corresponding / PI papers only
              <span className="block text-xs text-muted-foreground">Entries marked * in the CV</span>
            </span>
          </label>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULTS)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" aria-hidden /> Reset {activeCount} filter{activeCount > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            Showing <strong className="text-foreground">{results.length}</strong> of {allPublications.length} publications
          </p>
          <button
            type="button"
            onClick={exportBibTeX}
            disabled={!results.length}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background px-3 text-xs font-medium hover:bg-muted disabled:opacity-50"
          >
            <Download className="size-3.5" aria-hidden /> Export {results.length} as BibTeX
          </button>
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-heading text-lg">No publications match these filters.</p>
            <button
              type="button"
              onClick={() => setFilters(DEFAULTS)}
              className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <ol className="space-y-4">
            <AnimatePresence initial={false}>
              {results.map((p) => (
                <motion.li
                  key={p.slug}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PublicationCard pub={p} headingLevel={2} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        )}
      </div>
    </div>
  );
}
