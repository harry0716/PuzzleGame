# Smart Irrigation Independent Difficulty Script Draft

## Purpose

This draft turns the independent-difficulty script spec into writing-ready
content structure.

It is the bridge between:

- high-level difficulty philosophy
- and the next live implementation in `scene-registry.js`

The module keeps one shared identity:

- module id: `smart-irrigation`
- theme: precision irrigation, sensing, drought response, efficiency, and
  resilience

But now each difficulty tier is treated as a distinct script.

## Shared Role Family

Recommended shared role family:

1. `智慧灌溉調度員`
2. `土壤訊號觀察員`
3. `灌溉系統整合師`
4. `農業韌性策劃者`

Recommended trait family:

- `timing`
- `moisture`
- `systems`
- `resilience`

## Easy Script

### Positioning

This version is for first-contact learners.

It should feel approachable, concrete, and encouraging. The player should leave
with a clear understanding that smart irrigation means "watering at the right
time, with better information," rather than simply adding machines to a field.

### Landing Direction

Suggested landing tone:

- friendly
- introductory
- practical

Suggested landing copy direction:

- this run introduces the basic logic of smart irrigation
- you will focus on simple field judgment, soil moisture, and water-saving
  thinking
- this version is suitable for first-time participants

### Question Set

#### Q1. What Makes Irrigation Smart?

Type:

- `single-choice`

Prompt direction:

- a student visiting a farm hears a worker say, "We already water every day, so
  isn't that enough?" Which answer best explains why smart irrigation is
  different?

Correct concept:

- smart irrigation adjusts watering by data such as soil moisture, weather, and
  crop need instead of following habit alone

Primary trait:

- `systems`

#### Q2. Looking Beyond Surface Dryness

Type:

- `single-choice`

Prompt direction:

- after a sunny afternoon, the top of the soil looks dry. But the farm sensor
  shows that moisture lower in the soil is still sufficient. What should the
  team understand first?

Correct concept:

- field decisions should not rely only on what the surface looks like

Primary trait:

- `moisture`

#### Q3. Should We Water Right Away?

Type:

- `timed-choice`

Prompt direction:

- a crop area looks a little tired in the morning, but the dashboard shows
  moisture has not yet dropped below the warning line. What is the smartest
  first reaction?

Correct concept:

- check the data and timing first, not water immediately out of habit

Primary trait:

- `timing`

#### Q4. Same Time Every Day?

Type:

- `branching`

Prompt direction:

- one worker prefers watering at the same time every day because it feels
  simple. Another worker wants to check soil and weather conditions first. Which
  path should you follow?

Branch logic:

- branch toward routine convenience
- branch toward simple data-based adjustment

Correct educational direction:

- data-guided timing is closer to smart irrigation

Primary trait:

- `systems`

#### Q5. Why Saving Water Matters

Type:

- `single-choice`

Prompt direction:

- during a dry period, a farm wants to make sure water is not wasted. Why can
  smart irrigation help more than a fixed watering routine?

Correct concept:

- it helps give water when and where it is needed instead of treating every part
  of the field the same

Primary trait:

- `resilience`

#### Q6. Recognizing A Smart Irrigation Setup

Type:

- `image-choice`

Prompt direction:

- which image best shows a basic smart irrigation field setup?

Correct concept:

- a setup that includes sensing and irrigation-control elements, not just
  general machinery

Primary trait:

- `systems`

#### Q7. Match Tool To Purpose

Type:

- `matching`

Suggested pairs:

- soil moisture sensor -> helps check whether the soil really needs water
- weather station -> helps estimate when conditions may increase water demand
- irrigation controller -> helps open or adjust watering at the right time
- field dashboard -> helps workers view data in one place

Primary trait:

- `moisture`

#### Q8. A Basic Smart Irrigation Flow

Type:

- `ordering`

Suggested order:

1. read field data
2. compare with moisture need
3. decide whether irrigation is necessary
4. start or delay watering accordingly

Primary trait:

- `timing`

#### Q9. More Than Watering Faster

Type:

- `single-choice`

Prompt direction:

- why is smart irrigation useful even when a farm already has enough people to
  water crops manually?

Correct concept:

- it improves judgment and efficiency, not just labour speed

Primary trait:

- `systems`

#### Q10. Final Understanding

Type:

- `single-choice`

Prompt direction:

- after finishing the farm tour, what is the best summary of smart irrigation?

Correct concept:

- it uses data and timing to help farms water more accurately and waste less

Primary trait:

- `resilience`

### Easy Result-Copy Direction

- encourage first success
- highlight clear understanding and practical awareness
- use simpler, warmer wording

## Medium Script

### Positioning

This version is the standard activity script.

It should feel like a realistic smart-irrigation decision exercise. Players
should connect moisture, timing, weather, workflow, and efficiency into one
operational picture.

### Landing Direction

Suggested landing tone:

- balanced
- practical
- scenario-based

Suggested landing copy direction:

- this run focuses on real irrigation judgment in field conditions
- you will combine sensing, timing, weather, and system thinking
- this is the recommended standard activity version

### Question Set

#### Q1. Habit Or Data?

Type:

- `single-choice`

Prompt direction:

- a farm manager says the team has watered by experience for years. Another team
  member argues that soil sensors and weather forecasts should now be part of
  the decision. Which answer best explains the value of the second approach?

Correct concept:

- smart irrigation improves timing and precision by combining field judgment
  with measurable signals

Primary trait:

- `systems`

#### Q2. Reading Moisture More Carefully

Type:

- `single-choice`

Prompt direction:

- one plot appears dry at the surface after hot weather, but the moisture
  profile shows that deeper layers are still within the safe range. What should
  the irrigation team conclude first?

Correct concept:

- appearance and actual irrigation need are not always the same

Primary trait:

- `moisture`

#### Q3. Dashboard Timing Decision

Type:

- `timed-choice`

Prompt direction:

- the dashboard shows rising temperature, strong noon sunlight, and a field zone
  moving toward low-moisture threshold. What is the most important first
  decision factor?

Correct concept:

- combine threshold status with timing and weather rather than reacting blindly

Primary trait:

- `timing`

#### Q4. Precision Scheduling Or Fixed Routine

Type:

- `branching`

Prompt direction:

- one worker wants to keep the old daily schedule to avoid confusion. Another
  wants to vary irrigation timing by sensor data and crop condition. Which path
  do you follow first?

Correct educational direction:

- precision scheduling better reflects smart irrigation logic

Primary trait:

- `systems`

#### Q5. Drought Prioritization

Type:

- `single-choice`

Prompt direction:

- a short-term drought warning is announced, and the farm can no longer treat
  every plot equally. What is the main value of smart irrigation now?

Correct concept:

- it helps prioritize fields by real need rather than equal routine

Primary trait:

- `resilience`

#### Q6. Which Field Station Fits Best?

Type:

- `image-choice`

Prompt direction:

- which image best represents a field station designed for smart irrigation
  control and monitoring?

Correct concept:

- sensing plus control logic should appear together

Primary trait:

- `systems`

#### Q7. Match Data Tools To Field Outcomes

Type:

- `matching`

Suggested pairs:

- soil moisture sensor -> shows when root-zone water is approaching a threshold
- weather station -> helps anticipate heat or rainfall effects on irrigation need
- irrigation controller -> turns data into action timing
- mobile dashboard -> allows the team to compare plots and respond faster

Primary trait:

- `moisture`

#### Q8. Realistic Irrigation Workflow

Type:

- `ordering`

Suggested order:

1. collect field and weather data
2. compare threshold and crop condition
3. decide which zone needs action first
4. execute and review the irrigation result

Primary trait:

- `timing`

#### Q9. Water And Electricity Together

Type:

- `single-choice`

Prompt direction:

- a farm wants to reduce water use, but pumping and automated control also
  affect power use. Which answer shows the smartest overall view?

Correct concept:

- irrigation should balance water efficiency and energy efficiency together

Primary trait:

- `systems`

#### Q10. Final Synthesis

Type:

- `single-choice`

Prompt direction:

- what is the best summary of smart irrigation after looking at sensing,
  scheduling, drought response, and efficiency?

Correct concept:

- it is a field decision system that improves irrigation timing, resource use,
  and resilience

Primary trait:

- `resilience`

### Medium Result-Copy Direction

- application-oriented
- more operational than easy
- still readable for guided activities

## Hard Script

### Positioning

This version is the advanced challenge script.

It should feel more like a systems-decision exercise than a concept quiz.
Players should face trade-offs across moisture, weather, labour, water
availability, and energy burden.

### Landing Direction

Suggested landing tone:

- strategic
- demanding
- decision-heavy

Suggested landing copy direction:

- this run tests how well you can make irrigation decisions under pressure and
  competing constraints
- you will weigh moisture data, weather timing, field priority, and resource
  trade-offs
- this is the advanced challenge version

### Question Set

#### Q1. Why "More Water" Is Not Always Safer

Type:

- `single-choice`

Prompt direction:

- a trainee argues that in uncertain conditions, giving slightly more water is
  the safest choice because crops will not dry out. Why is that logic weak in a
  precision-irrigation system?

Correct concept:

- overwatering can waste water, reduce efficiency, and ignore actual data-based
  thresholds

Primary trait:

- `systems`

#### Q2. Conflicting Moisture And Weather Signals

Type:

- `single-choice`

Prompt direction:

- a plot has not yet crossed the moisture warning line, but tomorrow's forecast
  predicts strong heat and wind. Which interpretation is most appropriate?

Correct concept:

- irrigation should consider both current moisture and near-future stress, not
  just one variable in isolation

Primary trait:

- `moisture`

#### Q3. Threshold Pressure Under Time Constraint

Type:

- `timed-choice`

Prompt direction:

- the control dashboard shows rising evapotranspiration, limited labour
  availability, and two zones approaching different thresholds. You have seconds
  to decide what to evaluate first. What matters most?

Correct concept:

- prioritize combined threshold risk and timing impact rather than the loudest
  alert alone

Primary trait:

- `timing`

#### Q4. Scheduling Conflict Under Labour Limits

Type:

- `branching`

Prompt direction:

- two irrigation windows overlap, but the team cannot service both at once.
  One option is easier to manage with the usual routine. The other better fits
  real-time field need. Which path do you choose first?

Correct educational direction:

- choose the data-driven priority path even if it creates more coordination
  pressure

Primary trait:

- `systems`

#### Q5. Which Plot Gets Water First?

Type:

- `single-choice`

Prompt direction:

- a farm must reduce irrigation allocation during a drought week. Several plots
  show different crop stages, moisture conditions, and stress forecasts. What is
  the smartest decision principle?

Correct concept:

- prioritize according to actual urgency and crop vulnerability, not equal
  distribution for simplicity

Primary trait:

- `resilience`

#### Q6. Identify The Most Integrated Setup

Type:

- `image-choice`

Prompt direction:

- which setup best represents an integrated smart-irrigation control
  environment, not just a monitoring point?

Correct concept:

- choose the image where sensing, control, and decision feedback are connected

Primary trait:

- `systems`

#### Q7. Match System Inputs To Outcomes

Type:

- `matching`

Suggested pairs:

- threshold-based soil data -> prevents irrigation from being triggered only by habit
- weather-linked scheduling -> shifts timing to reduce avoidable stress
- controller feedback loop -> turns sensing into repeatable field action
- zone comparison dashboard -> helps allocate limited irrigation capacity wisely

Primary trait:

- `systems`

#### Q8. Order A Constrained Response Flow

Type:

- `ordering`

Suggested order:

1. review multi-zone field signals
2. compare threshold risk and forecast pressure
3. rank irrigation priority by urgency and constraint
4. execute the highest-value response and review outcome

Primary trait:

- `timing`

#### Q9. Water Efficiency Versus Energy Burden

Type:

- `single-choice`

Prompt direction:

- a farm wants to increase precision irrigation, but pumping and automated
  control also increase energy dependence. What is the best systems-level view?

Correct concept:

- the goal is not to maximize one metric alone, but to optimize water savings,
  timing quality, and energy burden together

Primary trait:

- `systems`

#### Q10. Climate Resilience And Future Farming

Type:

- `single-choice`

Prompt direction:

- why does smart irrigation matter in the longer future of climate uncertainty
  and food production?

Correct concept:

- it helps agriculture respond more intelligently to pressure, scarcity, and
  system instability

Primary trait:

- `resilience`

### Hard Result-Copy Direction

- emphasize strategy
- emphasize systems judgment
- highlight resilience planning and trade-off awareness

## Implementation Notes

When this draft is converted into live content:

- build three explicit `difficultySets`
- do not auto-generate them from one baseline
- keep role names shared for module identity consistency
- allow result descriptions and landing copy to shift by difficulty

## Suggested Next Step

Convert this draft into scene-ready content objects for:

- `difficultySets.easy`
- `difficultySets.medium`
- `difficultySets.hard`

inside the `smart-irrigation` module of the fifth scene.
