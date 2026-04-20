# Version Record

## v1.11.0

- Date: 2026-04-20
- Branch: `main`
- Title: Add fifth-scene module hub and smart irrigation pilot

### Changes

- added a new master scene: `智慧農場全球任務站`
- added module-based scene support to the main game flow
- added two new fifth-scene views in `index.html`:
  - shared intro
  - module selector
- wired the first playable module: `智慧灌溉題組`
- kept six additional smart-agriculture modules visible as planned cards for later expansion
- updated `app.js`, `scene-registry.js`, and `styles.css` to support module-scene rendering
- bumped asset version to `20260420a` and service worker cache version to `v20`

### Notes

- this is the first implementation slice of the fifth-scene architecture
- scenes 1 through 4 remain on the existing linear scene flow
- future work can extend the same structure with direct `module=` routing and additional smart-agriculture modules

## v1.11.1

- Date: 2026-04-20
- Branch: `main`
- Title: Align presenter routing with fifth-scene modules

### Changes

- updated `presenter.html` and `presenter.js` to support module selection for module-based scenes
- added direct QR generation for `?scene=...&module=...` style fifth-scene URLs
- aligned presenter leaderboard loading with module-level event codes and local storage keys

### Notes

- this is the routing follow-up to the fifth-scene hub rollout
- the presenter flow can now directly guide players into `智慧灌溉題組` without first going through manual module selection

## v1.9.1

- Date: 2026-04-19
- Branch: `main`
- Title: Add question randomization foundation

### Changes

- added a shared shuffle helper in `app.js`
- randomized answer order for `single-choice`, `timed-choice`, and `image-choice` questions
- randomized initial item order for `ordering` questions
- randomized both left-side prompts and right-side options for `matching` questions
- randomized visible branch-choice order while preserving branch routing logic

### Notes

- this is phase 1 of the planned event-control upgrade
- scoring-mode changes and scene-locking changes are intentionally left for later phases
- the main goal of this batch is to reduce fixed-position memorization during repeated play

## v1.9.2

- Date: 2026-04-19
- Branch: `main`
- Title: Strengthen answer-position randomization

### Changes

- upgraded the shuffle helper to avoid repeating the same visible order when possible
- added extra position-avoidance logic for the correct answer in `single-choice`, `timed-choice`, and `image-choice`
- kept `ordering`, `matching`, and `branching` randomization while reducing obvious repeated layouts

### Notes

- this is a tuning pass on top of the original randomization rollout
- the goal is to make answer-position changes feel clearer during real event play

## v1.10.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add dual scoring modes

### Changes

- added landing-page selection for `展示模式` and `競賽模式`
- added persistent scoring-mode state in the browser
- kept showcase scoring as the faster speed-weighted mode
- added a competition scoring formula that emphasizes correctness with a capped speed bonus
- added result-page feedback showing which scoring mode was used

### Notes

- this is phase 2 of the planned event-control upgrade
- scene locking and cross-scene restrictions remain scheduled for the next phase

## v1.10.1

- Date: 2026-04-19
- Branch: `main`
- Title: Add locked scene mode

### Changes

- added support for locked scene entry with `?scene=<scene-id>&locked=1`
- locked mode now skips the scene-selection view and opens the requested scene directly
- hid the landing-page return-to-scene-list control during locked sessions
- hid the result-page cross-scene switch control during locked sessions
- added a locked-mode fallback message for invalid or missing scene ids
- bumped asset version to `20260419f` and service worker cache version to `v17`

### Notes

- this is phase 3 of the planned event-control upgrade
- presenter / QR routing can now be aligned to locked scene URLs in the next step

## v1.10.2

- Date: 2026-04-19
- Branch: `main`
- Title: Align presenter QR routing with locked scene mode

### Changes

- updated the presenter page to support explicit `鎖定入口` and `一般入口` routing modes
- made locked QR routing the default presenter behavior for single-scene activities
- added presenter-side copy that shows both the selected scene and the selected entry mode
- rewrote `presenter.js` into a clean scene-aware UTF-8 implementation
- bumped asset version to `20260419g` and service worker cache version to `v18`

### Notes

- this is phase 4 of the planned event-control upgrade
- the presenter flow can now generate QR codes that match the locked single-scene activity model

## v1.10.3

- Date: 2026-04-19
- Branch: `main`
- Title: Strengthen locked scene navigation guard

### Changes

- added a stronger locked-mode URL sync inside the main gameplay flow
- added a browser-history guard for locked scene sessions
- ensured landing and result screens reapply the locked scene URL state
- bumped asset version to `20260419h` and service worker cache version to `v19`

### Notes

- this is a hardening patch on top of the locked scene rollout
- the goal is to reduce accidental fall-through from locked activity flow back into general scene browsing

## v1.9.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add smart care fourth scene

### Changes

- added `智慧照護任務站` as the fourth playable scene
- implemented a 10-question care-centered mission flow with long-term care as a core element
- added scene-native SVG assets for the care cover, vitals monitor, bedside sensor, and four role result icons
- introduced four new scene traits: `vitals`, `care`, `systems`, and `support`
- bumped the asset version to `20260419d` and the service worker cache version to `v15`

### Notes

- the project now has four playable scenes in the same repository
- this scene emphasizes smart healthcare, long-term care, safety, reassurance, and human-centered technology

## v1.8.0

- Date: 2026-04-19
- Branch: `main`
- Title: Add smart factory third scene

### Changes

- added `智慧工廠任務站` as the third playable scene
- implemented a factory-mission flow with one branch pair, then a shared main line
- added scene-native SVG assets for the factory cover, sensor station, inspection line, and four result-role icons
- introduced four new scene traits: `control`, `inspection`, `automation`, and `operations`
- bumped the asset version to `20260419c` and the service worker cache version to `v14`

### Notes

- the project now has three playable scenes in the same repository
- the new scene emphasizes smart factory sensing, control, quality inspection, and automation logic

## v1.7.2

- Date: 2026-04-19
- Branch: `main`
- Title: Harden GitHub Pages cache behavior

### Changes

- added versioned asset URLs to the main, presenter, and leaderboard entry pages
- updated service worker registration to use the current versioned service worker script
- added service worker registration coverage for presenter and leaderboard entry pages
- replaced the old cache-only fetch behavior with a network-first strategy for HTML and versioned core assets
- bumped the service worker cache version to `v13`

### Notes

- this batch is intended to reduce stale-page problems during real GitHub Pages testing
- participants and staff should be less likely to see old UI after a deployment while online

## v1.7.1

- Date: 2026-04-19
- Branch: `main`
- Title: Improve presenter scene routing feedback

### Changes

- replaced the presenter scene dropdown with button-based scene switching and direct fallback links
- added a visible current-scene label in the QR routing area
- updated the presenter leaderboard heading and helper copy to reflect the selected scene
- bumped the service worker cache version to `v12`

### Notes

- this batch is aimed at real-device and GitHub Pages validation rather than local-only testing
- the presenter page now gives clearer confirmation that QR routing has changed scenes

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
