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
  brandTagline: { en: 'System 1 Coffee Matcher', ar: 'قهوتك الصح بـ ٣ ثواني وبدون حيرة' },
  brandSubtext: { 
    en: 'Connect your palate to the coffeehouse menu in 3 seconds.', 
    ar: 'طابق ذوقك مع منيو أي كافيه مختص بـ ٣ ثواني، بدون حيرة ولا وجع راس.' 
  },
  
  // Navigation & Actions
  navHome: { en: 'Match', ar: 'المطابقة' },
  navQuiz: { en: 'Taste Quiz', ar: 'اختبار الذوق' },
  navPass: { en: 'FayrouzPass™', ar: 'باسبور فيروز' },
  navShops: { en: 'Coffeehouses', ar: 'الكافيهات' },
  signIn: { en: 'Sign In', ar: 'تسجيل الدخول' },
  signUp: { en: 'Create Account', ar: 'حساب جديد' },
  signOut: { en: 'Sign Out', ar: 'تسجيل الخروج' },
  profile: { en: 'My Palate', ar: 'ملفي الذوقي' },
  retakeQuiz: { en: 'Retake Quiz', ar: 'جرّب الاختبار من جديد' },

  // JEV Hero Match Elements
  perfectMatchBadge: { en: '⭐ #1 YOUR PERFECT MATCH', ar: '⭐ #1 طلبك المضمون (على ذوقك بالزبط)' },
  matchConfidence: { en: 'Match Confidence', ar: 'نسبة التوافق مع ذوقك' },
  orderInOneTap: { en: 'Show Barista Ticket', ar: 'فرجي الشاشة للباريستا ☕' },
  topAlternatives: { en: 'Top Safe Alternatives', ar: 'خيارات تانية رايقة ومضمونة' },
  adventureTitle: { en: '🧪 Wanna Try Something New?', ar: '🧪 حابب تجرّب شي جديد ومختلف؟' },
  adventureBadge: { en: 'Adventure Pick', ar: 'خيار المغامرة' },
  adventureButton: { en: 'Try This Adventure', ar: 'يلا نجرّب 🚀' },
  
  // Barista Ticket Modal
  baristaTicketTitle: { en: 'Barista Order Ticket', ar: 'تذكرة الطلب للباريستا' },
  baristaTicketSubtext: { 
    en: 'Hold this card up at the counter for instant 1-tap extraction.', 
    ar: 'فرجي هاي الشاشة للباريستا وهو بزبطلك القهوة عالأصول وبالمقاييس الصح 👌' 
  },
  recipeSpecs: { en: 'Barista Dial-In Parameters', ar: 'معايير التحضير والاستخلاص' },
  ratio: { en: 'Ratio', ar: 'نسبة التحضير (Ratio)' },
  dose: { en: 'Dose', ar: 'الجرعة (Dose)' },
  temp: { en: 'Water Temp', ar: 'حرارة المي' },
  milkTexture: { en: 'Milk Texture', ar: 'قوام وتبخير الحليب' },
  close: { en: 'Close', ar: 'إغلاق' },
  
  // Coffeehouses
  selectVenue: { en: 'Select Coffeehouse', ar: 'وين حابب تشرب قهوتك اليوم؟' },
  changeVenue: { en: 'Change Coffeehouse', ar: 'غيّر الكافيه' },
  activeMenu: { en: 'Live Roastery Menu', ar: 'قائمة القهوة اليومية' },

  // Sensory Quiz
  quizTitle: { en: 'Discover Your Coffee Dialect', ar: 'اكتشف لهجتك ونوع ذوقك بالقهوة' },
  quizSubtitle: { 
    en: '4 quick sensory choices. No typing. 30 seconds.', 
    ar: '٤ خيارات لمس سريعة.. بدون تعقيد واستبيانات طويلة بـ ٣٠ ثانية' 
  },
  questionMilk: { en: 'How do you like your coffee textured?', ar: 'كيف بتحب قوام الحليب بقهوتك؟' },
  questionFlavor: { en: 'What flavor note excites your palate today?', ar: 'شو النكهة اللي عبالك تشربها اليوم؟' },
  questionTemp: { en: 'Temperature Preference', ar: 'سخنة تدفيك ولا باردة تبرّد على قلبك؟' },
  questionIntensity: { en: 'Roast & Body Intensity', ar: 'قوة وثقل القهوة (خفيفة ورايقة ولا تصحصحك؟)' },
  saveProfile: { en: 'Generate My FayrouzPass™', ar: 'طلّع باسبور فيروز الخاص بذوقك 🎫' },
  
  // Dietary Safeguards
  dietaryTitle: { en: 'Dietary Safeguards', ar: 'تفضيلات وحساسيات خاصة' },
  veganBadge: { en: 'Vegan', ar: 'نباتي 🌿' },
  nutFreeBadge: { en: 'Nut-Free', ar: 'بدون مكسرات 🥜' },
  lactoseFreeBadge: { en: 'Lactose-Free', ar: 'بدون لاكتوز 🥛' },

  // Auth & Account
  authModalTitle: { en: 'Join the Fayrouz Circle', ar: 'انضم لمجتمع فيروز الذوقي' },
  authModalSubtext: { 
    en: 'Create your palate passport from home before your next cafe visit.', 
    ar: 'سجّل حسابك وخلي باسبور ذوقك جاهز من البيت قبل ما تروح ع الكافيه.' 
  },
  emailLabel: { en: 'Email Address', ar: 'الإيميل' },
  passwordLabel: { en: 'Password', ar: 'كلمة السر' },
  nameLabel: { en: 'Your Name / Nickname', ar: 'اسمك أو شو بتحب نناديلك' },
  orGoogle: { en: 'Continue with Google', ar: 'كمّل بحساب Google' },
  haveAccount: { en: 'Already have an account? Sign in', ar: 'عندك حساب من قبل؟ سجّل دخولك' },
  needAccount: { en: "Don't have an account? Create one", ar: 'جديد معنا؟ افتح حسابك بدقيقة' },
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
