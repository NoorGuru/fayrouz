'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem, CoffeeShop } from '@/data/coffeehouses';
import { ScoredDrink } from '@/utils/matchEngine';
import { SensoryCupVisual } from './SensoryCupVisual';
import { SensoryFlavorDial } from './SensoryFlavorDial';
import { TastingFlightTabs, FlightItem } from './TastingFlightTabs';
import { 
  Sparkles, ArrowRight, Compass, CheckCircle2, Flame, 
  Snowflake, RotateCcw, Coffee, ShieldCheck, Sliders, Droplet, Wand2, Scale
} from 'lucide-react';

interface MatchViewProps {
  coffeeShop: CoffeeShop;
  perfectMatch: ScoredDrink;
  alternatives: ScoredDrink[];
  adventurePick: ScoredDrink | null;
  onSelectDrink: (drink: MenuItem) => void;
  onRetakeQuiz: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 320,
    },
  },
};

export function MatchView({
  coffeeShop,
  perfectMatch,
  alternatives,
  adventurePick,
  onSelectDrink,
  onRetakeQuiz,
}: MatchViewProps) {
  const { language, t } = useLanguage();

  // Combine into a 3+1 flight array
  const flightDrinks: ScoredDrink[] = [
    perfectMatch,
    ...alternatives.slice(0, 2),
    ...(adventurePick ? [adventurePick] : []),
  ];

  const [selectedFlightIndex, setSelectedFlightIndex] = useState<number>(0);

  // Live On-Deck Palate Tuner State
  const [customTemp, setCustomTemp] = useState<'hot' | 'iced' | null>(null);
  const [customMilk, setCustomMilk] = useState<'oat' | 'dairy' | 'black' | null>(null);

  const handleSelectFlightTab = (idx: number) => {
    setSelectedFlightIndex(idx);
    setCustomTemp(null);
    setCustomMilk(null);
  };

  // Active drink being inspected
  const currentScoredDrink = flightDrinks[selectedFlightIndex] || perfectMatch;
  const baseDrink = currentScoredDrink.drink;
  const isCurrentHero = selectedFlightIndex === 0;
  const isCurrentAdventure = baseDrink.isAdventure;

  // Resolve dynamic tuned attributes
  const activeTemp: 'hot' | 'iced' = customTemp || (baseDrink.temperature === 'both' ? 'hot' : baseDrink.temperature);
  const activeMilk: MenuItem['milk'] = customMilk || baseDrink.milk;
  const isTuned = (customTemp !== null && customTemp !== baseDrink.temperature) || (customMilk !== null && customMilk !== baseDrink.milk);

  const activeDrink: MenuItem = {
    ...baseDrink,
    temperature: activeTemp,
    milk: activeMilk,
    specs: {
      ...baseDrink.specs,
      milkTexture: activeMilk === 'black'
        ? (language === 'ar' ? 'نقاء سادة بدون حليب' : 'Pure single-origin clarity')
        : activeTemp === 'iced'
        ? (language === 'ar' ? `حليب ${activeMilk === 'oat' ? 'شوفان' : 'كامل الدسم'} مخفوق وبارد فوق ثلج` : `Chilled aerated ${activeMilk} milk over ice`)
        : (language === 'ar' ? `مايكروفوم حليب ${activeMilk === 'oat' ? 'شوفان' : 'كامل الدسم'} حريري بدرجة ٦٢ مئوية` : `Dense microfoam with ${activeMilk} milk at 62°C`),
    },
  };

  // Build tabs metadata
  const flightTabs: FlightItem[] = flightDrinks.map((sd, idx) => ({
    id: sd.drink.id,
    score: sd.score,
    isHero: idx === 0,
    isAdventure: sd.drink.isAdventure,
    drinkNameEn: sd.drink.name,
    drinkNameAr: sd.drink.nameAr,
  }));

  // Resolve reason chips (Item B1)
  const reasonChips = (language === 'ar'
    ? currentScoredDrink.matchReasonsAr
    : currentScoredDrink.matchReasons) || [];

  // Fallback reasons if none computed
  const displayedReasons = reasonChips.length > 0
    ? reasonChips.slice(0, 3)
    : [
        activeDrink.temperature === 'hot'
          ? (language === 'ar' ? 'حرارة دافئة مريحة' : 'Steaming temperature')
          : (language === 'ar' ? 'انتعاش بارد ومثلج' : 'Chilled refreshing finish'),
        activeDrink.milk === 'oat'
          ? (language === 'ar' ? 'حليب شوفان مخملي' : 'Craft oat microfoam')
          : activeDrink.milk === 'dairy'
          ? (language === 'ar' ? 'مايكروفوم حليب غني' : 'Rich velvety microfoam')
          : (language === 'ar' ? 'نقاء المصدر بدون حليب' : 'Pure single-origin clarity'),
        language === 'ar' ? 'توازن حموضة وحلاوة طبيعية' : 'Harmonious acidity & sweetness balance',
      ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6 sm:space-y-8"
    >
      {/* Active Coffeehouse Match Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-gold-500/20 bg-espresso-950/70 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400 shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left rtl:text-right">
            <div className="text-sm font-bold text-parchment-50 font-serif">
              {language === 'ar' ? `رحلة التذوق في ${coffeeShop.nameAr}` : `Tasting Flight at ${coffeeShop.name}`}
            </div>
            <div className="text-xs text-parchment-300/70">
              {language === 'ar' ? `${coffeeShop.neighborhoodAr} • قائمة البار المباشرة اليوم` : `${coffeeShop.neighborhood} • Live Daily Specialty Bar`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={onRetakeQuiz}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 text-xs text-parchment-300 hover:text-gold-400 px-3 py-2 rounded-xl border border-espresso-800 bg-espresso-900/60 hover:border-gold-500/30 transition-colors cursor-pointer"
            title={t('retakeQuiz')}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[11px] font-medium">{t('retakeQuiz')}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tactile 3+1 Tasting Flight Selector Bar */}
      <motion.div variants={itemVariants}>
        <TastingFlightTabs
          items={flightTabs}
          selectedIndex={selectedFlightIndex}
          onSelectIndex={handleSelectFlightTab}
        />
      </motion.div>

      {/* ⭐ THE SOMMELIER HERO STAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${baseDrink.id}-${activeTemp}-${activeMilk}`}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative rounded-3xl border-2 p-5 sm:p-8 shadow-2xl overflow-hidden text-left rtl:text-right space-y-6 ${
            isCurrentAdventure
              ? 'border-fayrouz-500/50 bg-gradient-to-br from-espresso-950 via-espresso-900 to-espresso-950'
              : 'border-gold-500/40 bg-gradient-to-br from-espresso-900 via-espresso-950 to-espresso-900'
          }`}
        >
          {/* Ambient Hero Glow */}
          <div
            className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl ${
              isCurrentAdventure ? 'bg-fayrouz-500/15' : 'bg-gold-500/15'
            }`}
          />

          {/* Top Stage Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/15 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {isCurrentHero ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-espresso-950 font-bold text-xs shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-espresso-950" />
                  <span>{t('perfectMatchBadge')}</span>
                </div>
              ) : isCurrentAdventure ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fayrouz-500 text-white font-bold text-xs shadow-md">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('adventureTitle')}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-espresso-800 text-parchment-200 border border-espresso-700 font-semibold text-xs">
                  <Coffee className="w-3.5 h-3.5 text-gold-400" />
                  <span>{language === 'ar' ? `الخيار البديل #${selectedFlightIndex}` : `Alternative Pick #${selectedFlightIndex}`}</span>
                </div>
              )}

              {isTuned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/35 text-[10px] font-mono font-bold">
                  <Wand2 className="w-3 h-3" />
                  <span>{language === 'ar' ? 'تعديلك الخاص' : 'Custom Dial-In'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isTuned && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomTemp(null);
                    setCustomMilk(null);
                  }}
                  className="text-[11px] text-parchment-300 hover:text-gold-300 underline font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'ar' ? 'استعادة الأصل' : 'Reset'}</span>
                </button>
              )}

              <div className="flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1 rounded-full border bg-espresso-950 border-gold-500/30 text-gold-300 shadow-sm">
                <span className="text-sm">{currentScoredDrink.score}%</span>
                <span className="text-[10px] font-sans font-normal text-parchment-400">
                  {language === 'ar' ? 'توافق الذائقة' : 'Palate Match'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Stage: Unified Sommelier Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column A: Unified Visual Showcase Pedestal & Palate Tuner (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl bg-espresso-950/80 border border-gold-500/25 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-xl group">
                <div className="pointer-events-none absolute inset-0 bg-radial from-gold-500/5 to-transparent opacity-70" />

                {/* Craft Cup Vessel */}
                <div className="flex flex-col items-center justify-center relative z-10 py-1">
                  <SensoryCupVisual
                    temperature={activeDrink.temperature}
                    type={activeDrink.type}
                    roast={activeDrink.roast}
                    milk={activeDrink.milk}
                    size="lg"
                  />
                  <div className="flex items-center gap-2 pt-3 text-[11px] font-mono uppercase tracking-wider text-parchment-300 font-bold">
                    {activeDrink.temperature === 'hot' ? (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Flame className="w-3.5 h-3.5" />
                        {language === 'ar' ? 'ساخن' : 'HOT'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-fayrouz-400">
                        <Snowflake className="w-3.5 h-3.5" />
                        {language === 'ar' ? 'مثلج' : 'ICED'}
                      </span>
                    )}
                    <span>•</span>
                    <span className="text-gold-300">
                      {activeDrink.milk === 'oat'
                        ? language === 'ar' ? 'شوفان' : 'OAT'
                        : activeDrink.milk === 'dairy'
                        ? language === 'ar' ? 'حليب' : 'DAIRY'
                        : language === 'ar' ? 'سادة' : 'BLACK'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 🎛️ Live On-Deck Palate Tuner Bar */}
              <div className="rounded-2xl border border-espresso-800 bg-espresso-950/60 p-3 sm:p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-gold-400 font-semibold">
                  <span className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-[10px]">
                    <Sliders className="w-3.5 h-3.5" />
                    {language === 'ar' ? 'تعديل المزاج المباشر' : 'Live Palate Tuner'}
                  </span>
                  <span className="text-[10px] text-parchment-400 font-sans">
                    {language === 'ar' ? 'تعديل فوري للحرارة وقوام الحليب' : 'Instant live re-dial'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                  {/* Temperature Toggle */}
                  <div className="inline-flex p-1 rounded-xl bg-espresso-900/90 border border-espresso-800">
                    <button
                      type="button"
                      onClick={() => setCustomTemp('hot')}
                      className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeTemp === 'hot'
                          ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{language === 'ar' ? 'ساخن' : 'Hot'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomTemp('iced')}
                      className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeTemp === 'iced'
                          ? 'bg-fayrouz-500/25 text-fayrouz-300 border border-fayrouz-500/40 shadow-sm'
                          : 'text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      <Snowflake className="w-3 h-3 text-fayrouz-400" />
                      <span>{language === 'ar' ? 'مثلج' : 'Iced'}</span>
                    </button>
                  </div>

                  {/* Milk Texture Toggle */}
                  <div className="inline-flex p-1 rounded-xl bg-espresso-900/90 border border-espresso-800">
                    <button
                      type="button"
                      onClick={() => setCustomMilk('oat')}
                      className={`min-h-[36px] flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeMilk === 'oat'
                          ? 'bg-gold-500/25 text-gold-300 border border-gold-500/40 shadow-sm'
                          : 'text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      <Droplet className="w-3 h-3 text-gold-400" />
                      <span>{language === 'ar' ? 'شوفان' : 'Oat'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomMilk('dairy')}
                      className={`min-h-[36px] flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeMilk === 'dairy'
                          ? 'bg-gold-500/25 text-gold-300 border border-gold-500/40 shadow-sm'
                          : 'text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      <Coffee className="w-3 h-3 text-gold-400" />
                      <span>{language === 'ar' ? 'حليب' : 'Dairy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomMilk('black')}
                      className={`min-h-[36px] flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeMilk === 'black'
                          ? 'bg-gold-500/25 text-gold-300 border border-gold-500/40 shadow-sm'
                          : 'text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-gold-400" />
                      <span>{language === 'ar' ? 'سادة' : 'Black'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Column B: Drink Details & Sommelier Sensory Dossier (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold-400/90 font-semibold">
                  <span>{activeDrink.type.replace('_', ' ').toUpperCase()}</span>
                  <span>•</span>
                  <span>{activeDrink.roast.toUpperCase()} ROAST</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment-50 tracking-tight leading-snug">
                  {language === 'ar' ? activeDrink.nameAr : activeDrink.name}
                </h2>
                <div className="text-xs text-parchment-300/70 font-medium pt-0.5">
                  {language === 'ar' ? activeDrink.name : activeDrink.nameAr}
                </div>
              </div>

              {/* Price & Extraction Summary */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">
                  {activeDrink.priceJOD.toFixed(2)}{' '}
                  <span className="text-xs font-sans font-normal text-parchment-400">
                    {language === 'ar' ? 'د.أ' : 'JOD'}
                  </span>
                </span>
                <span className="text-xs font-mono text-parchment-400/80">
                  {activeDrink.specs.ratio} • {activeDrink.specs.dose}
                </span>
              </div>

              {/* The Sommelier Sensory Dossier Card: Radar Dial + Translation Quote */}
              <div className="rounded-2xl bg-espresso-950/80 border border-espresso-800/80 p-4 sm:p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-espresso-800/80 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-400 font-bold">
                    <Scale className="w-3.5 h-3.5 text-gold-400" />
                    <span>{language === 'ar' ? 'ميزان التناغم الحسي' : 'Sensory Balance Dial'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-parchment-400/80">
                    4-AXIS HARMONY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Left inside Dossier: Sensory Dial with generous room */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center">
                    <SensoryFlavorDial
                      flavorNotes={activeDrink.flavorNotes}
                      roast={activeDrink.roast}
                      type={activeDrink.type}
                      milk={activeDrink.milk}
                      size="sm"
                    />
                  </div>

                  {/* Right inside Dossier: Sensory Translation & Flavor Notes */}
                  <div className="sm:col-span-7 space-y-3">
                    <p className="text-xs sm:text-sm text-parchment-100 font-sans leading-relaxed italic border-s-2 border-gold-500/40 ps-3">
                      &ldquo;{language === 'ar' ? activeDrink.flavorNotesPlainAr : activeDrink.flavorNotesPlain}&rdquo;
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {activeDrink.flavorNotes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-espresso-900 text-gold-300 border border-gold-500/25 shadow-xs"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* "Why This Match Fits You" Confidence Chips (Item B1) */}
          <div className="rounded-2xl bg-espresso-950/70 border border-gold-500/20 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {language === 'ar' ? 'لماذا يناسب هذا الخيار ذوقك؟' : 'Why this matches your palate:'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {displayedReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-espresso-900/60 border border-espresso-800 text-xs text-parchment-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                  <span className="leading-snug">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Adventure Reassurance Bridge */}
          {isCurrentAdventure && activeDrink.adventureReason && (
            <div className="rounded-2xl border border-fayrouz-500/30 bg-fayrouz-950/30 p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-fayrouz-300">
                <Compass className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'جسر الأمان الذوقي للمغامرة:' : 'Adventure Safety Bridge:'}
                </span>
              </div>
              <p className="text-xs text-parchment-200 leading-relaxed">
                {language === 'ar' ? activeDrink.adventureReasonAr : activeDrink.adventureReason}
              </p>
            </div>
          )}

          {/* 1-Tap Barista Order CTA */}
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelectDrink(activeDrink)}
            className={`w-full min-h-[52px] flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold shadow-xl transition-all cursor-pointer ${
              isCurrentAdventure
                ? 'bg-gradient-to-r from-fayrouz-600 via-fayrouz-500 to-teal-400 text-white hover:from-fayrouz-500 hover:to-teal-300'
                : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-espresso-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/20'
            }`}
          >
            <Coffee className="w-5 h-5" />
            <span>
              {language === 'ar'
                ? `طلب "${activeDrink.nameAr}" بكبسة واحدة ☕`
                : `Order "${activeDrink.name}" in 1-Tap ☕`}
            </span>
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Quick 3+1 Flight Overview Grid */}
      <motion.div variants={itemVariants} className="space-y-3 text-left rtl:text-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <h3 className="text-sm font-serif font-bold text-parchment-100">
              {language === 'ar' ? 'مقارنة أصناف رحلة التذوق (3+1)' : 'Flight Overview (3 Safe + 1 Adventure)'}
            </h3>
          </div>
          <span className="text-[11px] text-parchment-400">
            {language === 'ar' ? 'اضغط لعرض أي صنف' : 'Tap any to switch view'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {flightDrinks.map((sd, idx) => {
            const isSelected = selectedFlightIndex === idx;
            const isAdv = sd.drink.isAdventure;
            return (
              <motion.button
                key={sd.drink.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFlightIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? isAdv
                      ? 'border-fayrouz-400 bg-fayrouz-950/40 ring-1 ring-fayrouz-400/50'
                      : 'border-gold-500 bg-gold-500/15 ring-1 ring-gold-500/50'
                    : 'border-espresso-800 bg-espresso-900/60 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs w-full">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                      idx === 0
                        ? 'bg-gold-500 text-espresso-950'
                        : isAdv
                        ? 'bg-fayrouz-500/20 text-fayrouz-300'
                        : 'bg-espresso-800 text-parchment-300'
                    }`}
                  >
                    {idx === 0
                      ? language === 'ar' ? 'الأول ⭐' : '#1 Hero'
                      : isAdv
                      ? language === 'ar' ? 'مغامرة 🧭' : 'Adventure'
                      : language === 'ar' ? `بديل #${idx}` : `Alt #${idx}`}
                  </span>
                  <span className="font-mono text-xs font-bold text-gold-400">
                    {sd.score}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-serif font-bold text-parchment-100 line-clamp-1">
                    {language === 'ar' ? sd.drink.nameAr : sd.drink.name}
                  </h4>
                  <p className="text-[11px] text-parchment-300/70 line-clamp-1">
                    {language === 'ar' ? sd.drink.flavorNotesPlainAr : sd.drink.flavorNotesPlain}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-espresso-800/60 text-xs w-full">
                  <span className="text-[10px] text-parchment-400 uppercase font-mono">
                    {sd.drink.temperature === 'hot' ? 'Hot' : 'Iced'}
                  </span>
                  <span className="font-bold text-gold-400">
                    {sd.drink.priceJOD.toFixed(2)} {language === 'ar' ? 'د.أ' : 'JOD'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
