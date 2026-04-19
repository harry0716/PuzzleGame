# Event-Control Upgrade Spec

## Purpose

This spec defines the next upgrade pass focused on fairer on-site play,
stronger activity control, and scene-specific event entry behavior.

The project already supports multiple scenes and multiple question types. The
goal of this pass is to make the system behave more like an event-ready booth
tool instead of an always-open scene browser.

## Confirmed Goals

- reduce answer memorization advantages by randomizing visible answer order
- preserve the educational content while making repeated play less predictable
- support both showcase-style and competition-style scoring needs
- allow a single event to expose only one scene to participants
- prevent participants from moving across scenes during locked activities

## Scope

This pass covers:

- question randomization rules
- scoring-mode design
- scene locked-mode behavior
- result-page restrictions during locked events
- future presenter / QR alignment requirements

This pass does not yet require:

- generating new question banks
- rewriting existing scene content
- splitting the project into separate repositories or deployments
- replacing the current GitHub Pages hosting model

## 1. Question Randomization

### Design Goal

Players should not be able to rely on answer position memory alone. The same
question may still appear, but the visible arrangement of answers should vary
between attempts.

### Target Question Types

The first implementation pass should cover all current answer-based question
types:

- `single-choice`
- `timed-choice`
- `image-choice`
- `ordering`
- `matching`
- `branching` option order only, when randomization does not break the intended
  route wording or narrative flow

### Randomization Rules

#### `single-choice`

- randomize the visible order of answer choices
- keep the correct-answer mapping accurate after shuffling

#### `timed-choice`

- randomize the visible order of answer choices
- preserve all current time-limit behavior

#### `image-choice`

- randomize the rendered image-choice order / positions
- preserve the correct-answer mapping

#### `ordering`

- randomize the starting order of items every time the question is loaded
- preserve the target `correctOrder` used for validation

#### `matching`

- randomize the left-side prompt order
- randomize the right-side selectable answer order
- preserve pair mapping used for correctness checking

#### `branching`

- keep route structure stable
- allow visible option order to shuffle only if the branch text remains clear
- do not randomize downstream branch graph structure

### Expected Result

- repeated players can no longer memorize answer positions
- peer-to-peer answer sharing becomes less effective
- the same scene remains recognizable, but less predictable

## 2. Dual Scoring Modes

### Current Behavior

The current per-question score formula is:

`correct score = 60 + 8 x remaining_seconds`

Incorrect answers currently earn `0`.

This creates a strong speed advantage when players already know the answers.

### Confirmed New Direction

The project should support two scoring modes:

- `showcase`
- `competition`

### `showcase` Mode Intent

- suitable for demos, free exploration, and lively exhibit play
- keeps a stronger speed bonus
- preserves a faster arcade-like feeling

### `competition` Mode Intent

- suitable for formal events, rankings, and challenge-based activities
- correctness should matter more than speed
- speed should still contribute, but with clearly lower weight

### Competition Scoring Direction

The confirmed direction is:

- base score is primary
- speed bonus is secondary and intentionally reduced

Recommended first-pass shape:

- `base score`: high and stable
- `speed bonus`: modest and capped

Example direction for implementation discussion:

- base score around `80`
- speed bonus around `0-20`

This is a design target, not a final hard-coded value yet. The exact formula
should be finalized during implementation review.

## 3. Locked Scene Mode

### Design Goal

An activity organizer should be able to expose only one scene during a
specific event.

### Entry Pattern

Locked mode should use a URL pattern like:

`index.html?scene=<scene-id>&locked=1`

Examples:

- `index.html?scene=chip-hunter&locked=1`
- `index.html?scene=electronics-dual-experience&locked=1`
- `index.html?scene=smart-factory-mission-station&locked=1`
- `index.html?scene=smart-care-mission-station&locked=1`

### Locked Mode Behavior

When `locked=1` is active:

- skip the global scene-selection page
- open the specified scene landing page directly
- do not show the "back to scene list" control
- do not allow switching to another scene during the session
- do not allow choosing another scene after the result screen
- allow replay of the same scene
- allow viewing the current scene leaderboard if needed

### Normal Mode Behavior

When `locked=1` is not active:

- preserve the existing multi-scene browsing behavior
- preserve the current scene selection panel
- preserve free scene switching for testing and open exploration

## 4. End-of-Scene Restrictions

### Locked Mode

At the end of a locked scene flow:

- allow replay of the current scene
- optionally allow viewing the current scene leaderboard
- do not show a cross-scene scene-picker action

### Normal Mode

At the end of a normal unlocked scene flow:

- keep the current "choose another scene" flow

## 5. Presenter / QR Alignment

This pass should keep later presenter integration in mind.

Expected follow-up behavior:

- QR routing should support locked scene URLs
- a presenter can route players directly into a single event scene
- players scanning the QR code should not land on the multi-scene index when
  the event is meant to run one locked scene only

This does not require a full presenter rewrite in the spec phase, but locked
mode must be designed so presenter routing can use it directly later.

## 6. Recommended Implementation Order

1. add full question randomization across supported types
2. add dual scoring modes and scoring-mode selection plumbing
3. add locked scene mode and remove cross-scene navigation in locked sessions
4. align presenter / QR routing with locked scene URLs
5. update documentation and version records after implementation

## 7. Acceptance Goals

This upgrade should be considered successful when:

- the same answer-based question does not always display in the same order
- competition play rewards correctness more than answer memorization speed
- a scene can be launched as a standalone locked activity
- players in locked mode cannot navigate to other scenes
- the normal multi-scene experience still works for testing and open access
