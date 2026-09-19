'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem, CoffeeShop } from '@/data/coffeehouses';
import { ScoredDrink } from '@/utils/matchEngine';
import { Sparkles, ArrowRight, Compass, CheckCircle2, Award, Flame, Snowflake, RotateCcw } from 'lucide-react';

interface MatchViewProps {
  coffeeShop: CoffeeShop;
  perfectMatch: ScoredDrink;
  alternatives: ScoredDrink[];
  adventurePick: ScoredDrink | null;
  onSelectDrink: (drink: MenuItem) => void;
  onRetakeQuiz: () => void;
  onChangeVenue: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
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
  onChangeVenue,
}: MatchViewProps) {
  const { language, t } = useLanguage();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      {/* Active Coffeehouse Match Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-gold-500/20 bg-espresso-950/70 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left rtl:text-right">
            <div className="text-sm font-bold text-parchment-50 font-serif">
              {language === 'ar' ? `نتائج مطابقتك في ${coffeeShop.nameAr}` : `Your Matches at ${coffeeShop.name}`}
            </div>
            <div className="text-xs text-parchment-300/70">
              {language === 'ar' ? `${coffeeShop.neighborhoodAr} • حبوب التحميص المختصة` : `${coffeeShop.neighborhood} • Active Daily Bar`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={onChangeVenue}
            className="text-xs text-gold-400 hover:text-gold-300 border border-gold-500/25 bg-espresso-900/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {t('changeVenue')}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.08 }}
            onClick={onRetakeQuiz}
            className="text-xs text-parchment-300 hover:text-parchment-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            title={t('retakeQuiz')}
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* ⭐ #1 PERFECT MATCH (HERO CARD) */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="relative rounded-3xl border-2 border-gold-500/40 bg-gradient-to-br from-espresso-900 via-espresso-950 to-espresso-900 p-6 sm:p-8 shadow-2xl overflow-hidden text-left rtl:text-right space-y-6"
      >
        {/* Ambient Hero Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500 text-espresso-950 font-bold text-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-espresso-950" />
            <span>{t('perfectMatchBadge')}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gold-300 bg-espresso-950 px-3 py-1 rounded-full border border-gold-500/30">
            <span>{perfectMatch.score}%</span>
            <span className="text-[10px] font-sans font-normal text-parchment-400">
              {language === 'ar' ? 'توافق' : 'Match'}
            </span>
          </div>
        </div>

        {/* Drink Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-parchment-50 tracking-tight">
              {language === 'ar' ? perfectMatch.drink.nameAr : perfectMatch.drink.name}
            </h2>
            <div className="flex items-center gap-2 pt-1 text-xs text-parchment-300/80">
              {perfectMatch.drink.temperature === 'hot' ? (
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'ساخن' : 'Hot'}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-fayrouz-400">
                  <Snowflake className="w-3.5 h-3.5" />
                  {language === 'ar' ? 'بارد ومثلج' : 'Iced'}
                </span>
              )}
              <span>•</span>
              <span>{perfectMatch.drink.roast.toUpperCase()} ROAST</span>
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-serif font-bold text-gold-400 shrink-0">
            {perfectMatch.drink.priceJOD.toFixed(2)}{' '}
            <span className="text-xs font-sans text-parchment-400">
              {language === 'ar' ? 'د.أ' : 'JOD'}
            </span>
          </div>
        </div>

        {/* Plain Sensory Translation (System 1) */}
        <div className="rounded-2xl bg-espresso-950/80 border border-espresso-800 p-4 space-y-2">
          <p className="text-sm sm:text-base text-parchment-100 font-sans leading-relaxed font-medium">
            "{language === 'ar' ? perfectMatch.drink.flavorNotesPlainAr : perfectMatch.drink.flavorNotesPlain}"
          </p>

          {/* Sensory Note Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {perfectMatch.drink.flavorNotes.map((note) => (
              <span
                key={note}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-espresso-800 text-gold-300/90 border border-gold-500/20"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* 1-Tap Barista Order CTA */}
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => onSelectDrink(perfectMatch.drink)}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-6 py-4 text-base font-bold text-espresso-950 shadow-xl hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/20 transition-all cursor-pointer"
        >
          <span>{t('orderInOneTap')}</span>
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </motion.button>
      </motion.div>

      {/* ☕ TOP 2 SAFE ALTERNATIVES */}
      <motion.div variants={itemVariants} className="space-y-4 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold-400" />
          <h3 className="text-base font-serif font-bold text-parchment-50">
            {t('topAlternatives')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {alternatives.map((alt, idx) => (
            <motion.div
              key={alt.drink.id}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-espresso-700/80 bg-espresso-900/60 p-5 space-y-4 hover:border-gold-500/40 transition-colors flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-espresso-800 text-parchment-300">
                    {language === 'ar' ? `خيار بديل #${idx + 1}` : `Alternative #${idx + 1}`}
                  </span>
                  <span className="font-mono text-xs font-bold text-gold-400">
                    {alt.score}% {language === 'ar' ? 'توافق' : 'Match'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-base font-serif font-bold text-parchment-100">
                    {language === 'ar' ? alt.drink.nameAr : alt.drink.name}
                  </h4>
                  <span className="text-xs font-bold text-gold-400 shrink-0">
                    {alt.drink.priceJOD.toFixed(2)} {language === 'ar' ? 'د.أ' : 'JOD'}
                  </span>
                </div>

                <p className="text-xs text-parchment-300/80 leading-relaxed">
                  {language === 'ar' ? alt.drink.flavorNotesPlainAr : alt.drink.flavorNotesPlain}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectDrink(alt.drink)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-gold-500/30 bg-espresso-950/80 px-4 py-2.5 text-xs font-semibold text-parchment-100 hover:border-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
              >
                <span>{language === 'ar' ? 'طلب هذا الخيار' : 'Select This Drink'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🧪 1 ADVENTURE PICK ("Wanna Try Something New?") */}
      {adventurePick && (
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="rounded-3xl border-2 border-fayrouz-500/40 bg-gradient-to-br from-espresso-950 via-espresso-900 to-espresso-950 p-6 sm:p-7 shadow-xl space-y-5 text-left rtl:text-right relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fayrouz-600/10 blur-2xl" />

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fayrouz-500/20 pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fayrouz-500/20 text-fayrouz-300 border border-fayrouz-500/30 text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('adventureTitle')}</span>
            </div>

            <span className="text-xs font-bold text-gold-400">
              {adventurePick.drink.priceJOD.toFixed(2)} {language === 'ar' ? 'د.أ' : 'JOD'}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-serif font-bold text-parchment-50">
              {language === 'ar' ? adventurePick.drink.nameAr : adventurePick.drink.name}
            </h4>

            {/* Reassurance Bridge */}
            <div className="rounded-xl border border-fayrouz-500/20 bg-fayrouz-950/30 p-3.5">
              <p className="text-xs sm:text-sm text-parchment-200 leading-relaxed">
                💡{' '}
                <span className="font-semibold text-fayrouz-300">
                  {language === 'ar' ? 'لماذا ستعجبك هذه المغامرة؟' : 'Why this adventure fits your palate:'}
                </span>{' '}
                {language === 'ar' ? adventurePick.drink.adventureReasonAr : adventurePick.drink.adventureReason}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onSelectDrink(adventurePick.drink)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fayrouz-600 to-fayrouz-500 px-5 py-3 text-sm font-bold text-white shadow-lg hover:from-fayrouz-500 hover:to-fayrouz-400 transition-all cursor-pointer"
          >
            <span>{t('adventureButton')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
