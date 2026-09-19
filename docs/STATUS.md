# Fayrouz (فيروز) — Project Build Status

Last updated: September 19, 2026

## Task Milestones

| # | Task | Scope | Status |
|---|---|---|---|
| **1** | **Project Foundation & Design System** | Next.js 15, Tailwind v4 luxury theme tokens (Espresso/Gold/Parchment), Arabic RTL/English LTR LanguageProvider, AppShell, Header. | ✅ **Completed** |
| **2** | **Account Creation & Authentication** | Real user registration & login (Email/Password & Google), persistent user profile state, pre-visit access. | ✅ **Completed** |
| **3** | **30s Sensory Quiz & FayrouzPass™** | 4-question visual sensory quiz, dietary safeguards, 16 Dialects calculation, unique pass ID generation (`FYZ-XXXX`). | ✅ **Completed** |
| **4** | **Amman Coffeehouse Directory & Menus** | Almond, Dimitri's, Būn Fellows, Bunni, Ambar roastery menus, single-origins, and dial-in specs. | ✅ **Completed** |
| **5** | **The 3+1 Decision Engine** | High-confidence #1 Perfect Match, 2 safe alternatives, 1 adventure pick with plain translation. | ✅ **Completed** |
| **6** | **1-Tap Barista Ticket Sheet** | Full-screen high-contrast counter card with exact extraction parameters (ratio, dose, temp). | ✅ **Completed** |
| **7** | **Refinement, Animations & Polish** | Framer Motion micro-interactions, responsive mobile bottom navigation pill, tactile spring transitions, and celebration effects. | ✅ **Completed** |
| **8** | **GitHub Pages Deployment & CI/CD** | Static export (`output: 'export'`), `.nojekyll`, `CNAME` for `fayrouz.bynoor.io`, and automated GitHub Actions workflow (`deploy.yml`). **Live at https://fayrouz.bynoor.io** | ✅ **Live on Production** |
| **9** | **Barista Terminal & Mobile PWA** | Dedicated `/ticket` Barista scanner station, PWA manifest, luxury app icons, and Apple web app support. | ✅ **Live on Production** |
| **10** | **Firebase Stack & Branded QR Ecosystem** | Real Firebase Auth (Google/Email) + Cloud Firestore live production database, offline fallback, branded center-logo QRs, permanent FayrouzPass Member QR, and in-store table tent detection (`?venue=almond`). | ✅ **Live on Production** |
| **11** | **FayrouzPass™ ID Evolution & Counter Fast-Recall** | Standardized format to `JO-XXXXX` (100k capacity per region), dedicated counter recall UI with locked country badge `[ 🇯🇴 JO ]`, 5-digit numeric keypad (`inputMode="numeric"`), and auto-normalizing Firestore lookup. | ✅ **Live on Production** |
| **12** | **Sensory Sommelier Flight & Visual Matcher Engine** | Reimagined MatchView: Dynamic SVG cup vessels (iced crystal tumbler, ceramic tulip cup with latte art, V60 carafe), 4-axis luxury flavor balance radar dial, tactile 3+1 flight switcher, "Why this match" confidence chips, safe-area mobile navigation, and permanent QR counter ticket. | ✅ **Completed** |
| **13** | **The Sensory Front Door & Obsidian FayrouzPass Metal Card** | Reimagined Home: Interactive Taste Mood preview with live dynamic match, Roastery Atelier Bar with neighborhood badges, and Apple-Card-grade Obsidian & Brushed Gold Metal FayrouzPass™ card unveiling. | ✅ **Completed** |
| **14** | **Dynamic Palate Engine & Fluid Mood Morphing** | Overhauled `matchEngine.ts` to rank drinks by unfiltered `rawScore` before normalizing; integrated holistic `TASTE_MOOD_PROFILES`; enriched all 5 Amman roasteries with 5 authentic specialty lots (4/4 distinct winners across all moods); wrapped preview in `<AnimatePresence mode="wait">` with smooth spring transitions and active glow feedback. | ✅ **Completed** |

