export interface SensoryHouse {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  color: string;
  symbol: string;
}

export interface DialectArchetype {
  code: string;
  house: 'terroir' | 'alchemy' | 'velvet' | 'epicure' | 'guild';
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  coreDesire: string;
  coreDesireAr: string;
  color: string;
}

export const HOUSES: Record<string, SensoryHouse> = {
  terroir: {
    id: 'terroir',
    name: 'House of Terroir',
    nameAr: 'حماة الأرض والمصدر',
    description: 'Unmasked single-origin clarity, high-altitude washing, and botanical purity.',
    descriptionAr: 'النقاء المطلق للمصدر الواحد، معالجات الغسيل في المرتفعات، والوضوح البوتانيكي.',
    color: '#38bdf8',
    symbol: '🏛️',
  },
  alchemy: {
    id: 'alchemy',
    name: 'House of Alchemy',
    nameAr: 'كيميائيو الحداثة والتراث',
    description: 'Artisanal culinary innovation, micro-distilled botanicals, and flame extraction.',
    descriptionAr: 'الابتكار الكيميائي الحرفي، مستخلصات الزهور المقطرة، والفوران الطبيعي والركوة.',
    color: '#f97316',
    symbol: '🌿',
  },
  velvet: {
    id: 'velvet',
    name: 'House of Velvet',
    nameAr: 'عشاق المخمل والحرير',
    description: 'Single-origin precision cradled in dense, textured oat and dairy microfoam.',
    descriptionAr: 'دقة المصدر الواحد محمولة على سحاب المايكروفوم الحريري ورغوة الشوفان الكثيفة.',
    color: '#eab308',
    symbol: '☁️',
  },
  epicure: {
    id: 'epicure',
    name: 'House of Epicure',
    nameAr: 'صفوة التواقيع الشرقية',
    description: 'Levantine luxury, warm hospitality, stone-ground pistachios, and golden honey comfort.',
    descriptionAr: 'الفخامة المشرقية، دفء الضيافة الأصيلة، الفستق الحلبي المطحون، وعسل الهيل.',
    color: '#ec4899',
    symbol: '✨',
  },
  guild: {
    id: 'guild',
    name: 'Master Roastery Guild',
    nameAr: 'ديوان فصحاء القهوة الشامل',
    description: 'Transcendent sensory fluidity. Omnivorous mastery of every craft style and mood.',
    descriptionAr: 'مرونة الذائقة المطلقة، عابر للحدود والمذاقات، يستمتع بكل فنجان بلا قيود.',
    color: '#a855f7',
    symbol: '🌟',
  },
};

export const DIALECT_REGISTRY: Record<string, DialectArchetype> = {
  // House of Terroir (T - * - N - *)
  TLNR: {
    code: 'TLNR',
    house: 'terroir',
    title: 'The High-Altitude Sage',
    titleAr: 'حكيم التضاريس العالية',
    tagline: 'Monastic reverence for pristine volcanic terroir and tea-like floral clarity.',
    taglineAr: 'تقديس نسكي لحبوب البن البركانية ونقاء الأزهار الشفافة الشبيهة بالشاي.',
    coreDesire: 'Unadulterated single-origin clarity and razor-sharp brightness.',
    coreDesireAr: 'نقاء أزهار المصدر الواحد وحمضية التفاح الأخضر دون أي إضافات.',
    color: '#38bdf8',
  },
  TLNV: {
    code: 'TLNV',
    house: 'terroir',
    title: 'The Cold-Drip Philosopher',
    titleAr: 'فيلسوف التقطير البارد',
    tagline: 'Treats extraction time as the supreme ingredient, savored over crystalline ice.',
    taglineAr: 'يرى في وقت التقطير البطيء العنصر الأهم، مستمتعاً بالنقاء فوق مكعب ثلج نقي.',
    coreDesire: 'Crisp, unmuddied fruit notes extracted drop-by-drop over patient hours.',
    coreDesireAr: 'استخلاص فاكهي نقي قطرة بقطرة على مدار ساعات من الصبر.',
    color: '#38bdf8',
  },
  TDNR: {
    code: 'TDNR',
    house: 'terroir',
    title: 'The Obsidian Monk',
    titleAr: 'الراهب الأوبسيدياني',
    tagline: 'Stoic, meditative worship of the espresso portafilter and roasted cacao crema.',
    taglineAr: 'عشق تأملي صارم لجرعة الإسبريسو الصافية والكريما الذهبية وكاكاو المصدر.',
    coreDesire: 'Dense single-origin extraction intensity, heavy body, zero dairy.',
    coreDesireAr: 'كثافة استخلاص مركزة للمصدر، قوام مخملي ثقيل، وبلا أي تشويش بالحليب.',
    color: '#38bdf8',
  },
  TDNV: {
    code: 'TDNV',
    house: 'terroir',
    title: 'The Kinetic Nomad',
    titleAr: 'الرحّال الديناميكي',
    tagline: 'High-velocity executive energy driven by bold black coffee poured over ice.',
    taglineAr: 'طاقة حركية عالية يقودها إسبريسو صافٍ ومكثف يُسكب مباشرة فوق مياه مثلجة.',
    coreDesire: 'Rapid, razor-clean espresso fuel that sustains relentless focus.',
    coreDesireAr: 'وقود إسبريسو سريع وحاد يمنح تركيزاً فائقاً دون أي ثقل من مشتقات الحليب.',
    color: '#38bdf8',
  },

  // House of Alchemy (A - * - N - *)
  ALNR: {
    code: 'ALNR',
    house: 'alchemy',
    title: 'The Botanical Mystic',
    titleAr: 'العطّار الصوفي',
    tagline: 'Views the roastery as an ancient apothecary, blending origin beans with wild flora.',
    taglineAr: 'يرى في المحمصة صيدلية شرقية قديمة، تمزج حبوب المصدر بالأعشاب والزهور البرية.',
    coreDesire: 'Subtle herbal harmony—wildflower infusions, steeped cascara, and floral aromatics.',
    coreDesireAr: 'تناغم عشبي لطيف، منقوع كرز القهوة، ونفحات الزهور البرية العطرية.',
    color: '#f97316',
  },
  ALNV: {
    code: 'ALNV',
    house: 'alchemy',
    title: 'The Effervescent Rebel',
    titleAr: 'المتمرّد الفوّار',
    tagline: 'Avant-garde boundary pusher celebrating natural fizz, cascara, and cold botanicals.',
    taglineAr: 'رائد يكسر القواعد؛ يحتفي بالفوران الطبيعي وقشور كرز القهوة والتونيك البارد.',
    coreDesire: 'Crisp carbonated fruit acids, sparkling refreshment, and modern roastery alchemy.',
    coreDesireAr: 'أحماض فوارة منعشة، تونيك البحر الأبيض المتوسط، ونفحات الكاسكارا.',
    color: '#f97316',
  },
  ADNR: {
    code: 'ADNR',
    house: 'alchemy',
    title: 'The Heritage Cezve Keeper',
    titleAr: 'حارس الركوة التراثي',
    tagline: 'Guardian of the sand flame, crushed green cardamom, and dense golden crema.',
    taglineAr: 'حارس رمل الركوة الأصيل، وبذور الهيل الأخضر الطازج، ووجه القهوة الكثيف.',
    coreDesire: 'Slow, ritual boiling in handcrafted copper; deep roasted Levantine roots.',
    coreDesireAr: 'استخلاص بطيء في ركوة نحاسية عريقة؛ تجذر عميق في تقاليد القهوة المشرقية.',
    color: '#f97316',
  },
  ADNV: {
    code: 'ADNV',
    house: 'alchemy',
    title: 'The Shakerato Pioneer',
    titleAr: 'رائد الشاكيراتو',
    tagline: 'Theatrical cosmopolitan showmanship; double espresso shaken with blossom mist.',
    taglineAr: 'حضور مدني مسرحي جذاب؛ إسبريسو مزدوج يُخفق بقوة مع الثلج وماء زهر الليمون.',
    coreDesire: 'Thick aerated cold crema head produced by rigorous mixologist shaking.',
    coreDesireAr: 'طبقة رغوة مخملية باردة وكثيفة تتولد من خفق احترافي مع قطع الثلج.',
    color: '#f97316',
  },

  // House of Velvet (T - * - S - *)
  TLSR: {
    code: 'TLSR',
    house: 'velvet',
    title: 'The Geisha Cloud Dreamer',
    titleAr: 'حالم سحاب الغيشا',
    tagline: 'Gentle soul seeking pristine high-altitude florals wrapped in silk microfoam.',
    taglineAr: 'روح رومانسية شاعرة تبحث عن أزهار البن الشاهقة معانقةً سحاب المايكروفوم الخفيف.',
    coreDesire: 'Delicate floral washed beans cushioned in sweet, perfectly steamed oat microfoam.',
    coreDesireAr: 'حبوب مغسولة رقيقة النكهات محمية برغوة حليب الشوفان الحريرية العذبة.',
    color: '#eab308',
  },
  TLSV: {
    code: 'TLSV',
    house: 'velvet',
    title: 'The Sunlit Cloud',
    titleAr: 'السحاب المشمس',
    tagline: 'Radiant morning optimism; light roast berry notes folded through chilled oat milk.',
    taglineAr: 'تفاؤل صباحي مشرق؛ نفحات التوت الخفيفة تنساب بنعومة عبر حليب شوفان مثلج.',
    coreDesire: 'Crisp natural sweetness, cold refreshing silk, and gentle morning energy.',
    coreDesireAr: 'حلاوة طبيعية صافية، نعومة باردة منعشة، وطاقة صباحية هادئة وخفيفة.',
    color: '#eab308',
  },
  TDSR: {
    code: 'TDSR',
    house: 'velvet',
    title: 'The Cortado Architect',
    titleAr: 'مهندس الكورتادو',
    tagline: 'Geometric perfectionist obsessed with the exact 1:1 craft ratio and 62°C microfoam.',
    taglineAr: 'هندسي دقيق يعشق النسبة الحرفية المتساوية ١:١ ومايكروفوم محكم بدرجة حرارة ٦٢° مئوية.',
    coreDesire: 'Equilibrium: dense roasted espresso balanced by equal textured milk density.',
    coreDesireAr: 'التوازن الهندسي: كثافة إسبريسو غنية تعادلها تماماً كثافة حليب مخملي محكم.',
    color: '#eab308',
  },
  TDSV: {
    code: 'TDSV',
    house: 'velvet',
    title: 'The Iced Velvet Virtuoso',
    titleAr: 'عازف المخمل البارد',
    tagline: 'Modern luxury; rich double espresso cutting cleanly through cold, velvety oat microfoam.',
    taglineAr: 'فخامة عصرية؛ إسبريسو مزدوج غني يخترق بنقاء رغوة حليب الشوفان الباردة والمخملية.',
    coreDesire: 'Cold velvety mouthfeel, caramelized coffee backbone, and zero ice dilution.',
    coreDesireAr: 'قوام مخملي بارد يرتكز على عمق الكراميل المحمص مع انعدام ذوبان الثلج.',
    color: '#eab308',
  },

  // House of Epicure (A - * - S - *)
  ALSR: {
    code: 'ALSR',
    house: 'epicure',
    title: 'The Damascus Courtyard Dreamer',
    titleAr: 'حالم الدار الشامية',
    tagline: 'Morning jasmine courtyards and rosewater breezes beside hot coffee.',
    taglineAr: 'يستحضر بيوت دمشق القديمة، ونسيم ماء الورد الشامي بجانب فنجان الصباح.',
    coreDesire: 'Micro-distilled rosewater, crushed cardamom, and comforting silky microfoam.',
    coreDesireAr: 'ماء الورد المقطر، حب الهيل، وحرارة حليب مخملي يبث الطمأنينة في الصباح.',
    color: '#ec4899',
  },
  ALSV: {
    code: 'ALSV',
    house: 'epicure',
    title: 'The Rose Blossom Shaker',
    titleAr: 'خافق زهر الورد',
    tagline: 'Chic aesthetic soul sipping floral iced coffee like an artisanal craft elixir.',
    taglineAr: 'ذائقة عصرية متألقة ترتشف القهوة الباردة كأيقونة جمالية مفعمة بماء الورد والثلج.',
    coreDesire: 'Iced floral elegance, delicate rose aroma, and smooth plant milk over ice.',
    coreDesireAr: 'أناقة الورد المثلج، عطر شامي منعش، وانسيابية حليب نباتي بارد فوق الثلج.',
    color: '#ec4899',
  },
  ADSR: {
    code: 'ADSR',
    house: 'epicure',
    title: 'The Cardamom Sovereign',
    titleAr: 'سلطان الهيل والذهب',
    tagline: 'Majestic warmth, authentic Levantine generosity, golden honey, and fragrant spice.',
    taglineAr: 'يشتعل بدفء الكرم المشرقي الأصيل، وعسل السدر الذهبي، وعطر الهيل الفاخر.',
    coreDesire: 'Opulent comfort: rich spiced honey, crushed green cardamom, and dense velvety warmth.',
    coreDesireAr: 'فخامة الراحة: عسل بري متبل، هيل أخضر طازج، ودفء مخملي غني يغمر الحواس.',
    color: '#ec4899',
  },
  ADSV: {
    code: 'ADSV',
    house: 'epicure',
    title: 'The Velvet Pistachio Maverick',
    titleAr: 'مبتكر الفستق المخملي',
    tagline: 'Unapologetic epicurean seeking the absolute summit of iced roastery indulgence.',
    taglineAr: 'متذوق استثنائي يبحث عن قمة الرفاهية والفخامة في مشروبات القهوة الباردة.',
    coreDesire: 'Stone-ground raw pistachio paste, bold double espresso, iced velvet microfoam.',
    coreDesireAr: 'فستق حلبي أخضر مطحون حجرياً، إسبريسو مزدوج غني، ورغوة حليب مثلجة وفائقة النعومة.',
    color: '#ec4899',
  },

  // Guild Polyglot
  POLY: {
    code: 'POLY',
    house: 'guild',
    title: 'The Dialect Polyglot',
    titleAr: 'فصيح القهوة والمتذوق الشامل',
    tagline: 'Transcendent sensory wanderer who refuses to be confined to a single cup or tradition.',
    taglineAr: 'متذوق حر متجاوز للحدود، يرفض أن يُسجن في نمط واحد أو كوب محدد.',
    coreDesire: 'Total sensory fluidity: Geisha purist at dawn, iced pistachio alchemist at dusk.',
    coreDesireAr: 'مرونة الذائقة الشاملة: نقاء الغيشا فجراً، وفخامة الفستق المثلج عند المغيب.',
    color: '#a855f7',
  },
};

/**
 * Deterministically computes the user's Coffee Dialect based on the 4 sensory inputs.
 */
export function computeCoffeeDialect(taste: {
  milkPreference: string;
  flavorPreference: string;
  temperature: string;
  intensity: string;
  dietaryFlags?: string[];
}): {
  code: string;
  dialect: DialectArchetype;
  house: SensoryHouse;
  passId: string;
} {
  // Axis 1: Philosophy [T] Terroir vs [A] Alchemy
  // Terroir: pure coffee notes (fruity_floral, balanced, black milk)
  // Alchemy: sweet, caramel, signature spices, flavored comfort
  let axis1 = 'T';
  if (
    taste.flavorPreference === 'sweet_caramel' ||
    taste.flavorPreference === 'spiced_comfort' ||
    (taste.dietaryFlags && taste.dietaryFlags.length > 1)
  ) {
    axis1 = 'A';
  }

  // Axis 2: Frequency [L] Luminous vs [D] Depth
  // Luminous: fruity_floral, light intensity
  // Depth: chocolate_nutty, medium or strong intensity
  let axis2 = 'D';
  if (
    taste.flavorPreference === 'fruity_floral' ||
    taste.intensity === 'light'
  ) {
    axis2 = 'L';
  }

  // Axis 3: Texture [N] Naked vs [S] Silk
  // Naked: black coffee, no milk
  // Silk: oat, dairy, microfoam
  let axis3 = 'S';
  if (taste.milkPreference === 'black') {
    axis3 = 'N';
  }

  // Axis 4: Rhythm [R] Ritual vs [V] Velocity
  // Ritual: hot, ceremonial, slow
  // Velocity: iced, cold brew, fast
  let axis4 = 'R';
  if (taste.temperature === 'iced') {
    axis4 = 'V';
  }

  const code = `${axis1}${axis2}${axis3}${axis4}`;
  const dialect = DIALECT_REGISTRY[code] || DIALECT_REGISTRY['TDSR'];
  const house = HOUSES[dialect.house] || HOUSES.terroir;

  // Deterministic Pass ID (JO-XXXXX: Country Code + 5 Digits)
  const seed = `${code}-${taste.flavorPreference}-${taste.intensity}-${taste.milkPreference || 'none'}`;
  const hash = Math.abs(
    seed.split('').reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) % 90000, 10000)
  ) + 10000;
  const passId = `JO-${hash}`;

  return { code, dialect, house, passId };
}
