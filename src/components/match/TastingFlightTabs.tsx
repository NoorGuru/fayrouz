'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Coffee, Compass } from 'lucide-react';

export interface FlightItem {
  id: string;
  score: number;
  isHero?: boolean;
  isAdventure?: boolean;
  drinkNameEn: string;
  drinkNameAr: string;
}

interface TastingFlightTabsProps {
  items: FlightItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function TastingFlightTabs({
  items,
  selectedIndex,
  onSelectIndex,
}: TastingFlightTabsProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-espresso-950/80 border border-gold-500/20 backdrop-blur-md overflow-x-auto no-scrollbar shadow-lg">
        {items.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          const isHero = item.isHero;
          const isAdventure = item.isAdventure;

          return (
            <button
              key={item.id}
              onClick={() => onSelectIndex(idx)}
              className={`relative flex-1 min-h-[44px] min-w-[100px] sm:min-w-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 sm:shrink ${
                isSelected
                  ? 'text-espresso-950 font-bold'
                  : 'text-parchment-300 hover:text-parchment-100 hover:bg-espresso-900/60'
              }`}
            >
              {/* Animated Active Pill Indicator */}
              {isSelected && (
                <motion.div
                  layoutId="activeFlightTabIndicator"
                  className={`absolute inset-0 rounded-xl shadow-md ${
                    isAdventure
                      ? 'bg-gradient-to-r from-fayrouz-500 to-teal-400'
                      : isHero
                      ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500'
                      : 'bg-gradient-to-r from-parchment-100 to-parchment-200'
                  }`}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              {/* Tab Content */}
              <div className="relative z-10 flex items-center gap-1.5">
                {isHero ? (
                  <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'fill-espresso-950 text-espresso-950' : 'text-gold-400'}`} />
                ) : isAdventure ? (
                  <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-espresso-950' : 'text-fayrouz-400'}`} />
                ) : (
                  <Coffee className={`w-3.5 h-3.5 ${isSelected ? 'text-espresso-950' : 'text-parchment-400'}`} />
                )}

                <span className="truncate max-w-[80px] sm:max-w-none">
                  {isHero
                    ? language === 'ar' ? 'الخيار الأول' : 'Hero #1'
                    : isAdventure
                    ? language === 'ar' ? 'مغامرة' : 'Adventure'
                    : language === 'ar' ? `بديل #${idx}` : `Alt #${idx}`}
                </span>

                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-espresso-950/20 text-espresso-950 font-bold'
                      : isAdventure
                      ? 'bg-fayrouz-950/60 text-fayrouz-300'
                      : 'bg-espresso-900 text-gold-400'
                  }`}
                >
                  {item.score}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
