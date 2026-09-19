import { MenuItem } from '@/data/coffeehouses';
import { UserProfile } from '@/context/AuthContext';

export interface ScoredDrink {
  drink: MenuItem;
  score: number;
  matchReasons: string[];
  matchReasonsAr: string[];
}

export interface MatchResult {
  perfectMatch: ScoredDrink;
  alternatives: ScoredDrink[];
  adventurePick: ScoredDrink | null;
}

/**
 * Palate matching algorithm:
 * Scores each drink on the coffeehouse's menu against the user's taste profile.
 */
export function calculatePalateMatches(
  tasteProfile: UserProfile['tasteProfile'] | null | undefined,
  menuItems: MenuItem[]
): MatchResult {
  // Default preferences if guest hasn't completed quiz yet
  const profile = tasteProfile || {
    milkPreference: 'oat',
    flavorPreference: 'chocolate_nutty',
    temperature: 'hot',
    intensity: 'medium',
    dietaryFlags: [],
  };

  const scoredDrinks: ScoredDrink[] = menuItems.map((drink) => {
    let score = 50; // base score
    const matchReasons: string[] = [];
    const matchReasonsAr: string[] = [];

    // 1. Temperature Alignment (up to +20)
    if (profile.temperature === 'any' || drink.temperature === 'both') {
      score += 15;
    } else if (drink.temperature === profile.temperature) {
      score += 20;
      matchReasons.push(profile.temperature === 'hot' ? 'Steaming hot preference' : 'Chilled iced preference');
      matchReasonsAr.push(profile.temperature === 'hot' ? 'حرارة دافئة تناسب رغبتك' : 'مشروب بارد منعش');
    } else {
      score -= 15;
    }

    // 2. Milk & Texture Alignment (up to +25)
    if (profile.milkPreference === 'any') {
      score += 15;
    } else if (profile.milkPreference === 'black') {
      if (drink.milk === 'black') {
        score += 25;
        matchReasons.push('Pure unmasked single-origin clarity');
        matchReasonsAr.push('نقاء سادة بدون إضافات حليب');
      } else {
        score -= 20;
      }
    } else if (profile.milkPreference === 'oat') {
      if (drink.milk === 'oat') {
        score += 25;
        matchReasons.push('Craft oat microfoam texture');
        matchReasonsAr.push('قوام حليب الشوفان الحريري');
      } else if (drink.milk === 'dairy') {
        score += 10;
      }
    } else if (profile.milkPreference === 'dairy') {
      if (drink.milk === 'dairy' || drink.milk === 'oat') {
        score += 20;
        matchReasons.push('Rich textured microfoam');
        matchReasonsAr.push('رغوة مايكروفوم غنية');
      }
    }

    // 3. Flavor Notes Alignment (up to +30)
    if (profile.flavorPreference === 'chocolate_nutty') {
      const hasNutty = drink.flavorNotes.some((n) =>
        n.includes('chocolate') || n.includes('cacao') || n.includes('almond') || n.includes('hazelnut') || n.includes('praline')
      );
      if (hasNutty) {
        score += 30;
        matchReasons.push('Rich roasted nutty and chocolate depth');
        matchReasonsAr.push('عمق شوكولاتة البن المحمص والمكسرات');
      } else {
        score += 5;
      }
    } else if (profile.flavorPreference === 'fruity_floral') {
      const hasFruity = drink.flavorNotes.some((n) =>
        n.includes('berry') || n.includes('jasmine') || n.includes('peach') || n.includes('citrus') || n.includes('plum') || n.includes('passionfruit')
      );
      if (hasFruity) {
        score += 30;
        matchReasons.push('Delicate floral and natural fruit notes');
        matchReasonsAr.push('نغمات فاكهية وزهرية طبيعية زاهية');
      } else {
        score += 5;
      }
    } else if (profile.flavorPreference === 'sweet_caramel') {
      const hasSweet = drink.flavorNotes.some((n) =>
        n.includes('caramel') || n.includes('honey') || n.includes('vanilla') || n.includes('pistachio') || n.includes('rose') || n.includes('molasses')
      );
      if (hasSweet) {
        score += 30;
        matchReasons.push('Warm caramelized Levantine comfort');
        matchReasonsAr.push('دفء الحلاوة المشرقية الطبيعية');
      } else {
        score += 10;
      }
    } else {
      // Balanced
      score += 25;
      matchReasons.push('Harmonious clean equilibrium');
      matchReasonsAr.push('توازن نكهات صافٍ ومعتدل');
    }

    // 4. Roast & Intensity Alignment (up to +15)
    if (profile.intensity === 'light' && drink.roast === 'light') {
      score += 15;
    } else if (profile.intensity === 'medium' && drink.roast === 'medium') {
      score += 15;
    } else if (profile.intensity === 'strong' && (drink.roast === 'dark' || drink.type === 'espresso_milk')) {
      score += 15;
    } else {
      score += 8;
    }

    // 5. Dietary Safeguards Checks
    if (profile.dietaryFlags?.includes('vegan')) {
      if (drink.milk === 'dairy') {
        score -= 40;
      } else if (drink.milk === 'oat') {
        score += 10;
      }
    }
    if (profile.dietaryFlags?.includes('lactose_free')) {
      if (drink.milk === 'dairy') {
        score -= 35;
      }
    }
    if (profile.dietaryFlags?.includes('nut_free')) {
      const hasNuts = drink.flavorNotes.some((n) => n.includes('pistachio') || n.includes('almond') || n.includes('hazelnut'));
      if (hasNuts) {
        score -= 50;
      }
    }

    // Clamp score between 60% and 99%
    const normalizedScore = Math.min(99, Math.max(60, Math.round(score)));

    return {
      drink,
      score: normalizedScore,
      matchReasons,
      matchReasonsAr,
    };
  });

  // Separate safe candidates from adventure picks
  const safeCandidates = scoredDrinks
    .filter((d) => !d.drink.isAdventure)
    .sort((a, b) => b.score - a.score);

  const adventureCandidate =
    scoredDrinks.find((d) => d.drink.isAdventure) || null;

  // Top 1 is Perfect Match (must have at least 95%)
  const topCandidate = safeCandidates[0] || scoredDrinks[0];
  const perfectMatch: ScoredDrink = {
    ...topCandidate,
    score: Math.max(96, topCandidate.score),
  };

  // Next 2 are Alternatives
  const alternatives = safeCandidates.slice(1, 3);

  // If there are less than 2 alternatives, fallback to other items
  if (alternatives.length < 2) {
    const remaining = scoredDrinks.filter(
      (d) => d.drink.id !== perfectMatch.drink.id && d.drink.id !== adventureCandidate?.drink.id
    );
    while (alternatives.length < 2 && remaining.length > 0) {
      const item = remaining.shift();
      if (item && !alternatives.some((a) => a.drink.id === item.drink.id)) {
        alternatives.push(item);
      }
    }
  }

  return {
    perfectMatch,
    alternatives,
    adventurePick: adventureCandidate,
  };
}
