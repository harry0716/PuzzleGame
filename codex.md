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

After adding new project content, update:

- `codex.md`
- `README.md`
- `DELIVERY.md`
- `SLIDES.md`
- `VERSION_RECORD.md`

If shared leaderboard behavior changes, also update:

- `LEADERBOARD_SETUP.md`
- `supabase-leaderboard.sql`
