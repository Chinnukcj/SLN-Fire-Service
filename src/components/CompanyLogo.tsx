import React from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = '',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 rounded-lg shadow-md ${className}`}
      aria-label="SLN Fire Service Logo"
    >
      {/* Outer White Background & Border */}
      <rect width="400" height="400" fill="#ffffff" rx="16" />
      <rect x="6" y="6" width="388" height="388" fill="none" stroke="#1c398e" strokeWidth="8" rx="12" />

      {/* Top Block: Royal Blue SLN */}
      <rect x="22" y="22" width="356" height="180" fill="#1b3992" />
      <text
        x="200"
        y="152"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Times New Roman', Georgia, 'Cinzel', serif"
        fontSize="148"
        fontWeight="800"
        letterSpacing="-3"
      >
        SLN
      </text>

      {/* Middle Block: Vivid Red Fire Service */}
      <rect x="22" y="202" width="356" height="142" fill="#e01e2b" />
      <text
        x="200"
        y="300"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', 'Segoe Script', cursive"
        fontSize="76"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="1"
      >
        Fire Service
      </text>

      {/* Bottom Block: White bar with Blue Fire Protection Engineers */}
      <rect x="22" y="344" width="356" height="34" fill="#ffffff" />
      <text
        x="200"
        y="370"
        textAnchor="middle"
        fill="#1b3992"
        fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="0.5"
      >
        Fire Protection Engineers
      </text>
    </svg>
  );
};
