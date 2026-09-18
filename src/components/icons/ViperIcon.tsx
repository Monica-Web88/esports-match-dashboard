export function ViperIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="viperGrad" x1="6" y1="56" x2="50" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d3557" />
          <stop offset="55%" stopColor="#5b9bff" />
          <stop offset="100%" stopColor="#a8e0ff" />
        </linearGradient>
      </defs>
      {/* S-curved coiled body */}
      <path
        d="M12 52 C10 38 28 40 22 28 C16 16 32 12 40 22"
        fill="none"
        stroke="url(#viperGrad)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* scale accents */}
      <path d="M20 44 l3 -3 l3 3 l-3 3 Z" fill="#a8e0ff" opacity="0.6" />
      <path d="M28 26 l3 -3 l3 3 l-3 3 Z" fill="#a8e0ff" opacity="0.6" />
      {/* head */}
      <path d="M37 11 L49 17 L40 27 L33 18 Z" fill="url(#viperGrad)" stroke="#0c1226" strokeWidth="0.6" />
      {/* eye */}
      <circle cx="42" cy="17" r="1.8" fill="#f4f6fb" />
      <circle cx="42.4" cy="17" r="0.8" fill="#0c1226" />
      {/* fangs */}
      <path d="M37 24 L35 31 L38.5 25 Z" fill="#f4f6fb" />
      <path d="M41 25 L43.5 32 L40 25.5 Z" fill="#f4f6fb" />
      {/* forked tongue */}
      <path d="M47 15 L54 11 M47 15 L54 17" stroke="#e6394a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}