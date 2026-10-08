import { cn } from "@/lib/utils";

interface Datum {
  label: string;
  value: number;
}

function DataTable({ data, caption, valueLabel }: { data: Datum[]; caption: string; valueLabel: string }) {
  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
        View as table
      </summary>
      <table className="mt-3 w-full text-left text-xs">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b text-muted-foreground">
            <th scope="col" className="py-1.5 font-medium">
              Category
            </th>
            <th scope="col" className="py-1.5 text-right font-medium">
              {valueLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label} className="border-b border-border/60">
              <td className="py-1.5">{d.label}</td>
              <td className="py-1.5 text-right tabular-nums">{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/** Vertical single-series column chart. One hue; values revealed on hover/focus; table fallback. */
export function ColumnChart({
  data,
  caption,
  unit = "publications",
  labelEvery = 1,
}: {
  data: Datum[];
  caption: string;
  unit?: string;
  labelEvery?: number;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const ticks = [0, Math.ceil(max / 2), max];
  return (
    <figure>
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="relative flex h-52 gap-2 pl-6" aria-hidden={false}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col-reverse justify-between pb-6" aria-hidden>
          {ticks.map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-4 text-right text-[10px] text-muted-foreground tabular-nums">{t}</span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
          ))}
        </div>
        <ul className="relative flex flex-1 items-end gap-[2px] pb-6" role="list" aria-label={caption}>
          {data.map((d, i) => (
            <li key={d.label} className="group relative flex h-full flex-1 flex-col justify-end">
              <div
                tabIndex={0}
                role="img"
                aria-label={`${d.label}: ${d.value} ${unit}`}
                className="w-full rounded-t-[4px] bg-chart-1 transition-opacity outline-none group-hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 3 : 0 }}
              />
              <span
                className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[11px] whitespace-nowrap text-background opacity-0 shadow-md transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                style={{ bottom: `calc(${(d.value / max) * 100}% + 6px)` }}
                aria-hidden
              >
                <strong className="tabular-nums">{d.value}</strong> · {d.label}
              </span>
              <span
                className={cn(
                  "absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-full text-[10px] text-muted-foreground tabular-nums",
                  i % labelEvery !== 0 && i !== data.length - 1 && "hidden",
                )}
                aria-hidden
              >
                {labelEvery > 1 ? `’${d.label.slice(2)}` : d.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <DataTable data={data} caption={caption} valueLabel={unit[0].toUpperCase() + unit.slice(1)} />
    </figure>
  );
}

/** Horizontal single-series bar chart with direct value labels (few bars). */
export function BarList({
  data,
  caption,
  unit = "publications",
}: {
  data: Datum[];
  caption: string;
  unit?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-3" aria-label={caption}>
        {data.map((d) => (
          <li key={d.label} className="group">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="min-w-0 truncate" title={d.label}>
                {d.label}
              </span>
              <span className="font-medium tabular-nums">{d.value}</span>
            </div>
            <div className="mt-1.5 h-2 w-full rounded-full bg-muted" aria-hidden>
              <div
                className="h-full rounded-full bg-chart-1 transition-opacity group-hover:opacity-80"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
            <span className="sr-only">
              {d.value} {unit}
            </span>
          </li>
        ))}
      </ul>
      <DataTable data={data} caption={caption} valueLabel={unit[0].toUpperCase() + unit.slice(1)} />
    </figure>
  );
}
