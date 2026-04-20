# Smart Irrigation Independent Difficulty Script Spec

## Purpose

This document upgrades the current smart-irrigation difficulty model from
"surface variation" to "independent content scripts."

The goal is not simply to rewrite prompts with easier or harder wording. The
goal is to make `easy`, `medium`, and `hard` feel like three distinct learning
paths under the same smart-irrigation theme.

## Why This Upgrade Is Needed

The first pilot proved that the framework works:

- difficulty routing works
- presenter routing works
- locked mode can preserve difficulty
- leaderboard separation can preserve difficulty

However, the current pilot still feels too close across all three levels. The
same baseline script is still visible underneath the current implementation.

The next step is to replace that with three independent scripts.

## Core Design Rule

All three levels should still answer the same broad question:

"How can smart irrigation help agriculture become more precise, resilient, and
sustainable?"

But each level should answer it at a different depth.

## Shared Module Identity

Module:

- `smart-irrigation`

Shared role direction:

- player acts as a smart-irrigation decision helper or field operations partner

Shared high-level theme:

- sensing
- timing
- irrigation decision logic
- drought response
- water efficiency
- water-and-energy trade-offs

Shared trait family:

- `timing`
- `moisture`
- `systems`
- `resilience`

## Difficulty Philosophy

### Easy

Learning style:

- guided introduction
- practical recognition
- lower cognitive load

Experience target:

- a participant who is new to smart agriculture should still feel successful
- the module should explain the value of smart irrigation in a direct and
  intuitive way

Knowledge target:

- what smart irrigation is
- why soil moisture matters
- why watering by habit is limited
- how simple sensing helps save water

Question style target:

- clearer situations
- fewer competing variables
- stronger everyday examples
- more direct answers

### Medium

Learning style:

- standard activity version
- balanced concept and judgment

Experience target:

- this should be the default school-event or guided-activity version
- it should feel more thoughtful than easy, but not highly competitive

Knowledge target:

- how moisture data, weather, and crop need interact
- why irrigation is a system decision, not just an on/off action
- how water-saving and operational judgment connect

Question style target:

- moderate scenario depth
- moderate ambiguity
- more decision logic than easy

### Hard

Learning style:

- integrated decision challenge
- stronger trade-off thinking

Experience target:

- participants should need to interpret multiple variables at once
- this version should feel appropriate for competition or advanced groups

Knowledge target:

- how irrigation decisions intersect with drought pressure, energy use, system
  constraints, and resilience planning
- how precision decisions differ from simplistic "water more / water less"
  thinking

Question style target:

- denser scenarios
- more realistic constraints
- stronger cross-topic integration

## Script Architecture Decision

The three difficulty tiers should no longer be treated as one baseline plus
automatic modifications.

Instead, each tier should have:

- its own landing copy
- its own question list
- its own answer set
- its own timing setup
- its own difficulty-specific narrative tone

Result roles may stay within the same role family, but the explanatory copy
should reflect the level's deeper emphasis.

## Recommended Result Role Strategy

Keep one shared result-role family for module identity consistency:

1. `智慧灌溉調度員`
2. `土壤訊號觀察員`
3. `灌溉系統整合師`
4. `農業韌性策劃者`

But allow the description copy to shift by difficulty:

- `easy`: simpler and more encouraging
- `medium`: more application-oriented
- `hard`: more strategic and systems-oriented

## Easy Script Outline (10 Questions)

Main teaching goal:

- build a clear first understanding of smart irrigation

Recommended question distribution:

1. what makes irrigation "smart" instead of routine
2. why soil moisture matters more than surface appearance alone
3. when not to water immediately
4. fixed schedule versus simple data-based adjustment
5. why saving water matters in farming
6. identify a basic smart irrigation setup
7. match simple irrigation tools to their uses
8. put a basic irrigation decision flow in order
9. why smart irrigation also helps field stability
10. final summary: smart irrigation as better timing, not just more water

Easy-specific design notes:

- more direct concept questions
- fewer mixed-variable scenarios
- image and matching questions should feel friendly and recognizable
- less policy or infrastructure pressure

## Medium Script Outline (10 Questions)

Main teaching goal:

- teach smart irrigation as a real farm decision system

Recommended question distribution:

1. core difference between routine watering and smart irrigation
2. reading soil moisture more carefully
3. timed irrigation dashboard decision
4. precision irrigation versus fixed schedule branching
5. short-term drought prioritization
6. identify a field station or control setup
7. match sensing and control tools with field outcomes
8. order a realistic irrigation workflow
9. water and electricity trade-off
10. final synthesis around resilience and efficiency

Medium-specific design notes:

- this can inherit some of the current pilot content
- but it should still be written as a standalone script, not just treated as the
  untouched baseline
- this should remain the most balanced version

## Hard Script Outline (10 Questions)

Main teaching goal:

- push participants into multi-variable smart-irrigation judgment

Recommended question distribution:

1. why a "more water is safer" assumption fails under precision farming
2. interpreting conflicting moisture and weather signals
3. timed decision under heat, evapotranspiration, and threshold pressure
4. branching choice under labour limits and irrigation scheduling conflict
5. drought-allocation prioritization across multiple plots
6. identify the most integrated monitoring-and-control setup
7. match sensors, control logic, and system outcomes under more technical framing
8. order a constrained irrigation response workflow
9. optimize between water efficiency and energy burden
10. final synthesis: smart irrigation as part of climate resilience and future
    food-system adaptation

Hard-specific design notes:

- more than one variable should be active inside the same question
- answer choices should be plausible, not obviously wrong
- the challenge should come from reasoning, not from obscure wording alone

## Cross-Level Difference Rules

To avoid repeating the old pilot problem, use these rules:

- no more than 30 percent of prompts should be direct rewrites of another level
- at least half of the questions in each level should use different scenario
  framing from the other two levels
- `easy` should emphasize concept recognition
- `medium` should emphasize operational judgment
- `hard` should emphasize strategic trade-off reasoning

## Implementation Recommendation

When this is coded, do not generate the three levels procedurally from one
baseline.

Instead:

- author three explicit question arrays
- author three explicit landing blocks
- optionally share trait and result-role families
- keep timing settings level-specific

## Suggested Next Development Step

Convert this spec into a writing-ready draft with:

- 10 full question prompts for `easy`
- 10 full question prompts for `medium`
- 10 full question prompts for `hard`
- updated landing copy per level
- updated result-role copy per level

That draft should become the direct source for the next live implementation.
