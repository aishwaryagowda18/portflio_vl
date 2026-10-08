import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  detail,
  className,
}: {
  value: React.ReactNode;
  label: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-card p-5 shadow-sm shadow-black/[0.02]", className)}>
      <p className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      {detail && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>}
    </div>
  );
}
