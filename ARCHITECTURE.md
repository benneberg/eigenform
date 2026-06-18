# Eigenform: Technical Architecture

## Architectural Philosophy
Eigenform is built on the **Intent/Collapse Cycle**. It assumes the system's "true state" is an unobserved substrate of potentiality that only acquires meaning when an observer applies a specific intent.

## Core Modules

### 1. The Substrate (`src/lib/eigenform-core.ts`)
The `Satisfice` substrate is the "objective" layer of the framework. It consists of `SubstrateNode` objects that hold persistent metrics:
- **Entropy**: Measure of internal chaos/disorder.
- **Semantic Depth**: The ratio of context to raw data.
- **Significance**: Inherent structural weight.
- **Load/Status**: Operational metrics.

### 2. Intent Inference Engine
Maps an `ObserverRole` to an `ObserverIntent`. An intent defines:
- **Primary Metric**: What the observer cares about most (e.g., Entropy for SRE).
- **Focus Nodes**: Specific entities of interest.
- **Thresholds**: Limits beyond which meaning "collapses" into action or awareness.

### 3. Collapse & Rendering (`SatisficeView`)
The `renderSatisfice` function takes the full substrate and the current intent to produce a "satisficed" subset of nodes. This is the only part of the system the observer "sees," effectively collapsing the system into a meaningful rendering.

### 4. Narration Engine (`TellerView`)
Translates `SubstrateEvent` triggers into two-part responses:
- **Pure Narration**: Non-judgmental observational data (The "What").
- **Intent-Collapsed Meaning**: Contextual interpretation based on the observer's goals (The "Why").

### 5. Gap Analysis (`AporiaView`)
A diagnostic layer that runs independent probes on the substrate to identify interactions that are **not** currently being satisficed or observed by the active intent.

## Data Flow
1. **Substrate** maintains state.
2. **Events** are triggered (randomly simulated in prototype).
3. **Intent** is selected by the user.
4. **Satisfice Engine** filters the nodes for display.
5. **Teller** narrates the event relative to the Intent.
6. **Aporia** checks for unobserved remnants of the event.

## Component Structure
- `App.tsx`: Main router and layout.
- `src/components/`:
    - `EigenformView`: The conceptual entry point.
    - `SatisficeView`: Visualizes the intent-filtered substrate.
    - `LatentView`: Visualizes the transition from potential to active state.
    - `TellerView`: Real-time narrative stream.
    - `AporiaView`: Blind spot detection and probing.
    - `DiagnosticStream`: Ticker tape of all system activity.
- `src/lib/eigenform-core.ts`: Framework logic and state definitions.
