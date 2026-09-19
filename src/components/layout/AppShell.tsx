'use client';

import React from 'react';
import { Header } from './Header';
import { useLanguage } from '@/context/LanguageContext';

interface AppShellProps {
  children: React.ReactNode;
  currentVenueName?: string;
  onOpenVenueModal?: () => void;
  onOpenAuthModal?: () => void;
  userEmail?: string | null;
}

export function AppShell({
  children,
  currentVenueName,
  onOpenVenueModal,
  onOpenAuthModal,
  userEmail,
}: AppShellProps) {
  const { direction } = useLanguage();

  return (
    <div dir={direction} className="min-h-screen bg-espresso-950 text-parchment-50 selection:bg-gold-500/30 selection:text-gold-200 relative overflow-x-hidden">
      {/* Luxury Ambient Atmospheric Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold-500/8 blur-[120px]" />
        <div className="absolute top-1/3 -left-48 h-80 w-80 rounded-full bg-fayrouz-600/8 blur-[100px]" />
        <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-gold-600/5 blur-[130px]" />
      </div>

      {/* Main App Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          currentVenueName={currentVenueName}
          onOpenVenueModal={onOpenVenueModal}
          onOpenAuthModal={onOpenAuthModal}
          userEmail={userEmail}
        />

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 md:py-8">
          {children}
        </main>

        {/* Minimal Luxury Footer */}
        <footer className="border-t border-espresso-800/80 bg-espresso-950/80 py-6 text-center text-xs text-parchment-300/50">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Fayrouz (فيروز) — System 1 Decision Architecture</p>
            <p className="text-[11px] text-gold-400/60 font-mono">fayrouz.bynoor.io</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
