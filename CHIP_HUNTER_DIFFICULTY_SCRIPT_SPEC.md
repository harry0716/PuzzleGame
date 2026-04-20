# Chip Hunter Independent Difficulty Script Spec

## Purpose

This document defines how `chip-hunter` should evolve from one baseline scene
into three authored difficulty scripts:

- `easy`
- `medium`
- `hard`

The goal is to preserve the current scene identity while making each difficulty
feel meaningfully different in concept depth, question framing, and learning
value.

## Why `chip-hunter` Is The Next Priority

`chip-hunter` is still one of the most representative scenes in the whole
project:

- it is one of the earliest scene identities
- it introduces AI devices, semiconductors, and cross-domain integration
- it is suitable for exhibitions, campus visits, and general outreach
- it is short and event-friendly, which makes it ideal for a first
  non-module difficulty rewrite

Upgrading this scene next will strengthen the project’s most visible entry-point
content.

## Current Scene Identity

Scene id:

- `chip-hunter`

Current structure:

- 7 questions
- mixed type flow:
  - `single-choice`
  - `timed-choice`
  - `ordering`
  - `branching`
  - `image-choice`
  - `matching`

Current learning themes:

- AI experimental equipment
- H100 / GPU-level computing symbolism
- electronics + AI + control + system integration
- AIoT and smart-factory awareness
- personal direction through role cards

Shared result-role family:

- `AI 模型探索者`
- `AIoT 系統整合師`
- `智慧製造指揮員`
- `實作創新挑戰者`

Shared trait family:

- `ai`
- `system`
- `industry`
- `maker`

## Difficulty Philosophy

### Easy

Learning role:

- first-contact guided version

Main target:

- help newcomers quickly understand what kinds of things they are looking at in
  an AI lab or electronics department visit

Emphasis:

- concept recognition
- equipment recognition
- field-of-study orientation
- lower ambiguity

Tone:

- clearer
- more welcoming
- closer to guided visit explanation

### Medium

Learning role:

- standard outreach / activity version

Main target:

- keep the current best-balanced scene identity

Emphasis:

- AI devices
- system integration
- factory / AIoT connection
- role-direction reflection

Tone:

- event-ready
- balanced
- closest to the current live baseline

### Hard

Learning role:

- advanced challenge version

Main target:

- move beyond simple recognition into judgment about why those technologies
  matter and how they connect into real systems

Emphasis:

- comparative reasoning
- cross-domain integration
- equipment versus application logic
- broader semiconductor / AI / industrial-system linkage

Tone:

- denser
- more decision-oriented
- suitable for competition or advanced visitors

## Shared Structure Decision

`chip-hunter` should keep a short scene structure, but the scripts should still
be authored independently.

Recommended target:

- keep 7 questions per difficulty tier
- keep the same general type diversity so the scene remains event-friendly
- allow the exact topics to shift between tiers

## Recommended Per-Tier Structure

### Easy Script (7 Questions)

Main teaching goal:

- recognize what an AI / electronics visit is trying to show

Recommended distribution:

1. what kind of device most represents AI computing power
2. what makes the department cross-disciplinary
3. quick recognition of the most AI-related exhibit
4. simple visit-understanding order
5. choose where to look first in a visit area
6. image recognition of the most representative AI device
7. match main themes to simple explanations

Easy emphasis:

- "what is this?" and "why does it matter?"
- less abstract reasoning
- more direct role-orientation language

### Medium Script (7 Questions)

Main teaching goal:

- keep the existing `chip-hunter` learning balance

Recommended distribution:

1. AI training hardware recognition
2. cross-domain integration understanding
3. timed identification of the AI core
4. scene-understanding ordering
5. branching between server-first and system-first exploration
6. image recognition of AI infrastructure
7. matching AI server / Factory IO / AIoT with functional meaning

Medium emphasis:

- preserve the current live scene identity
- use it as the standard event version

### Hard Script (7 Questions)

Main teaching goal:

- turn the scene into a faster, sharper "why this ecosystem matters" challenge

Recommended distribution:

1. distinguish symbolic AI equipment from merely visible devices
2. compare electronics-only, AI-only, and integrated-system learning paths
3. timed judgment about what truly defines the scene’s technical value
4. order the logic from hardware -> system -> application -> career direction
5. branching choice between compute-first and application-first understanding
6. image recognition of infrastructure versus peripheral display devices
7. matching technology layers to sector-level value

Hard emphasis:

- equipment versus ecosystem
- chip / compute / control / AIoT connection
- stronger system-level interpretation

## Cross-Level Difference Rules

To avoid repeating the earlier difficulty-pilot weakness:

- no tier should be built only by rewriting the same prompt wording
- `easy` should emphasize recognition and orientation
- `medium` should emphasize event-ready balanced understanding
- `hard` should emphasize interpretation and integration
- at least half of each tier’s prompts should be distinct in framing from the
  other tiers

## Landing Copy Direction

### Easy Landing

Should communicate:

- this is the most approachable entry version
- suitable for first-time visitors
- focus on understanding what the exhibits mean

### Medium Landing

Should communicate:

- this is the standard challenge version
- suitable for regular event use
- focus on AI equipment, systems, and applications together

### Hard Landing

Should communicate:

- this is the advanced challenge version
- suitable for competition or fast high-confidence visitors
- focus on system-level interpretation and comparison

## Result-Copy Strategy

The role family can remain the same for scene identity consistency, but summary
copy should shift by difficulty:

- `easy`: more encouraging and directional
- `medium`: balanced and practical
- `hard`: sharper and more systems-oriented

## Suggested Next Step

Convert this spec into a writing-ready draft with:

- one full 7-question `easy` script
- one full 7-question `medium` script
- one full 7-question `hard` script
- landing copy direction for all three
- result-summary emphasis for all three

That draft should then become the direct source for the next live implementation
of difficulty-aware `chip-hunter`.
