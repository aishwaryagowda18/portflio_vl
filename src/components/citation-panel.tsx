"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface Format {
  id: string;
  label: string;
  text: string;
  filename?: string;
  mime?: string;
}

/** Tabbed citation formats with copy and download (BibTeX / RIS). */
export function CitationPanel({ formats }: { formats: Format[] }) {
  const [active, setActive] = useState(formats[0].id);
  const current = formats.find((f) => f.id === active) ?? formats[0];

  function download(f: Format) {
    const blob = new Blob([f.text], { type: f.mime ?? "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = f.filename ?? "citation.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border bg-card">
      <div role="tablist" aria-label="Citation format" className="flex gap-1 border-b p-2">
        {formats.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            id={`tab-${f.id}`}
            aria-selected={f.id === active}
            aria-controls={`panel-${f.id}`}
            tabIndex={f.id === active ? 0 : -1}
            onClick={() => setActive(f.id)}
            onKeyDown={(e) => {
              const i = formats.findIndex((x) => x.id === active);
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = formats[(i + (e.key === "ArrowRight" ? 1 : formats.length - 1)) % formats.length];
                setActive(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              f.id === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="p-4">
        <pre className="max-h-72 overflow-auto rounded-xl bg-muted p-4 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap">
          {current.text}
        </pre>
        <div className="mt-3 flex flex-wrap gap-2">
          <CopyButton text={current.text} label={`Copy ${current.label}`} />
          {current.filename && (
            <button
              type="button"
              onClick={() => download(current)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background px-3 text-xs font-medium hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Download className="size-3.5" aria-hidden /> Download {current.filename.split(".").pop()?.toUpperCase()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
