# Scene System Specification Draft

## Status

Draft for discussion only.
Do not implement directly until user confirms.

## Goal

Upgrade the current single-scene game into a reusable multi-scene system while
keeping the same repository, the same project folder, and the same GitHub Pages
deployment model.

## Constraints

- no dedicated backend added for this phase
- no direct model calls from the public front end
- continue using GitHub Pages for hosting
- continue using Supabase only where already appropriate, mainly leaderboard data
- keep current presenter and leaderboard concepts intact

## Primary Requirements

### Scene Management

- support more than 4 scenes
- allow scene switching from the front end
- use a visual scene panel instead of a simple dropdown
- allow each scene to define its own metadata and content

### Content Authoring

- new scene content should be producible from natural-language requests through Codex
- Codex should generate a standard scene script / data structure
- generated scenes should be integrated into this same repository

### Question Types

The system should be designed to support:

- single-choice
- ordering
- matching
- image-choice / image-based
- timed
- branching

## Recommended Architecture

Split the project into:

1. engine layer
2. scene data layer

### Engine Layer Responsibilities

- scene loading
- state management
- question rendering by type
- scoring
- answer storage
- result calculation
- leaderboard integration

### Scene Data Layer Responsibilities

- scene metadata
- scene-specific questions
- scene-specific results
- scene-specific display settings
- scene-specific leaderboard event code

## Proposed Scene Object

```js
{
  id: "chip-hunter",
  title: "晶片獵人",
  subtitle: "AI Lab Talent Sprint",
  description: "Interactive scene for AI, chips, and systems exploration.",
  thumbnail: "./assets/scenes/chip-hunter-cover.jpg",
  theme: {
    accent: "#0a7f6f",
    surface: "#ffffff"
  },
  leaderboard: {
    eventCode: "puzzlegame-visit-2026-04-08"
  },
  settings: {
    questionCount: 5,
    defaultTimeLimit: 12
  },
  questions: [],
  results: []
}
```

## Proposed Question Model

Each question should have a common shell:

```js
{
  id: "q1",
  type: "single-choice",
  prompt: "Question text",
  description: "Optional helper text",
  score: 100,
  timeLimit: 12
}
```

Then each type extends that structure.

### Single-Choice

```js
{
  id: "q1",
  type: "single-choice",
  prompt: "Which option is correct?",
  choices: [
    { id: "a", label: "Option A", detail: "..." },
    { id: "b", label: "Option B", detail: "..." }
  ],
  correctId: "a"
}
```

### Ordering

```js
{
  id: "q2",
  type: "ordering",
  prompt: "Arrange the steps in the correct order.",
  items: [
    { id: "a", label: "Step 1" },
    { id: "b", label: "Step 2" },
    { id: "c", label: "Step 3" }
  ],
  correctOrder: ["a", "b", "c"]
}
```

### Matching

```js
{
  id: "q3",
  type: "matching",
  prompt: "Match the concept to the definition.",
  leftItems: [
    { id: "l1", label: "GPU" }
  ],
  rightItems: [
    { id: "r1", label: "Parallel compute processor" }
  ],
  pairs: [
    { leftId: "l1", rightId: "r1" }
  ]
}
```

### Image-Based

```js
{
  id: "q4",
  type: "image-choice",
  prompt: "Which image matches the question?",
  options: [
    { id: "a", image: "./assets/example-a.jpg", alt: "..." },
    { id: "b", image: "./assets/example-b.jpg", alt: "..." }
  ],
  correctId: "b"
}
```

### Timed

```js
{
  id: "q5",
  type: "timed",
  prompt: "Answer within the time limit.",
  timeLimit: 8,
  choices: [],
  correctId: "a"
}
```

### Branching

```js
{
  id: "q6",
  type: "branching",
  prompt: "Choose a path.",
  choices: [
    { id: "a", label: "Inspect machine", next: "q7" },
    { id: "b", label: "Check sensor", next: "q8" }
  ]
}
```

## Proposed Front-End Flow

### Current Flow

1. open game
2. enter nickname
3. answer questions
4. see result
5. see leaderboard

### Proposed Flow

1. open game
2. choose scene from scene panel
3. enter nickname
4. play scene-specific question flow
5. see scene-specific result
6. write to scene-specific leaderboard

## Proposed Page States

The front end should behave like a small state machine.

Recommended states:

1. `scene-select`
   User sees scene cards and chooses one scene.

2. `player-entry`
   User enters nickname after a scene is selected.

3. `question`
   Engine renders the current question based on `question.type`.

4. `feedback`
   Engine shows correctness, earned score, or branch outcome.

5. `result`
   Engine shows the scene-specific result card.

6. `leaderboard`
   Result page includes ranking information for the active scene.

Benefits:

- easier to keep multiple scenes consistent
- branching logic becomes easier to manage
- future question types can plug into the same state flow

## Scene Panel Draft

Each scene card should show:

- thumbnail or visual placeholder
- title
- short description
- type tags
- question count
- start button

Possible future enhancements:

- search
- category filters
- difficulty label
- draft / published state

## Migration Plan For Current Scene

Move the current `晶片獵人` content into the new scene system first.

Recommended migration order:

1. define a scene registry
2. convert current hardcoded content into one scene object
3. keep existing gameplay working through the new loader
4. add scene panel UI
5. expand question renderers

## File Impact Draft

Likely to modify:

- `index.html`
- `app.js`
- `styles.css`
- `README.md`
- `DELIVERY.md`
- `VERSION_RECORD.md`
- `codex.md`

Likely to add:

- scene data file or scene registry file
- question renderer helpers
- shared scene panel UI helpers
- scene assets folder

## Recommended File Split

To keep the same repository but improve maintainability, a light file split is recommended.

### Keep

- `index.html`
- `styles.css`
- `leaderboard.html`
- `leaderboard-page.js`
- `leaderboard-shared.js`
- `presenter.html`
- `presenter.js`
- `config.js`

### Refactor

- `app.js`
  Split current content-heavy logic into smaller modules or at least clearly separated sections.

### Add

- `scene-registry.js`
  Stores all available scenes and handles scene lookup.

- `scene-panel.js`
  Renders scene selection cards and scene switching behavior.

- `question-renderers.js`
  Maps question type to rendering logic.

- `game-engine.js`
  Owns scene flow, scoring, and state transitions.

- `scenes/chip-hunter.js`
  First migrated scene file.

- `scenes/`
  Folder for future scenes.

This split can be done gradually if the team prefers to avoid a full rewrite in one pass.

## Scene-Level Leaderboard Strategy

Each scene should be able to define its own leaderboard identity.

Recommended rule:

- keep one common Supabase table
- use a distinct `eventCode` per scene or per event run

Examples:

- `chip-hunter-2026-spring`
- `smart-factory-demo-2026-05`

This keeps the current backend model unchanged while allowing scene isolation.

## Asset Strategy

Scene assets should remain static so they can be hosted on GitHub Pages.

Recommended structure:

- `assets/scenes/<scene-id>/cover.*`
- `assets/scenes/<scene-id>/question-*.*`
- `assets/scenes/<scene-id>/audio-*.*`

Guidelines:

- optimize image size to reduce load time
- avoid very large video assets unless clearly necessary
- prefer reusable visual assets across scenes when possible

## Authoring Workflow Draft

Recommended workflow for future content expansion:

1. user describes a new scene in natural language
2. Codex proposes the scene structure
3. Codex writes the scene file into `scenes/`
4. Codex updates the scene registry
5. Codex updates `codex.md`
6. Codex updates user-facing docs if needed
7. Codex records completed implementation in `VERSION_RECORD.md`

This keeps generation, implementation, and documentation in one repository workflow.

## Complexity Assessment Under GitHub Pages

Safe and suitable:

- multi-scene switching
- multiple question types
- visual themes per scene
- branching flows
- image and audio assets
- local state persistence
- Supabase-backed leaderboard

Manage carefully:

- many branching paths
- drag-and-drop matching UX
- heavy asset packs
- mini-game style interactions using canvas

Not recommended in this phase:

- public front-end direct calls to protected model APIs
- private admin backend
- real-time multiplayer synchronization

## Recommended Implementation Phases

### Phase 1

- scene data structure
- scene registry
- migrate current scene

### Phase 2

- scene selection panel
- scene loading flow

### Phase 3

- question engine refactor
- implement single-choice
- implement image-based
- implement timed
- implement ordering

### Phase 4

- implement matching
- implement branching
- update docs and version records

## Decision Summary

Confirmed by user:

- same repository will continue to be used
- same project folder will continue to be used
- Codex-generated scene content is an authoring workflow, not a runtime public feature
- scene switching UI should be a visual panel
- expanded question types are part of the planned upgrade
