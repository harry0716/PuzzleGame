# Delivery Notes

## Project Goal

Build a lightweight interactive event website for visiting students that can:

- introduce the activity
- run a short quiz
- calculate a score
- generate a result / talent card
- display rankings locally or across devices
- support on-site presenter usage with QR code entry

## Delivered Scope

### Core User Flow

1. Participant opens the game page
2. Participant selects a scene from the scene panel, or enters a locked single-scene activity URL
3. Participant enters a nickname
4. Participant answers the scene's questions
5. System calculates score and trait result
6. System saves the result to the scene-aware leaderboard
7. Participant can replay, and in unlocked mode may return to the scene panel

### Quiz Experience

- timed rounds
- per-question feedback
- cumulative score
- dual scoring modes for showcase and competition activity styles
- randomized visible answer order across current interactive question types, including anti-repeat tuning for selectable answers
- trait-based result mapping
- share / copy result text
- type-aware question rendering foundation
- explicit timed-choice question support
- ordering question support
- image-based question support
- matching question support
- branching question support
- second playable scene with AI-zone / drone-zone booth flow
- scene-native SVG visual assets stored in the repository
- career-role result card with secondary style label support

### Leaderboard

- local browser leaderboard
- shared Supabase leaderboard
- scene-aware event code handling in the main game flow
- standalone leaderboard page
- presenter leaderboard page
- front-end reset button for local and Supabase modes

### Presenter Support

- dedicated presenter page
- QR code for quick entry, including locked single-scene activity routing
- auto-refresh ranking display

### Deployment Readiness

- GitHub Pages ready
- Netlify / Vercel config included
- PWA manifest included
- service worker cache included

## Main Deliverables

- `index.html`
- `app.js`
- `scene-registry.js`
- `styles.css`
- `leaderboard.html`
- `leaderboard-page.js`
- `leaderboard-shared.js`
- `presenter.html`
- `presenter.js`
- `config.js`
- `service-worker.js`
- `assets/scenes/`
- `assets/results/`

## Backend / Shared Data Setup

When shared mode is enabled, Supabase is used for:

- reading leaderboard entries
- inserting new results
- deleting all results for the current `eventCode` from the front end

Required setup is documented in:

- `LEADERBOARD_SETUP.md`
- `supabase-leaderboard.sql`

## 2026-04-18 Update

This delivery baseline now includes:

- front-end leaderboard reset from the result page
- front-end leaderboard reset from the standalone leaderboard page
- Supabase delete policy documentation
- service worker cache version bump to help the deployed site load updated files

## 2026-04-19 Update

This delivery baseline now additionally includes:

- a front-end scene selection panel
- a dedicated scene registry file
- migration of the existing `晶片獵人` content into scene-driven data
- scene-specific leaderboard event code handling in the main game flow
- one working timed question type: `timed-choice`
- one working ordering question type: `ordering`
- one working image-based question type: `image-choice`
- one working matching question type: `matching`
- one working branching question type: `branching`
- a second playable scene: `電子工程雙體驗`
- two-route mission flow that merges back into one shared ending
- built-in SVG assets for the second scene and its role cards

## Recommended Next Additions

If the project continues to grow, the next safe expansion areas are:

- demo review and copy tuning based on playthrough feedback
- additional event scenes
- richer result card visuals
- admin-safe leaderboard reset flow
- analytics or event logging
- multilingual content

## 2026-04-19 Additional Update

This delivery baseline now additionally includes:

- manual seconds input on the landing page, alongside the existing pacing presets
- browser-side persistence for the custom timer value
- presenter-side scene selection for QR routing
- presenter-side public base URL input so students can scan into GitHub Pages instead of localhost

## 2026-04-19 Cache Hardening Update

This delivery baseline now additionally includes:

- versioned asset URLs on the main entry pages
- service worker registration from the game, presenter, and leaderboard entry pages
- a network-first update strategy for HTML and versioned core assets when online
- a more reliable GitHub Pages refresh path for real-device testing

## 2026-04-19 Third Scene Update

This delivery baseline now additionally includes:

- a third playable scene: `智慧工廠任務站`
- a smart-factory mission flow covering sensing, control, inspection, and production-line logic
- repository-native SVG assets for the factory cover, sensor station, inspection line, and four result-role icons
- four new result traits for the factory scene: `control`, `inspection`, `automation`, and `operations`

## 2026-04-19 Fourth Scene Update

This delivery baseline now additionally includes:

- a fourth playable scene: `智慧照護任務站`
- a 10-question smart-care mission flow centered on healthcare support and long-term care
- repository-native SVG assets for the care cover, vitals monitor, bedside sensor, and four result-role icons
- four new result traits for the care scene: `vitals`, `care`, `systems`, and `support`

## 2026-04-20 Fifth Scene First Slice

This delivery baseline now additionally includes:

- a new module-based fifth-scene hub: `智慧農場全球任務站`
- two new main-entry views for the fifth scene:
  - shared intro
  - module selector
- the first playable fifth-scene pilot module: `智慧灌溉題組`
- a fifth-scene data structure that supports one master scene owning multiple internal modules
- backward compatibility for the first four scenes without forcing them into the module-based pattern

## 2026-04-20 Fifth Scene Routing Follow-Up

This delivery baseline now additionally includes:

- presenter-side module selection for module-based scenes
- QR generation that can point directly to `?scene=...&module=...`
- presenter leaderboard loading aligned to module-specific event codes and local keys

## 2026-04-20 Fifth Scene Full Module Rollout

This delivery baseline now additionally includes:

- six newly playable smart-agriculture modules inside the fifth-scene hub:
  - `agri-tech`
  - `farm-energy`
  - `farm-business`
  - `global-market`
  - `farm-esg`
  - `water-governance`
- one existing pilot module retained as part of the same hub:
  - `smart-irrigation`
- full seven-module fifth-scene experience with shared intro, module selection, module landing, module questions, and module result flow
- module-level leaderboard event-code coverage for all currently playable fifth-scene modules

## 2026-04-20 Difficulty Foundation Update

This delivery baseline now additionally includes:

- difficulty-aware activity routing using:
  - `easy`
  - `medium`
  - `hard`
- landing-page difficulty selection in the main game flow
- presenter-side difficulty selection before QR generation
- difficulty-aware local leaderboard keys
- difficulty-aware shared leaderboard event-code suffixing
- preserved compatibility for existing scenes and modules that do not yet have dedicated difficulty-specific question banks

## 2026-04-20 Difficulty Pilot Update

This delivery baseline now additionally includes:

- the first real three-tier difficulty pilot on:
  - fifth scene
  - module `smart-irrigation`
- a medium baseline that preserves the original pilot content
- an easy variant with clearer copy, longer timing, and reduced selectable-option density on applicable question types
- a hard variant with denser prompt framing and tighter timing on applicable question types

## 2026-04-20 Independent Difficulty Script Update

This delivery baseline now additionally includes:

- a rewritten `smart-irrigation` difficulty model based on three authored scripts
- distinct `easy`, `medium`, and `hard` question-bank structures for the same module
- difficulty-specific landing copy and result-summary emphasis for the smart-irrigation pilot
- a stronger content-difficulty baseline that can later be copied scene by scene

## 2026-04-20 Chip Hunter Difficulty Script Update

This delivery baseline now additionally includes:

- a rewritten `chip-hunter` difficulty model based on three authored scripts
- distinct `easy`, `medium`, and `hard` question-bank structures for the same scene
- a guided introductory `easy` path for first-time visitors
- a more interpretive `hard` path focused on system-level understanding

## 2026-04-20 Development Snapshot

This delivery baseline now additionally includes:

- five live scene directions in one repository
- one module-based smart-agriculture hub as the fifth scene
- seven live fifth-scene modules
- authored difficulty-script support already proven on:
  - `smart-irrigation`
  - `chip-hunter`
- a proposal / research planning track stored in:
  - `project-plans/`

This means the project should now be treated as:

- an event activity system
- a cross-disciplinary science-popularization platform
- a reusable base for future teaching-practice or research proposals
