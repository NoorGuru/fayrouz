'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProfileModal } from '@/components/auth/ProfileModal';
import { SensoryQuizModal } from '@/components/quiz/SensoryQuizModal';
import { VenueSelectorModal } from '@/components/venue/VenueSelectorModal';
import { MatchView } from '@/components/match/MatchView';
import { BaristaTicketModal } from '@/components/ticket/BaristaTicketModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { COFFEE_SHOPS, CoffeeShop, MENU_ITEMS, MenuItem } from '@/data/coffeehouses';
import { calculatePalateMatches } from '@/utils/matchEngine';
import { Sparkles, ShieldCheck, Zap, Award, ArrowRight, UserPlus, Coffee, RotateCcw, MapPin } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [selectedShop, setSelectedShop] = useState<CoffeeShop>(COFFEE_SHOPS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  // Task 6 Barista Ticket Modal State
  const [selectedTicketDrink, setSelectedTicketDrink] = useState<MenuItem | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // In-Store Table Tent QR detection (e.g. ?venue=almond or ?venue=dimitris)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const venueParam = params.get('venue');
      if (venueParam) {
        const found = COFFEE_SHOPS.find(
          (s) => s.id.toLowerCase() === venueParam.toLowerCase() || s.name.toLowerCase().includes(venueParam.toLowerCase())
        );
        if (found) {
          setSelectedShop(found);
        }
      }
    }
  }, []);

  const handleStartQuiz = () => {
    setIsQuizModalOpen(true);
  };

  const currentShopDrinks = MENU_ITEMS.filter((item) => item.shopId === selectedShop.id);

  // Palate 3+1 matches calculated dynamically
  const matches = calculatePalateMatches(user?.tasteProfile, currentShopDrinks);

  const handleSelectDrink = (drink: MenuItem) => {
    setSelectedTicketDrink(drink);
    setIsTicketModalOpen(true);
  };

  const isMatchedViewActive = user?.hasCompletedQuiz || showMatches;

  return (
    <AppShell
      currentVenueName={language === 'ar' ? selectedShop.nameAr : selectedShop.name}
      onOpenVenueModal={() => setIsVenueModalOpen(true)}
      onOpenAuthModal={() => setIsAuthModalOpen(true)}
      onOpenProfileModal={() => setIsProfileModalOpen(true)}
      onOpenQuizModal={() => {
        if (user?.hasCompletedQuiz) {
          setIsProfileModalOpen(true);
        } else {
          setIsQuizModalOpen(true);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center py-4 sm:py-10 max-w-2xl mx-auto space-y-6 sm:space-y-8"
      >
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-medium backdrop-blur-sm shadow-sm">
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

        {/* Active Venue Banner */}
        <div className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-gold-500/25 bg-espresso-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-left rtl:text-right">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-500/30 text-gold-400 shrink-0">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-parchment-50 font-serif">
                  {language === 'ar' ? selectedShop.nameAr : selectedShop.name}
                </span>
                <span className="text-[10px] text-parchment-400 bg-espresso-950 px-2 py-0.5 rounded-full border border-espresso-800">
                  {language === 'ar' ? selectedShop.neighborhoodAr : selectedShop.neighborhood}
                </span>
              </div>
              <p className="text-[11px] text-parchment-300/70">
                {currentShopDrinks.length} {language === 'ar' ? 'أصناف متوفرة اليوم في القائمة' : 'specialty drinks on live bar'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVenueModalOpen(true)}
            className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 font-semibold px-3 py-1.5 rounded-lg border border-gold-500/30 hover:border-gold-500/60 transition-all cursor-pointer shrink-0"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('changeVenue')}</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MAIN BODY: 3+1 Match View OR Onboarding CTA                   */}
        {/* ------------------------------------------------------------- */}
        {isMatchedViewActive ? (
          /* The System 1 "3 + 1" Match View */
          <MatchView
            coffeeShop={selectedShop}
            perfectMatch={matches.perfectMatch}
            alternatives={matches.alternatives}
            adventurePick={matches.adventurePick}
            onSelectDrink={handleSelectDrink}
            onRetakeQuiz={handleStartQuiz}
            onChangeVenue={() => setIsVenueModalOpen(true)}
          />
        ) : user ? (
          /* User is logged in but hasn't taken the quiz yet */
          <div className="w-full glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-5 text-left rtl:text-right border border-gold-500/30">
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

            <div className="space-y-3 pt-1">
              <p className="text-xs text-parchment-200">
                {language === 'ar'
                  ? `حسابك جاهز! خطوتك التالية هي تحديد ذائقتك خلال ٣٠ ثانية فقط لمطابقة قائمة ${selectedShop.nameAr} بدقة.`
                  : `Your account is ready! Discover your coffee dialect in 30 seconds to get your tailored 3+1 matches for ${selectedShop.name}.`}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-sm font-semibold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('quizTitle')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => setShowMatches(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-espresso-700 bg-espresso-950/80 px-4 py-3 text-xs text-parchment-200 hover:border-gold-500/40 cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ar' ? 'عرض القائمة مباشرة' : 'Preview Matches'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Guest Pre-Visit CTA Card */
          <div className="w-full glass-panel-glow rounded-2xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/15 pb-5">
              <div>
                <h2 className="text-lg font-bold text-parchment-50 font-serif">
                  {language === 'ar' ? 'جاهز قبل ما تروح؟' : 'Ready Before You Go?'}
                </h2>
                <p className="text-xs text-parchment-300/70">
                  {language === 'ar' ? 'افتح حسابك واعمل اختبار الذوق السريع من البيت' : 'Create your profile & discover your coffee dialect from home'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleStartQuiz}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs font-semibold text-espresso-950 shadow-md hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'ar' ? 'جرّب الاختبار' : 'Take Quiz'}</span>
                </button>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-3.5 py-2.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t('signUp')}</span>
                </button>
              </div>
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
                  {language === 'ar' ? 'باسبورك الذوقي معك وين ما رحت، بألموند وديمتريس وعنبر' : 'Carry your taste passport to Almond, Dimitri’s & more'}
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

            {/* Quick Preview Matches Button for Guests */}
            <div className="pt-2 text-center">
              <button
                onClick={() => setShowMatches(true)}
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium underline cursor-pointer"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>
                  {language === 'ar' ? `استعرض خيارات المطابقة في ${selectedShop.nameAr} كضيف` : `Preview 3+1 matches for ${selectedShop.name} as guest`}
                </span>
              </button>
            </div>
          </div>
        )}
      </motion.div>

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

      {/* 30-Second Sensory Quiz Modal */}
      <SensoryQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onCompleted={() => {
          setIsQuizModalOpen(false);
          setShowMatches(true);
        }}
      />

      {/* Coffeehouse Selector Modal */}
      <VenueSelectorModal
        isOpen={isVenueModalOpen}
        onClose={() => setIsVenueModalOpen(false)}
        selectedShopId={selectedShop.id}
        onSelectShop={(shop) => {
          setSelectedShop(shop);
        }}
      />

      {/* Barista Ticket Modal (Task 6) */}
      <BaristaTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        drink={selectedTicketDrink}
        coffeeShop={selectedShop}
        user={user}
      />
    </AppShell>
  );
}
