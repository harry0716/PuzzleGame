# Version Record

## v1.7.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add second playable scene for carnival booth

### Changes

- added `電子工程雙體驗` as the second playable scene
- implemented two route branches so players can choose AI-first or drone-first before returning to a shared ending
- added repository-native SVG assets for the scene cover, branch image questions, and four role result icons
- extended result cards with an optional secondary style label and icon support
- bumped the service worker cache version to `v7`

### Notes

- the project now has two playable scenes in the same repository
- the multi-scene architecture is now validated beyond the original `晶片獵人` scene
- the next sensible step is a full content demo review and any copy tuning based on your playthrough feedback

## v1.7.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add custom timer input and scene QR routing

### Changes

- added a custom timer mode so staff can manually enter per-question seconds on the landing page
- kept the preset-based pacing controls and made both modes persist in the browser
- upgraded `presenter.html` and `presenter.js` so staff can choose a scene for the QR code
- added a presenter-side public base URL field for phone-friendly event entry links
- bumped the service worker cache version to `v9`

### Notes

- QR codes for participant phones should use a public site URL such as GitHub Pages, not `127.0.0.1`
- the landing page now supports both quick presets and on-site manual pacing adjustment

## v1.6.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add timed-choice question type support

### Changes

- added explicit `timed-choice` support to the type-aware question engine
- introduced a dedicated short-countdown question in the current `晶片獵人` scene
- expanded the current scene from 6 to 7 interaction nodes
- bumped the service worker cache version to `v6` for the latest front-end assets

### Notes

- the main game now supports `single-choice`, `timed-choice`, `ordering`, `image-choice`, `matching`, and `branching`
- the first planned batch of target question types is now covered in the current architecture

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
- only one playable scene existed at that point, but the project was prepared for more
- advanced question types remained scheduled for later phases

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
