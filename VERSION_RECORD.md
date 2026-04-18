# Version Record

## v1.2.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add first type-aware question engine pass

### Changes

- refactored main question rendering to switch on `question.type`
- added the first supported non-single-choice type: `ordering`
- updated the existing `晶片獵人` scene to include an ordering question
- added ordering interaction styles in `styles.css`

### Notes

- this is the first implementation step inside the planned phase 3
- image-based, matching, and branching question types are still pending

## v1.1.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add scene registry and front-end scene panel

### Changes

- added a new `scene-registry.js` file
- migrated the existing `晶片獵人` content into a scene data structure
- added a front-end scene selection panel to `index.html`
- refactored `app.js` to load and play the active scene
- made the main game leaderboard use scene-specific event codes
- updated `leaderboard-shared.js` to support override options
- updated `service-worker.js` to cache the new scene registry asset and bump cache version

### Notes

- this batch completes the planned scene-system phase 1 and phase 2
- only one playable scene exists right now, but the project is ready to add more
- advanced question types remain scheduled for later phases

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
