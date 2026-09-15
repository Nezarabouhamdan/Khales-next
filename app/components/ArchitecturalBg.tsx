"use client";

export default function ArchitecturalBg() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <svg
        className="w-full h-full text-neutral-400/60 stroke-current"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Vertical Axis Grid Lines */}
        <line x1="120" y1="0" x2="120" y2="900" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="480" y1="0" x2="480" y2="900" strokeWidth="0.5" />
        <line x1="960" y1="0" x2="960" y2="900" strokeWidth="0.5" />
        <line x1="1320" y1="0" x2="1320" y2="900" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Diagonal Architectural Guide Lines */}
        <line x1="0" y1="900" x2="480" y2="0" strokeWidth="0.5" />
        <line x1="960" y1="900" x2="1440" y2="0" strokeWidth="0.5" />

        {/* Curved Contour Lines (as seen in screenshots 3, 4, 5) */}
        <path
          d="M -100 200 C 300 100, 400 800, 800 300 C 1100 -100, 1300 700, 1600 500"
          strokeWidth="0.75"
        />
        <path
          d="M 100 950 C 400 600, 600 900, 1000 650 C 1300 450, 1200 100, 1500 -50"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />

        {/* Focal Crosshairs */}
        <circle cx="480" cy="300" r="3" fill="currentColor" className="text-neutral-400" />
        <circle cx="960" cy="650" r="3" fill="currentColor" className="text-neutral-400" />
      </svg>
    </div>
  );
}
