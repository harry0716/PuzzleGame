# PuzzleGame

Interactive puzzle and quiz web app for AI Lab / EE visiting-student activities.

## Overview

This project is a static front-end site built with plain HTML, CSS, and JavaScript.
It is designed for on-site events where participants scan a QR code, answer timed
questions, receive a result card, and optionally appear on a shared leaderboard.

Published site (the five-card redesign in this working copy has not been published yet):
- Game: [https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)
- Standalone leaderboard: [https://harry0716.github.io/PuzzleGame/leaderboard.html](https://harry0716.github.io/PuzzleGame/leaderboard.html)
- Presenter view: [https://harry0716.github.io/PuzzleGame/presenter.html](https://harry0716.github.io/PuzzleGame/presenter.html)

Repository:
- [https://github.com/harry0716/PuzzleGame](https://github.com/harry0716/PuzzleGame)

## Current Features

- New bright portal at `index.html` with two clear routes: a five-case career quest and the preserved classic quiz
- Visual scene selection panel in `classic.html`
- Scene registry / multi-scene-ready architecture
- Current fifth-scene module ids:
  - `smart-irrigation`
  - `agri-tech`
  - `farm-energy`
  - `farm-business`
  - `global-market`
  - `farm-esg`
  - `water-governance`
- Current playable scenes: `晶片獵人`, `電子工程雙體驗`, `智慧工廠任務站`, `智慧照護任務站`
- Module-based fifth-scene hub: `智慧農場全球任務站`
- Current fifth-scene pilot module: `智慧灌溉題組`
- Landing page for participant onboarding
- Five-case engineering rescue game at `mission.html`: live-broadcast signal repair, garden-sensor calibration, semiconductor quality inspection, factory sorting logic, and drone path/safety planning. Each completed case unlocks its own career card; the ending shows all five cards.
- Adjustable pacing before gameplay starts, including presets and manual seconds input
- Selectable scoring mode for showcase-style or competition-style activities
- Timed quiz flow with scoring
- Randomized answer presentation with anti-repeat tuning to reduce fixed-position memorization during repeated play
- Locked scene entry support for single-activity URLs such as `?scene=...&locked=1`
- Type-aware question rendering foundation
- Current supported question types: `single-choice`, `timed-choice`, `ordering`, `image-choice`, `matching`, `branching`
- Result card based on answer traits
- Career-role card with optional secondary style label and scene icon
- Local leaderboard via `localStorage`
- Shared leaderboard via Supabase
- Front-end leaderboard reset button
- Standalone leaderboard page
- Presenter page with two selectable QR destinations: the five-case career quest or the preserved classic quiz
- Presenter display keeps the QR visible above the settings, offers a projector-sized QR dialog and copyable play URL, rejects localhost links that student phones cannot use, and shows a five-case facilitation guide in career-quest mode
- Classic presenter mode retains scene/module/difficulty/lock controls and its auto-refresh leaderboard
- Presenter QR routing supports locked single-scene event URLs by default
- Presenter QR routing can now target module-based fifth-scene URLs for `智慧農場全球任務站`
- Cache-resilient asset loading for GitHub Pages updates
- PWA basics via `manifest.webmanifest` and `service-worker.js`

## Project Structure

- `index.html`: redesigned portal and legacy QR-link redirect
- `portal.css`: portal visuals and responsive layout
- `mission.html`, `mission.js`, `mission.css`, `mission-light.css`: five-case career quest
- `classic.html`: unchanged classic quiz markup and scene-selector entry
- `app.js`: quiz flow, scoring, results, leaderboard integration
- `scene-registry.js`: all playable scene definitions
- `styles.css`: page styling
- `config.js`: runtime leaderboard configuration
- `leaderboard-shared.js`: shared leaderboard read / clear helpers
- `leaderboard.html`: standalone leaderboard page
- `leaderboard-page.js`: standalone leaderboard interactions
- `presenter.html`: presenter display page
- `presenter.js`, `presenter-live.css`: on-site QR routing, facilitation view, and classic live ranking
- `service-worker.js`: static asset cache and update strategy
- `assets/scenes/`: scene-specific visual assets
- `assets/results/`: role-card icons and related assets

## Entry flow and backward compatibility

The original `app.js` boots from query parameters (`scene`, `module`, `difficulty`, `locked`, and `autoplay`) and renders the existing scene selector or a direct scene/module entry. The redesigned `index.html` checks for those legacy parameters and immediately redirects to `classic.html`, preserving the entire query string and URL fragment. Previously printed `index.html?scene=...&locked=1` QR links therefore continue to open the original activity. Newly generated presenter QR links point directly to `classic.html`. The classic quiz, result logic, leaderboard, and scene registry are retained.

The new career quest is a separate client-side route. It does not write leaderboard records or change classic quiz scores. Each case has three failed-test attempts; retrying the current case retains earlier unlocked cards within the current play session.

## On-site presenter flow

Open `presenter.html` on the instructor laptop and select `五關職人任務` to display the career-quest QR code. The students' phones open `mission.html` directly, complete five cases independently, and show their final card collection on their own screens. This mode has no shared leaderboard; the presenter panel shows the five cases and a closing discussion prompt instead. Select `經典 PuzzleGame` to restore the original scene, module, difficulty, locked-entry and live leaderboard controls.

The QR uses the public site root entered under `調整活動設定`. `127.0.0.1` and `localhost` are rejected because they refer to each student's own phone. The default public root is the project's GitHub Pages URL during local preview. **The career quest and presenter update must be deployed before that QR can open the new game on student phones.** At the venue, scan with one phone before projecting to the class. QR images are generated locally in the laptop browser using the bundled MIT-licensed QRCode.js library; no QR image service is needed. The play URL remains visible and copyable.

The third-party QRCode.js code and its license/provenance are in `vendor/qrcodejs/`.

## Leaderboard Modes

The app supports two leaderboard modes:

1. `local`
   Scores are stored only in the browser.

2. `supabase`
   Scores are shared across devices for the same `eventCode`.

The active mode is configured in `config.js`.

## Leaderboard Reset

The project supports front-end leaderboard reset in both places below:

- Result page inside the main game
- `leaderboard.html`

Behavior:

- In `local` mode, reset clears browser `localStorage`
- In `supabase` mode, reset sends a `DELETE` request for rows matching the active `eventCode`
- A confirmation dialog is shown before clearing

For Supabase mode, delete policy must be enabled. See `LEADERBOARD_SETUP.md`.

## Deployment

Recommended deployment target:
- GitHub Pages

Other supported options:
- Netlify
- Vercel

See:
- `DEPLOYMENT.md`
- `GITHUB_PAGES.md`

## Notes For Future Expansion

This repository is now documented as a stable baseline for further additions.
When new content is added, update these files first:

- `README.md`
- `DELIVERY.md`
- `VERSION_RECORD.md`
- `SLIDES.md` if presentation flow changes
- `LEADERBOARD_SETUP.md` if backend rules change

## Latest Recorded Update

- Date: 2026-04-19
- Summary: added the fourth playable scene `智慧照護任務站`, expanding the project into a four-scene structure that now also covers smart healthcare and long-term care support

## Additional 2026-04-19 Update

- Hardened cache/update behavior with versioned asset URLs on the main entry pages
- Updated the service worker strategy so online users are more likely to receive the latest HTML, CSS, and JS on GitHub Pages
- Added service worker registration coverage for the presenter and leaderboard entry pages

## Additional 2026-04-20 Update

- added the first implementation slice of the fifth-scene master structure
- introduced a module-based scene flow for `智慧農場全球任務站`
- added shared intro and module-selector views to the main game entry
- wired the first playable fifth-scene pilot module: `智慧灌溉題組`
- preserved backward compatibility for scenes 1 through 4

## Additional 2026-04-20 Full Module Update

- expanded the smart-farm fifth scene into a seven-module hub
- made these additional modules playable:
  - `agri-tech`
  - `farm-energy`
  - `farm-business`
  - `global-market`
  - `farm-esg`
  - `water-governance`
- kept `smart-irrigation` as the original pilot module in the same hub

## Additional 2026-04-20 Difficulty Foundation Update

- added difficulty-aware routing with `easy`, `medium`, and `hard`
- added landing-page difficulty selection
- added presenter-side difficulty selection for QR generation
- prepared leaderboard separation by difficulty for future pilot content rollout

## Additional 2026-04-20 Difficulty Pilot Update

- applied the first real `easy / medium / hard` content pilot to the fifth-scene `smart-irrigation` module
- kept the original smart-irrigation content as the medium baseline
- added easier and harder variants with adjusted wording, timing, and applicable option density

## Additional 2026-04-20 Independent Difficulty Script Update

- replaced the first `smart-irrigation` difficulty pilot with authored three-script content
- `easy`, `medium`, and `hard` now use distinct question-bank content instead of only prompt-density tuning
- kept one shared role-card family for module identity, while allowing difficulty-specific landing and result-summary emphasis

## Additional 2026-04-20 Chip Hunter Difficulty Script Update

- upgraded `chip-hunter` into the first non-module scene with authored `easy`, `medium`, and `hard` scripts
- kept the standard live scene as the `medium` baseline
- added a more guided `easy` visit path and a more interpretive `hard` challenge path
- preserved the same role-card family while allowing difficulty-specific emphasis

## Current Development Snapshot

- live playable scenes:
  - `chip-hunter`
  - `electronics-dual-experience`
  - `smart-factory-mission-station`
  - `smart-care-mission-station`
  - `smart-farm-global-mission`
- live playable fifth-scene modules:
  - `smart-irrigation`
  - `agri-tech`
  - `farm-energy`
  - `farm-business`
  - `global-market`
  - `farm-esg`
  - `water-governance`
- authored independent difficulty scripts are now live for:
  - `chip-hunter`
  - `smart-irrigation`
- the next recommended authored-difficulty targets are:
  - `smart-care-mission-station`
  - `smart-factory-mission-station`

## Proposal And Research Track

The repository now includes a proposal-development track in:

- `project-plans/`

This folder is intended for:

- science-popularization positioning
- teaching-practice positioning
- research-concept and future proposal drafting
