# Fifth Scene Pilot Module Draft

## Module

`智慧灌溉題組`

This is the first full pilot-module content draft for the fifth scene master
structure.

## Module Position

Module group:

- 技術與系統

Player role:

- 精準灌溉調度員

Core message:

- smart irrigation is not simply "watering with machines"
- it means using data, timing, sensing, and field judgment to save water,
  improve resilience, and support better agricultural decisions

## Question Count

- 10 questions

## Trait Direction

Recommended traits for this module:

- `timing`
- `moisture`
- `systems`
- `resilience`

## Result Roles

Suggested result roles for this module:

1. `灌溉節奏觀察員`
2. `土壤濕度判讀員`
3. `精準灌溉整合手`
4. `智慧用水調度者`

## Question Plan

### Q1. Core Concept

Type:

- `single-choice`

Purpose:

- establish what makes irrigation "smart"

Draft prompt direction:

- a farm manager says, "We already water every day, so why do we need smart
  irrigation?" Which answer best explains the difference?

Correct concept:

- smart irrigation adjusts water use based on data such as soil moisture,
  weather, and crop condition instead of relying only on habit

Primary trait:

- `systems`

### Q2. Soil Moisture Signal

Type:

- `single-choice`

Purpose:

- introduce soil moisture as a decision input, not just a technical number

Draft prompt direction:

- after a hot day, one field looks dry on the surface, but the sensor still
  shows enough moisture deeper in the soil. What should the farm team understand
  first?

Correct concept:

- surface appearance is not always enough; irrigation decisions should consider
  actual soil moisture data

Primary trait:

- `moisture`

### Q3. Irrigation Timing Quick Decision

Type:

- `timed-choice`

Purpose:

- create a real operational decision under time pressure

Draft prompt direction:

- a dashboard shows rising temperature, strong sunlight expected at noon, and a
  field section approaching low-moisture threshold. You have only a few seconds
  to make the first decision. What matters most?

Correct concept:

- prioritize the combination of moisture threshold and weather timing, not just
  water immediately without context

Primary trait:

- `timing`

### Q4. Precision Irrigation versus Fixed Schedule

Type:

- `branching`

Purpose:

- show the difference between rigid schedules and adaptive irrigation logic

Draft prompt direction:

- one worker wants to keep the old "same time every day" schedule, while
  another wants to adjust by crop status and sensor data. Which path do you
  choose first?

Branch intent:

- branch A: fixed-schedule comfort
- branch B: precision-data approach

Correct educational direction:

- precision scheduling is more aligned with smart irrigation

Primary trait:

- `systems`

### Q5. Drought Response and Prioritization

Type:

- `single-choice`

Purpose:

- connect irrigation to resilience under water pressure

Draft prompt direction:

- a region enters short-term drought pressure and water allocation becomes
  tighter. What is the value of smart irrigation in this situation?

Correct concept:

- it helps prioritize where and when water is most needed instead of treating
  all plots the same

Primary trait:

- `resilience`

### Q6. Irrigation Equipment Identification

Type:

- `image-choice`

Purpose:

- identify the most relevant irrigation-control or soil-monitoring setup

Draft prompt direction:

- which setup best matches a smart irrigation field station?

Correct concept:

- the image should depict sensing plus irrigation control logic, not generic
  farm machinery

Primary trait:

- `systems`

### Q7. Sensors and Outcomes Matching

Type:

- `matching`

Purpose:

- connect irrigation-related tools to their practical outcomes

Suggested match pairs:

- 土壤濕度感測 -> 判斷是否真的需要補水
- 流量監測 -> 觀察灌溉是否異常或浪費
- 天氣資料 -> 調整灌溉時機
- 灌溉控制器 -> 依條件執行較精準的供水

Primary trait:

- `moisture`

### Q8. Irrigation Decision Flow

Type:

- `ordering`

Purpose:

- teach a more realistic irrigation workflow

Suggested order logic:

1. 看感測與天氣資料
2. 判斷是否接近補水門檻
3. 決定灌溉時機與區域
4. 執行後再觀察結果

Primary trait:

- `timing`

### Q9. Water and Energy Trade-Off

Type:

- `single-choice`

Purpose:

- link irrigation to energy thinking, not only water thinking

Draft prompt direction:

- a farm wants to save water, but pumping and automated irrigation control also
  affect electricity use. Which idea best reflects a smart decision?

Correct concept:

- smart irrigation should consider both water efficiency and energy efficiency,
  not optimize one blindly

Primary trait:

- `systems`

### Q10. Final Synthesis

Type:

- `single-choice`

Purpose:

- close the module with a broader future-facing message

Draft prompt direction:

- why is irrigation intelligence becoming an important part of future smart
  farming around the world?

Correct concept:

- because water pressure, climate uncertainty, crop stability, and resource
  efficiency all make precise water decisions more important

Primary trait:

- `resilience`

## Draft Tone Guidance

The module should not sound like an engineering exam only. The questions should
keep a field-decision feel, for example:

- what does the farmer notice
- what does the dashboard show
- what must be decided first
- what is the consequence of using water too early, too late, or too broadly

This will keep the module more alive and less abstract.

## Result-Copy Direction

### 灌溉節奏觀察員

Tone:

- notices timing patterns
- values rhythm and field response

### 土壤濕度判讀員

Tone:

- trusts data more than surface intuition alone
- is careful about hidden field conditions

### 精準灌溉整合手

Tone:

- connects sensors, weather, and irrigation action into one system

### 智慧用水調度者

Tone:

- sees water as a strategic resource
- thinks about resilience, scarcity, and long-term efficiency

## Recommended Next Step

After this draft is reviewed, the next step should be one of:

1. convert this module into a structured scene-data content draft
2. write one more module at the same detail level for comparison
3. finalize fifth-scene master-scene data structure before implementation
