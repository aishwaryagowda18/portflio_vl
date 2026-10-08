import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const linkButton = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        gold: "bg-gold text-ink hover:brightness-105",
        outline: "border bg-background hover:bg-muted",
        onInk: "border border-on-ink/25 text-on-ink hover:bg-on-ink/10",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = VariantProps<typeof linkButton> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
  "aria-label"?: string;
};

/** Internal links use next/link; external and download links use a plain anchor. */
export function LinkButton({ href, variant, size, className, children, external, download, ...rest }: Props) {
  const cls = cn(linkButton({ variant, size }), className);
  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
