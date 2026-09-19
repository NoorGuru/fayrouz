'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { computeCoffeeDialect, SensoryHouse, DialectArchetype } from '@/data/coffeeDialects';
import confetti from 'canvas-confetti';
import { 
  X, Sparkles, ArrowRight, ArrowLeft, Check, Flame, Snowflake, 
  Coffee, Droplet, Shield, Leaf, HeartHandshake
} from 'lucide-react';

interface SensoryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export function SensoryQuizModal({ isOpen, onClose, onCompleted }: SensoryQuizModalProps) {
  const { language, direction, t } = useLanguage();
  const { updateTasteProfile } = useAuth();

  const [step, setStep] = useState<number>(1);
  // No pre-selected defaults: every choice must be an explicit tap,
  // otherwise tap-through would persist a bogus taste profile.
  const [milkPreference, setMilkPreference] = useState<string | null>(null);
  const [flavorPreference, setFlavorPreference] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<string | null>(null);
  const [dietaryFlags, setDietaryFlags] = useState<string[]>([]);

  // Every take starts clean: reset on every dismiss path (X, backdrop,
  // completion) so the next open never carries stale selections.
  const resetQuiz = () => {
    setStep(1);
    setMilkPreference(null);
    setFlavorPreference(null);
    setTemperature(null);
    setIntensity(null);
    setDietaryFlags([]);
    setResult(null);
  };

  const handleDismiss = () => {
    resetQuiz();
    onClose();
  };

  // Generated pass state
  const [result, setResult] = useState<{
    code: string;
    dialect: DialectArchetype;
    house: SensoryHouse;
    passId: string;
  } | null>(null);

  const toggleDietary = (flag: string) => {
    setDietaryFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const handleFinish = () => {
    // Defense in depth: the Finish button is gated on intensity, but
    // never compute a pass from incomplete (null) choices.
    if (!milkPreference || !flavorPreference || !temperature || !intensity) return;
    const outcome = computeCoffeeDialect({
      milkPreference,
      flavorPreference,
      temperature,
      intensity,
      dietaryFlags,
    });

    setResult(outcome);
    setStep(5); // Reveal screen

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0D9488', '#FCFAF6', '#f97316'],
      });
    } catch {
      // safe fallback
    }

    // Persist to user account
    updateTasteProfile(
      {
        milkPreference,
        flavorPreference,
        temperature,
        intensity,
        dietaryFlags,
      },
      outcome.passId,
      language === 'ar' ? outcome.dialect.titleAr : outcome.dialect.title,
      language === 'ar' ? outcome.house.nameAr : outcome.house.name
    );
  };

  const handleCloseAndProceed = () => {
    resetQuiz();
    onCompleted?.();
    onClose();
  };

  // Direction-aware slide offset
  const slideX = direction === 'rtl' ? -15 : 15;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-espresso-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-lg rounded-3xl glass-panel-glow border border-gold-500/35 bg-espresso-900/95 p-5 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Top Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-72 rounded-full bg-gold-500/15 blur-3xl" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute top-3 end-3 rounded-xl p-2 text-parchment-300/60 hover:bg-espresso-800 hover:text-parchment-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Wizard Steps (1-4) */}
            {step <= 4 && (
              <div className="space-y-6">
                {/* Header & Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gold-400/90 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {language === 'ar' ? `الخطوة ${step} من ٤` : `Step ${step} of 4`}
                    </span>
                    <span className="text-parchment-300/60 font-mono">
                      {Math.round((step / 4) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-espresso-950 overflow-hidden border border-espresso-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                      animate={{ width: `${(step / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: slideX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideX }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Step 1: Milk Texture */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-serif font-bold text-parchment-50">
                            {t('questionMilk')}
                          </h3>
                          <p className="text-xs text-parchment-300/70">
                            {language === 'ar' ? 'اختر القوام الذي تشعر بالراحة معه' : 'Choose the texture you naturally enjoy most'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'oat', labelEn: 'Oat Microfoam', labelAr: 'حليب شوفان مخملي', descEn: 'Naturally sweet & silky', descAr: 'حريري وحلاوة طبيعية', icon: Droplet },
                            { id: 'dairy', labelEn: 'Whole Dairy Milk', labelAr: 'حليب طبيعي كامل الدسم', descEn: 'Rich, classic microfoam', descAr: 'غني ومايكروفوم كلاسيكي', icon: Coffee },
                            { id: 'black', labelEn: 'Pure Black', labelAr: 'سادة بدون حليب', descEn: 'Unfiltered bean clarity', descAr: 'نقاء المصدر بدون حليب', icon: Sparkles },
                            { id: 'any', labelEn: 'Flexible / Any', labelAr: 'مرن / أي نوع', descEn: 'Depending on the drink', descAr: 'حسب نوع المشروب', icon: HeartHandshake },
                          ].map((opt) => (
                            <motion.button
                              whileHover={{ y: -2, scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              key={opt.id}
                              type="button"
                              onClick={() => setMilkPreference(opt.id)}
                              className={`flex flex-col text-left rtl:text-right p-3.5 rounded-xl border transition-all cursor-pointer ${
                                milkPreference === opt.id
                                  ? 'border-gold-500 bg-gold-500/15 shadow-md'
                                  : 'border-espresso-700 bg-espresso-950/60 hover:border-gold-500/40'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <opt.icon className="w-4 h-4 text-gold-400" />
                                {milkPreference === opt.id && <Check className="w-4 h-4 text-gold-400" />}
                              </div>
                              <div className="text-sm font-semibold text-parchment-100">
                                {language === 'ar' ? opt.labelAr : opt.labelEn}
                              </div>
                              <div className="text-[11px] text-parchment-400">
                                {language === 'ar' ? opt.descAr : opt.descEn}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Flavor Mood */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-serif font-bold text-parchment-50">
                            {t('questionFlavor')}
                          </h3>
                          <p className="text-xs text-parchment-300/70">
                            {language === 'ar' ? 'ما النكهة الأقرب إلى مزاجك؟' : 'What sensory notes are you craving today?'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'chocolate_nutty', labelEn: 'Chocolate & Roasted Hazelnut', labelAr: 'شوكولاتة وبندق محمص', descEn: 'Comforting, classic & smooth', descAr: 'دافئة وغنية ومريحة', badge: '🍫' },
                            { id: 'fruity_floral', labelEn: 'Wild Berries & Jasmine', labelAr: 'توت بري وزهر الياسمين', descEn: 'Bright, sweet & high-altitude', descAr: 'زاهية وفاكهية منعشة', badge: '🍓' },
                            { id: 'sweet_caramel', labelEn: 'Caramel & Honey Spices', labelAr: 'كراميل وعسل وهيل دافئ', descEn: 'Opulent Levantine sweetness', descAr: 'حلاوة مشرقية دافئة', badge: '🍯' },
                            { id: 'balanced', labelEn: 'Balanced & Clean Cocoa', labelAr: 'متوازنة ونقية ومعتدلة', descEn: 'Harmonious every-day cup', descAr: 'كوب يومي متوازن جداً', badge: '⚖️' },
                          ].map((opt) => (
                            <motion.button
                              whileHover={{ y: -2, scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              key={opt.id}
                              type="button"
                              onClick={() => setFlavorPreference(opt.id)}
                              className={`flex flex-col text-left rtl:text-right p-3.5 rounded-xl border transition-all cursor-pointer ${
                                flavorPreference === opt.id
                                  ? 'border-gold-500 bg-gold-500/15 shadow-md'
                                  : 'border-espresso-700 bg-espresso-950/60 hover:border-gold-500/40'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full mb-1">
                                <span className="text-lg">{opt.badge}</span>
                                {flavorPreference === opt.id && <Check className="w-4 h-4 text-gold-400" />}
                              </div>
                              <div className="text-sm font-semibold text-parchment-100">
                                {language === 'ar' ? opt.labelAr : opt.labelEn}
                              </div>
                              <div className="text-[11px] text-parchment-400">
                                {language === 'ar' ? opt.descAr : opt.descEn}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Temperature */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-serif font-bold text-parchment-50">
                            {t('questionTemp')}
                          </h3>
                          <p className="text-xs text-parchment-300/70">
                            {language === 'ar' ? 'حرارة فنجانك المفضلة اليوم' : 'Your go-to temperature preference'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: 'hot', labelEn: 'Hot & Steaming', labelAr: 'سخنة تدفيك', icon: Flame, color: 'text-amber-400' },
                            { id: 'iced', labelEn: 'Chilled & Iced', labelAr: 'باردة تبرّد على قلبك', icon: Snowflake, color: 'text-fayrouz-400' },
                            { id: 'any', labelEn: 'All-Weather', labelAr: 'حسب المزاج والجو', icon: Sparkles, color: 'text-gold-400' },
                          ].map((opt) => (
                            <motion.button
                              whileHover={{ y: -2, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              key={opt.id}
                              type="button"
                              onClick={() => setTemperature(opt.id)}
                              className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all cursor-pointer ${
                                temperature === opt.id
                                  ? 'border-gold-500 bg-gold-500/15 shadow-md'
                                  : 'border-espresso-700 bg-espresso-950/60 hover:border-gold-500/40'
                              }`}
                            >
                              <opt.icon className={`w-6 h-6 mb-2 ${opt.color}`} />
                              <div className="text-xs font-semibold text-parchment-100">
                                {language === 'ar' ? opt.labelAr : opt.labelEn}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Intensity & Dietary Safeguards */}
                    {step === 4 && (
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h3 className="text-lg font-serif font-bold text-parchment-50">
                            {t('questionIntensity')}
                          </h3>
                          <p className="text-xs text-parchment-300/70">
                            {language === 'ar' ? 'ما درجة التركيز والثقل المحببة لديك؟' : 'How bold and full-bodied do you like it?'}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { id: 'light', labelEn: 'Light & Tea-like', labelAr: 'خفيفة وناعمة' },
                            { id: 'medium', labelEn: 'Medium Balanced', labelAr: 'متوازنة ومعتدلة' },
                            { id: 'strong', labelEn: 'Bold & Intense', labelAr: 'قوية ومركّزة' },
                          ].map((opt) => (
                            <motion.button
                              whileHover={{ y: -1, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              key={opt.id}
                              type="button"
                              onClick={() => setIntensity(opt.id)}
                              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                                intensity === opt.id
                                  ? 'border-gold-500 bg-gold-500/15'
                                  : 'border-espresso-700 bg-espresso-950/60 hover:border-gold-500/40'
                              }`}
                            >
                              <div className="text-xs font-semibold text-parchment-100">
                                {language === 'ar' ? opt.labelAr : opt.labelEn}
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Dietary Safeguards */}
                        <div className="pt-3 border-t border-espresso-800 space-y-2.5">
                          <label className="text-xs font-medium text-parchment-300 flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-gold-400" />
                            {t('dietaryTitle')}
                          </label>

                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'vegan', label: t('veganBadge'), icon: Leaf },
                              { id: 'nut_free', label: t('nutFreeBadge'), icon: Shield },
                              { id: 'lactose_free', label: t('lactoseFreeBadge'), icon: Droplet },
                            ].map((badge) => {
                              const isSelected = dietaryFlags.includes(badge.id);
                              return (
                                <button
                                  key={badge.id}
                                  type="button"
                                  onClick={() => toggleDietary(badge.id)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-fayrouz-500 bg-fayrouz-500/20 text-fayrouz-300'
                                      : 'border-espresso-700 bg-espresso-950/60 text-parchment-400 hover:border-espresso-600'
                                  }`}
                                >
                                  <badge.icon className="w-3.5 h-3.5" />
                                  <span>{badge.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-espresso-800">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-parchment-300 hover:text-parchment-100 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                      <span>{language === 'ar' ? 'السابق' : 'Back'}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={
                        (step === 1 && !milkPreference) ||
                        (step === 2 && !flavorPreference) ||
                        (step === 3 && !temperature)
                      }
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-xs font-semibold text-espresso-950 shadow-md hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleFinish}
                      disabled={!intensity}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-xs font-bold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{t('saveProfile')}</span>
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Reveal & Celebration Screen */}
            {step === 5 && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="space-y-6 text-center py-2"
              >
                {/* House Symbol & Congratulation */}
                <div className="space-y-2">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-espresso-950 border-2 border-gold-500/40 text-3xl shadow-xl">
                    {result.house.symbol}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-parchment-50">
                    {language === 'ar' ? 'مبارك! تم إصدار باسبورك الذوقي' : 'FayrouzPass™ Unlocked!'}
                  </h3>
                  <p className="text-xs text-parchment-300/80">
                    {language === 'ar'
                      ? 'تم حفظ باسبورك في حسابك ليرافقك في كافة المقاهي الشريكة.'
                      : 'Your taste passport is saved permanently to your account.'}
                  </p>
                </div>

                {/* The Luxury FayrouzPass Card */}
                <div className="rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-espresso-950 via-espresso-900 to-espresso-950 p-6 shadow-2xl relative overflow-hidden text-left rtl:text-right space-y-4">
                  {/* Pass ID Banner */}
                  <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <span className="text-xs font-bold tracking-widest text-parchment-100 font-serif">
                        FAYROUZ PASS™
                      </span>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-gold-500/20 text-gold-300 border border-gold-500/30 font-bold">
                      {result.passId}
                    </span>
                  </div>

                  {/* Archetype Title & House */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                      {language === 'ar' ? result.house.nameAr : result.house.name}
                    </div>
                    <h4 className="text-xl font-serif font-bold text-parchment-50">
                      {language === 'ar' ? result.dialect.titleAr : result.dialect.title}
                    </h4>
                    <p className="text-xs text-parchment-300/80 leading-relaxed">
                      {language === 'ar' ? result.dialect.taglineAr : result.dialect.tagline}
                    </p>
                  </div>

                  {/* Safeguards Badges */}
                  {dietaryFlags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {dietaryFlags.map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-fayrouz-500/20 text-fayrouz-300 border border-fayrouz-500/30"
                        >
                          {f === 'vegan' ? t('veganBadge') : f === 'nut_free' ? t('nutFreeBadge') : t('lactoseFreeBadge')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action to proceed */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseAndProceed}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-3 text-sm font-bold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                >
                  <span>{language === 'ar' ? 'استكشف قهوتك اليوم' : 'View Coffee Matches'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
