export default function Logo({ className = 'h-10 w-auto', withWordmark = true }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-label="Mamifs Tech Center"
      >
        <rect x="1" y="1" width="62" height="62" rx="14" fill="#0B1F3A" stroke="#F5A623" strokeWidth="1.5" />
        <path
          d="M16 46V20l16 14 16-14v26"
          fill="none"
          stroke="#F4F6F8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="18" r="3" fill="#F5A623" />
      </svg>
      {withWordmark && (
        <span className="badge-mono text-sm font-semibold tracking-widest text-navy">
          MAMIFS <span className="text-amber">TECH CENTER</span>
        </span>
      )}
    </div>
  );
}
