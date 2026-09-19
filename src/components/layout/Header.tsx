'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Globe, User, Coffee } from 'lucide-react';

interface HeaderProps {
  currentVenueName?: string;
  onOpenVenueModal?: () => void;
  onOpenAuthModal?: () => void;
  userEmail?: string | null;
}

export function Header({
  currentVenueName = 'Ambar Roasters',
  onOpenVenueModal,
  onOpenAuthModal,
  userEmail,
}: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-500/15 bg-espresso-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Arabic Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-espresso-800 border border-gold-500/30 text-gold-400 shadow-inner">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif tracking-widest text-lg font-bold text-parchment-50">
                FAYROUZ
              </span>
              <span className="text-xs font-medium text-gold-400/80 font-sans tracking-normal">
                فيروز
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-parchment-300/70 uppercase">
              System 1 Coffee Matcher
            </span>
          </div>
        </div>

        {/* Center Venue Switcher (Pill) */}
        {onOpenVenueModal && (
          <button
            onClick={onOpenVenueModal}
            className="hidden md:flex items-center gap-2 rounded-full border border-gold-500/20 bg-espresso-800/80 px-3.5 py-1.5 text-xs text-parchment-100 hover:border-gold-500/50 hover:bg-espresso-700/80 transition-all cursor-pointer"
          >
            <Coffee className="h-3.5 w-3.5 text-gold-400" />
            <span className="font-medium">{currentVenueName}</span>
            <span className="text-[10px] text-parchment-300/60">▼</span>
          </button>
        )}

        {/* Right Actions: Language Switch & Auth/Profile */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-espresso-700 bg-espresso-900/90 px-2.5 py-1.5 text-xs font-semibold text-parchment-200 hover:border-gold-500/40 hover:text-gold-400 transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-gold-400/80" />
            <span>{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Account Profile / Sign In */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gradient-to-r from-gold-500/10 to-gold-600/20 px-3 py-1.5 text-xs font-medium text-gold-300 hover:border-gold-400 hover:bg-gold-500/20 transition-all cursor-pointer"
          >
            <User className="h-3.5 w-3.5 text-gold-400" />
            <span className="max-w-[100px] truncate">
              {userEmail ? userEmail.split('@')[0] : (language === 'ar' ? 'حسابي' : 'Account')}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
