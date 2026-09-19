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

  const scoredDrinks = menuItems.map((drink) => {
    let rawScore = 30; // base score
    const matchReasons: string[] = [];
    const matchReasonsAr: string[] = [];

    // 1. Flavor Notes Alignment (Dominant factor: up to +50)
    if (profile.flavorPreference === 'chocolate_nutty') {
      let nuttyHits = 0;
      for (const note of drink.flavorNotes) {
        const lower = note.toLowerCase();
        if (lower.includes('chocolate') || lower.includes('cacao') || lower.includes('cocoa')) nuttyHits += 2;
        if (lower.includes('hazelnut') || lower.includes('almond') || lower.includes('praline') || lower.includes('walnut') || lower.includes('nut')) nuttyHits += 1.5;
      }
      if (nuttyHits > 0) {
        rawScore += Math.min(50, 30 + nuttyHits * 8);
        matchReasons.push('Rich roasted nutty and chocolate depth');
        matchReasonsAr.push('عمق شوكولاتة البن المحمص والمكسرات');
      } else {
        rawScore += 5;
      }
    } else if (profile.flavorPreference === 'fruity_floral') {
      let fruityHits = 0;
      for (const note of drink.flavorNotes) {
        const lower = note.toLowerCase();
        if (lower.includes('berry') || lower.includes('peach') || lower.includes('citrus') || lower.includes('plum') || lower.includes('passionfruit') || lower.includes('fruit') || lower.includes('cherry') || lower.includes('apple') || lower.includes('papaya') || lower.includes('mandarin')) fruityHits += 2;
        if (lower.includes('jasmine') || lower.includes('blossom') || lower.includes('rose') || lower.includes('floral') || lower.includes('lavender') || lower.includes('bergamot')) fruityHits += 2;
      }
      if (fruityHits > 0) {
        rawScore += Math.min(50, 30 + fruityHits * 8);
        matchReasons.push('Delicate floral and natural fruit notes');
        matchReasonsAr.push('نغمات فاكهية وزهرية طبيعية زاهية');
      } else {
        rawScore += 5;
      }
    } else if (profile.flavorPreference === 'sweet_caramel') {
      let sweetHits = 0;
      for (const note of drink.flavorNotes) {
        const lower = note.toLowerCase();
        if (lower.includes('caramel') || lower.includes('honey') || lower.includes('vanilla') || lower.includes('toffee') || lower.includes('molasses') || lower.includes('pistachio') || lower.includes('sweet cream') || lower.includes('dulce') || lower.includes('waffle')) sweetHits += 2;
      }
      if (sweetHits > 0) {
        rawScore += Math.min(50, 30 + sweetHits * 8);
        matchReasons.push('Warm caramelized Levantine comfort');
        matchReasonsAr.push('دفء الحلاوة المشرقية الطبيعية');
      } else {
        rawScore += 5;
      }
    } else {
      // Balanced
      let balancedHits = 0;
      for (const note of drink.flavorNotes) {
        const lower = note.toLowerCase();
        if (lower.includes('balanced') || lower.includes('clean') || lower.includes('smooth') || lower.includes('finish') || lower.includes('equilibrium') || lower.includes('crisp')) balancedHits += 2;
      }
      if (drink.type === 'cold_brew' || drink.type === 'espresso_milk') balancedHits += 1;
      rawScore += Math.min(50, 25 + balancedHits * 8);
      matchReasons.push('Harmonious clean equilibrium');
      matchReasonsAr.push('توازن نكهات صافٍ ومعتدل');
    }

    // 2. Milk & Texture Alignment (up to +25)
    if (profile.milkPreference === 'any') {
      rawScore += 20;
    } else if (profile.milkPreference === 'black') {
      if (drink.milk === 'black') {
        rawScore += 25;
        matchReasons.push('Pure unmasked single-origin clarity');
        matchReasonsAr.push('نقاء سادة بدون إضافات حليب');
      } else {
        rawScore -= 25;
      }
    } else if (profile.milkPreference === 'oat') {
      if (drink.milk === 'oat') {
        rawScore += 25;
        matchReasons.push('Craft oat microfoam texture');
        matchReasonsAr.push('قوام حليب الشوفان الحريري');
      } else if (drink.milk === 'dairy') {
        rawScore += 12;
      } else {
        rawScore -= 10;
      }
    } else if (profile.milkPreference === 'dairy') {
      if (drink.milk === 'dairy') {
        rawScore += 25;
        matchReasons.push('Rich textured microfoam');
        matchReasonsAr.push('رغوة مايكروفوم غنية');
      } else if (drink.milk === 'oat') {
        rawScore += 18;
      } else {
        rawScore -= 10;
      }
    }

    // 3. Temperature Alignment (up to +20)
    if (profile.temperature === 'any' || drink.temperature === 'both') {
      rawScore += 18;
    } else if (drink.temperature === profile.temperature) {
      rawScore += 20;
      matchReasons.push(profile.temperature === 'hot' ? 'Steaming hot preference' : 'Chilled iced preference');
      matchReasonsAr.push(profile.temperature === 'hot' ? 'حرارة دافئة تناسب رغبتك' : 'مشروب بارد منعش');
    } else {
      rawScore -= 15;
    }

    // 4. Roast & Intensity Alignment (up to +15)
    if (profile.intensity === 'any') {
      rawScore += 12;
    } else if (profile.intensity === 'light' && drink.roast === 'light') {
      rawScore += 15;
    } else if (profile.intensity === 'medium' && drink.roast === 'medium') {
      rawScore += 15;
    } else if (profile.intensity === 'strong' && (drink.roast === 'dark' || drink.type === 'espresso_milk')) {
      rawScore += 15;
    } else {
      rawScore += 6;
    }

    // 5. Dietary Safeguards Checks
    if (profile.dietaryFlags?.includes('vegan')) {
      if (drink.milk === 'dairy') {
        rawScore -= 50;
      } else if (drink.milk === 'oat') {
        rawScore += 10;
      }
    }
    if (profile.dietaryFlags?.includes('lactose_free')) {
      if (drink.milk === 'dairy') {
        rawScore -= 40;
      }
    }
    if (profile.dietaryFlags?.includes('nut_free')) {
      const hasNuts = drink.flavorNotes.some((n) => n.toLowerCase().includes('pistachio') || n.toLowerCase().includes('almond') || n.toLowerCase().includes('hazelnut') || n.toLowerCase().includes('walnut'));
      if (hasNuts) {
        rawScore -= 50;
      }
    }

    return {
      drink,
      rawScore,
      matchReasons,
      matchReasonsAr,
    };
  });

  // Separate safe candidates from adventure picks and sort by rawScore descending
  const safeCandidates = scoredDrinks
    .filter((d) => !d.drink.isAdventure)
    .sort((a, b) => b.rawScore - a.rawScore);

  const adventureCandidate =
    scoredDrinks.find((d) => d.drink.isAdventure) || null;

  // Top 1 is Perfect Match (high confidence 96-98%)
  const topCandidate = safeCandidates[0] || scoredDrinks[0];
  const perfectMatch: ScoredDrink = {
    drink: topCandidate.drink,
    score: 98,
    matchReasons: topCandidate.matchReasons,
    matchReasonsAr: topCandidate.matchReasonsAr,
  };

  // Next 2 are Alternatives (clean 90-93% gradient)
  const alternatives: ScoredDrink[] = safeCandidates.slice(1, 3).map((item, idx) => ({
    drink: item.drink,
    score: Math.max(88, 93 - idx * 4),
    matchReasons: item.matchReasons,
    matchReasonsAr: item.matchReasonsAr,
  }));

  // If there are less than 2 alternatives, fallback to other items
  if (alternatives.length < 2) {
    const remaining = scoredDrinks.filter(
      (d) => d.drink.id !== perfectMatch.drink.id && d.drink.id !== adventureCandidate?.drink.id
    );
    while (alternatives.length < 2 && remaining.length > 0) {
      const item = remaining.shift();
      if (item && !alternatives.some((a) => a.drink.id === item.drink.id)) {
        alternatives.push({
          drink: item.drink,
          score: 89,
          matchReasons: item.matchReasons,
          matchReasonsAr: item.matchReasonsAr,
        });
      }
    }
  }

  const adventurePick: ScoredDrink | null = adventureCandidate
    ? {
        drink: adventureCandidate.drink,
        score: 94,
        matchReasons: adventureCandidate.matchReasons,
        matchReasonsAr: adventureCandidate.matchReasonsAr,
      }
    : null;

  return {
    perfectMatch,
    alternatives,
    adventurePick,
  };
}
