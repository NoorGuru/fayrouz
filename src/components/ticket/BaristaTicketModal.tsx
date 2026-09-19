'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem, CoffeeShop } from '@/data/coffeehouses';
import { UserProfile } from '@/context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  X, Sparkles, Check, Flame, Snowflake, Coffee, Sliders, Droplet, 
  Share2, CheckCircle2, ShieldCheck, Heart
} from 'lucide-react';

interface BaristaTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  drink: MenuItem | null;
  coffeeShop: CoffeeShop;
  user: UserProfile | null;
}

export function BaristaTicketModal({
  isOpen,
  onClose,
  drink,
  coffeeShop,
  user,
}: BaristaTicketModalProps) {
  const { language, t } = useLanguage();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!isOpen || !drink) return null;

  const passId = user?.fayrouzPassId || 'FYZ-GUEST';
  const customerName = user?.name || (language === 'ar' ? 'ضيف مميز' : 'Special Guest');

  const handleOrderPlaced = () => {
    setIsOrdered(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#0D9488', '#FCFAF6'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-espresso-950/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-gold-500/40 bg-gradient-to-b from-espresso-900 via-espresso-950 to-espresso-900 p-6 sm:p-7 shadow-2xl overflow-hidden text-left rtl:text-right flex flex-col space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-72 rounded-full bg-gold-500/20 blur-3xl" />

        {/* Top Header & Dismiss Button */}
        <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-gold-400">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wider uppercase">
              {language === 'ar' ? 'تذكرة طلب الكاونتر' : 'Counter Order Ticket'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-parchment-300/70 hover:bg-espresso-800 hover:text-parchment-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Contrast Counter Card (Show to Barista) */}
        <div className="rounded-2xl border-2 border-gold-500/50 bg-parchment-50 text-espresso-950 p-5 shadow-2xl space-y-4 relative">
          {/* Top Ticket Punch Indicator */}
          <div className="flex items-center justify-between border-b border-dashed border-espresso-950/25 pb-3 text-xs">
            <div>
              <span className="font-bold font-serif text-sm">
                {language === 'ar' ? coffeeShop.nameAr : coffeeShop.name}
              </span>
              <p className="text-[10px] text-espresso-800/80">
                {language === 'ar' ? coffeeShop.neighborhoodAr : coffeeShop.neighborhood}
              </p>
            </div>

            <div className="text-right rtl:text-left">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-espresso-950 text-gold-400">
                {passId}
              </span>
              <p className="text-[10px] font-semibold text-espresso-800/80 pt-0.5">
                {customerName}
              </p>
            </div>
          </div>

          {/* Drink Name & Arabic Calligraphy Title */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-fayrouz-700 uppercase tracking-widest font-mono">
              {drink.type.replace('_', ' ').toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-espresso-950 leading-tight">
              {language === 'ar' ? drink.nameAr : drink.name}
            </h2>
            <div className="text-xs font-medium text-espresso-800/80">
              {language === 'ar' ? drink.name : drink.nameAr}
            </div>
          </div>

          {/* Quick Specifications Pill Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-espresso-900 text-parchment-50">
              {drink.temperature === 'hot' ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'ساخن (Hot)' : 'Hot'}</span>
                </>
              ) : (
                <>
                  <Snowflake className="w-3.5 h-3.5 text-fayrouz-400" />
                  <span>{language === 'ar' ? 'بارد ومثلج (Iced)' : 'Iced'}</span>
                </>
              )}
            </span>

            {drink.milk !== 'black' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-500/20 text-espresso-950 border border-gold-500/40">
                <Droplet className="w-3.5 h-3.5 text-gold-600" />
                <span>
                  {drink.milk === 'oat'
                    ? language === 'ar' ? 'حليب شوفان (Oat Milk)' : 'Oat Milk'
                    : language === 'ar' ? 'حليب كامل الدسم (Dairy)' : 'Whole Milk'}
                </span>
              </span>
            )}

            <span className="ms-auto font-serif text-lg font-bold text-espresso-950">
              {drink.priceJOD.toFixed(2)}{' '}
              <span className="text-[11px] font-sans font-normal text-espresso-700">
                {language === 'ar' ? 'د.أ' : 'JOD'}
              </span>
            </span>
          </div>
        </div>

        {/* Barista Dial-In Cheat Sheet */}
        <div className="rounded-2xl border border-gold-500/20 bg-espresso-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-gold-400 font-semibold border-b border-espresso-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              {t('recipeSpecs')}
            </span>
            <span className="text-[10px] text-parchment-400 font-mono">
              Amman Dial-In Spec
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl border border-espresso-800 bg-espresso-900/60 p-2 space-y-0.5">
              <div className="text-[10px] text-parchment-400 uppercase">{t('ratio')}</div>
              <div className="font-mono font-bold text-parchment-100">{drink.specs.ratio}</div>
            </div>

            <div className="rounded-xl border border-espresso-800 bg-espresso-900/60 p-2 space-y-0.5">
              <div className="text-[10px] text-parchment-400 uppercase">{t('dose')}</div>
              <div className="font-mono font-bold text-parchment-100">{drink.specs.dose}</div>
            </div>

            <div className="rounded-xl border border-espresso-800 bg-espresso-900/60 p-2 space-y-0.5">
              <div className="text-[10px] text-parchment-400 uppercase">{t('temp')}</div>
              <div className="font-mono font-bold text-parchment-100">{drink.specs.waterTemp}</div>
            </div>
          </div>

          {drink.specs.milkTexture && (
            <div className="text-[11px] text-parchment-300/80 text-center pt-1">
              ✨{' '}
              <span className="text-gold-400/90 font-medium">
                {language === 'ar' ? 'توجيه التبخير: ' : 'Microfoam target: '}
              </span>
              {language === 'ar' ? drink.specs.milkTextureAr || drink.specs.milkTexture : drink.specs.milkTexture}
            </div>
          )}
        </div>

        {/* Counter Reassurance Text */}
        <p className="text-[11px] text-center text-parchment-400">
          {t('baristaTicketSubtext')}
        </p>

        {/* Order Placed / Dismiss Action */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-3 rounded-xl border transition-colors cursor-pointer ${
              isFavorited
                ? 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-espresso-700 bg-espresso-950/80 text-parchment-300 hover:border-gold-500/40'
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400' : ''}`} />
          </button>

          <button
            onClick={handleOrderPlaced}
            disabled={isOrdered}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 px-5 py-3 text-sm font-bold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 active:scale-[0.99] transition-all cursor-pointer"
          >
            {isOrdered ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-espresso-950" />
                <span>{language === 'ar' ? 'تم تأكيد الطلب بنجاح!' : 'Order Placed!'}</span>
              </>
            ) : (
              <>
                <Coffee className="w-4 h-4" />
                <span>{language === 'ar' ? 'تم الطلب بنجاح ☕' : 'Confirm Order ☕'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
