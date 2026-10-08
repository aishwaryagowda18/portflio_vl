# Prof. Dr. Vijaylakshmi Dayal — Academic Research Portfolio

Academic portfolio website for Prof. Dr. Vijaylakshmi Dayal, Professor and Head, Department of Physics,
Maharaja Institute of Technology Mysore. **All content comes from the 2026 CV**
(`public/files/CV-Dr-Vijaylakshmi-Dayal-2026.pdf`).

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI) and Framer Motion.
Every page is statically prerendered.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit   # type-check (run `npx next typegen` first on a fresh clone)
npm run build && npm start
```

## Before deploying

Set the production domain so canonical URLs, the sitemap, Open Graph tags and Schema.org data are absolute and correct:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

(see `.env.example`). Without it these URLs fall back to `http://localhost:3000`.

## Updating content

Edit only the files in `src/data/` — pages, statistics, charts, the sitemap and structured data are all generated from them.

| File | Contents |
| --- | --- |
| `profile.ts` | Name, contact emails, Scholar/ORCID, education, appointments, honours, reviewer roles, memberships, skills |
| `publications.ts` | Journal articles, book chapter, conference proceedings (IF and quartile exactly as in the CV) |
| `research-areas.ts` | Research themes; publications link to them via each entry's `areas` field |
| `grants.ts` | Research projects and travel grants |
| `scholars.ts` | Ph.D. scholars (awarded and ongoing) |
| `conferences.ts` | Paper presentations, conference and workshops organised |
| `activities.ts` | Invited talks, session chairs, institutional/university roles, courses attended |
| `teaching.ts` | Courses taught and laboratory contribution |
| `collaborators.ts` | Collaborators and funding partners |
| `news.ts` | News & updates (add new items at the top) |

To add a publication, append an object to the relevant array in `publications.ts`. Its page, citation formats
(APA / BibTeX / RIS), sitemap entry and `ScholarlyArticle` JSON-LD are created automatically.

To replace the CV PDF, overwrite `public/files/CV-Dr-Vijaylakshmi-Dayal-2026.pdf` (or change `cvFile` in `profile.ts`).

### Privacy choices

- The residential address in the CV is not published anywhere on the site.
- The personal mobile number is not stored in the repository or shown on the site.
- Third-party e-mail addresses from the CV's references section are not published; collaborators link to their public profile pages.
- The downloadable CV PDF is a public version with the mobile number and "Address of Communication" removed.
  When the CV changes, edit the public Word copy (`CV_Dr. Dayal-2026-public.docx`), export it to PDF from Word
  (File → Save As → PDF), and replace `public/files/CV-Dr-Vijaylakshmi-Dayal-2026.pdf`.

## Features

- 14 pages: Home, About, Research, Publications (+ 62 individual publication pages), Grants, Ph.D. Scholars,
  Conferences, Awards, Teaching, Academic Activities, Collaborations, News, Research Impact dashboard, Contact.
- Publication explorer: full-text search, filters (type, research area, year, quartile, corresponding author), sorting,
  shareable filter URLs, one-click citation copy, BibTeX export of the filtered results.
- SEO: per-page metadata and canonicals, Open Graph image, `sitemap.xml`, `robots.txt`, web manifest,
  Highwire `citation_*` meta tags on publication pages (for Google Scholar indexing), and Schema.org
  `Person`, `WebSite`, `ProfilePage`, `ScholarlyArticle`/`Chapter`, `CollectionPage`, `ContactPage` and `BreadcrumbList`.
- Accessibility: skip link, landmark regions, single `<h1>` per page, keyboard-operable menus and tabs, visible focus
  rings, `prefers-reduced-motion` support, chart data available as tables, light/dark themes.
- Downloads: full CV (PDF) and a generated short bio (`/short-bio.txt`).
