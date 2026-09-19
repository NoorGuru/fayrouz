'use client';

import React from 'react';
import { Header } from './Header';
import { useLanguage } from '@/context/LanguageContext';
import { Coffee, Sparkles, MapPin } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  onOpenVenueModal?: () => void;
  onOpenAuthModal?: () => void;
  onOpenProfileModal?: () => void;
  onOpenQuizModal?: () => void;
}

export function AppShell({
  children,
  onOpenVenueModal,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenQuizModal,
}: AppShellProps) {
  const { direction, language, t } = useLanguage();

  return (
    <div dir={direction} className="min-h-screen bg-espresso-950 text-parchment-50 selection:bg-gold-500/30 selection:text-gold-200 relative overflow-x-hidden pb-24 sm:pb-0">
      {/* Luxury Ambient Atmospheric Glows (optimized blur for mobile performance) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-gold-500/8 blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-1/3 -left-48 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-fayrouz-600/8 blur-[70px] sm:blur-[100px]" />
        <div className="absolute -bottom-20 right-0 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-gold-600/5 blur-[90px] sm:blur-[130px]" />
      </div>

      {/* Main App Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          onOpenAuthModal={onOpenAuthModal}
          onOpenProfileModal={onOpenProfileModal}
        />

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 md:py-8">
          {children}
        </main>

        {/* Minimal Luxury Footer */}
        <footer className="border-t border-espresso-800/80 bg-espresso-950/80 py-6 text-center text-xs text-parchment-300/50 mb-16 sm:mb-0">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Fayrouz (فيروز) — Specialty Coffee Matcher</p>
            <p className="text-[11px] text-gold-400/60 font-mono">fayrouz.bynoor.io</p>
          </div>
        </footer>

        {/* Mobile Floating Bottom Ergonomic Navigation Bar (with safe-area-inset & 44px touch targets) */}
        <nav className="sm:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-4 z-40 mx-auto max-w-sm glass-panel-glow rounded-2xl p-1.5 border border-gold-500/35 flex items-center justify-around shadow-2xl backdrop-blur-xl bg-espresso-950/90">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl text-parchment-200 hover:text-gold-400 active:scale-95 transition-all cursor-pointer"
          >
            <Coffee className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] font-medium">{t('navHome')}</span>
          </button>

          <button
            onClick={onOpenQuizModal || onOpenProfileModal}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl text-parchment-200 hover:text-gold-400 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-fayrouz-400" />
            <span className="text-[10px] font-medium">{language === 'ar' ? 'جوازي' : 'My Pass'}</span>
          </button>

          <button
            onClick={onOpenVenueModal}
            className="flex-1 min-h-[44px] flex flex-col items-center justify-center gap-1 rounded-xl text-parchment-200 hover:text-gold-400 active:scale-95 transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-medium">{language === 'ar' ? 'المقاهي' : 'Venues'}</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
