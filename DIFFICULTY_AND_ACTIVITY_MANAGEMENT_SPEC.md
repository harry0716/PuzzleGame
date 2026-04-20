# Difficulty And Activity Management Spec

## Purpose

This document defines the next platform-level expansion after scene control and
module routing:

- difficulty-aware question banks
- difficulty-aware QR / presenter routing
- stronger activity-management controls

It is a planning baseline, not an implementation log.

## Main Goal

Turn the current multi-scene event game into a more controllable activity system
where organizers can decide:

- which scene is active
- which module is active
- which difficulty is active
- whether players are locked into that exact activity path

## Confirmed Product Direction

The user confirmed these development priorities:

1. build a formal difficulty system first
2. keep three difficulty tiers:
   - `easy`
   - `medium`
   - `hard`
3. allow presenter-side difficulty choice before players scan the QR code
4. continue toward stronger management functionality after the difficulty system
   is stable

## Why This Matters

The current project already supports:

- multiple scenes
- locked scene routing
- module-based fifth-scene routing
- dual scoring modes
- randomized answer presentation

The next limitation is content depth and activity control:

- one scene may need different challenge levels for different audiences
- the same activity theme may be used in showcase mode, guided learning mode,
  or competition mode
- organizers need finer control before the participant ever starts answering

## Recommended Implementation Order

### Phase 1: Difficulty System Foundation

Add a new difficulty layer to the scene content model.

Core outcome:

- the app can load `easy`, `medium`, or `hard` question sets for a scene or
  module

### Phase 2: Presenter Difficulty Control

Extend presenter routing so staff can choose:

- scene
- module
- difficulty
- entry mode

Core outcome:

- QR routing becomes activity-specific, not just scene-specific

### Phase 3: Pilot Difficulty Rollout

Apply the new difficulty model to one target first.

Recommended pilot:

- scene: `smart-farm-global-mission`
- module: `smart-irrigation`

Core outcome:

- validate data shape, routing, scoreboard behavior, and participant flow before
  expanding to the rest of the project

### Phase 4: Activity Management Controls

After the difficulty model works, add stronger management features such as:

- hidden scene / hidden module switches
- direct activity presets
- finer leaderboard isolation
- future organizer-facing management UI if needed

## Difficulty Model

## Difficulty Tiers

Baseline tier ids:

- `easy`
- `medium`
- `hard`

Recommended meaning:

- `easy`
  - lower reading load
  - clearer distractors
  - more direct prompts
  - smaller decision burden
- `medium`
  - current default / baseline level
  - moderate reading load
  - mixed conceptual and situational questions
- `hard`
  - denser prompts
  - closer distractors
  - more synthesis and trade-off reasoning
  - higher demand on reading and applied judgment

## Data-Structure Recommendation

The difficulty system should not fork the entire scene definition when only the
question bank changes.

Recommended model:

- scene-level identity stays the same
- module-level identity stays the same
- difficulty swaps the question set

Suggested direction:

```js
{
  id: "smart-irrigation",
  title: "智慧灌溉題組",
  difficultySets: {
    easy: { questions: [...] },
    medium: { questions: [...] },
    hard: { questions: [...] }
  },
  results: { ...shared or difficulty-specific... }
}
```

Recommended default:

- if no difficulty is specified, load `medium`

## Shared vs Split Content

Recommended split:

- shared across difficulties:
  - title
  - description
  - landing identity
  - result-role structure
  - leaderboard base identity
- difficulty-specific:
  - questions
  - optional pacing defaults
  - optional copy tweaks

## URL Design

Recommended query format:

- scene only:
  - `?scene=chip-hunter`
- scene + locked:
  - `?scene=chip-hunter&locked=1`
- scene + module:
  - `?scene=smart-farm-global-mission&module=smart-irrigation`
- scene + module + difficulty:
  - `?scene=smart-farm-global-mission&module=smart-irrigation&difficulty=hard`
- fully locked activity path:
  - `?scene=smart-farm-global-mission&module=smart-irrigation&difficulty=hard&locked=1`

## Behavior Rules

If `difficulty` is missing:

- default to `medium`

If `difficulty` is invalid:

- fall back to `medium`
- optionally show a soft console warning only, not a user-facing error

If `locked=1` is present:

- do not allow changing scene
- do not allow changing module
- do not allow changing difficulty mid-run

## Presenter Changes

Presenter should gain a new control:

- difficulty selector

Recommended presenter control order:

1. scene
2. module (if scene supports modules)
3. difficulty
4. entry mode
5. public base URL

Recommended difficulty labels:

- `初階 / easy`
- `標準 / medium`
- `進階 / hard`

Presenter output behavior:

- QR URL should include `difficulty=...`
- presenter summary should clearly show the selected difficulty
- leaderboard label should also reflect the difficulty if leaderboard separation
  uses difficulty-specific keys

## Leaderboard Strategy

This needs an explicit rule before implementation.

Recommended default:

- separate leaderboard per:
  - scene
  - module when present
  - difficulty

Why:

- otherwise `easy` and `hard` participants land in the same ranking pool
- that makes rankings less meaningful in activities

Recommended key direction:

- local key:
  - include difficulty when present
- Supabase event code:
  - append difficulty suffix when difficulty is present

Example:

- `smart-farm-global-mission-smart-irrigation-hard`

## Landing-Page Behavior

In open mode:

- players may choose difficulty before starting

In locked activity mode:

- if difficulty is already supplied by the URL, do not show difficulty switching
- if scene/module is locked, difficulty should be displayed as fixed activity
  context rather than a free selector

## Result-Page Behavior

Recommended additions:

- show difficulty used in the run summary

In locked mode:

- replay should keep the same difficulty
- no cross-difficulty browsing

## Management Features After Difficulty

These are recommended after the difficulty system is stable.

### 1. Scene Visibility Switches

Goal:

- hide scenes that should not appear in the general scene panel for a given
  event setup

### 2. Module Visibility Switches

Goal:

- hide unfinished or inactive fifth-scene modules

### 3. Activity Presets

Goal:

- define reusable event combinations such as:
  - scene
  - module
  - difficulty
  - scoring mode
  - locked mode

Possible future format:

```js
{
  id: "smart-irrigation-competition-hard",
  scene: "smart-farm-global-mission",
  module: "smart-irrigation",
  difficulty: "hard",
  scoringMode: "competition",
  locked: true
}
```

### 4. Organizer Management Page

Not recommended yet as the first step.

Reason:

- presenter already acts as a lightweight activity-control surface
- a true management page is better added only after:
  - difficulty routing is stable
  - activity presets are stable
  - visibility switches are stable

## Pilot Recommendation

Recommended first difficulty pilot:

- scene: `smart-farm-global-mission`
- module: `smart-irrigation`

Why this is the best pilot:

- it already uses the new module-based architecture
- it already has a strong research and drafting baseline
- it is content-rich enough to test real difficulty separation
- it avoids forcing scenes 1 to 4 into the new model before the structure is
  proven

## Suggested Development Sequence

1. add `difficulty` state and URL parsing
2. add difficulty-aware content loading
3. add presenter difficulty selector and QR support
4. pilot `smart-irrigation` with three difficulty sets
5. test locked routing + leaderboard separation
6. expand difficulty support to more scenes and modules
7. begin follow-up management controls

## Out Of Scope For This Spec

Not yet included:

- a full WYSIWYG question-bank editor
- database-backed question authoring
- role-based admin accounts
- dynamic scene publishing workflow

These may become future work after the difficulty and activity model is stable.
