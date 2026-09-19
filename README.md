# Fayrouz (فيروز)

> **System 1 Coffee Matcher** — Connect your palate to the coffeehouse menu in 3 seconds.

## Concept
Fayrouz eliminates menu decision fatigue at specialty coffeehouses. Instead of reading 30 complex menu options, Fayrouz presents:
- **3 Safe Matches** (with #1 Perfect Match highlighted for 1-tap barista ordering)
- **1 Adventure Pick** ("Wanna try something new?")

## Related Ecosystem & Live Demo
- **Live Kiosk Demo:** [https://fayrouz-demo.bynoor.io](https://fayrouz-demo.bynoor.io)
- **Demo Codebase:** [fayrouz-demo](https://github.com/mohnoor94/fayrouz-demo) (Local: `../fayrouz-demo`)
- **Shared Assets:** The 16 Coffee Dialects™, FayrouzPass™ universal pass engine, and barista extraction parameters are located in the demo codebase and integrated into the platform plan.

## Documentation
- [System Specification](SPEC.md)
- [Master Implementation Plan](docs/plans/FAYROUZ_CORE_PLAN.md)

## Tech Stack
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS (Bilingual Arabic/English)
- **Backend & Database**: Firebase (Firestore, Auth, Storage)
- **AI**: Gemini for menu scanning and personalized taste translation
- **Target Domain**: `fayrouz.bynoor.io`
