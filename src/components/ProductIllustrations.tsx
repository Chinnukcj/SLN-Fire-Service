import React from 'react';

export const ProductIllustration: React.FC<{
  type: string;
  className?: string;
}> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'abc-powder':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="cylinderGrad" x1="60" y1="60" x2="160" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#dc2626" />
              <stop offset="0.45" stopColor="#b91c1c" />
              <stop offset="0.8" stopColor="#991b1b" />
              <stop offset="1" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="metalGrad" x1="100" y1="20" x2="140" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.6" stopColor="#d97706" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="steelGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Background subtle radial aura */}
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />

          {/* Extinguisher Base Stand */}
          <ellipse cx="120" cy="208" rx="36" ry="7" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M88 198 C88 205 152 205 152 198 L150 205 C150 210 90 210 90 205 Z" fill="#18181b" />

          {/* Cylinder Main Body */}
          <path
            d="M86 90 C86 72 154 72 154 90 L154 195 C154 204 86 204 86 195 Z"
            fill="url(#cylinderGrad)"
            stroke="#450a0a"
            strokeWidth="1.5"
          />

          {/* Cylinder Metallic Specular Highlight */}
          <path d="M93 92 C93 78 108 76 108 84 L108 196 C108 198 93 198 93 196 Z" fill="url(#steelGlow)" opacity="0.7" />

          {/* Cylinder Neck */}
          <rect x="111" y="62" width="18" height="15" rx="3" fill="url(#metalGrad)" stroke="#78350f" strokeWidth="1" />

          {/* Pressure Gauge */}
          <circle cx="140" cy="62" r="9" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.5" />
          <path d="M135 62 A5 5 0 0 1 143 59" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="62" x2="139" y2="57" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="140" cy="62" r="2" fill="#fafafa" />

          {/* Squeeze Lever Handle */}
          <path d="M106 63 L80 48 C77 46 80 42 84 44 L114 55 Z" fill="#27272a" stroke="#52525b" strokeWidth="1" />
          <path d="M107 55 L82 32 C78 29 82 25 86 28 L122 47 Z" fill="#e4e4e7" stroke="#71717a" strokeWidth="1" />

          {/* Safety Pull Pin & Tamper Seal */}
          <circle cx="118" cy="46" r="6" fill="none" stroke="#eab308" strokeWidth="2" />
          <path d="M124 46 L131 46" stroke="#eab308" strokeWidth="2" />
          <rect x="130" y="44" width="7" height="9" rx="1.5" fill="#ef4444" />

          {/* Flexible Discharge Hose */}
          <path
            d="M128 66 C155 72 166 105 162 145 C160 162 156 172 153 182"
            fill="none"
            stroke="#18181b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Nozzle Horn Tip */}
          <path d="M153 180 L149 195 L157 195 Z" fill="#27272a" stroke="#52525b" strokeWidth="1" />

          {/* Technical Label Band */}
          <rect x="88" y="112" width="64" height="46" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
          <text x="120" y="126" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="800" fontFamily="sans-serif">ABC POWDER</text>
          <line x1="94" y1="131" x2="146" y2="131" stroke="#3f3f46" strokeWidth="1" />
          <text x="120" y="141" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontWeight="600" fontFamily="sans-serif">STORED PRESSURE</text>
          <text x="120" y="151" textAnchor="middle" fill="#e4e4e7" fontSize="6.5" fontWeight="700" fontFamily="sans-serif">IS: 15683 / BIS</text>
        </svg>
      );

    case 'co2-portable':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="co2Cylinder" x1="70" y1="50" x2="160" y2="210" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b91c1c" />
              <stop offset="0.5" stopColor="#991b1b" />
              <stop offset="1" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="hornGrad" x1="130" y1="90" x2="175" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3f3f46" />
              <stop offset="0.6" stopColor="#18181b" />
              <stop offset="1" stopColor="#09090b" />
            </linearGradient>
          </defs>

          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />

          {/* Seamless Heavy Base */}
          <ellipse cx="112" cy="208" rx="26" ry="6" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />

          {/* Tall Slim Seamless Cylinder */}
          <path
            d="M90 74 C90 60 134 60 134 74 L134 200 C134 207 90 207 90 200 Z"
            fill="url(#co2Cylinder)"
            stroke="#450a0a"
            strokeWidth="1.5"
          />

          {/* High-Pressure Wheel / Squeeze Valve */}
          <rect x="106" y="46" width="12" height="16" rx="2" fill="#d97706" />
          <circle cx="112" cy="38" r="8" fill="#18181b" stroke="#71717a" strokeWidth="2" />
          <line x1="104" y1="38" x2="120" y2="38" stroke="#a1a1aa" strokeWidth="2" />

          {/* Black Flared Discharge Horn */}
          {/* Swivel metal pipe */}
          <path d="M118 52 C135 52 142 65 142 85 L144 110" fill="none" stroke="#71717a" strokeWidth="4" />
          {/* Flared conical plastic horn */}
          <path
            d="M138 108 L152 108 L174 165 C174 172 134 172 134 165 Z"
            fill="url(#hornGrad)"
            stroke="#52525b"
            strokeWidth="1.5"
          />
          {/* Horn interior opening */}
          <ellipse cx="154" cy="165" rx="19" ry="6" fill="#09090b" stroke="#71717a" strokeWidth="1" />

          {/* Cylinder Label */}
          <rect x="94" y="100" width="36" height="52" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
          <text x="112" y="116" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="800">CO₂</text>
          <text x="112" y="126" textAnchor="middle" fill="#e4e4e7" fontSize="5.5" fontWeight="600">CARBON</text>
          <text x="112" y="134" textAnchor="middle" fill="#e4e4e7" fontSize="5.5" fontWeight="600">DIOXIDE</text>
          <text x="112" y="146" textAnchor="middle" fill="#a1a1aa" fontSize="5" fontWeight="600">PESO CERT</text>
        </svg>
      );

    case 'clean-agent':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="cleanAgentGrad" x1="70" y1="60" x2="160" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#047857" />
              <stop offset="0.4" stopColor="#065f46" />
              <stop offset="0.8" stopColor="#064e3b" />
              <stop offset="1" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />

          {/* Base */}
          <ellipse cx="120" cy="208" rx="34" ry="7" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />

          {/* Cylinder in Emerald Precision Finish */}
          <path
            d="M88 88 C88 72 152 72 152 88 L152 196 C152 205 88 205 88 196 Z"
            fill="url(#cleanAgentGrad)"
            stroke="#064e3b"
            strokeWidth="1.5"
          />

          {/* Chrome Neck & Valve */}
          <rect x="112" y="60" width="16" height="15" rx="2" fill="#d4d4d8" stroke="#71717a" strokeWidth="1" />
          <circle cx="140" cy="62" r="8" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.5" />
          <path d="M136 62 A4 4 0 0 1 143 59" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="62" x2="140" y2="58" stroke="#ef4444" strokeWidth="1.5" />

          {/* Chrome Lever */}
          <path d="M110 56 L86 36 C82 33 85 30 89 33 L122 50 Z" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="1" />
          <path d="M108 64 L84 50 C80 48 83 45 87 47 L114 58 Z" fill="#52525b" />

          {/* Hose */}
          <path d="M128 66 C150 72 160 102 156 142 C154 158 152 170 150 180" fill="none" stroke="#27272a" strokeWidth="4.5" />
          <path d="M150 180 L146 194 L154 194 Z" fill="#52525b" />

          {/* Clean Agent Label */}
          <rect x="92" y="110" width="56" height="46" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
          <text x="120" y="124" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="800">CLEAN AGENT</text>
          <text x="120" y="134" textAnchor="middle" fill="#f4f4f5" fontSize="7" fontWeight="700">HFC 236fa</text>
          <text x="120" y="146" textAnchor="middle" fill="#a1a1aa" fontSize="5.5" fontWeight="500">NO RESIDUE</text>
        </svg>
      );

    case 'modular-ceiling':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />

          {/* Ceiling Mount Bracket */}
          <rect x="90" y="40" width="60" height="8" rx="2" fill="#52525b" stroke="#71717a" strokeWidth="1" />
          <rect x="114" y="48" width="12" height="18" fill="#71717a" />

          {/* Spherical Dome Body */}
          <ellipse cx="120" cy="120" rx="55" ry="46" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
          {/* Specular Highlight */}
          <ellipse cx="106" cy="106" rx="22" ry="14" fill="#ffffff" opacity="0.2" />

          {/* Sprinkler Trigger assembly */}
          <rect x="114" y="164" width="12" height="12" fill="#d97706" />
          {/* Glass Bulb 68C */}
          <rect x="117" y="176" width="6" height="14" rx="2" fill="#ef4444" stroke="#fca5a5" strokeWidth="0.8" />
          {/* Deflector Plate */}
          <path d="M104 196 L136 196 L132 204 L108 204 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <line x1="108" y1="204" x2="104" y2="210" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="120" y1="204" x2="120" y2="212" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="132" y1="204" x2="136" y2="210" stroke="#f59e0b" strokeWidth="1.5" />

          {/* Pressure Gauge on side */}
          <circle cx="166" cy="120" r="8" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.2" />
          <line x1="166" y1="120" x2="167" y2="116" stroke="#22c55e" strokeWidth="1.5" />

          {/* Label */}
          <rect x="98" y="110" width="44" height="22" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="0.6" />
          <text x="120" y="121" textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="800">AUTOMATIC</text>
          <text x="120" y="129" textAnchor="middle" fill="#e4e4e7" fontSize="5.5" fontWeight="600">68°C TRIGGER</text>
        </svg>
      );

    case 'foam-afff':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          {/* Base */}
          <ellipse cx="120" cy="208" rx="36" ry="7" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          {/* Cylinder */}
          <path d="M86 90 C86 72 154 72 154 90 L154 195 C154 204 86 204 86 195 Z" fill="#b91c1c" stroke="#450a0a" strokeWidth="1.5" />
          {/* Cream Foam Band */}
          <rect x="86" y="98" width="68" height="24" fill="#fef3c7" stroke="#fde68a" strokeWidth="0.8" />
          <text x="120" y="113" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="800">AFFF FOAM</text>
          {/* Lever & gauge */}
          <rect x="111" y="62" width="18" height="15" rx="3" fill="#d97706" />
          <circle cx="140" cy="62" r="8" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.2" />
          <path d="M107 55 L82 32 L122 47 Z" fill="#e4e4e7" stroke="#71717a" strokeWidth="1" />
          {/* Foam Aspirating Nozzle */}
          <path d="M128 66 C155 72 166 105 162 145 C160 162 156 172 153 182" fill="none" stroke="#18181b" strokeWidth="5" />
          <rect x="146" y="178" width="14" height="22" rx="2" fill="#52525b" stroke="#71717a" strokeWidth="1" />
        </svg>
      );

    case 'water-co2':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <ellipse cx="120" cy="208" rx="36" ry="7" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M86 90 C86 72 154 72 154 90 L154 195 C154 204 86 204 86 195 Z" fill="#b91c1c" stroke="#450a0a" strokeWidth="1.5" />
          {/* Blue Water Band */}
          <rect x="86" y="98" width="68" height="24" fill="#1e3a8a" stroke="#2563eb" strokeWidth="0.8" />
          <text x="120" y="113" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="800">WATER JET</text>
          <rect x="111" y="62" width="18" height="15" rx="3" fill="#d97706" />
          <circle cx="140" cy="62" r="8" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.2" />
          <path d="M107 55 L82 32 L122 47 Z" fill="#e4e4e7" stroke="#71717a" strokeWidth="1" />
          <path d="M128 66 C155 72 166 105 162 145 C160 162 156 172 153 182" fill="none" stroke="#18181b" strokeWidth="4.5" />
          <polygon points="152,180 156,180 154,198" fill="#d4d4d8" stroke="#71717a" strokeWidth="0.8" />
        </svg>
      );

    case 'refilling':
    case 'refill-abc':
    case 'refill-co2':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          {/* Pressure Testing Rig Graphic */}
          <circle cx="120" cy="110" r="45" fill="#121215" stroke="#3f3f46" strokeWidth="3" />
          <circle cx="120" cy="110" r="38" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <path d="M96 110 A24 24 0 0 1 144 110" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="110" x2="132" y2="98" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="120" cy="110" r="4" fill="#fafafa" />
          <text x="120" y="132" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontWeight="700">HYDRO-TEST 35 BAR</text>
          {/* Refill Certified Stamp */}
          <rect x="76" y="172" width="88" height="26" rx="6" fill="#18181b" stroke="#22c55e" strokeWidth="1.2" />
          <text x="120" y="188" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="800">ANNUAL REFILL & SEAL</text>
        </svg>
      );

    case 'safety-blanket':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          {/* Rigid Red Container */}
          <rect x="78" y="55" width="84" height="130" rx="6" fill="#b91c1c" stroke="#450a0a" strokeWidth="2" />
          {/* Top Hanging Eyelet */}
          <circle cx="120" cy="46" r="6" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
          {/* Pull Straps */}
          <rect x="96" y="175" width="16" height="36" rx="2" fill="#fafafa" stroke="#d4d4d8" strokeWidth="1" />
          <rect x="128" y="175" width="16" height="36" rx="2" fill="#fafafa" stroke="#d4d4d8" strokeWidth="1" />
          {/* Blanket Title */}
          <rect x="88" y="75" width="64" height="50" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
          <text x="120" y="93" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">FIRE</text>
          <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">BLANKET</text>
          <text x="120" y="117" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontWeight="700">1.8M × 1.8M</text>
        </svg>
      );

    case 'hose-reel-drum':
      return (
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="120" cy="120" r="95" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          {/* Drum Outer Flange */}
          <circle cx="120" cy="120" r="58" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
          {/* Coiled Hose Groove */}
          <circle cx="120" cy="120" r="48" fill="#18181b" stroke="#3f3f46" strokeWidth="6" strokeDasharray="6 3" />
          {/* Center Hub */}
          <circle cx="120" cy="120" r="24" fill="#b91c1c" stroke="#450a0a" strokeWidth="1.5" />
          {/* Solid Brass Waterway Hub */}
          <circle cx="120" cy="120" r="10" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
          {/* Hanging Swinging Arm */}
          <path d="M52 80 L76 120 L52 160" fill="none" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
          {/* Brass Nozzle on Side */}
          <rect x="175" y="110" width="22" height="12" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="1" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900 rounded-xl">
          <span className="text-xs font-semibold text-zinc-400">SLN Certified Equipment</span>
        </div>
      );
  }
};
