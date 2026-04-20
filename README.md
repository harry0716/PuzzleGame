# PuzzleGame

Interactive puzzle and quiz web app for AI Lab / EE visiting-student activities.

## Overview

This project is a static front-end site built with plain HTML, CSS, and JavaScript.
It is designed for on-site events where participants scan a QR code, answer timed
questions, receive a result card, and optionally appear on a shared leaderboard.

Live site:
- Game: [https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)
- Standalone leaderboard: [https://harry0716.github.io/PuzzleGame/leaderboard.html](https://harry0716.github.io/PuzzleGame/leaderboard.html)
- Presenter view: [https://harry0716.github.io/PuzzleGame/presenter.html](https://harry0716.github.io/PuzzleGame/presenter.html)

Repository:
- [https://github.com/harry0716/PuzzleGame](https://github.com/harry0716/PuzzleGame)

## Current Features

- Visual scene selection panel
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
- Presenter page with scene-specific QR code, public URL input, and auto-refresh leaderboard
- Presenter QR routing supports locked single-scene event URLs by default
- Presenter QR routing can now target module-based fifth-scene URLs for `智慧農場全球任務站`
- Cache-resilient asset loading for GitHub Pages updates
- PWA basics via `manifest.webmanifest` and `service-worker.js`

## Project Structure

- `index.html`: main game entry
- `app.js`: quiz flow, scoring, results, leaderboard integration
- `scene-registry.js`: all playable scene definitions
- `styles.css`: page styling
- `config.js`: runtime leaderboard configuration
- `leaderboard-shared.js`: shared leaderboard read / clear helpers
- `leaderboard.html`: standalone leaderboard page
- `leaderboard-page.js`: standalone leaderboard interactions
- `presenter.html`: presenter display page
- `presenter.js`: presenter QR and live ranking refresh
- `service-worker.js`: static asset cache and update strategy
- `assets/scenes/`: scene-specific visual assets
- `assets/results/`: role-card icons and related assets

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
