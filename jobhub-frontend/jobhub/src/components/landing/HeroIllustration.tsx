export function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Illustration of a candidate profile card matching with a job listing card">
      {/* soft background blobs */}
      <circle cx="120" cy="90" r="140" fill="#5B45EA" opacity="0.07" />
      <circle cx="460" cy="360" r="160" fill="#A855F7" opacity="0.08" />

      {/* dashed connector path */}
      <path
        d="M 170 300 C 230 250, 300 230, 370 175"
        stroke="#BCB4FB"
        strokeWidth="2.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />

      {/* Candidate profile card (back, tilted) */}
      <g transform="translate(50 210) rotate(-6)">
        <rect width="230" height="150" rx="20" fill="white" stroke="#ECEAFE" strokeWidth="2" />
        <circle cx="38" cy="38" r="18" fill="#EBE9FE" />
        <circle cx="38" cy="38" r="18" fill="url(#avatarGrad)" opacity="0.85" />
        <rect x="66" y="28" width="90" height="8" rx="4" fill="#312B57" />
        <rect x="66" y="44" width="60" height="6" rx="3" fill="#C4BFEA" />
        <rect x="24" y="80" width="52" height="20" rx="10" fill="#F4F3FF" />
        <rect x="82" y="80" width="66" height="20" rx="10" fill="#F4F3FF" />
        <rect x="154" y="80" width="44" height="20" rx="10" fill="#F4F3FF" />
        <rect x="24" y="112" width="182" height="7" rx="3.5" fill="#F1F0FB" />
        <rect x="24" y="126" width="140" height="7" rx="3.5" fill="#F1F0FB" />
      </g>

      {/* Job card (front) */}
      <g transform="translate(270 130) rotate(4)">
        <rect width="240" height="160" rx="20" fill="white" stroke="#ECEAFE" strokeWidth="2" />
        <rect x="24" y="24" width="44" height="44" rx="12" fill="#5B45EA" />
        <rect x="36" y="38" width="20" height="6" rx="3" fill="white" />
        <rect x="36" y="48" width="14" height="6" rx="3" fill="white" opacity="0.7" />
        <rect x="80" y="28" width="120" height="9" rx="4.5" fill="#1B1730" />
        <rect x="80" y="45" width="80" height="7" rx="3.5" fill="#9891C4" />
        <rect x="24" y="86" width="70" height="22" rx="11" fill="#F4F3FF" />
        <rect x="100" y="86" width="56" height="22" rx="11" fill="#F4F3FF" />
        <rect x="24" y="122" width="100" height="9" rx="4.5" fill="#312B57" />
        <rect x="150" y="118" width="66" height="26" rx="13" fill="#5B45EA" />
      </g>

      {/* match badge */}
      <g transform="translate(255 250)">
        <circle r="26" fill="white" stroke="#ECEAFE" strokeWidth="2" />
        <circle r="26" fill="#5B45EA" opacity="0.06" />
        <path d="M -9 0 L -2 8 L 10 -9" stroke="#5B45EA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* floating skill chips */}
      <g transform="translate(410 60)">
        <rect width="86" height="30" rx="15" fill="white" stroke="#ECEAFE" strokeWidth="2" />
        <circle cx="18" cy="15" r="5" fill="#A855F7" />
        <rect x="32" y="11" width="42" height="8" rx="4" fill="#4B4470" />
      </g>
      <g transform="translate(20 60)">
        <rect width="96" height="30" rx="15" fill="white" stroke="#ECEAFE" strokeWidth="2" />
        <circle cx="18" cy="15" r="5" fill="#5B45EA" />
        <rect x="32" y="11" width="50" height="8" rx="4" fill="#4B4470" />
      </g>

      <defs>
        <linearGradient id="avatarGrad" x1="20" y1="20" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C6DF2" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
