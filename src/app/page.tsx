'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProfileModal } from '@/components/auth/ProfileModal';
import { SensoryQuizModal } from '@/components/quiz/SensoryQuizModal';
import { VenueSelectorModal } from '@/components/venue/VenueSelectorModal';
import { MatchView } from '@/components/match/MatchView';
import { SensoryCupVisual } from '@/components/match/SensoryCupVisual';
import { BaristaTicketModal } from '@/components/ticket/BaristaTicketModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { COFFEE_SHOPS, CoffeeShop, MENU_ITEMS, MenuItem } from '@/data/coffeehouses';
import { calculatePalateMatches } from '@/utils/matchEngine';
import { Sparkles, ArrowRight, UserPlus, Coffee, MapPin } from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [selectedShop, setSelectedShop] = useState<CoffeeShop>(COFFEE_SHOPS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  // Guest Live Taste Teaser State
  const [guestTasteMood, setGuestTasteMood] = useState<'chocolate_nutty' | 'fruity_floral' | 'sweet_caramel' | 'balanced'>('chocolate_nutty');

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

  // Holistic sensory profile presets for the 4 mood pills
  const TASTE_MOOD_PROFILES = {
    chocolate_nutty: {
      milkPreference: 'oat' as const,
      flavorPreference: 'chocolate_nutty' as const,
      temperature: 'hot' as const,
      intensity: 'medium' as const,
      dietaryFlags: [],
    },
    fruity_floral: {
      milkPreference: 'black' as const,
      flavorPreference: 'fruity_floral' as const,
      temperature: 'any' as const,
      intensity: 'light' as const,
      dietaryFlags: [],
    },
    sweet_caramel: {
      milkPreference: 'any' as const,
      flavorPreference: 'sweet_caramel' as const,
      temperature: 'any' as const,
      intensity: 'medium' as const,
      dietaryFlags: [],
    },
    balanced: {
      milkPreference: 'any' as const,
      flavorPreference: 'balanced' as const,
      temperature: 'any' as const,
      intensity: 'medium' as const,
      dietaryFlags: [],
    },
  };

  // Live Guest Teaser Match (previews top drink for chosen mood instantly)
  const previewMatch = calculatePalateMatches(
    TASTE_MOOD_PROFILES[guestTasteMood],
    currentShopDrinks
  ).perfectMatch;

  const handleSelectDrink = (drink: MenuItem) => {
    setSelectedTicketDrink(drink);
    setIsTicketModalOpen(true);
  };

  const isMatchedViewActive = user?.hasCompletedQuiz || showMatches;

  return (
    <AppShell
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

        {/* Active Venue Banner / Roastery Atelier Bar */}
        <div className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-gold-500/30 bg-espresso-900/90 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 text-left rtl:text-right">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/25 to-espresso-950 border border-gold-500/40 text-gold-300 shrink-0 shadow-inner">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-parchment-50 font-serif">
                  {language === 'ar' ? selectedShop.nameAr : selectedShop.name}
                </span>
                <span className="text-[10px] text-parchment-300 font-mono bg-espresso-950 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                  {language === 'ar' ? selectedShop.neighborhoodAr : selectedShop.neighborhood}
                </span>
              </div>
              <p className="text-[11px] text-parchment-400">
                ✨ {currentShopDrinks.length} {language === 'ar' ? 'أصناف حبوب متوفرة اليوم في القائمة' : 'specialty lots on live bar today'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVenueModalOpen(true)}
            className="min-h-[44px] flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold px-3.5 py-2 rounded-xl border border-gold-500/30 hover:border-gold-500/60 bg-gold-500/10 hover:bg-gold-500/20 transition-all cursor-pointer shrink-0"
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
          />
        ) : user ? (
          /* User is logged in but hasn't taken the quiz yet */
          <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-5 text-left rtl:text-right border border-gold-500/35">
            <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-amber-600 text-espresso-950 font-serif text-xl font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-base font-bold text-parchment-50 flex items-center gap-2 font-serif">
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

            <div className="space-y-4 pt-1">
              <p className="text-xs sm:text-sm text-parchment-200 leading-relaxed">
                {language === 'ar'
                  ? `حسابك جاهز! خطوتك التالية هي تحديد ذائقتك خلال ٣٠ ثانية فقط لمطابقة قائمة ${selectedShop.nameAr} بدقة بدون أي حيرة.`
                  : `Your account is ready! Discover your coffee dialect in 30 seconds to get your tailored 3+1 matches for ${selectedShop.name}.`}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-5 py-3 text-sm font-bold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('quizTitle')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => setShowMatches(true)}
                  className="min-h-[48px] flex items-center justify-center gap-2 rounded-xl border border-espresso-700 bg-espresso-950/80 px-4 py-3 text-xs font-semibold text-parchment-200 hover:border-gold-500/40 cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ar' ? 'عرض القائمة مباشرة' : 'Preview Matches'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Reimagined Guest Experience: The Sensory Front Door & Live Taste Preview */
          <div className="w-full space-y-6 text-left rtl:text-right">
            {/* Interactive Taste Mood Selector Card */}
            <div className="w-full rounded-3xl border-2 border-gold-500/35 bg-gradient-to-br from-espresso-900 via-espresso-950 to-espresso-900 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />

              {/* Teaser Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/15 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تجربة سريعة مباشرة' : 'Instant Taste Teaser'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-parchment-50">
                    {language === 'ar' ? 'ما النكهة الأقرب إلى مزاجك اليوم؟' : 'What sensory mood craves your palate?'}
                  </h3>
                  <p className="text-xs text-parchment-300/80">
                    {language === 'ar'
                      ? `المطابقة المباشرة الحية لقائمة ${selectedShop.nameAr}`
                      : `Live instant match for ${selectedShop.name}`}
                  </p>
                </div>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5 text-gold-400" />
                  <span>{t('signUp')}</span>
                </button>
              </div>

              {/* 4 Tactile Mood Pills */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'chocolate_nutty', labelAr: 'شوكولاتة وبندق', labelEn: 'Warm Cocoa & Nutty', badge: '🍫', hintAr: 'عمق الكاكاو والمكسرات المحمصة', hintEn: 'Rich roasted cocoa & toasted hazelnut' },
                    { id: 'fruity_floral', labelAr: 'توت بري وياسمين', labelEn: 'Wild Berries & Floral', badge: '🍓', hintAr: 'نقاء فاكهي وزهري طبيعي ساطع', hintEn: 'Radiant wild berries & jasmine bloom' },
                    { id: 'sweet_caramel', labelAr: 'كراميل وعسل مشرقي', labelEn: 'Honey & Caramel', badge: '🍯', hintAr: 'دفء الحلاوة المشرقية الفاخرة', hintEn: 'Velvety honey & caramelized comfort' },
                    { id: 'balanced', labelAr: 'متوازن ومعتدل', labelEn: 'Clean & Balanced', badge: '⚖️', hintAr: 'توازن سلس ونقاء بدون مرارة', hintEn: 'Smooth equilibrium & clean crisp finish' },
                  ].map((mood) => {
                    const isSelected = guestTasteMood === mood.id;
                    return (
                      <motion.button
                        key={mood.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setGuestTasteMood(mood.id as any)}
                        className={`min-h-[50px] flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'border-gold-400 bg-gold-500/25 text-gold-200 shadow-lg shadow-gold-500/15 ring-2 ring-gold-400/60'
                            : 'border-espresso-700/80 bg-espresso-950/60 text-parchment-300 hover:border-gold-500/40 hover:bg-espresso-900/60'
                        }`}
                      >
                        <span className="text-base select-none">{mood.badge}</span>
                        <span className="text-[11px] truncate font-medium">
                          {language === 'ar' ? mood.labelAr : mood.labelEn}
                        </span>
                        {isSelected && (
                          <motion.span
                            layoutId="activeMoodGlow"
                            className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-gold-400/20 to-gold-500/10 pointer-events-none"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Real-time sensory hint */}
                <div className="text-[11px] text-parchment-300/75 flex items-center justify-center sm:justify-start gap-1.5 px-1 font-sans">
                  <span className="text-gold-400 font-bold">✨</span>
                  <span>
                    {language === 'ar'
                      ? guestTasteMood === 'chocolate_nutty'
                        ? 'ذائقة الكاكاو والبندق: مطابقة المشروبات الغنية بالشوكولاتة والمكسرات المحمصة'
                        : guestTasteMood === 'fruity_floral'
                        ? 'ذائقة التوت والزهور: مطابقة محاصيل القهوة المختصة الفاكهية والزهرية الفردية'
                        : guestTasteMood === 'sweet_caramel'
                        ? 'ذائقة الكراميل والعسل: مطابقة المشروبات الحريرية ذات الحلاوة الطبيعية'
                        : 'ذائقة التوازن والنقاء: مطابقة خيارات التقطير البارد والإسبريسو المتوازن'
                      : guestTasteMood === 'chocolate_nutty'
                      ? 'Cocoa & Nutty profile: Matching deep roasted cocoa and artisan nutty microfoams'
                      : guestTasteMood === 'fruity_floral'
                      ? 'Berries & Floral profile: Matching radiant single-origin lots with tea-like clarity'
                      : guestTasteMood === 'sweet_caramel'
                      ? 'Honey & Caramel profile: Matching comforting honeyed indulgences and rich sweetness'
                      : 'Clean & Balanced profile: Matching smooth cold drip and harmonious equilibrium brews'}
                  </span>
                </div>
              </div>

              {/* Live Preview Match Result Card with AnimatePresence */}
              <AnimatePresence mode="wait">
                {previewMatch && (
                  <motion.div
                    key={previewMatch.drink.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="rounded-2xl border border-gold-500/35 bg-espresso-950/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-2xl relative overflow-hidden group"
                  >
                    {/* Subtle Gold Shimmer behind active card */}
                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

                    <SensoryCupVisual
                      temperature={previewMatch.drink.temperature}
                      type={previewMatch.drink.type}
                      roast={previewMatch.drink.roast}
                      milk={previewMatch.drink.milk}
                      size="sm"
                    />

                    <div className="flex-1 space-y-1.5 text-center sm:text-left rtl:sm:text-right">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-bold border border-gold-500/35 shadow-sm">
                          {previewMatch.score}% {language === 'ar' ? 'توافق متوقع' : 'Expected Match'}
                        </span>
                        <span className="text-xs font-serif font-bold text-gold-400">
                          {previewMatch.drink.priceJOD.toFixed(2)} {language === 'ar' ? 'د.أ' : 'JOD'}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-espresso-900 text-parchment-300 border border-espresso-700">
                          {previewMatch.drink.roast.toUpperCase()} ROAST
                        </span>
                      </div>

                      <h4 className="text-lg font-serif font-bold text-parchment-50 group-hover:text-gold-200 transition-colors">
                        {language === 'ar' ? previewMatch.drink.nameAr : previewMatch.drink.name}
                      </h4>

                      <p className="text-xs text-parchment-300/85 line-clamp-2 leading-relaxed">
                        &ldquo;{language === 'ar' ? previewMatch.drink.flavorNotesPlainAr : previewMatch.drink.flavorNotesPlain}&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => handleSelectDrink(previewMatch.drink)}
                      className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2.5 text-xs font-bold text-espresso-950 shadow-md hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer shrink-0 w-full sm:w-auto"
                    >
                      <Coffee className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'طلب فوري ☕' : 'Order Now ☕'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary Onboarding CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="w-full sm:flex-1 min-h-[50px] flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-5 py-3.5 text-sm font-bold text-espresso-950 shadow-xl hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إصدار باسبور فيروز الذوقي (٣٠ ثانية)' : 'Unlock Your FayrouzPass™ (30s)'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => setShowMatches(true)}
                  className="w-full sm:w-auto min-h-[50px] flex items-center justify-center gap-2 rounded-2xl border border-espresso-700 bg-espresso-950/80 px-4 py-3.5 text-xs font-semibold text-parchment-200 hover:border-gold-500/40 hover:text-gold-300 transition-colors cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-gold-400" />
                  <span>{language === 'ar' ? 'عرض القائمة كضيف' : 'Preview Flight as Guest'}</span>
                </button>
              </div>
            </div>

            {/* Prestige Membership Artifact Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl border border-espresso-800 bg-espresso-900/60 p-4 space-y-2 hover:border-gold-500/30 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30 font-bold">
                  ⚡
                </div>
                <div className="font-serif font-bold text-parchment-100 text-sm">
                  {language === 'ar' ? '٣٠ ثانية من بيتك' : '30-Second Calibration'}
                </div>
                <div className="text-parchment-400 text-[11px] leading-relaxed">
                  {language === 'ar' ? 'حدد ذوقك قبل ما تطلع، وانسى الحيرة قدام الباريستا' : 'Calibrate your palate from home; zero menu overthinking'}
                </div>
              </div>

              <div className="rounded-2xl border border-espresso-800 bg-espresso-900/60 p-4 space-y-2 hover:border-gold-500/30 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fayrouz-500/20 text-fayrouz-300 border border-fayrouz-500/30 font-bold">
                  💳
                </div>
                <div className="font-serif font-bold text-parchment-100 text-sm">
                  {language === 'ar' ? 'باسبور رقمي دائم' : 'Persistent FayrouzPass™'}
                </div>
                <div className="text-parchment-400 text-[11px] leading-relaxed">
                  {language === 'ar' ? 'يعمل في أرقى مقاهي عمّان: ألموند، ديمتريس، وعنبر' : 'Carry your taste ID across Almond, Dimitri’s & Ambar'}
                </div>
              </div>

              <div className="rounded-2xl border border-espresso-800 bg-espresso-900/60 p-4 space-y-2 hover:border-gold-500/30 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                  ☕
                </div>
                <div className="font-serif font-bold text-parchment-100 text-sm">
                  {language === 'ar' ? 'وصفة الباريستا الدقيقة' : 'Barista Dial-In Chit'}
                </div>
                <div className="text-parchment-400 text-[11px] leading-relaxed">
                  {language === 'ar' ? 'تذكرة كاونتر مباشرة مع معايير الاستخلاص الدقيقة' : '1-Tap counter ticket with exact ratio, dose & temp'}
                </div>
              </div>
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
