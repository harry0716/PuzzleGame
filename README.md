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
- Current playable scene: `晶片獵人`
- Landing page for participant onboarding
- Timed quiz flow with scoring
- Result card based on answer traits
- Local leaderboard via `localStorage`
- Shared leaderboard via Supabase
- Front-end leaderboard reset button
- Standalone leaderboard page
- Presenter page with QR code and auto-refresh leaderboard
- PWA basics via `manifest.webmanifest` and `service-worker.js`

## Project Structure

- `index.html`: main game entry
- `app.js`: quiz flow, scoring, results, leaderboard integration
- `styles.css`: page styling
- `config.js`: runtime leaderboard configuration
- `leaderboard-shared.js`: shared leaderboard read / clear helpers
- `leaderboard.html`: standalone leaderboard page
- `leaderboard-page.js`: standalone leaderboard interactions
- `presenter.html`: presenter display page
- `presenter.js`: presenter QR and live ranking refresh
- `service-worker.js`: static asset cache

## Leaderboard Modes

The app supports two leaderboard modes:

1. `local`
   Scores are stored only in the browser.

2. `supabase`
   Scores are shared across devices for the same `eventCode`.

The active mode is configured in `config.js`.

## Leaderboard Reset

The project now supports front-end leaderboard reset in both places below:

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
- Summary: implemented scene registry, front-end scene panel, and migrated the existing Chip Hunter content into the new scene structure
