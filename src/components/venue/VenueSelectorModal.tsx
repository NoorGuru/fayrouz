'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COFFEE_SHOPS, CoffeeShop } from '@/data/coffeehouses';
import { X, Coffee, MapPin, Check, Sparkles } from 'lucide-react';

interface VenueSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedShopId: string;
  onSelectShop: (shop: CoffeeShop) => void;
}

export function VenueSelectorModal({
  isOpen,
  onClose,
  selectedShopId,
  onSelectShop,
}: VenueSelectorModalProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl glass-panel-glow border border-gold-500/30 bg-espresso-900/95 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-60 rounded-full bg-gold-500/15 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 rounded-lg p-1.5 text-parchment-300/60 hover:bg-espresso-800 hover:text-parchment-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left rtl:text-right space-y-1 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-400">
            <MapPin className="w-4 h-4" />
            <span>{language === 'ar' ? 'مقاهي ومحامص عمّان المختصة' : 'Specialty Roasters of Amman'}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-parchment-50">
            {t('selectVenue')}
          </h3>
          <p className="text-xs text-parchment-300/70">
            {language === 'ar'
              ? 'اختر المقهى لتطابق ذائقتك مباشرة مع قائمة حبوب اليوم المتوفرة عنده'
              : 'Choose your coffeehouse to match your palate against their live daily bar menu'}
          </p>
        </div>

        {/* Venues List */}
        <div className="space-y-3 overflow-y-auto pr-1">
          {COFFEE_SHOPS.map((shop) => {
            const isSelected = shop.id === selectedShopId;
            return (
              <button
                key={shop.id}
                type="button"
                onClick={() => {
                  onSelectShop(shop);
                  onClose();
                }}
                className={`w-full flex items-start justify-between p-4 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-gold-500 bg-gold-500/15 shadow-md ring-1 ring-gold-500/40'
                    : 'border-espresso-700/80 bg-espresso-950/60 hover:border-gold-500/40 hover:bg-espresso-950/90'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif font-bold text-parchment-100">
                      {language === 'ar' ? shop.nameAr : shop.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-espresso-800 text-parchment-300/80 border border-espresso-700">
                      {language === 'ar' ? shop.neighborhoodAr : shop.neighborhood}
                    </span>
                  </div>

                  <p className="text-xs text-parchment-300/70 leading-relaxed">
                    {language === 'ar' ? shop.taglineAr : shop.tagline}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-gold-400/80 pt-1">
                    <span className="flex items-center gap-1">
                      <Coffee className="w-3 h-3" />
                      {language === 'ar' ? 'متوفر حبوب ميكرو-لوت' : 'Fresh Single-Origins'}
                    </span>
                    <span>•</span>
                    <span>Est. {shop.established}</span>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {isSelected ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-espresso-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border border-espresso-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
