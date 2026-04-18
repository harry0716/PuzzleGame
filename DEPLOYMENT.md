# Deployment Guide

## Supported Targets

This project is a static website and can be deployed to:

- GitHub Pages
- Netlify
- Vercel

No build step is required.

## Files Required For Deployment

- `index.html`
- `leaderboard.html`
- `presenter.html`
- `styles.css`
- `app.js`
- `leaderboard-shared.js`
- `leaderboard-page.js`
- `presenter.js`
- `config.js`
- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`

## Current Production URLs

- Main game: [https://harry0716.github.io/PuzzleGame/](https://harry0716.github.io/PuzzleGame/)
- Leaderboard: [https://harry0716.github.io/PuzzleGame/leaderboard.html](https://harry0716.github.io/PuzzleGame/leaderboard.html)
- Presenter: [https://harry0716.github.io/PuzzleGame/presenter.html](https://harry0716.github.io/PuzzleGame/presenter.html)

## GitHub Pages

Recommended option for this project.

Expected setup:

1. Push the repository to GitHub
2. Open repository settings
3. Go to `Pages`
4. Set source to `Deploy from a branch`
5. Choose branch `main`
6. Choose folder `/ (root)`
7. Save and wait for deployment

## Netlify

Use these settings:

- Build command: none
- Publish directory: repository root

`netlify.toml` is already included.

## Vercel

Use these settings:

- Framework preset: `Other`
- Build command: none
- Output directory: repository root

`vercel.json` is already included.

## Cache / Update Notes

The site uses a service worker for static asset caching.

When front-end files change, update the cache name in `service-worker.js`.
Current cache version:

- `ai-lab-talent-sprint-v3`

If a deployment appears not to update immediately:

- wait 1 to 3 minutes for hosting to finish deployment
- hard refresh the browser with `Ctrl + F5`
- reopen the page in a new tab

## Shared Leaderboard Deployment Notes

If `config.js` uses Supabase mode, make sure the deployed site has:

- correct `supabaseUrl`
- correct `supabaseAnonKey`
- correct `table`
- correct `eventCode`

Also make sure Supabase policies allow:

- `select`
- `insert`
- `delete`

See `LEADERBOARD_SETUP.md` for details.
