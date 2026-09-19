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
    ar: 'طابق ذوقك مع منيو أي كافيه مختص بـ ٣ ثواني، بدون لف ودوران ومصطلحات معقدة.' 
  },
  
  // Navigation & Actions
  navHome: { en: 'Match', ar: 'المطابقة' },
  navQuiz: { en: 'Taste Quiz', ar: 'اختبار الذوق' },
  navPass: { en: 'FayrouzPass™', ar: 'جواز فيروز' },
  navShops: { en: 'Coffeehouses', ar: 'المقاهي' },
  signIn: { en: 'Sign In', ar: 'تسجيل الدخول' },
  signUp: { en: 'Create Account', ar: 'إنشاء حساب جديد' },
  signOut: { en: 'Sign Out', ar: 'تسجيل الخروج' },
  profile: { en: 'My Palate', ar: 'ملفي الذوقي' },
  retakeQuiz: { en: 'Retake Quiz', ar: 'جرّب الاختبار من جديد' },

  // JEV Hero Match Elements
  perfectMatchBadge: { en: '⭐ #1 YOUR PERFECT MATCH', ar: '⭐ #1 طلبك المضمون (على ذوقك بالملي)' },
  matchConfidence: { en: 'Match Confidence', ar: 'نسبة التوافق مع ذوقك' },
  orderInOneTap: { en: 'Show Barista Ticket', ar: 'ورّي الشاشة للباريستا ☕' },
  topAlternatives: { en: 'Top Safe Alternatives', ar: 'خيارات رايقة ومضمونة ثانية' },
  adventureTitle: { en: '🧪 Wanna Try Something New?', ar: '🧪 ودّك تجرّب شي جديد ومختلف؟' },
  adventureBadge: { en: 'Adventure Pick', ar: 'خيار المغامرة' },
  adventureButton: { en: 'Try This Adventure', ar: 'جاهز للمغامرة 🚀' },
  
  // Barista Ticket Modal
  baristaTicketTitle: { en: 'Barista Order Ticket', ar: 'تذكرة الطلب للباريستا' },
  baristaTicketSubtext: { 
    en: 'Hold this card up at the counter for instant 1-tap extraction.', 
    ar: 'ورّي هالشاشة للباريستا وهو يضبط لك الكوب على أصوله وبالمقاييس الصح 👌' 
  },
  recipeSpecs: { en: 'Barista Dial-In Parameters', ar: 'معايير الاستخلاص والتحضير' },
  ratio: { en: 'Ratio', ar: 'نسبة الاستخلاص' },
  dose: { en: 'Dose', ar: 'الجرعة (Dose)' },
  temp: { en: 'Water Temp', ar: 'حرارة الماء' },
  milkTexture: { en: 'Milk Texture', ar: 'قوام الحليب المايكروفوم' },
  close: { en: 'Close', ar: 'تم / إغلاق' },
  
  // Coffeehouses
  selectVenue: { en: 'Select Coffeehouse', ar: 'وين حابب تشرب قهوتك اليوم؟' },
  changeVenue: { en: 'Change Coffeehouse', ar: 'تغيير المقهى' },
  activeMenu: { en: 'Live Roastery Menu', ar: 'قائمة حبوب اليوم المباشرة' },

  // Sensory Quiz
  quizTitle: { en: 'Discover Your Coffee Dialect', ar: 'اكتشف لهجتك ونوع ذوقك بالقهوة' },
  quizSubtitle: { 
    en: '4 quick sensory choices. No typing. 30 seconds.', 
    ar: '٤ خيارات لمس سريعة.. بدون فلسفة واستبيانات طويلة بـ ٣٠ ثانية' 
  },
  questionMilk: { en: 'How do you like your coffee textured?', ar: 'كيف تحب قوام الحليب بكوبك؟' },
  questionFlavor: { en: 'What flavor note excites your palate today?', ar: 'شو النكهة اللي مشتهيها بكوبك اليوم؟' },
  questionTemp: { en: 'Temperature Preference', ar: 'حار يدفّي ولا بارد يسرسح؟' },
  questionIntensity: { en: 'Roast & Body Intensity', ar: 'ثقل وكثافة الكوب (خفيف ورايق ولا يصحصحك؟)' },
  saveProfile: { en: 'Generate My FayrouzPass™', ar: 'طلّع جواز فيروز الذوقي الخاص فيك 🎫' },
  
  // Dietary Safeguards
  dietaryTitle: { en: 'Dietary Safeguards', ar: 'تفضيلات وحساسيات خاصة' },
  veganBadge: { en: 'Vegan', ar: 'نباتي 🌿' },
  nutFreeBadge: { en: 'Nut-Free', ar: 'خالٍ من المكسرات 🥜' },
  lactoseFreeBadge: { en: 'Lactose-Free', ar: 'خالٍ من اللاكتوز 🥛' },

  // Auth & Account
  authModalTitle: { en: 'Join the Fayrouz Circle', ar: 'انضم لمجتمع فيروز الذوقي' },
  authModalSubtext: { 
    en: 'Create your palate passport from home before your next cafe visit.', 
    ar: 'سجّل حسابك واصنع جواز ذوقك من البيت قبل ما تروح على الكافيه.' 
  },
  emailLabel: { en: 'Email Address', ar: 'البريد الإلكتروني' },
  passwordLabel: { en: 'Password', ar: 'كلمة المرور' },
  nameLabel: { en: 'Your Name / Nickname', ar: 'اسمك أو لقبك' },
  orGoogle: { en: 'Continue with Google', ar: 'المتابعة بحساب Google' },
  haveAccount: { en: 'Already have an account? Sign in', ar: 'عندك حساب من قبل؟ سجّل دخولك' },
  needAccount: { en: "Don't have an account? Create one", ar: 'جديد على فيروز؟ أنشئ حسابك بدقيقة' },
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
