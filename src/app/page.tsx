'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const [currentVenue] = useState('Ambar Specialty Roasters');

  return (
    <AppShell
      currentVenueName={currentVenue}
      onOpenVenueModal={() => {}}
      onOpenAuthModal={() => {}}
      userEmail={null}
    >
      <div className="flex flex-col items-center text-center py-8 sm:py-16 max-w-2xl mx-auto space-y-8">
        {/* Hero Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t('brandTagline')}</span>
        </div>

        {/* Hero Title & Bilingual Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-parchment-50 tracking-tight leading-tight">
            {language === 'ar' ? (
              <>
                طابق ذوقك مع منيو الكافيه بـ <span className="text-gold-400">٣ ثواني</span>
              </>
            ) : (
              <>
                Connect Your Palate in <span className="text-gold-400">3 Seconds</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-parchment-300/80 leading-relaxed font-sans max-w-xl mx-auto">
            {t('brandSubtext')}
          </p>
        </div>

        {/* Pre-visit Feature Highlights */}
        <div className="w-full glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6 text-left">
          <div className="border-b border-gold-500/15 pb-4">
            <h2 className="text-lg font-bold text-parchment-50 font-serif">
              {language === 'ar' ? 'جاهز قبل ما تروح؟' : 'Ready Before You Go?'}
            </h2>
            <p className="text-xs text-parchment-300/70">
              {language === 'ar' ? 'افتح حسابك واعمل اختبار الذوق السريع من البيت' : 'Create your profile & discover your coffee dialect from home'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-espresso-700 bg-espresso-900/60 p-3.5 space-y-1.5">
              <Zap className="w-4 h-4 text-gold-400" />
              <div className="font-semibold text-parchment-100">
                {language === 'ar' ? '٣٠ ثانية وبس' : '30-Second Quiz'}
              </div>
              <div className="text-parchment-400 text-[11px]">
                {language === 'ar' ? '٤ كبسات لمس سريعة، بدون استبيانات وفلسفة زايدة' : '4 quick tactile taps, zero typing or friction'}
              </div>
            </div>

            <div className="rounded-xl border border-espresso-700 bg-espresso-900/60 p-3.5 space-y-1.5">
              <ShieldCheck className="w-4 h-4 text-fayrouz-400" />
              <div className="font-semibold text-parchment-100">
                {language === 'ar' ? 'باسبور دائم' : 'Persistent Pass'}
              </div>
              <div className="text-parchment-400 text-[11px]">
                {language === 'ar' ? 'باسبورك الذوقي معك وين ما رحت، بعنبر وتراث وغيرهم' : 'Carry your taste passport to Ambar, Turath & more'}
              </div>
            </div>

            <div className="rounded-xl border border-espresso-700 bg-espresso-900/60 p-3.5 space-y-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <div className="font-semibold text-parchment-100">
                {language === 'ar' ? 'مطابقة ذكية' : 'Smart Palate Match'}
              </div>
              <div className="text-parchment-400 text-[11px]">
                {language === 'ar' ? '٣ خيارات مضمونة + ١ مغامرة، وبترتاح من الحيرة' : '3 safe matches + 1 adventure pick'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
