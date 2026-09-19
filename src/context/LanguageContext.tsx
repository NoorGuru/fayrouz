'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  brandName: { en: 'FAYROUZ', ar: 'فـيـروز' },
  brandTagline: { en: 'System 1 Coffee Matcher', ar: 'مُطابق القهوة الفوري' },
  brandSubtext: { en: 'Connect your palate to the coffeehouse menu in 3 seconds.', ar: 'طابق ذائقتك مع قائمة المقهى المختص في ٣ ثوانٍ بدون حيرة.' },
  
  // Navigation & Actions
  navHome: { en: 'Match', ar: 'المطابقة' },
  navQuiz: { en: 'Sensory Quiz', ar: 'اختبار الذوق' },
  navPass: { en: 'FayrouzPass™', ar: 'جواز فيروز' },
  navShops: { en: 'Venues', ar: 'المقاهي' },
  signIn: { en: 'Sign In', ar: 'تسجيل الدخول' },
  signUp: { en: 'Create Account', ar: 'إنشاء حساب' },
  signOut: { en: 'Sign Out', ar: 'تسجيل الخروج' },
  profile: { en: 'My Palate', ar: 'ملف الذائقة' },
  retakeQuiz: { en: 'Retake Quiz', ar: 'إعادة الاختبار' },

  // JEV Hero Match Elements
  perfectMatchBadge: { en: '⭐ #1 YOUR PERFECT MATCH', ar: '⭐ #1 اختيارك المثالي المؤكد' },
  matchConfidence: { en: 'Match Confidence', ar: 'نسبة التوافق' },
  orderInOneTap: { en: 'Show Barista Ticket', ar: 'عرض تذكرة الطلب للباريستا' },
  topAlternatives: { en: 'Top Safe Alternatives', ar: 'خيارات آمنة بديلة' },
  adventureTitle: { en: '🧪 Wanna Try Something New?', ar: '🧪 هل تود تجربة نكهة غير مألوفة؟' },
  adventureBadge: { en: 'Adventure Pick', ar: 'خيار المغامرة' },
  adventureButton: { en: 'Try This Adventure', ar: 'أنا مستعد للتجربة' },
  
  // Barista Ticket Modal
  baristaTicketTitle: { en: 'Barista Order Ticket', ar: 'تذكرة طلب الباريستا' },
  baristaTicketSubtext: { en: 'Hold this card up at the counter for instant 1-tap extraction.', ar: 'أظهر هذه البطاقة للباريستا عند الكاونتر لتحضير كوبك بدقة.' },
  recipeSpecs: { en: 'Barista Dial-In Parameters', ar: 'معايير التحضير والاستخلاص' },
  ratio: { en: 'Ratio', ar: 'النسبة' },
  dose: { en: 'Dose', ar: 'الجرعة' },
  temp: { en: 'Water Temp', ar: 'حرارة الماء' },
  milkTexture: { en: 'Milk Texture', ar: 'قوام الحليب' },
  close: { en: 'Close', ar: 'إغلاق' },
  
  // Coffeehouses
  selectVenue: { en: 'Select Coffeehouse', ar: 'اختر المقهى المختص' },
  changeVenue: { en: 'Change Coffeehouse', ar: 'تغيير المقهى' },
  activeMenu: { en: 'Live Roastery Menu', ar: 'قائمة التحميص المباشرة' },

  // Sensory Quiz
  quizTitle: { en: 'Discover Your Coffee Dialect', ar: 'اكتشف لهجتك الذوقية في القهوة' },
  quizSubtitle: { en: '4 quick sensory choices. No typing. 30 seconds.', ar: '٤ خيارات حسية سريعة. بدون كتابة. خلال ٣٠ ثانية.' },
  questionMilk: { en: 'How do you like your coffee textured?', ar: 'كيف تفضل قوام قهوتك؟' },
  questionFlavor: { en: 'What flavor note excites your palate today?', ar: 'ما النغمة النكهية التي تشتهيها اليوم؟' },
  questionTemp: { en: 'Temperature Preference', ar: 'حرارة المشروب' },
  questionIntensity: { en: 'Roast & Body Intensity', ar: 'كثافة وقوة المشروب' },
  saveProfile: { en: 'Generate My FayrouzPass™', ar: 'إصدار جواز فيروز الذوقي' },
  
  // Dietary Safeguards
  dietaryTitle: { en: 'Dietary Safeguards', ar: 'تفضيلات وحساسيات غذائية' },
  veganBadge: { en: 'Vegan', ar: 'نباتي' },
  nutFreeBadge: { en: 'Nut-Free', ar: 'خالٍ من المكسرات' },
  lactoseFreeBadge: { en: 'Lactose-Free', ar: 'خالٍ من اللاكتوز' },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('fayrouz_lang') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fayrouz_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key].en || key;
  };

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
