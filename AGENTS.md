# AGENTS.md — Fayrouz Agent Operating Rules & Tracking Protocol

Welcome, Agent. This file outlines the operational principles, architecture, and tracking rules for building **Fayrouz (فيروز)** — the System 1 Coffee Matcher.

---

## 1. Core Operating Principles

1. **Step-by-Step Execution:**
   - Execute one task at a time as outlined in the Task Roadmap.
   - Do NOT rush ahead or implement multiple major tasks simultaneously.
   - When completing a task, update the task status in `/Users/noor/.gemini/antigravity-cli/brain/3da62a9e-150b-4b2a-a8dd-9cca6810bb73/TASK_ROADMAP.md` and in `docs/STATUS.md`.
   - Present completed work clearly to the user and confirm the next step before proceeding.

2. **JEV Behavioral Model (Judgment → Evaluation → Value):**
   - **Judgment (J):** Fast intuition. Visual, tactile sensory cards. No long surveys or keyboard typing. Bold Hero #1 Match.
   - **Evaluation (E):** High-confidence scores (e.g. 98%), plain sensory translations (no snobby roaster jargon), and the 3+1 structure (3 safe picks + 1 adventure pick) to eliminate choice paralysis.
   - **Value (V):** 1-Tap Barista Ticket card, extraction dial-in specs, and permanent FayrouzPass™ ID.

3. **User Accounts & Pre-Visit Onboarding:**
   - Real user authentication (Email/Password & Google Sign-In).
   - Users can register and take the 30-second sensory quiz from home before ever visiting a coffeehouse.
   - No forced anonymous-only sessions. Guest profiles upgrade seamlessly into persistent accounts.

4. **Design Aesthetic & Luxury Tokens:**
   - Dark Luxury Espresso (`#120D0A`), Charcoal Slate (`#1A1412`), Warm Alabaster Parchment (`#FBF9F5`), Brushed Gold (`#D4AF37`), and Fayrouz Teal (`#0D9488`).
   - Native Bilingualism: Instant toggle between Arabic (RTL) and English (LTR).

5. **AI Model Selection:**
   - Google Gemini 3.8 Flash for any taste matchmaking insights and barista dialogue.
   - Menu vision scanning and automatic sensory translation are parked for later phases to focus 100% on the core MVP UI/UX.

---

## 2. Tracking Protocol

At every milestone:
- Mark the current task as `✅ Completed` in `docs/STATUS.md` and in `TASK_ROADMAP.md`.
- Detail the next task before starting execution.
- Maintain code cleanliness and verify Next.js builds without errors.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
