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

## Planned Design Phase

Before implementation, prepare a specification covering:

- scene data structure
- question type data structure
- front-end scene panel flow
- migration plan for the current `晶片獵人` scene
- expected file changes in the same repository

Current design-prep artifacts:

- `SCENE_SYSTEM_SPEC.md`

## Future Update Reminder

After adding new project content, update:

- `codex.md`
- `README.md`
- `DELIVERY.md`
- `SLIDES.md`
- `VERSION_RECORD.md`

If shared leaderboard behavior changes, also update:

- `LEADERBOARD_SETUP.md`
- `supabase-leaderboard.sql`
