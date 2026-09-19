'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SensoryCupVisualProps {
  temperature: 'hot' | 'iced' | 'both';
  type: 'filter_v60' | 'espresso_milk' | 'cold_brew' | 'signature' | 'filter';
  roast: 'light' | 'medium' | 'dark';
  milk?: 'oat' | 'dairy' | 'black' | 'any';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SensoryCupVisual({
  temperature,
  type,
  roast,
  milk = 'black',
  className = '',
  size = 'md',
}: SensoryCupVisualProps) {
  const isIced = temperature === 'iced' || type === 'cold_brew';
  const isHotMilk = !isIced && (type === 'espresso_milk' || milk === 'oat' || milk === 'dairy');
  const isHotBlack = !isIced && !isHotMilk;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    lg: 'w-44 h-44 sm:w-48 sm:h-48',
  }[size];

  // Liquid color tone based on roast
  const roastLiquidColors = {
    light: { from: '#B45309', to: '#D97706', crema: '#FDE68A' },
    medium: { from: '#78350F', to: '#92400E', crema: '#F59E0B' },
    dark: { from: '#381E11', to: '#582A14', crema: '#D97706' },
  }[roast] || { from: '#78350F', to: '#92400E', crema: '#F59E0B' };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
      {/* Ambient Radial Underglow */}
      <motion.div
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`pointer-events-none absolute -inset-2 rounded-full blur-2xl ${
          isIced
            ? 'bg-gradient-to-t from-fayrouz-500/25 to-teal-400/10'
            : 'bg-gradient-to-t from-gold-500/30 to-amber-500/15'
        }`}
      />

      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] relative z-10"
      >
        <defs>
          {/* Iced Liquid Gradient */}
          <linearGradient id="icedLiquidGrad" x1="80" y1="50" x2="80" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={roastLiquidColors.from} stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1E100A" stopOpacity="0.95" />
          </linearGradient>

          {/* Glass Specular Reflection */}
          <linearGradient id="glassReflect" x1="50" y1="40" x2="110" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
          </linearGradient>

          {/* Ceramic Cup Body Gradient */}
          <linearGradient id="ceramicCupGrad" x1="40" y1="70" x2="120" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#261E1A" />
            <stop offset="50%" stopColor="#1A1412" />
            <stop offset="100%" stopColor="#120D0A" />
          </linearGradient>

          {/* Gold Trim Accents */}
          <linearGradient id="goldTrimGrad" x1="30" y1="65" x2="130" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8E7019" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#DFC04E" />
          </linearGradient>

          {/* Crema Surface Gradient */}
          <radialGradient id="cremaGrad" cx="80" cy="74" r="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBF4DD" />
            <stop offset="45%" stopColor={roastLiquidColors.crema} />
            <stop offset="85%" stopColor={roastLiquidColors.to} />
            <stop offset="100%" stopColor="#3E1D0E" />
          </radialGradient>

          {/* Pour-Over Clear Liquid Gradient */}
          <linearGradient id="filterLiquidGrad" x1="80" y1="65" x2="80" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={roastLiquidColors.from} stopOpacity="0.75" />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0.92" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* SCENARIO 1: ICED TUMBLER / CHILLED CRYSTAL GLASS               */}
        {/* ------------------------------------------------------------- */}
        {isIced && (
          <g>
            {/* Glass Outer Contour */}
            <path
              d="M52 42 L58 132 C58.5 137 63 141 68 141 L92 141 C97 141 101.5 137 102 132 L108 42 Z"
              fill="url(#icedLiquidGrad)"
              stroke="#D4AF37"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />

            {/* Ice Cubes Floating */}
            {/* Ice Cube 1 */}
            <rect
              x="62"
              y="58"
              width="18"
              height="18"
              rx="3"
              transform="rotate(14 71 67)"
              fill="rgba(255,255,255,0.18)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
            />
            {/* Ice Cube 2 */}
            <rect
              x="80"
              y="74"
              width="20"
              height="20"
              rx="4"
              transform="rotate(-18 90 84)"
              fill="rgba(255,255,255,0.22)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.2"
            />
            {/* Ice Cube 3 */}
            <rect
              x="66"
              y="96"
              width="17"
              height="17"
              rx="3"
              transform="rotate(8 74 104)"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.2"
            />

            {/* Frost & Condensation Droplets */}
            <circle cx="56" cy="80" r="1.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="104" cy="94" r="1.8" fill="rgba(255,255,255,0.35)" />
            <circle cx="59" cy="112" r="1.3" fill="rgba(255,255,255,0.45)" />
            <circle cx="101" cy="68" r="1.2" fill="rgba(255,255,255,0.3)" />

            {/* Specular Highlight Streak */}
            <path
              d="M55 46 L60 134"
              stroke="url(#glassReflect)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M104 46 L99 134"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Glass Rim Oval */}
            <ellipse
              cx="80"
              cy="42"
              rx="28"
              ry="7"
              fill="none"
              stroke="#D4AF37"
              strokeOpacity="0.6"
              strokeWidth="1.8"
            />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCENARIO 2: HOT CERAMIC TULIP CUP WITH VELVET LATTE ART        */}
        {/* ------------------------------------------------------------- */}
        {isHotMilk && (
          <g>
            {/* Saucer */}
            <ellipse
              cx="80"
              cy="134"
              rx="46"
              ry="8"
              fill="#160F0C"
              stroke="url(#goldTrimGrad)"
              strokeWidth="1.5"
            />

            {/* Cup Handle */}
            <path
              d="M112 78 C124 78 128 92 124 104 C120 114 110 114 104 112"
              fill="none"
              stroke="url(#goldTrimGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Cup Body */}
            <path
              d="M44 72 C44 72 45 120 74 126 C76 126.5 84 126.5 86 126 C115 120 116 72 116 72 Z"
              fill="url(#ceramicCupGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="1.6"
            />

            {/* Crema Pool Oval */}
            <ellipse
              cx="80"
              cy="72"
              rx="36"
              ry="11"
              fill="url(#cremaGrad)"
              stroke="url(#goldTrimGrad)"
              strokeWidth="1.2"
            />

            {/* Latte Art Microfoam Feather/Tulip */}
            <g opacity="0.95">
              {/* Central Heart Top */}
              <path
                d="M80 67 C78 64 74 65 74 67 C74 70 80 74 80 74 C80 74 86 70 86 67 C86 65 82 64 80 67 Z"
                fill="#FCFAF6"
              />
              {/* Middle Layer */}
              <path
                d="M80 70 C77 67 71 69 71 72 C71 75 80 78 80 78 C80 78 89 75 89 72 C89 69 83 67 80 70 Z"
                fill="#FCFAF6"
                fillOpacity="0.85"
              />
              {/* Bottom Base Arc */}
              <path
                d="M80 74 C75 72 68 73 68 76 C68 79 80 81 80 81 C80 81 92 79 92 76 C92 73 85 72 80 74 Z"
                fill="#FCFAF6"
                fillOpacity="0.75"
              />
            </g>

            {/* Delicate Rising Steam Lines */}
            <motion.path
              animate={{ y: [-2, -8, -2], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              d="M72 56 C70 50 74 46 72 40"
              stroke="rgba(252,250,246,0.35)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              animate={{ y: [-3, -10, -3], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              d="M80 54 C83 48 78 44 81 36"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              animate={{ y: [-2, -7, -2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              d="M88 56 C86 51 90 47 88 41"
              stroke="rgba(252,250,246,0.3)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCENARIO 3: HOT CRAFT FILTER / V60 GLASS CARAFE                */}
        {/* ------------------------------------------------------------- */}
        {isHotBlack && (
          <g>
            {/* Carafe Outline */}
            <path
              d="M66 48 L94 48 L96 66 L112 122 C114 130 108 138 100 138 L60 138 C52 138 46 130 48 122 L64 66 Z"
              fill="url(#filterLiquidGrad)"
              stroke="#D4AF37"
              strokeOpacity="0.4"
              strokeWidth="1.6"
            />

            {/* Glass Carafe Handle */}
            <path
              d="M102 70 C118 72 122 96 116 114 C114 118 108 118 104 116"
              fill="none"
              stroke="rgba(212,175,55,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Clear Liquid Surface Arc */}
            <path
              d="M57 88 C70 94 90 94 103 88"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Glass Reflections */}
            <path
              d="M54 78 L50 122"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Carafe Spout Rim */}
            <ellipse
              cx="80"
              cy="48"
              rx="15"
              ry="4"
              stroke="#D4AF37"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              fill="#1A1412"
            />

            {/* Steam Wisps */}
            <motion.path
              animate={{ y: [-2, -8, -2], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              d="M76 42 C74 36 78 32 76 26"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              animate={{ y: [-3, -9, -3], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              d="M84 40 C86 34 82 30 85 24"
              stroke="rgba(252,250,246,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
