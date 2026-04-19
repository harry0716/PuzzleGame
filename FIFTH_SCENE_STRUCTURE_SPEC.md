# Fifth Scene Structure Spec

## Purpose

This document defines the implementation structure needed to support the fifth
scene as a master scene with internal selectable modules.

The goal is to bridge the gap between planning artifacts and actual code
changes, so the next implementation step is clear before content is wired into
the current game engine.

## Why A New Structure Is Needed

The existing scene engine assumes:

- one selected scene
- one linear question flow inside that scene
- one result outcome at the end of that flow

The fifth scene requires:

- one master scene
- one shared introduction
- one internal module selector
- one locked module-specific question flow
- one module-specific result outcome

That means the fifth scene should not be implemented by simply appending a very
large `questions` array to the current scene structure.

## Implementation Goal

Support this player flow:

1. enter `智慧農場全球任務站`
2. read the shared intro
3. select one module
4. become locked into that module
5. answer that module's 10 questions
6. receive module-specific result feedback

## Recommended Data Structure Direction

### Current Pattern

Current scenes generally look like:

- scene metadata
- scene questions
- scene results

### Fifth-Scene Pattern

Recommended master-scene structure:

- scene metadata
- intro content
- module selector content
- modules array
- each module owns:
  - module id
  - module title
  - module description
  - module group
  - module landing copy
  - module questions
  - module results

### Example Concept

This is a conceptual shape only:

```js
{
  id: "smart-farm-global-mission",
  title: "智慧農場全球任務站",
  subtitle: "...",
  description: "...",
  intro: {
    title: "...",
    copy: "...",
    rules: [...]
  },
  moduleSelector: {
    title: "...",
    copy: "...",
    groups: [...]
  },
  modules: [
    {
      id: "smart-irrigation",
      title: "智慧灌溉題組",
      group: "技術與系統",
      description: "...",
      questions: [...],
      results: {...}
    }
  ]
}
```

## Recommended State Additions

The main app state will likely need new fields such as:

- `currentModuleId`
- `moduleLocked`
- `currentMasterSceneMode`

Likely meaning:

- `currentModuleId`
  which fifth-scene module is active

- `moduleLocked`
  whether the player can still change modules in the current run

- `currentMasterSceneMode`
  whether the app is currently at:
  - scene intro
  - module selector
  - module quiz
  - module result

This does not need to replace the existing scene model for other scenes; it can
be layered onto it conditionally.

## Recommended Rendering Flow

The current app rendering flow can stay unchanged for scenes 1 through 4.

For the fifth scene only, I recommend this branch:

- if scene is not module-based:
  use existing landing -> question -> result flow

- if scene is module-based:
  use intro -> module selector -> module question flow -> module result

This preserves backward compatibility for the already completed scenes.

## New View Requirements

The fifth scene likely needs at least two new front-end views:

### 1. Master Intro View

Purpose:

- explain the bigger smart-agriculture context
- show why players must choose one module
- make the fifth scene feel like a "hub"

### 2. Module Selector View

Purpose:

- show the 7 module cards
- group them into:
  - 技術與系統
  - 經營與市場
  - 永續與治理
- let the player choose exactly one

### Optional 3. Module Landing View

This may be helpful if you want a small transition between selecting a module
and beginning the 10-question run.

It could show:

- selected module name
- what this module focuses on
- short reminder that the player is now locked into this module

This view is optional but may improve clarity.

## Locking Rules Inside Fifth Scene

### Required

Once a module is selected:

- `currentModuleId` is set
- the module selector should no longer be shown during the run
- result flow should not return to module selector

### Allowed

After finishing:

- replay the same module

### Not Allowed

During the locked run:

- switching to another module
- returning to the fifth-scene module selector
- bouncing into unrelated scenes when already in locked event flow

## Result Structure Recommendation

The fifth scene should not use one giant shared result map across all modules.

Instead:

- each module owns its own result map

This keeps:

- irrigation results focused on irrigation thinking
- business results focused on business reasoning
- governance results focused on policy / resource thinking

## Routing Recommendation

### Near-Term

Master scene locked route:

- `?scene=smart-farm-global-mission&locked=1`

### Later

Direct module locked route:

- `?scene=smart-farm-global-mission&module=smart-irrigation&locked=1`

This should be treated as a future-compatible design target now, even if the
first implementation only uses scene-level entry plus in-scene module choice.

## Backward Compatibility Requirement

Scenes 1 through 4 should continue to work without adopting the module-based
structure.

This implies:

- no global rewrite that forces all scenes to adopt `modules`
- feature detection should be based on whether the scene defines modules

Recommended rule:

- if `scene.modules` exists and has entries, use module-based flow
- otherwise, use the existing standard flow

## Recommended Implementation Order

1. add fifth-scene structural support in data model
2. add app state for module selection and module lock
3. add master intro and module selector rendering
4. wire one pilot module end to end
5. validate result and replay behavior
6. expand remaining modules
7. add direct `module=` routing support

## Recommended Immediate Next Step

Before implementation begins, choose one pilot path:

- only implement the fifth-scene structure plus `智慧灌溉題組`

This is the recommended first slice because it is:

- concrete
- topic-rich
- connected to both local and global concerns
- representative of the larger scene architecture
