'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProfileModal } from '@/components/auth/ProfileModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, ShieldCheck, Zap, Award, ArrowRight, UserPlus, Coffee } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [currentVenue] = useState('Ambar Specialty Roasters');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleStartQuiz = () => {
    // Ready for Task 3: The 30s JEV Sensory Quiz
    alert(language === 'ar' 
      ? 'سيبدأ اختبار الذوق في الخطوة القادمة (Task 3)!' 
      : 'The 30-second sensory quiz will be built next in Task 3!');
  };

  return (
    <AppShell
      currentVenueName={currentVenue}
      onOpenVenueModal={() => {}}
      onOpenAuthModal={() => setIsAuthModalOpen(true)}
      onOpenProfileModal={() => setIsProfileModalOpen(true)}
    >
      <div className="flex flex-col items-center text-center py-8 sm:py-16 max-w-2xl mx-auto space-y-8">
        {/* Brand Pill */}
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

        {/* Dynamic User State Card (Logged In vs New Guest) */}
        {user ? (
          /* Logged-in Personalized Pre-Visit Card */
          <div className="w-full glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-5 text-left border border-gold-500/30">
            <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-espresso-950 font-serif text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-parchment-50 flex items-center gap-2">
                    <span>
                      {language === 'ar' ? `أهلاً بك، ${user.name} 👋` : `Welcome back, ${user.name} 👋`}
                    </span>
                    {user.fayrouzPassId && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                        {user.fayrouzPassId}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-parchment-300/70 font-mono">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="text-xs text-gold-400 hover:text-gold-300 underline font-medium cursor-pointer"
              >
                {t('profile')}
              </button>
            </div>

            {/* Quiz Status inside Account */}
            {!user.hasCompletedQuiz ? (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-parchment-200">
                  {language === 'ar'
                    ? 'حسابك جاهز! خطوتك التالية هي تحديد ذائقتك خلال ٣٠ ثانية فقط قبل طلب فنجانك القادم.'
                    : 'Your account is ready! Discover your coffee dialect in 30 seconds before your next order.'}
                </p>
                <button
                  onClick={handleStartQuiz}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('quizTitle')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-gold-300">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span className="font-semibold">{user.assignedDialect}</span>
                  {user.assignedHouse && (
                    <span className="text-parchment-300/70">({user.assignedHouse})</span>
                  )}
                </div>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs text-parchment-200 border border-espresso-700 bg-espresso-950/80 px-4 py-2 rounded-xl hover:border-gold-500/40 cursor-pointer"
                >
                  <Coffee className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t('activeMenu')}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Guest Pre-Visit CTA Card */
          <div className="w-full glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/15 pb-5">
              <div>
                <h2 className="text-lg font-bold text-parchment-50 font-serif">
                  {language === 'ar' ? 'جاهز قبل ما تروح؟' : 'Ready Before You Go?'}
                </h2>
                <p className="text-xs text-parchment-300/70">
                  {language === 'ar' ? 'افتح حسابك واعمل اختبار الذوق السريع من البيت' : 'Create your profile & discover your coffee dialect from home'}
                </p>
              </div>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs font-semibold text-espresso-950 shadow-md hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('signUp')}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
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
        )}
      </div>

      {/* Auth Modal (Sign Up / Sign In) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onStartQuiz={handleStartQuiz}
      />
    </AppShell>
  );
}
