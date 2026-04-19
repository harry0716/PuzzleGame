# Codex Project Notes

## Purpose

This is the primary long-term project note for Codex-assisted development.
All confirmed changes, development direction, and important implementation
decisions should be recorded here before and after major work.

## Current Baseline

- single GitHub repository and single project folder are the permanent source of truth
- front-end only project hosted on GitHub Pages
- Supabase shared leaderboard is enabled
- current event code in `config.js` is `puzzlegame-visit-2026-04-08`
- front-end leaderboard reset is implemented and working
- documentation baseline was refreshed on 2026-04-18
- this file is `codex.md` and is the preferred internal project record
- scene-system phase 1 and phase 2 are now implemented in the main game entry
- scene-system phase 3 first pass is now implemented with type-aware rendering hooks
- scene-system phase 3 second pass is now implemented with image-based question support
- scene-system phase 3 third pass is now implemented with matching question support
- scene-system phase 3 fourth pass is now implemented with branching question support
- scene-system phase 3 fifth pass is now implemented with timed-choice question support

## Confirmed Maintenance Rules

- keep using the same repository and the same project folder for future updates
- do not split the project into a separate repo unless explicitly requested
- keep version control clean and intentional
- record confirmed requirements before major development starts
- update documentation after each completed feature batch
- always update `codex.md` for major confirmed changes
- update `VERSION_RECORD.md` for completed implementation milestones

## Important Files To Recheck Before Future Changes

- `config.js`
- `app.js`
- `leaderboard-shared.js`
- `leaderboard-page.js`
- `presenter.js`
- `service-worker.js`
- `README.md`
- `VERSION_RECORD.md`
- `codex.md`

## Confirmed Next Major Direction

The next major upgrade is a multi-scene content architecture for the same game.

Confirmed requirements:

- keep the existing overall deployment model
- keep using GitHub Pages as the main hosting model
- keep using the same project folder and repository
- preserve the current leaderboard and presenter foundations
- support more than 4 scenes in the future
- add a front-end scene selection panel with richer visual cards instead of a simple dropdown
- use Codex-driven natural-language content generation outside the public website
- do not call the model directly from the public front end
- expand interaction types beyond the current single quiz format

Confirmed target question types:

- single-choice
- ordering
- matching
- image-based questions
- timed questions
- branching questions

## Confirmed Content Workflow

For new scene creation:

1. User describes the desired scene in natural language inside Codex
2. Codex converts that request into a standard scene script / data structure
3. Codex integrates the scene into this same repository
4. Codex updates `codex.md`, `VERSION_RECORD.md`, and any affected docs

This means scene generation is part of the development workflow, not a public
runtime feature of the website.

## Confirmed Second Scene Direction (2026-04-19)

The next content expansion will be a second playable scene in the same
repository.

Confirmed decisions:

- scene name: `電子工程雙體驗`
- scene style: mission-driven flow plus career-role result design (`B + C` hybrid)
- the drone / FPV / VR experience must be part of the playable question content
- result design should use career-role cards as the main outcome
- experience-style labels may be used as a secondary layer under the main career result
- keep the four proposed career-role names unless a later content review changes the copy
- use two short route branches inside the scene so students can choose AI-first or drone-first without confusing the event flow
- prefer project-native visual assets created as SVG files stored inside the repository instead of relying on external generated image hosting

Planning intent:

- keep this scene clearly distinct from `晶片獵人`
- make the booth's two areas feel like one connected electronics-engineering story
- keep the content suitable for junior-high students in an on-site carnival setting

## Planned Design Phase

Before implementation, prepare a specification covering:

- scene data structure
- question type data structure
- front-end scene panel flow
- migration plan for the current `晶片獵人` scene
- expected file changes in the same repository

Current design-prep artifacts:

- `SCENE_SYSTEM_SPEC.md`

## Completed On 2026-04-19

### Implemented Phases

- phase 1: scene registry and existing content migration
- phase 2: front-end scene selection panel

### What Changed

- added `scene-registry.js`
- migrated the current `晶片獵人` content out of hardcoded main-flow constants and into scene data
- rewrote the main `index.html` flow to include a scene selection screen
- updated `app.js` so the current gameplay reads from the active scene
- made leaderboard event-code handling scene-aware inside the main game flow
- updated `leaderboard-shared.js` to accept override options for shared or local leaderboard operations
- updated `service-worker.js` cache version and cached asset list to include the new scene registry script

### Current State After This Batch

- the main game now supports scene selection from the front end
- only one playable scene currently exists: `晶片獵人`
- advanced question types are still planned but not yet implemented
- leaderboard and presenter architecture are preserved

### Remaining Planned Work

- phase 3: question engine refactor and first batch of new question types
- phase 4: matching and branching support
- more scenes generated through the Codex authoring workflow

## Completed On 2026-04-19 (Phase 3 First Pass)

### Implemented Progress

- refactored the question flow so rendering is based on `question.type`
- kept `single-choice` as the default supported type
- added the first working `ordering` question type
- updated the existing `晶片獵人` scene to include one ordering question

### Practical Result

- the current game is no longer locked to a single hardcoded question interaction pattern
- future question types can now be added through the same engine entry point instead of rewriting the whole flow

### Still Pending Inside Phase 3

- image-based questions
- explicit timed-type variations beyond the shared timer
- deeper renderer separation if needed

## Completed On 2026-04-19 (Phase 3 Second Pass)

### Implemented Progress

- added `image-choice` question support to the type-aware rendering flow
- kept the same scene-driven architecture and reused the same engine entry point
- updated `晶片獵人` so it now includes a working image-based question

### Practical Result

- the current project now supports three active interaction patterns in the main game:
  - `single-choice`
  - `ordering`
  - `image-choice`

### Still Pending After This Pass

- matching
- branching
- richer timed-type variations

## Completed On 2026-04-19 (Phase 3 Third Pass)

### Implemented Progress

- added `matching` question support to the type-aware rendering flow
- implemented a stable select-based matching interaction suitable for GitHub Pages static hosting
- updated `晶片獵人` so it now includes a working matching question

### Practical Result

- the current project now supports four active interaction patterns in the main game:
  - `single-choice`
  - `ordering`
  - `image-choice`
  - `matching`

### Still Pending After This Pass

- branching
- richer timed-type variations

## Completed On 2026-04-19 (Phase 3 Fourth Pass)

### Implemented Progress

- added `branching` question support to the type-aware rendering flow
- introduced next-question routing so a selected answer can determine the following scene step
- updated `晶片獵人` so it now includes a working branching question path
- bumped the service worker cache version to reduce stale deployed assets

### Practical Result

- the current project now supports five active interaction patterns in the main game:
  - `single-choice`
  - `ordering`
  - `image-choice`
  - `matching`
  - `branching`

### Still Pending After This Pass

- richer timed-type variations

## Completed On 2026-04-19 (Phase 3 Fifth Pass)

### Implemented Progress

- added explicit `timed-choice` question support to the type-aware rendering flow
- updated `晶片獵人` so it now includes a short-countdown decision question
- expanded the current playable scene from 6 to 7 interaction nodes
- bumped the service worker cache version again to reduce stale deployed assets

### Practical Result

- the current project now supports six active interaction patterns in the main game:
  - `single-choice`
  - `timed-choice`
  - `ordering`
  - `image-choice`
  - `matching`
  - `branching`

### Still Pending After This Pass

- richer timed-type variations if a future scene needs more specialized timer rules

## Future Update Reminder

## Completed On 2026-04-19 (Second Scene First Implementation)

### Implemented Progress

- added a second playable scene: `電子工程雙體驗`
- implemented a two-route branch structure so players can choose AI-first or drone-first and still merge back into one shared ending
- added repository-native SVG assets for the scene cover, AI zone, drone zone, and result-role icons
- extended result cards so a scene can show both a main career-role outcome and a secondary experience-style label
- kept the existing GitHub Pages and leaderboard architecture unchanged while adding the new content

### Practical Result

- the scene system is now validated by more than one playable scene
- `電子工程雙體驗` is the first content set to use the planned branch structure for real scene flow
- the project now supports scene-specific art assets stored directly in the repository

### Current Scene Status

- `晶片獵人`: baseline AI / chip / system exploration scene
- `電子工程雙體驗`: carnival booth dual-mission scene with AI and drone content

## Completed On 2026-04-19 (Timer Preset Control)

### Implemented Progress

- added a front-end timer preset selector before gameplay starts
- made the selected preset affect both normal questions and short timed questions
- stored the selected preset locally so the same browser keeps the chosen pacing

### Practical Result

- on-site staff can slow down or speed up the game without editing source files
- the project now has a safer way to adapt scene pacing for different audiences

## Completed On 2026-04-19 (Custom Timer Input And QR Scene Routing)

### Implemented Progress

- extended the landing-page pacing controls so staff can keep presets or switch to a manual seconds value
- added a `custom` timer mode with browser-side persistence for the entered seconds
- updated the presenter page so staff can choose which scene the QR code should open
- added a public base-url input on the presenter page so the QR code can point to GitHub Pages instead of localhost when students use their own phones
- bumped the service worker cache version again to reduce stale local assets during on-site testing

### Practical Result

- event staff can fine-tune question timing on site without editing source files
- the same booth laptop can generate a scene-specific QR code for participant self-entry
- the presenter flow is now better aligned with real event traffic management, especially when device count is limited

## Completed On 2026-04-19 (Presenter Routing Feedback Pass)

### Implemented Progress

- replaced the fragile presenter scene dropdown with button-based scene switching and direct fallback links
- added explicit visual feedback showing the currently routed scene in the QR panel
- updated the presenter-side leaderboard title and helper copy so scene switches are visible at a glance
- bumped the service worker cache version again to reduce stale presenter assets during real-device testing

### Practical Result

- the presenter page is now easier to validate during GitHub Pages testing
- on-site staff can tell which scene the QR code and leaderboard are currently bound to without guessing

## Completed On 2026-04-19 (Cache Resilience Hardening)

### Implemented Progress

- added versioned query parameters to core CSS, JS, icon, and manifest URLs in the main entry pages
- updated service worker registration so the app, presenter page, and leaderboard page all request the current service worker script version
- replaced the old cache-only fetch behavior with a safer strategy that prefers the network for HTML and versioned core assets when online
- bumped the service worker cache version again after the new strategy was introduced

### Practical Result

- GitHub Pages updates should now be more visible on real devices without repeated manual cache clearing
- presenter, leaderboard, and main gameplay pages now share a more reliable update path instead of depending on the main game alone

## Confirmed Third Scene Direction (2026-04-19)

The third planned scene is now confirmed as:

- scene name: `智慧工廠任務站`
- scene intent: introduce automation, sensors, quality inspection, and production-line control through a mission-driven factory scenario
- player role: a smart-factory mission assistant helping stabilize a production line
- design goal: keep the scene clearly different from both `晶片獵人` and `電子工程雙體驗`

Planned emphasis:

- factory sensors and status signals
- equipment state judgment
- quality inspection and anomaly detection
- automation flow and production-line order
- the idea that electronic engineering supports stable, intelligent manufacturing systems

Planning artifact:

- `THIRD_SCENE_DRAFT.md`

Current draft status:

- `Third Scene Draft v0.2` now includes the proposed 7-question flow,
  branch mapping, trait plan, and result-card directions for
  `智慧工廠任務站`

## Completed On 2026-04-19 (Third Scene Implementation)

### Implemented Progress

- added the third playable scene: `智慧工廠任務站`
- implemented a short two-route branch that merges back into a shared factory mission flow
- added repository-native SVG assets for the scene cover, sensor station, inspection line, and four role-card icons
- introduced four new scene traits:
  - `control`
  - `inspection`
  - `automation`
  - `operations`
- bumped the asset version and service worker cache again so the new scene appears more reliably on GitHub Pages

### Practical Result

- the project now covers three distinct electronic-engineering content directions:
  - AI / chips
  - immersive booth interaction
  - smart factory / automation
- the multi-scene structure is now validated across three different styles of educational experience

## Confirmed Fourth Scene Direction (2026-04-19)

The fourth planned scene is now confirmed as:

- scene name: `智慧照護任務站`
- scene scope: smart healthcare plus long-term care support
- player role: a smart-care mission assistant
- design goal: make technology feel human-centered, warm, and socially relevant in the Taiwan context

Confirmed emphasis:

- bring in long-term care concepts as a core element, not a side note
- use longer question descriptions and richer human situations
- increase question count for more variety than the previous scenes
- focus on how technology supports care, safety, dignity, and reassurance rather than replacing people

Planning artifact:

- `FOURTH_SCENE_DRAFT.md`

Current draft status:

- `Fourth Scene Draft v0.2` now includes a 10-question,
  long-form, human-centered smart-care concept with long-term care as a core
  element rather than a side topic

## Completed On 2026-04-19 (Fourth Scene Implementation)

### Implemented Progress

- added the fourth playable scene: `智慧照護任務站`
- implemented a longer 10-question smart-care flow with one early branch pair and a human-centered long-term-care theme
- added repository-native SVG assets for the care scene cover, vitals monitor, bedside sensor, and four result-role icons
- introduced four new scene traits:
  - `vitals`
  - `care`
  - `systems`
  - `support`
- bumped the asset version and service worker cache again so the new scene appears more reliably on GitHub Pages

### Practical Result

- the project now covers four distinct electronic-engineering application directions:
  - AI / chips
  - immersive interaction
  - smart factory automation
  - smart healthcare and long-term care support
- the fourth scene adds more narrative warmth and social relevance than the earlier scenes

After adding new project content, update:

- `codex.md`
- `README.md`
- `DELIVERY.md`
- `SLIDES.md`
- `VERSION_RECORD.md`

If shared leaderboard behavior changes, also update:

- `LEADERBOARD_SETUP.md`
- `supabase-leaderboard.sql`

## Confirmed Fifth Scene Research Direction (2026-04-19)

The fifth planned scene is now entering a research-first phase before content
writing begins.

Working direction:

- topic focus: smart agriculture / smart farm / AIoT in agriculture
- design goal: combine local relevance with global agrifood-system context
- content should not stop at device demonstrations, and must also cover
  business, adoption barriers, water, energy, and future outlook questions
- this scene is expected to be more system-oriented and policy-aware than the
  previous four scenes

Required research buckets:

- core smart-farm technology topics
- business and market background for smart agriculture adoption
- barriers and promotion challenges
- water-use and irrigation governance issues
- electricity / energy-use implications
- future development, resilience, and global food-system outlook

Planning artifact:

- `FIFTH_SCENE_RESEARCH.md`

## Confirmed Fifth Scene Structure Direction (2026-04-19)

The fifth scene will not follow the earlier single-track scene structure.
Instead, it will use one smart-agriculture master scene with multiple selectable
question modules inside it.

Confirmed structure decisions:

- keep one master scene rather than splitting the topic into many separate top-level scenes
- add a shared smart-agriculture intro before module selection
- use a module-selection panel inside the scene
- once a player selects a module, lock them into that module for the session
- do not allow switching to another module mid-run
- each module should target a 10-question flow
- each module should eventually support its own result-card direction

Confirmed module set:

- 技術題組
- 商業題組
- 能源題組
- ESG 題組
- 國際市場題組
- 水資源治理題組
- 智慧灌溉題組

Recommended module grouping for UX:

- 技術與系統
- 經營與市場
- 永續與治理

Future routing intent:

- after the module system is implemented, event URLs should eventually support
  a module parameter such as `?scene=<scene-id>&module=<module-id>&locked=1`
- this would allow one event to lock not only a scene, but also a specific
  smart-agriculture module

Planning artifact:

- `FIFTH_SCENE_MODULE_SPEC.md`

Current next planning artifact:

- `FIFTH_SCENE_MODULE_OUTLINES.md`

## Confirmed Event-Control Upgrade Direction (2026-04-19)

The next confirmed upgrade is an event-control pass that makes the game more
appropriate for on-site activities, competitions, and single-scene booth
deployments.

Confirmed decisions:

- implement question randomization across all current answer-based question types
- keep branching scene structure stable, but allow branch-choice option order to be randomized when appropriate
- introduce dual scoring modes to support both showcase-style play and fairer competition-style play
- add a locked scene mode so a specific event can expose only one scene to players
- disable cross-scene navigation while locked scene mode is active
- preserve the current free multi-scene flow for normal testing and open exploration

Confirmed randomization intent:

- `single-choice`: randomize option order
- `timed-choice`: randomize option order when the question uses standard selectable choices
- `image-choice`: randomize displayed choice order / positions
- `ordering`: randomize initial item order on each attempt
- `matching`: randomize left-column order and right-side option order on each attempt
- `branching`: keep route logic stable, but support randomized visible option order where it does not break the scene narrative

Confirmed scoring intent:

- use dual scoring modes instead of one global formula
- keep a faster, more arcade-like mode for showcase / demo situations
- add a competition-oriented mode where correctness is primary and speed remains a smaller secondary factor
- preferred competition scoring direction: base score plus reduced speed bonus rather than removing speed entirely

Confirmed access-control intent:

- support locked scene URLs using a query pattern such as `?scene=<scene-id>&locked=1`
- when locked mode is active, skip the global scene-selection view
- when locked mode is active, do not allow the player to return to scene selection
- when locked mode is active, do not allow the player to choose another scene after finishing
- presenter / QR routing should later align with locked scene URLs for event use

Planning artifact:

- `EVENT_MODE_SPEC.md`

## Completed On 2026-04-19 (Event-Control Upgrade Phase 1)

### Implemented Progress

- added a reusable question-choice shuffle helper in the main game flow
- randomized visible option order for `single-choice` questions
- randomized visible option order for `timed-choice` questions
- randomized visible option order / positions for `image-choice` questions
- randomized starting order for `ordering` questions on each attempt
- randomized both left-column and right-side option order for `matching` questions
- randomized visible branch option order while keeping branch route logic unchanged

### Practical Result

- players can no longer rely on fixed answer positions across repeated attempts
- ordering and matching questions now start from a less predictable layout
- the system now has the first core layer needed to reduce answer-sharing advantages during on-site events

### Follow-Up Tuning

- strengthened the shuffle behavior for selectable-answer questions so the same visible order is avoided when possible
- added a second guard for `single-choice`, `timed-choice`, and `image-choice` so the correct answer tries not to remain in the same slot between attempts

## Completed On 2026-04-19 (Event-Control Upgrade Phase 2)

### Implemented Progress

- added a front-end scoring-mode selector on the scene landing page
- introduced two scoring modes:
  - `showcase`
  - `competition`
- kept showcase scoring as the faster arcade-style option
- added competition scoring as a correctness-first mode with a reduced speed bonus
- surfaced the active scoring mode in the result card summary

### Practical Result

- the same scene can now be used in either a display-oriented activity or a more controlled competition flow
- score inflation from repeated answer memorization is reduced in competition mode compared with the original formula

## Completed On 2026-04-19 (Event-Control Upgrade Phase 3)

### Implemented Progress

- added `locked=1` scene access mode
- locked mode now requires a valid `scene` query parameter and opens that scene directly
- hidden the landing-page return-to-scene-list control during locked sessions
- hidden the result-page cross-scene switch control during locked sessions
- preserved replay of the same scene while locked
- added a fallback locked-mode message when the requested scene is missing or invalid

### Practical Result

- a single event can now route participants into one specific scene without exposing the full scene panel
- locked sessions no longer allow participants to leave the intended activity flow and browse other scenes

## Completed On 2026-04-19 (Event-Control Upgrade Phase 4)

### Implemented Progress

- updated the presenter page so QR routing can explicitly choose between locked scene entry and open scene entry
- made presenter QR generation include `locked=1` by default for event use
- surfaced the current entry mode directly in the presenter scene status label
- rewrote `presenter.js` into a clean UTF-8 baseline while preserving scene-aware leaderboard refresh behavior
- bumped asset version and service worker cache again after the presenter routing update

### Practical Result

- event staff can now generate QR codes that send participants straight into a single locked scene without exposing the multi-scene homepage
- presenter routing is now aligned with the new event-control model end to end

## Completed On 2026-04-19 (Locked Scene Guard Follow-Up)

### Implemented Progress

- added a stronger locked-mode URL guard inside the main app flow
- locked sessions now re-sync the `scene` and `locked=1` parameters when landing and result screens are shown
- added a `popstate` guard so locked activity flows recover back into the locked scene instead of falling through to the general scene browser
- bumped asset version and service worker cache again after the lock-guard patch

### Practical Result

- locked single-scene activity URLs are now harder to escape through normal in-site navigation or browser back behavior
