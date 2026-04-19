# Fifth Scene Module Spec

## Scene Direction

Working master scene:

- `智慧農場全球任務站`

This scene should be implemented as one master smart-agriculture scene with
multiple selectable modules, not as many unrelated top-level scenes.

## Design Goal

The topic has become too broad for a single linear 10-question path. The scene
should therefore support a shared introduction followed by a module selection
step, so players can enter one focused subdomain of smart agriculture.

This should make the scene:

- more scalable
- more coherent
- easier to use in different activity settings
- more suitable for targeted event routing later

## Core Flow

Recommended player flow:

1. Enter `智慧農場全球任務站`
2. Read a shared introduction
3. Open the module selection panel
4. Choose one module
5. Start a locked 10-question run inside that module
6. Finish the module and receive module-specific result feedback

## Confirmed Rules

### Shared Introduction

The master scene should include a common introduction before module selection.

Purpose:

- explain why smart agriculture is both local and global
- frame the scene as technology plus management plus sustainability
- set up the idea that players are choosing one focus area inside a larger
  smart-farming system

### Module Locking

Once a player selects a module:

- they are locked into that module for the rest of the run
- they should not switch to another module mid-session
- end-of-module flow should not bounce them back into the module selector

This matches the broader event-control philosophy already used for scene
locking.

### Question Count

Target for each module:

- 10 questions

This keeps module depth consistent and makes it easier to compare module scope
later.

### Result Direction

Each module should eventually support its own result-card direction, rather than
forcing one universal result-card set across all smart-agriculture modules.

This is recommended because the modules represent meaningfully different
mindsets and knowledge areas.

## Confirmed Module Set

The fifth scene should support the following seven modules:

1. `技術題組`
2. `商業題組`
3. `能源題組`
4. `ESG 題組`
5. `國際市場題組`
6. `水資源治理題組`
7. `智慧灌溉題組`

## Recommended UX Grouping

To avoid a flat and overwhelming module-selection screen, the seven modules
should be presented in grouped sections.

### 技術與系統

- 技術題組
- 智慧灌溉題組
- 能源題組

### 經營與市場

- 商業題組
- 國際市場題組

### 永續與治理

- ESG 題組
- 水資源治理題組

This grouping is primarily for interface clarity and player comprehension.

## Recommended Module Selector UI

The module selector should use cards, not a plain dropdown or a simple list.

Each module card should show:

- module name
- one-line description
- question count
- group tag
- possibly one accent icon or visual cue

This keeps the scene consistent with the existing card-based scene selection
language used elsewhere in the project.

## Suggested Module Intent

### 技術題組

Focus:

- sensors
- weather data
- imaging
- drones
- AI prediction
- farm dashboards

Role tone:

- system builder
- field data interpreter

### 商業題組

Focus:

- ROI
- pricing
- labour shortages
- quality stability
- cost-benefit reasoning
- value-chain logic

Role tone:

- agribusiness planner
- adoption strategist

### 能源題組

Focus:

- pumping electricity
- greenhouse control
- cooling and storage
- energy efficiency
- automation versus power demand
- renewable integration

Role tone:

- farm energy planner
- efficiency coordinator

### ESG 題組

Focus:

- sustainability
- social inclusion
- farmer access
- emissions and resource efficiency
- long-term stewardship

Role tone:

- sustainability planner
- resilient agrifood advocate

### 國際市場題組

Focus:

- traceability
- standards
- food safety expectations
- export logic
- international supply chain signals
- fair market access

Role tone:

- global market coordinator
- smart agriculture trade observer

### 水資源治理題組

Focus:

- water rights
- water data
- equitable access
- governance incentives
- scarcity management
- policy coordination

Role tone:

- water governance analyst
- agricultural resource steward

### 智慧灌溉題組

Focus:

- moisture sensing
- irrigation scheduling
- variable-rate irrigation
- drought response
- satellite-supported irrigation intelligence
- more-crop-per-drop logic

Role tone:

- irrigation scheduler
- precision water manager

## Data-Structure Implication

The fifth scene will likely require a new structure beyond the current
scene-level `questions` array.

Recommended concept:

- one scene object
- one intro section
- one module list
- each module owns its own 10-question set and result mapping

This is a structural change and should be planned before implementation.

## Routing Implication

The current scene-locking model uses:

- `?scene=<scene-id>&locked=1`

The fifth scene should later support a deeper routing form such as:

- `?scene=smart-farm-global-mission&module=tech&locked=1`

This would enable:

- direct QR entry into a specific module
- highly targeted event routing
- one-event-one-module control when needed

This routing is not required yet in the planning phase, but the structure
should be designed so that this parameter can be added cleanly later.

## Recommended Implementation Order

1. define the fifth-scene master structure
2. add a module selection step after the common introduction
3. implement per-module locking once selected
4. support one module end-to-end as a pilot path
5. expand to the remaining modules
6. add `module=` routing support after the module system is stable

## Recommended Next Document

After this spec, the next planning artifact should be:

- `FIFTH_SCENE_MODULE_OUTLINES.md`

That document should contain:

- 7 module summaries
- 10-question topic distribution per module
- tentative result-card directions per module
- which modules are best to implement first
