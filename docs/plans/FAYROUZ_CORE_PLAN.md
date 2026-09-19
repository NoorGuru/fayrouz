# Fayrouz Core Platform Plan (System 1 Coffee Matcher)

## Overview
Fayrouz eliminates menu decision fatigue at specialty coffee shops. Using behavioral System 1 design (fast, emotional, automatic), it connects a guest's personal taste with coffee shop menus to recommend the perfect cup in 3 seconds.

---

## The Core Product Architecture: "3 Safe Matches + 1 Adventure Pick"

Instead of forcing the customer into System 2 (analytical overthinking with 30 menu choices), Fayrouz presents:

```
┌─────────────────────────────────────────────────────────────┐
│ ⭐ #1 YOUR PERFECT MATCH (98% Match)                         │
│ Flat White with Oat Milk                                    │
│ "Smooth, velvety, and naturally nutty."                    │
│ [ ORDER THIS IN 1 TAP ] ──> Opens Barista Ticket            │
├─────────────────────────────────────────────────────────────┤
│ 2. Alternative Match: Cortado (92%)                         │
│ 3. Alternative Match: Iced Oat Latte (88%)                  │
├─────────────────────────────────────────────────────────────┤
│ 🧪 WANNA TRY SOMETHING NEW? (Adventure Pick)               │
│ V60 Ethiopian Guji (Natural Anaerobic)                      │
│ "You love sweet finishes — this tastes like fresh berries." │
│ [ I'M FEELING ADVENTUROUS ]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack & Data Layer

1. **Frontend**: Next.js 15 (App Router) + Tailwind CSS (Bilingual Arabic RTL / English LTR).
2. **Backend & Database**: Firebase (Firestore, Firebase Auth with Anonymous sign-in, Firebase Storage).
3. **AI Layer**: Gemini Flash for:
   - **Menu Scanner**: Extracts drinks, beans, prices, and tasting notes from a photo of a coffee shop menu.
   - **Personalized 1-Sentence Pitch**: Translates snobby tasting notes into mouth-watering, simple language.
4. **Target Domain**: `fayrouz.bynoor.io` (with the demo sandbox living at `fayrouz-demo.bynoor.io`).
5. **Target Repo**: `NoorGuru/fayrouz`.

---

## 3-Phase Execution Roadmap

### Phase 1: Frontend Prototype with Rich Mock Data (Immediate)
- **30-Second Taste Quiz**:
  1. Milk preference (Pure Black, Silky Dairy, Creamy Oat, Any).
  2. Flavor pillar (Fruity/Floral, Chocolate/Nutty, Sweet/Caramel, Balanced).
  3. Temperature (Hot, Iced, Any).
  4. Strength / Intensity (Light/Delicate, Medium/Smooth, Bold/Intense).
- **Coffee Shop Directory**:
  - Pre-loaded with real specialty roasters (Ambar Specialty Roasters, Turath Coffeehouse).
- **The "3 + 1" Match Screen**:
  - Live scoring algorithm matching taste tags against drink tags.
  - `#1 Match` card with prominent visual hierarchy and 1-tap "Show to Barista" sheet.
  - 2 Alternative matches.
  - 1 Adventure Pick with "Wanna try something new?" callout.

### Phase 2: Firebase Realtime Integration
- Initialize Firebase SDK.
- Anonymous Auth for zero-friction instant taste profile creation.
- Firestore collections:
  - `tastes/{tasteId}`: Stores user preferences.
  - `coffee_shops/{shopId}`: Name, city, active status.
  - `drinks/{drinkId}`: Drink name, category, roast, flavor tags, adventure flag, price.

### Phase 3: AI Menu Onboarding & 1-Sentence Sommelier
- Coffee shop owner uploads a photo of their chalkboard or paper menu.
- Gemini extracts all drinks into Firestore automatically.
- Dynamic 1-sentence personalized pitch generated for each matched drink.

---

## Specification: `SPEC.md`

```markdown
# Fayrouz (فيروز) — System 1 Coffee Matcher Specification

## Vision
Fayrouz eliminates coffee menu confusion. Using behavioral "System 1" design (fast, intuitive, emotional), it matches a guest's palate to a coffee shop's live menu in 3 seconds.

## Core Experience Rules
1. **System 1 Decision (No Overthinking):** Never overwhelm the customer with 20 choices. Show exactly:
   - **3 Top Matches** (with #1 highlighted when confidence is high).
   - **1 Adventure Pick** ("Wanna try something new?").
2. **Plain Taste Translation:** Translate snobby coffee terms (e.g., "anaerobic natural lactic") into simple sensory feelings ("sweet wild berries and peach finish").
3. **Zero Friction:** No mandatory login or password. Fast anonymous profile.
4. **Bilingual:** Native Arabic (RTL) and English (LTR).

## Data Schema (Firestore)
- **tastes/{tasteId}**:
  - `milkPreference`: "black" | "dairy" | "oat" | "any"
  - `flavorPreference`: "fruity_floral" | "chocolate_nutty" | "balanced"
  - `intensity`: "light" | "medium" | "strong"
  - `temperature`: "hot" | "iced" | "any"

- **coffee_shops/{shopId}**:
  - `name`: string (e.g. "Ambar Specialty Roasters")
  - `city`: string (e.g. "Amman")
  - `slug`: string ("ambar")
  - `active`: boolean

- **drinks/{drinkId}**:
  - `shopId`: string
  - `name`: string (e.g. "Flat White", "V60 Ethiopian Guji")
  - `type`: "espresso_milk" | "filter" | "cold_brew"
  - `roast`: "light" | "medium" | "dark"
  - `flavorNotes`: string[] (e.g. ["peach", "jasmine", "citrus"])
  - `isAdventure`: boolean
  - `price`: number

## Match Logic
- Score drinks based on overlap with guest taste.
- Highest score = `#1 Perfect Match` (with 1-tap barista card).
- Next 2 highest = `Alternative Picks`.
- Top bean with `isAdventure: true` = `Adventure Pick` ("Wanna try something new?").
```

---

## Master AI Kickoff Prompt

```text
You are an expert frontend engineer and luxury UI/UX designer. We are building the real Fayrouz platform (fayrouz.bynoor.io) based on the specification in docs/plans/FAYROUZ_CORE_PLAN.md.

Our goal is to build an ultra-fast, lightweight, and gorgeous mobile-first coffee recommendation web app that removes menu confusion using System 1 decision-making (3 Safe Matches + 1 Adventure Pick).

Here is our execution plan:
1. Initialize a clean Next.js 15 (App Router) project with Tailwind CSS and Lucide React.
2. Build the design system: Warm specialty coffee palette (deep espresso #120D0A, warm alabaster #FBF9F5, rich amber #D97706, muted brass), clean modern typography, and RTL support for Arabic.
3. Build the 3-step User Flow using mock data first:
   - Step 1: 30-Second Quick Palate Quiz (Milk/Black, Flavor Pillar, Intensity, Temperature).
   - Step 2: Coffee Shop Selector (Pre-populated with Ambar and Turath).
   - Step 3: The "3 + 1" Match Screen featuring #1 Perfect Match (with 1-tap barista card), 2 Top Alternatives, and 1 "Wanna try something new?" Adventure Pick.
4. Keep the code clean, modular, and lightweight (<100kb client bundle, fast animations with Tailwind).

Read docs/plans/FAYROUZ_CORE_PLAN.md and let's start with Step 1!
```
