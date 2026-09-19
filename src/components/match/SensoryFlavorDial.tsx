'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SensoryFlavorDialProps {
  flavorNotes: string[];
  roast: 'light' | 'medium' | 'dark';
  type: string;
  milk?: 'oat' | 'dairy' | 'black' | 'any';
  className?: string;
  size?: 'sm' | 'md';
}

export function SensoryFlavorDial({
  flavorNotes,
  roast,
  type,
  milk = 'black',
  className = '',
  size = 'md',
}: SensoryFlavorDialProps) {
  const { language } = useLanguage();

  // Normalize notes for keyword matching
  const notesStr = flavorNotes.join(' ').toLowerCase();

  // 1. Sweetness (حلاوة)
  let sweetness = 50;
  if (/chocolate|cacao|caramel|honey|vanilla|hazelnut|praline|pistachio|molasses|sugar/.test(notesStr)) {
    sweetness += 32;
  }
  if (milk === 'oat') sweetness += 8;
  sweetness = Math.min(95, Math.max(35, sweetness));

  // 2. Acidity / Brightness (حموضة فاكهية وإشراق)
  let acidity = 40;
  if (/berry|strawberry|blueberry|peach|jasmine|citrus|lemon|orange|floral|plum|apple|grape|passionfruit/.test(notesStr)) {
    acidity += 38;
  }
  if (roast === 'light') acidity += 14;
  if (roast === 'dark') acidity -= 15;
  if (milk !== 'black') acidity -= 12;
  acidity = Math.min(95, Math.max(25, acidity));

  // 3. Body & Mouthfeel (قوام)
  let body = 45;
  if (type === 'espresso_milk' || milk === 'oat' || milk === 'dairy') {
    body += 35;
  }
  if (roast === 'dark') body += 12;
  if (roast === 'light' && milk === 'black') body -= 10;
  body = Math.min(95, Math.max(30, body));

  // 4. Roast Depth (عمق التحميص)
  const roastScore = roast === 'light' ? 40 : roast === 'medium' ? 68 : 92;

  // Radar geometry (calibrated for 210x180 viewBox with safe margins)
  const cx = 105;
  const cy = 88;
  const maxR = 46;

  const rSweet = (sweetness / 100) * maxR;
  const rAcid = (acidity / 100) * maxR;
  const rBody = (body / 100) * maxR;
  const rRoast = (roastScore / 100) * maxR;

  // Polygon vertices: Top, Right, Bottom, Left
  const pTop = `${cx},${cy - rSweet}`;
  const pRight = `${cx + rAcid},${cy}`;
  const pBottom = `${cx},${cy + rBody}`;
  const pLeft = `${cx - rRoast},${cy}`;
  const polygonPoints = `${pTop} ${pRight} ${pBottom} ${pLeft}`;

  const containerSizes = size === 'sm' ? 'w-48 h-40' : 'w-56 h-48 sm:w-64 sm:h-52';

  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${containerSizes} ${className}`}>
      <svg
        viewBox="0 0 210 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="dialGlow" cx="105" cy="88" r="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#120D0A" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="polyGrad" x1="105" y1="40" x2="105" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Ambient Radial Fill */}
        <circle cx={cx} cy={cy} r={maxR} fill="url(#dialGlow)" />

        {/* Concentric Guide Rings */}
        <circle cx={cx} cy={cy} r={maxR} stroke="#D4AF37" strokeOpacity="0.2" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={maxR * 0.66} stroke="#D4AF37" strokeOpacity="0.14" />
        <circle cx={cx} cy={cy} r={maxR * 0.33} stroke="#D4AF37" strokeOpacity="0.09" />

        {/* Axis Crosshairs */}
        <line x1={cx} y1={cy - maxR - 6} x2={cx} y2={cy + maxR + 6} stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="1" />
        <line x1={cx - maxR - 6} y1={cy} x2={cx + maxR + 6} y2={cy} stroke="#D4AF37" strokeOpacity="0.25" strokeWidth="1" />

        {/* Radar Value Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#polyGrad)"
          stroke="#2DD4BF"
          strokeWidth="1.8"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-out drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
        />

        {/* Vertex Dots */}
        <circle cx={cx} cy={cy - rSweet} r="3" fill="#FCFAF6" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx={cx + rAcid} cy={cy} r="3" fill="#FCFAF6" stroke="#2DD4BF" strokeWidth="1.5" />
        <circle cx={cx} cy={cy + rBody} r="3" fill="#FCFAF6" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx={cx - rRoast} cy={cy} r="3" fill="#FCFAF6" stroke="#2DD4BF" strokeWidth="1.5" />

        {/* Axis Micro-Labels with Safe Margins */}
        {/* Top: Sweetness */}
        <text
          x={cx}
          y={cy - maxR - 10}
          textAnchor="middle"
          className="fill-parchment-200 text-[10px] font-sans font-semibold tracking-wide"
        >
          {language === 'ar' ? 'حلاوة' : 'Sweet'}
        </text>

        {/* Right: Acidity */}
        <text
          x={cx + maxR + 14}
          y={cy + 3.5}
          textAnchor="start"
          className="fill-parchment-200 text-[10px] font-sans font-semibold tracking-wide"
        >
          {language === 'ar' ? 'فاكهية' : 'Acidity'}
        </text>

        {/* Bottom: Body */}
        <text
          x={cx}
          y={cy + maxR + 18}
          textAnchor="middle"
          className="fill-parchment-200 text-[10px] font-sans font-semibold tracking-wide"
        >
          {language === 'ar' ? 'قوام' : 'Body'}
        </text>

        {/* Left: Roast */}
        <text
          x={cx - maxR - 14}
          y={cy + 3.5}
          textAnchor="end"
          className="fill-parchment-200 text-[10px] font-sans font-semibold tracking-wide"
        >
          {language === 'ar' ? 'تحميص' : 'Roast'}
        </text>
      </svg>
    </div>
  );
}
