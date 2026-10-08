"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";
import { moreNav, primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function MoreMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = moreNav.some((n) => isActive(pathname, n.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="more-menu"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        More
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="more-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 rounded-xl border bg-popover p-2 shadow-xl shadow-black/5"
          >
            <ul>
              {moreNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none aria-[current=page]:bg-accent"
                  >
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t pt-1">
                <a
                  href={profile.cvFile}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  <Download className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden />
                  <span>
                    <span className="block text-sm font-medium">Download CV</span>
                    <span className="block text-xs text-muted-foreground">Full curriculum vitae (PDF)</span>
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-md transition-[border-color,box-shadow]",
        scrolled && "border-border shadow-sm shadow-black/[0.03]",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
          <span className="grid size-9 place-items-center rounded-lg bg-ink font-heading text-sm font-semibold text-on-ink ring-1 ring-gold/40">
            VD
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px] font-semibold">Prof. Vijaylakshmi Dayal</span>
            <span className="block text-[11px] tracking-wide text-muted-foreground">Physics · MIT Mysore</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-[current=page]:text-foreground"
            >
              {item.label}
              {isActive(pathname, item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                  aria-hidden
                />
              )}
            </Link>
          ))}
          <MoreMenu pathname={pathname} />
          <Link
            href="/contact"
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Contact
          </Link>
          <ThemeToggle className="ml-1" />
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex size-9 items-center justify-center rounded-full hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] overflow-y-auto">
              <div className="border-b p-5 pr-12">
                <SheetTitle className="font-heading text-lg">{profile.fullName}</SheetTitle>
                <SheetDescription>
                  {profile.jobTitle}, {profile.department}
                </SheetDescription>
              </div>
              <nav aria-label="Mobile" className="px-3">
                <ul className="space-y-0.5">
                  {[{ href: "/", label: "Home" }, ...primaryNav, ...moreNav].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="flex rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-muted aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={profile.cvFile}
                      download
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-muted"
                    >
                      <Download className="size-4 text-gold-ink" aria-hidden /> Download CV
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(pathname, "/contact") ? "page" : undefined}
                      className="flex rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-muted aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
