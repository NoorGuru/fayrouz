'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { COFFEE_SHOPS, MENU_ITEMS, CoffeeShop, MenuItem } from '@/data/coffeehouses';
import { 
  Coffee, Sliders, Flame, Snowflake, Droplet, CheckCircle2, 
  Sparkles, Clock, ArrowLeft, ArrowRight, Check, RotateCcw, AlertCircle
} from 'lucide-react';

function BaristaTicketTerminal() {
  const searchParams = useSearchParams();
  const { language, t, direction } = useLanguage();

  const shopId = searchParams.get('shop') || 'almond';
  const drinkId = searchParams.get('drink') || '';
  const passId = searchParams.get('pass') || 'FYZ-7294';
  const paramRatio = searchParams.get('ratio') || '';

  const [isBrewed, setIsBrewed] = useState(false);
  const [brewedTime, setBrewedTime] = useState<string | null>(null);

  // Find Coffeehouse
  const currentShop: CoffeeShop = 
    COFFEE_SHOPS.find((s) => s.id === shopId) || COFFEE_SHOPS[0];

  // Find Drink
  const currentDrink: MenuItem =
    MENU_ITEMS.find((d) => d.id === drinkId) ||
    MENU_ITEMS.find((d) => d.shopId === currentShop.id) ||
    MENU_ITEMS[0];

  const handleMarkBrewed = () => {
    setIsBrewed(true);
    setBrewedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#0D9488', '#FCFAF6'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div dir={direction} className="min-h-screen bg-espresso-950 text-parchment-50 p-4 sm:p-8 flex flex-col justify-between max-w-2xl mx-auto space-y-6">
      {/* Barista Station Header */}
      <header className="flex items-center justify-between border-b border-gold-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/20 border border-gold-500/40 text-gold-400">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-espresso-800 text-gold-400 uppercase tracking-widest font-semibold">
                BARISTA COUNTER MODE
              </span>
              <span className="text-[11px] text-parchment-400 bg-espresso-900 px-2 py-0.5 rounded-full">
                {language === 'ar' ? currentShop.nameAr : currentShop.name}
              </span>
            </div>
            <h1 className="text-sm font-bold text-parchment-100 font-serif">
              {language === 'ar' ? 'محطة تحضير الطلب المباشر' : 'Live Counter Preparation Station'}
            </h1>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-parchment-300 hover:text-gold-400 border border-espresso-700 bg-espresso-900/60 px-3 py-1.5 rounded-xl transition-colors"
        >
          {direction === 'rtl' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{language === 'ar' ? 'الرئيسية' : 'App'}</span>
        </Link>
      </header>

      {/* Customer FayrouzPass Identification Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-espresso-900/80 border border-gold-500/30">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <div className="text-xs">
            <span className="text-parchment-400">{language === 'ar' ? 'باسبور الضيف: ' : 'Guest Pass ID: '}</span>
            <span className="font-mono font-bold text-gold-300">{passId}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{language === 'ar' ? 'طلب نشط' : 'Active Order'}</span>
        </div>
      </div>

      {/* High-Contrast Perforated Ticket Card for Barista */}
      <div className="rounded-3xl border-2 border-gold-500/50 bg-gradient-to-b from-parchment-50 to-parchment-100 text-espresso-950 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Drink Title & Meta */}
        <div className="border-b border-espresso-200 pb-4 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-espresso-700 font-bold">
            {currentDrink.type.replace('_', ' ').toUpperCase()} • {currentDrink.roast.toUpperCase()} ROAST
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-espresso-950">
            {language === 'ar' ? currentDrink.nameAr : currentDrink.name}
          </h2>
          <div className="text-sm font-medium text-espresso-800">
            {language === 'ar' ? currentDrink.name : currentDrink.nameAr}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-espresso-900 text-parchment-50 text-xs font-bold">
              {currentDrink.temperature === 'hot' ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>HOT (ساخن)</span>
                </>
              ) : (
                <>
                  <Snowflake className="w-3.5 h-3.5 text-fayrouz-400" />
                  <span>ICED (بارد ومثلج)</span>
                </>
              )}
            </span>

            {currentDrink.milk !== 'black' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-500/25 text-espresso-950 border border-gold-500/40 text-xs font-bold">
                <Droplet className="w-3.5 h-3.5 text-gold-700" />
                <span>
                  {currentDrink.milk === 'oat' ? 'OAT MILK (حليب شوفان)' : 'WHOLE MILK (حليب كامل الدسم)'}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* The 3 Core Extraction Parameters (Legible from distance) */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-espresso-700 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-espresso-900" />
            <span>{language === 'ar' ? 'معايير الاستخلاص الدقيقة (Recipe Specs)' : 'Extraction Specs'}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border-2 border-espresso-900/20 bg-white p-3.5 shadow-sm space-y-1">
              <div className="text-[10px] text-espresso-600 uppercase font-bold tracking-wider">
                {language === 'ar' ? 'النسبة (Ratio)' : 'RATIO'}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-espresso-950">
                {paramRatio || currentDrink.specs.ratio}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-espresso-900/20 bg-white p-3.5 shadow-sm space-y-1">
              <div className="text-[10px] text-espresso-600 uppercase font-bold tracking-wider">
                {language === 'ar' ? 'الجرعة (Dose)' : 'DOSE'}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-espresso-950">
                {currentDrink.specs.dose}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-espresso-900/20 bg-white p-3.5 shadow-sm space-y-1">
              <div className="text-[10px] text-espresso-600 uppercase font-bold tracking-wider">
                {language === 'ar' ? 'حرارة الماء (Temp)' : 'WATER TEMP'}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-espresso-950">
                {currentDrink.specs.waterTemp}
              </div>
            </div>
          </div>

          {currentDrink.specs.milkTexture && (
            <div className="rounded-xl border border-espresso-300 bg-white/70 p-3 text-xs text-espresso-900">
              <span className="font-bold text-espresso-950">
                {language === 'ar' ? 'توجيه التبخير: ' : 'Microfoam Instruction: '}
              </span>
              <span>{language === 'ar' ? currentDrink.specs.milkTextureAr || currentDrink.specs.milkTexture : currentDrink.specs.milkTexture}</span>
            </div>
          )}
        </div>

        {/* Customer Sensory Note */}
        <div className="rounded-xl bg-espresso-100/80 p-3 text-xs text-espresso-800 leading-relaxed">
          <span className="font-bold">{language === 'ar' ? 'ملف النكهة المتوقع: ' : 'Expected Profile: '}</span>
          "{language === 'ar' ? currentDrink.flavorNotesPlainAr : currentDrink.flavorNotesPlain}"
        </div>
      </div>

      {/* Barista Action Confirmation */}
      <div className="space-y-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMarkBrewed}
          disabled={isBrewed}
          className={`w-full flex items-center justify-center gap-3 rounded-2xl p-4 text-base font-bold shadow-2xl transition-all cursor-pointer ${
            isBrewed
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-espresso-950 hover:from-gold-400 hover:to-gold-500'
          }`}
        >
          {isBrewed ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-white" />
              <span>
                {language === 'ar'
                  ? `تم التحضير والتسليم بنجاح الساعة ${brewedTime} ☕`
                  : `Cup Brewed & Handed to Guest at ${brewedTime} ☕`}
              </span>
            </>
          ) : (
            <>
              <Coffee className="w-5 h-5" />
              <span>{language === 'ar' ? 'تأكيد تحضير الكوب (Mark as Brewed) ☕' : 'Confirm Drink Brewed ☕'}</span>
            </>
          )}
        </motion.button>

        {isBrewed && (
          <button
            onClick={() => setIsBrewed(false)}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-parchment-400 hover:text-parchment-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إعادة ضبط المحطة للطلب التالي' : 'Reset Station for Next Order'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function BaristaTicketPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-espresso-950 flex items-center justify-center text-parchment-200">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6 animate-spin text-gold-400" />
            <span className="text-sm font-mono">Loading Barista Terminal...</span>
          </div>
        </div>
      }
    >
      <BaristaTicketTerminal />
    </Suspense>
  );
}
