export interface CoffeeShop {
  id: string;
  name: string;
  nameAr: string;
  neighborhood: string;
  neighborhoodAr: string;
  city: string;
  cityAr: string;
  tagline: string;
  taglineAr: string;
  coverImage?: string;
  established: string;
  active: boolean;
}

export interface MenuItem {
  id: string;
  shopId: string;
  name: string;
  nameAr: string;
  type: 'filter_v60' | 'espresso_milk' | 'cold_brew' | 'signature';
  roast: 'light' | 'medium' | 'dark';
  milk: 'oat' | 'dairy' | 'black' | 'any';
  temperature: 'hot' | 'iced' | 'both';
  flavorNotes: string[];
  flavorNotesPlain: string;
  flavorNotesPlainAr: string;
  isAdventure: boolean;
  adventureReason?: string;
  adventureReasonAr?: string;
  priceJOD: number;
  specs: {
    ratio: string;
    dose: string;
    waterTemp: string;
    milkTexture?: string;
    milkTextureAr?: string;
  };
}

export const COFFEE_SHOPS: CoffeeShop[] = [
  {
    id: 'almond',
    name: 'Almond Coffee House',
    nameAr: 'ألموند كوفي هاوس',
    neighborhood: 'Abdoun & 8th Circle',
    neighborhoodAr: 'عبدون والدوار الثامن',
    city: 'Amman',
    cityAr: 'عمّان',
    tagline: 'Artisanal roasts, creamy microfoams & inclusive dietary craft.',
    taglineAr: 'تحميص حرفي، رغوة مايكروفوم كريمية وخيارات غذائية شاملة.',
    established: '2017',
    active: true,
  },
  {
    id: 'dimitris',
    name: "Dimitri's Coffee Roasters",
    nameAr: 'محمصة ديمتريس',
    neighborhood: 'Abdoun & Jabal Amman',
    neighborhoodAr: 'عبدون وجبل عمّان',
    city: 'Amman',
    cityAr: 'عمّان',
    tagline: 'Jordan’s specialty coffee pioneers; single origin mastery.',
    taglineAr: 'رواد القهوة المختصة في الأردن؛ إتقان مصادر البن الفردية.',
    established: '2014',
    active: true,
  },
  {
    id: 'bun-fellows',
    name: 'Būn Fellows Coffee Roasters',
    nameAr: 'بُن فيلوز',
    neighborhood: 'Abdoun',
    neighborhoodAr: 'عبدون',
    city: 'Amman',
    cityAr: 'عمّان',
    tagline: 'Third-wave precision, Kyoto cold drip & vibrant micro-lots.',
    taglineAr: 'دقة الموجة الثالثة، تقطير بارد ومحاصيل ميكرو-لوت مميزة.',
    established: '2019',
    active: true,
  },
  {
    id: 'bunni',
    name: 'Bunni Coffee Roasters',
    nameAr: 'محمصة بُنّي',
    neighborhood: 'Jabal Al-Weibdeh',
    neighborhoodAr: 'جبل اللويبدة',
    city: 'Amman',
    cityAr: 'عمّان',
    tagline: 'Artisanal roastery in the cultural heart of Paris Circle.',
    taglineAr: 'محمصة فنية في قلب اللويبدة الثقافي عند دوار باريس.',
    established: '2018',
    active: true,
  },
  {
    id: 'ambar',
    name: 'Ambar Specialty Roasters',
    nameAr: 'محمصة عنبر للقهوة المختصة',
    neighborhood: 'Mecca Street & Abdoun',
    neighborhoodAr: 'شارع مكة وعبدون',
    city: 'Amman',
    cityAr: 'عمّان',
    tagline: 'The home of The 16 Dialects & high-altitude anaerobic ferments.',
    taglineAr: 'موطن اللهجات الستة عشر والتخميرات اللاهوائية الشاهقة.',
    established: '2023',
    active: true,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // =========================================================================
  // 1. ALMOND COFFEE HOUSE (Amman)
  // =========================================================================
  {
    id: 'almond-signature-latte',
    shopId: 'almond',
    name: 'Hot Almond Silk Latte',
    nameAr: 'لاتيه ألموند الحريري الساخن',
    type: 'signature',
    roast: 'medium',
    milk: 'oat',
    temperature: 'hot',
    flavorNotes: ['roasted almond', 'velvet honey', 'sweet cocoa'],
    flavorNotesPlain: 'Naturally sweet and nutty with toasted almond notes and a velvety finish.',
    flavorNotesPlainAr: 'حلاوة طبيعية ناعمة مع نكهة لوز محمص وقوام مخملي دافئ.',
    isAdventure: false,
    priceJOD: 3.75,
    specs: {
      ratio: '1:2.0',
      dose: '19.5g',
      waterTemp: '92°C',
      milkTexture: 'Dense microfoam at 63°C',
      milkTextureAr: 'مايكروفوم كثيف بدرجة ٦٣ مئوية',
    },
  },
  {
    id: 'almond-flat-white',
    shopId: 'almond',
    name: 'Oat Velvet Flat White',
    nameAr: 'فلات وايت بحليب الشوفان المخملي',
    type: 'espresso_milk',
    roast: 'medium',
    milk: 'oat',
    temperature: 'hot',
    flavorNotes: ['milk chocolate', 'roasted hazelnut', 'caramel finish'],
    flavorNotesPlain: 'Rich, smooth and balanced, blending deep chocolate roast with silky oat milk.',
    flavorNotesPlainAr: 'غني ومتوازن، يدمج شوكولاتة البن المحمص مع نعومة الشوفان.',
    isAdventure: false,
    priceJOD: 3.50,
    specs: {
      ratio: '1:1.9',
      dose: '18.5g',
      waterTemp: '92.5°C',
      milkTexture: 'Silky microfoam at 60°C',
      milkTextureAr: 'رغوة حريرية بدرجة ٦٠ مئوية',
    },
  },
  {
    id: 'almond-spanish-pistachio',
    shopId: 'almond',
    name: 'Iced Spanish Pistachio Latte',
    nameAr: 'سبانش لاتيه بالفستق الحلبي المثلج',
    type: 'signature',
    roast: 'medium',
    milk: 'dairy',
    temperature: 'iced',
    flavorNotes: ['real pistachio paste', 'sweet cream', 'double espresso'],
    flavorNotesPlain: 'Indulgent iced luxury made with real ground pistachio and sweet microfoam.',
    flavorNotesPlainAr: 'فخامة باردة منعشة معجونة بالفستق الحلبي الطبيعي والحليب البارد.',
    isAdventure: false,
    priceJOD: 4.25,
    specs: {
      ratio: '1:1.8',
      dose: '20g',
      waterTemp: '93°C',
      milkTexture: 'Cold aerated milk over cracked ice',
      milkTextureAr: 'حليب بارد مخفوق فوق ثلج مكسر',
    },
  },
  {
    id: 'almond-ethiopia-v60',
    shopId: 'almond',
    name: 'Ethiopian Guji V60 Pour-Over',
    nameAr: 'إثيوبيا قوجي مقطرة V60',
    type: 'filter_v60',
    roast: 'light',
    milk: 'black',
    temperature: 'hot',
    flavorNotes: ['peach blossom', 'wild jasmine', 'bergamot citrus'],
    flavorNotesPlain: 'Tea-like and delicate, tasting like sweet floral peach and citrus tea.',
    flavorNotesPlainAr: 'خفيفة وزاهية كالشاي، مع نكهات خوخ وزهر الياسمين المنعش.',
    isAdventure: false,
    priceJOD: 4.00,
    specs: {
      ratio: '1:16.0',
      dose: '15g (yield 240ml)',
      waterTemp: '92°C',
    },
  },
  {
    id: 'almond-anaerobic-adventure',
    shopId: 'almond',
    name: 'Colombia Pink Bourbon (Anaerobic Ferment)',
    nameAr: 'كولومبيا بينك بوربون (تخمير لاهوائي)',
    type: 'filter_v60',
    roast: 'light',
    milk: 'black',
    temperature: 'hot',
    flavorNotes: ['papaya', 'passionfruit', 'sparkling strawberry acidity'],
    flavorNotesPlain: 'Wild tropical explosion that tastes more like exotic passionfruit juice than regular coffee!',
    flavorNotesPlainAr: 'انفجار نكهات استوائية منعشة بطعم الباشن فروت والفراولة البرية، بعيداً عن طعم القهوة التقليدي!',
    isAdventure: true,
    adventureReason: 'Because you love bright fruit notes, this rare micro-lot tastes like sparkling passionfruit elixir.',
    adventureReasonAr: 'بما أنك تحب النكهات المنعشة، هذا المحصول النادر يمنحك تجربة استوائية بنكهة فاكهة الآلام والفراولة.',
    priceJOD: 5.50,
    specs: {
      ratio: '1:16.5',
      dose: '16g (yield 264ml)',
      waterTemp: '91°C',
    },
  },

  // =========================================================================
  // 2. DIMITRI'S COFFEE ROASTERS (Amman)
  // =========================================================================
  {
    id: 'dimitris-cortado',
    shopId: 'dimitris',
    name: "Dimitri's Craft Cortado",
    nameAr: 'كورتادو ديمتريس الحرفي',
    type: 'espresso_milk',
    roast: 'medium',
    milk: 'dairy',
    temperature: 'hot',
    flavorNotes: ['dark cacao', 'praline', 'balanced espresso punch'],
    flavorNotesPlain: 'Equal parts bold ristretto espresso and silky textured milk for pure balance.',
    flavorNotesPlainAr: 'توازن متساوٍ بين جرعة الإسبريسو القوية ورغوة الحليب الحريرية.',
    isAdventure: false,
    priceJOD: 3.25,
    specs: {
      ratio: '1:1',
      dose: '18g',
      waterTemp: '93°C',
      milkTexture: 'Glossy microfoam at 60°C',
      milkTextureAr: 'مايكروفوم لامع بدرجة ٦٠ مئوية',
    },
  },
  {
    id: 'dimitris-iced-americano',
    shopId: 'dimitris',
    name: 'Artisanal Flash-Iced Long Black',
    nameAr: 'لونغ بلاك مثلج بالتحضير السريع',
    type: 'cold_brew',
    roast: 'medium',
    milk: 'black',
    temperature: 'iced',
    flavorNotes: ['crisp chocolate', 'dried black cherry', 'clean finish'],
    flavorNotesPlain: 'Sharp, pure black espresso poured cleanly over ice water for instant morning clarity.',
    flavorNotesPlainAr: 'إسبريسو سادة نقي ومكثف يُسكب فوق مياه مثلجة لمنحك انتعاشاً سريعاً.',
    isAdventure: false,
    priceJOD: 3.00,
    specs: {
      ratio: '1:2.1',
      dose: '19g',
      waterTemp: '92°C',
    },
  },
  {
    id: 'dimitris-panama-geisha',
    shopId: 'dimitris',
    name: 'Panama Boquete Geisha Pour-Over',
    nameAr: 'بنما بوكيتي غيشا V60',
    type: 'filter_v60',
    roast: 'light',
    milk: 'black',
    temperature: 'hot',
    flavorNotes: ['jasmine blossom', 'mandarin zest', 'sweet bergamot honey'],
    flavorNotesPlain: 'The world’s most celebrated light roast: ethereal, floral, and pure as morning dew.',
    flavorNotesPlainAr: 'أرقى محاصيل القهوة عالمياً: نقاء أزهار الياسمين وعسل المندرين الصافي.',
    isAdventure: true,
    adventureReason: 'The absolute summit of floral terroir. If you want to taste pure luxury without dairy, this is it.',
    adventureReasonAr: 'قمة النقاء العطري في القهوة العالمية، تجربة استثنائية لأزهار الياسمين.',
    priceJOD: 6.50,
    specs: {
      ratio: '1:16.0',
      dose: '15g',
      waterTemp: '91°C',
    },
  },

  // =========================================================================
  // 3. BŪN FELLOWS (Abdoun)
  // =========================================================================
  {
    id: 'bun-fellows-kyoto-cold-drip',
    shopId: 'bun-fellows',
    name: 'Kyoto 18-Hour Slow-Drip Cold Brew',
    nameAr: 'تقطير كيوتو البارد البطيء (١٨ ساعة)',
    type: 'cold_brew',
    roast: 'light',
    milk: 'black',
    temperature: 'iced',
    flavorNotes: ['dark plum', 'cognac sweetness', 'smooth molasses'],
    flavorNotesPlain: 'Extracted drop by drop over 18 hours: ultra-smooth with zero bitterness.',
    flavorNotesPlainAr: 'مستخلص قطرة بقطرة على مدار ١٨ ساعة: فائق النعومة وخالٍ تماماً من المرارة.',
    isAdventure: false,
    priceJOD: 4.50,
    specs: {
      ratio: '1:12',
      dose: '50g per liter',
      waterTemp: '4°C ice water drip',
    },
  },
  {
    id: 'bun-fellows-oat-latte',
    shopId: 'bun-fellows',
    name: 'House Velvet Oat Latte',
    nameAr: 'لاتيه الشوفان المخملي الخاص',
    type: 'espresso_milk',
    roast: 'medium',
    milk: 'oat',
    temperature: 'hot',
    flavorNotes: ['toffee', 'golden waffle', 'creamy almond butter'],
    flavorNotesPlain: 'Warm and comforting with toasted waffle sweetness and rich oat microfoam.',
    flavorNotesPlainAr: 'دافئ ومريح بحلاوة التوفي ورغوة الشوفان الكريمية.',
    isAdventure: false,
    priceJOD: 3.80,
    specs: {
      ratio: '1:2.0',
      dose: '19g',
      waterTemp: '92.5°C',
      milkTexture: 'Microfoam at 62°C',
      milkTextureAr: 'مايكروفوم بدرجة ٦٢ مئوية',
    },
  },
  {
    id: 'bun-fellows-cascara-tonic',
    shopId: 'bun-fellows',
    name: 'Sparkling Cascara & Blood Orange Tonic',
    nameAr: 'كاسكارا فوارة بتونيك البرتقال الأحمر',
    type: 'signature',
    roast: 'light',
    milk: 'black',
    temperature: 'iced',
    flavorNotes: ['coffee cherry cascara', 'sicilian blood orange', 'fizz'],
    flavorNotesPlain: 'Made from coffee fruit cherries brewed into a refreshing, fizzy botanical iced soda!',
    flavorNotesPlainAr: 'مشروب صودا فوار منعش ومصنوع من قشور كرز القهوة والبرتقال الأحمر الصقلي!',
    isAdventure: true,
    adventureReason: 'Tired of milk or plain black? This fizzy coffee cherry soda is Jordan’s coolest refresher.',
    adventureReasonAr: 'تجربة استثنائية منعشة وفوارة تجمع قشور كرز القهوة بالبرتقال الأحمر.',
    priceJOD: 4.25,
    specs: {
      ratio: 'Cold brew cascara 1:8 with premium craft tonic',
      dose: '30g cascara',
      waterTemp: 'Chilled carbonated',
    },
  },

  // =========================================================================
  // 4. BUNNI COFFEE ROASTERS (Jabal Al-Weibdeh)
  // =========================================================================
  {
    id: 'bunni-yemen-v60',
    shopId: 'bunni',
    name: 'Yemeni Haraaz Artisanal V60',
    nameAr: 'يمن حراز مقطرة V60',
    type: 'filter_v60',
    roast: 'medium',
    milk: 'black',
    temperature: 'hot',
    flavorNotes: ['dried fig', 'wild cardamom', 'dark cane molasses'],
    flavorNotesPlain: 'Deep, historic Yemeni beans grown in high stone terraces, tasting of dried fig and warm cardamom.',
    flavorNotesPlainAr: 'بن يمني جبلي أصيل من مدرجات حراز، بنكهات التين المجفف والهيل والكراميل الدافئ.',
    isAdventure: false,
    priceJOD: 5.00,
    specs: {
      ratio: '1:15.5',
      dose: '16g',
      waterTemp: '93°C',
    },
  },
  {
    id: 'bunni-shakerato',
    shopId: 'bunni',
    name: 'Weibdeh Orange Blossom Shakerato',
    nameAr: 'شاكيراتو اللويبدة بماء الزهر',
    type: 'signature',
    roast: 'medium',
    milk: 'black',
    temperature: 'iced',
    flavorNotes: ['double ristretto', 'distilled orange blossom', 'thick crema froth'],
    flavorNotesPlain: 'Double espresso vigorously shaken with ice and floral blossom water into a creamy foam head.',
    flavorNotesPlainAr: 'إسبريسو مزدوج يُخفق بشدة مع الثلج وقطرات ماء الزهر لإنتاج رغوة باردة مخملية.',
    isAdventure: true,
    adventureReason: 'Transforms black espresso into a frothy, chilled cocktail with Levantine orange blossom.',
    adventureReasonAr: 'يحوّل الإسبريسو السادة إلى مشروب بارد رغوي مفعم بنفحات ماء الزهر الدمشقي.',
    priceJOD: 3.50,
    specs: {
      ratio: '1:1.8',
      dose: '20g',
      waterTemp: '93°C',
    },
  },

  // =========================================================================
  // 5. AMBAR SPECIALTY ROASTERS (Amman)
  // =========================================================================
  {
    id: 'ambar-damascus-cortado',
    shopId: 'ambar',
    name: 'Damascus Rose Craft Cortado',
    nameAr: 'كورتادو الورد الشامي الحرفي',
    type: 'signature',
    roast: 'medium',
    milk: 'oat',
    temperature: 'hot',
    flavorNotes: ['distilled rosewater', 'cardamom spice', 'velvet oat microfoam'],
    flavorNotesPlain: 'A comforting specialty cortado kissed with real organic rosewater and silky microfoam.',
    flavorNotesPlainAr: 'كورتادو راقٍ ومريح متبل بماء الورد الدمشقي العضوي ورغوة حليب الشوفان الناعمة.',
    isAdventure: false,
    priceJOD: 3.75,
    specs: {
      ratio: '1:1.5',
      dose: '19g',
      waterTemp: '92.5°C',
      milkTexture: 'Microfoam at 62°C',
      milkTextureAr: 'مايكروفوم بدرجة ٦٢ مئوية',
    },
  },
  {
    id: 'ambar-aleppo-pistachio',
    shopId: 'ambar',
    name: 'Aleppo Pistachio Cream Latte',
    nameAr: 'لاتيه كريمة الفستق الحلبي',
    type: 'signature',
    roast: 'medium',
    milk: 'oat',
    temperature: 'iced',
    flavorNotes: ['stone-ground raw pistachio', 'double espresso', 'iced oat velvet'],
    flavorNotesPlain: 'Pure roastery luxury: stone-ground raw pistachio puree paired with chilled espresso.',
    flavorNotesPlainAr: 'قمة فخامة القهوة الباردة: فستق حلبي طازج مطحون حجرياً مع إسبريسو وحليب مثلج.',
    isAdventure: true,
    adventureReason: 'The benchmark luxury iced latte in Amman: opulent, creamy, and made with genuine green pistachios.',
    adventureReasonAr: 'أفخم لاتيه بارد في عمّان: معجون بالفستق الحلبي الأصلي الفاخر والإسبريسو الغني.',
    priceJOD: 4.50,
    specs: {
      ratio: '1:1.8',
      dose: '20g',
      waterTemp: '93°C',
    },
  },
];
