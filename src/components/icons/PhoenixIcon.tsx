export function PhoenixIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phoenixGrad" x1="10" y1="60" x2="54" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e6394a" />
          <stop offset="55%" stopColor="#ff7a3d" />
          <stop offset="100%" stopColor="#ffd23d" />
        </linearGradient>
      </defs>
      <g fill="url(#phoenixGrad)" stroke="#7a1420" strokeWidth="0.6" strokeLinejoin="round">
        {/* crest spikes */}
        <path d="M27 11 L29 1 L31 10 Z" />
        <path d="M31 10 L33 0 L35 10 Z" />
        <path d="M34 10 L38 3 L36 11 Z" />
        {/* head */}
        <circle cx="32" cy="15" r="5.5" />
        {/* beak */}
        <path d="M29 18 L32 24 L35 18 Z" />
        {/* body / tail teardrop */}
        <path d="M32 20 C37 24 39 35 32 51 C25 35 27 24 32 20 Z" />
        {/* right wing */}
        <path d="M28 24 C14 18 2 22 4 37 C10 31 18 29 26 32 C24 28 26 26 28 24 Z" />
        {/* left wing (mirrored) */}
        <g transform="scale(-1,1) translate(-64,0)">
          <path d="M28 24 C14 18 2 22 4 37 C10 31 18 29 26 32 C24 28 26 26 28 24 Z" />
        </g>
        {/* tail feathers */}
        <path d="M32 49 L19 63 L30 51 Z" />
        <path d="M32 50 L32 64 L35 51 Z" />
        <path d="M32 49 L45 63 L34 51 Z" />
      </g>
    </svg>
  );
}