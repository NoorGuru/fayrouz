# Fayrouz UI/UX Enhancement Backlog

> Source: UI/UX audit of `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/match/MatchView.tsx`,
> `src/components/layout/AppShell.tsx` + `Header.tsx`, quiz + ticket + venue modals. (Sept 19, 2026)
>
> **Working agreement:** implement items 1-by-1. Always write a short plan and get explicit
> user confirmation before starting implementation on any item. Do NOT batch-implement.
> High-impact batch goes first, only when user says "start".

## Batch A — High impact, low effort (do first, one at a time)

- [x] **A1. Guest CTA hierarchy** (implemented: quiz is gradient primary, sign-up demoted to ghost, preview stays tertiary link) (`src/app/page.tsx` ~L208)
  - Problem: Take Quiz + Sign Up + Preview-as-guest compete.
  - Plan-to-confirm: one primary (Start Quiz), rest as text links.
  - Done when: single primary CTA on guest card.

- [x] **A2. Single venue switcher** (implemented: banner is the sole switcher; header pill + match-header button removed) (`src/components/layout/Header.tsx`, `src/app/page.tsx` ~L109, `src/components/match/MatchView.tsx` ~L63)
  - Problem: 3 venue switchers (header pill desktop-only + banner + match header).
  - Plan-to-confirm: keep banner as single source, remove/merge others.
  - Done when: one obvious way to change venue on mobile + desktop.

- [x] **A3. Restore pinch-zoom** (implemented: removed maximumScale from viewport) (`src/app/layout.tsx` ~L72)
  - Problem: `maximumScale: 1` blocks zoom (a11y).
  - Plan-to-confirm: remove `maximumScale`, keep `width=device-width, initial-scale=1`.
  - Done when: zoom works, layout unaffected.

- [x] **A4. 44px touch targets** (implemented: added min-h-[44px] min-w-[44px] to Header buttons, all 5 modal close buttons, retake quiz button, and mobile bottom nav)
  - Problem: several targets under 44px.
  - Plan-to-confirm: add `min-h-[44px] min-w-[44px]` where needed.
  - Done when: all interactive targets meet 44px min.

- [x] **A5. Ticket stays until dismissed** (implemented: no auto-close; confirmed state persists until explicit dismiss; transient state resets on open) (`src/components/ticket/BaristaTicketModal.tsx` ~L79)
  - Problem: auto-close after 1200ms, barista can't read it.
  - Plan-to-confirm: persistent "Ordered" state, user dismisses manually.
  - Done when: ticket does not auto-dismiss.

## Batch B — Trust + System 1 clarity

- [x] **B1. "Why this match" chips** (implemented: 3 tactile confidence chips rendered on MatchView hero card for milk, flavor, and temperature) (`src/components/match/MatchView.tsx`)
  - Add 2–3 reason chips (milk / flavor / intensity) under score.
  - Done when: each match shows its reasons.

- [x] **B2. Quiz defaults bias** (implemented: null-init choices, Next/Finish gated per step, guarded handleFinish, reset-on-open) (`src/components/quiz/SensoryQuizModal.tsx` ~L25-28)
  - Problem: `oat / chocolate_nutty / hot / medium` pre-selected; tap-through = false dialect.
  - Plan-to-confirm: start unselected, require tap per step.
  - Done when: no result without explicit choices.

- [x] **B3. QR as primary on ticket** (implemented: branded QR code permanently displayed side-by-side with extraction parameters) (`src/components/ticket/BaristaTicketModal.tsx`)
  - Counter scan should be visible by default, not behind toggle.
  - Done when: QR visible without extra tap.

## Batch C — A11y + mobile polish

- [ ] **C1. Shared modal a11y wrapper** (all 5 modals)
  - Add Escape-to-close, `role="dialog"` + `aria-modal`, focus trap + focus return.
  - Plan-to-confirm: build once in shared wrapper, migrate modals one by one.
  - Done when: all modals meet the pattern.

- [x] **C2. Bottom nav active state + safe-area** (implemented: added env(safe-area-inset-bottom) and 44px targets) (`src/components/layout/AppShell.tsx` ~L58)
  - Add `env(safe-area-inset-bottom)` padding + active indicator; Home action currently just scrolls to top.
  - Done when: active tab visible, no footer overlap on notched phones.

- [ ] **C3. RTL chevron** (`src/components/layout/Header.tsx` ~L67)
  - Replace `▼` char with Lucide `ChevronDown`.
  - Done when: icon mirrors correctly in RTL.

- [x] **C4. Cheaper ambient glows** (implemented: responsive sm: blur levels for optimal mobile performance) (`src/components/layout/AppShell.tsx` ~L30-33)
  - Reduce `blur-[120px]` cost on mobile via `sm:` variants / lower opacity.
  - Done when: no jank on low-end phones, look preserved on desktop.

- [ ] **C5. Loading / empty / offline states for matches**
  - Add skeleton + empty-menu + Firestore-offline messaging (currently renders empty matches).
  - Done when: each state has a designed UI.

## How to work this list

1. User says "start <ID>" (e.g. "start A1").
2. Agent writes a short implementation plan and waits for explicit confirmation.
3. Implement that item only, verify build, check it off here.
