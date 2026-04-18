# Version Record

## v1.0.1

- Date: 2026-04-18
- Branch: `main`
- Commit: `c640315`
- Title: Enable front-end leaderboard reset

### Changes

- enabled leaderboard reset from the result page
- added leaderboard reset button to `leaderboard.html`
- added shared delete helper in `leaderboard-shared.js`
- documented Supabase delete policy requirement
- bumped service worker cache version from `v2` to `v3`

### Notes

- GitHub Pages must refresh to the new deployment before the change appears
- browser hard refresh may be required because of cached assets

## v1.0.0

- Date: 2026-04-08
- Branch: `main`
- Commit: `b7c65e0`
- Title: Initial public activity baseline

### Changes

- main quiz flow
- local and shared leaderboard support
- standalone leaderboard page
- presenter page with QR code
- GitHub Pages deployment baseline
