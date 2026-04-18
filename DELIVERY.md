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
2. Participant selects a scene from the scene panel
3. Participant enters a nickname
4. Participant answers the scene's questions
5. System calculates score and trait result
6. System saves the result to the scene-aware leaderboard
7. Participant can replay or return to the scene panel

### Quiz Experience

- timed rounds
- per-question feedback
- cumulative score
- trait-based result mapping
- share / copy result text

### Leaderboard

- local browser leaderboard
- shared Supabase leaderboard
- scene-aware event code handling in the main game flow
- standalone leaderboard page
- presenter leaderboard page
- front-end reset button for local and Supabase modes

### Presenter Support

- dedicated presenter page
- QR code for quick entry
- auto-refresh ranking display

### Deployment Readiness

- GitHub Pages ready
- Netlify / Vercel config included
- PWA manifest included
- service worker cache included

## Main Deliverables

- `index.html`
- `app.js`
- `styles.css`
- `leaderboard.html`
- `leaderboard-page.js`
- `leaderboard-shared.js`
- `presenter.html`
- `presenter.js`
- `config.js`
- `service-worker.js`

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

## Recommended Next Additions

If the project continues to grow, the next safe expansion areas are:

- new question sets
- multiple event profiles
- better result card copy and design
- admin-safe leaderboard reset flow
- analytics or event logging
- multilingual content
