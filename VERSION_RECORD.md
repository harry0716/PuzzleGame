# Version Record

## v1.5.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add branching question type support

### Changes

- added `branching` support to the type-aware question engine
- introduced scene-aware next-question routing for branch outcomes
- updated the current `晶片獵人` scene to include a branching question path
- bumped the service worker cache version to `v5` for the latest front-end assets

### Notes

- the main game now supports `single-choice`, `ordering`, `image-choice`, `matching`, and `branching`
- richer timed-type variations are still pending

## v1.4.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add matching question type support

### Changes

- added `matching` support to the type-aware question engine
- implemented a select-based matching interaction pattern
- updated the current `晶片獵人` scene to include a matching question
- added matching interaction styles in `styles.css`

### Notes

- the main game now supports `single-choice`, `ordering`, `image-choice`, and `matching`
- branching and richer timed variants are still pending

## v1.3.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add image-based question support

### Changes

- added `image-choice` support to the type-aware question engine
- updated the current `晶片獵人` scene to include an image-based question
- added image answer card styles in `styles.css`
- kept the scene system and leaderboard flow unchanged while expanding interaction types

### Notes

- the main game now supports `single-choice`, `ordering`, and `image-choice`
- matching and branching question types are still pending

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
