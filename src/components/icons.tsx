import { GraduationCap } from "lucide-react";

export function ScholarIcon({ className }: { className?: string }) {
  return <GraduationCap className={className} aria-hidden />;
}

/** Simple "iD" mark for ORCID links. */
export function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#A6CE39" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#fff"
      >
        iD
      </text>
    </svg>
  );
}
