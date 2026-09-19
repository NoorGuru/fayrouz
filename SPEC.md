# Fayrouz (فيروز) — System 1 Coffee Matcher Specification

## Vision
Fayrouz eliminates coffee menu confusion. Using behavioral "System 1" design (fast, intuitive, emotional), it matches a guest's palate to a coffee shop's live menu in 3 seconds.

## Related Ecosystem & Demo
- **Live Demo Site:** [https://fayrouz-demo.bynoor.io](https://fayrouz-demo.bynoor.io)
- **Demo Codebase:** `/Users/noor/Projects/fayrouz-demo` (Repository: `git@github.com:mohnoor94/fayrouz-demo.git`)
- **Shared Assets:**
  - The 16 Coffee Dialects™ & 5 Houses (`../fayrouz-demo/src/utils/coffeeDialects.js`)
  - Universal Pass Generator & Dietary Safeguards (`../fayrouz-demo/src/utils/personaGenerator.js`)
  - Coffeehouse Brand Configurations: Ambar, Turath, Qahwatna (`../fayrouz-demo/src/constants/brandConfig.js`)
  - Barista Extraction Parameters & Ratios (`../fayrouz-demo/src/components/barista/`)

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
  - `flavorPreference`: "fruity_floral" | "chocolate_nutty" | "balanced" | "sweet_caramel"
  - `intensity`: "light" | "medium" | "strong"
  - `temperature`: "hot" | "iced" | "any"
  - `assignedDialect`?: string

- **coffee_shops/{shopId}**:
  - `name`: string (e.g. "Ambar Specialty Roasters")
  - `city`: string (e.g. "Amman")
  - `slug`: string ("ambar")
  - `active`: boolean

- **drinks/{drinkId}**:
  - `shopId`: string
  - `name`: string (e.g. "Oat Velvet Flat White", "V60 Ethiopian Guji")
  - `type`: "espresso_milk" | "filter" | "cold_brew" | "signature"
  - `roast`: "light" | "medium" | "dark"
  - `flavorNotes`: string[] (e.g. ["peach", "jasmine", "citrus"])
  - `flavorNotesPlain`: string
  - `isAdventure`: boolean
  - `adventureReason`?: string
  - `price`: number

## Match Logic
- Score drinks based on overlap with guest taste.
- Highest score = `#1 Perfect Match` (with 1-tap barista ticket).
- Next 2 highest = `Alternative Picks`.
- Top bean with `isAdventure: true` = `Adventure Pick` ("Wanna try something new?").
