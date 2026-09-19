'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Globe, User } from 'lucide-react';

interface HeaderProps {
  onOpenAuthModal?: () => void;
  onOpenProfileModal?: () => void;
}

export function Header({
  onOpenAuthModal,
  onOpenProfileModal,
}: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleAccountClick = () => {
    if (user) {
      onOpenProfileModal?.();
    } else {
      onOpenAuthModal?.();
    }
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
              <span className="text-xs font-serif text-gold-400/80 tracking-normal">
                فـيـروز
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-parchment-300/70 uppercase">
              Specialty Coffee Matcher
            </span>
          </div>
        </div>

        {/* Right Actions: Language Switch & Auth/Profile */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-espresso-700 bg-espresso-900/90 px-3 py-2 text-xs font-semibold text-parchment-200 hover:border-gold-500/40 hover:text-gold-400 transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-gold-400/80" />
            <span>{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Account Profile / Sign In */}
          <button
            onClick={handleAccountClick}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-gradient-to-r from-gold-500/10 to-gold-600/20 px-3.5 py-2 text-xs font-medium text-gold-300 hover:border-gold-400 hover:bg-gold-500/20 transition-all cursor-pointer shadow-sm"
          >
            {user ? (
              <>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-espresso-950 font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate font-medium">{user.name}</span>
                {user.fayrouzPassId && (
                  <span className="hidden sm:inline-block text-[10px] font-mono text-gold-400 bg-espresso-950 px-1.5 py-0.5 rounded border border-gold-500/20">
                    {user.fayrouzPassId}
                  </span>
                )}
              </>
            ) : (
              <>
                <User className="h-3.5 w-3.5 text-gold-400" />
                <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
