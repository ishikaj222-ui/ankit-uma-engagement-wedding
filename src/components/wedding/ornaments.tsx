export function GoldDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="12" x2="74" y2="12" stroke="var(--gold-deep)" strokeWidth="1" opacity="0.8" />
      <line x1="126" y1="12" x2="200" y2="12" stroke="var(--gold-deep)" strokeWidth="1" opacity="0.8" />
      <circle cx="80" cy="12" r="1.6" fill="var(--gold-deep)" />
      <circle cx="120" cy="12" r="1.6" fill="var(--gold-deep)" />
      <path
        d="M100 3 C104.5 7.5 109 7.5 111 12 C109 16.5 104.5 16.5 100 21 C95.5 16.5 91 16.5 89 12 C91 7.5 95.5 7.5 100 3 Z"
        fill="var(--gold)"
        stroke="var(--gold-deep)"
        strokeWidth="0.8"
      />
      <circle cx="100" cy="12" r="2" fill="var(--gold-soft)" />
    </svg>
  );
}

export function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.4" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
