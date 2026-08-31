# Eigenform: Observer-Relative Adaptive Systems Framework

> A conceptual framework and intent-driven substrate for dynamic topology, situational instantiation, and dual-channel narration.

[![CI](https://github.com/benneberg/eigenform/actions/workflows/ci.yml/badge.svg)](https://github.com/benneberg/eigenform/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)

---

Eigenform is an **Observer-Relative Adaptive Systems Framework** designed to model complex systems where "meaning" is not an intrinsic property of a substrate, but an emergent phenomenon created through the interaction between an observer and an underlying data plane.

Built upon cybernetic theory and von Foerster's eigenform principles, this application provides an interactive, real-time simulation of system state collapse, situational service instantiation, non-judgmental observational narration, and observability gap detection.

---

## Documentation & Architecture

- **[PURPOSE.md](./PURPOSE.md)**: Product vision, target audience, value proposition, and competitive differentiation.
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Technical overview of the Intent/Collapse cycle, substrate metrics, and core modules.
- **[AUDIT.md](./AUDIT.md)**: Comprehensive architectural review, specification gap analysis, and production audit.
- **[TODO.md](./TODO.md)**: Production readiness roadmap, prioritized tasks, and completed milestones.

---

## Core Concepts

### 1. Eigenform
The overarching design philosophy. In this framework, the system does not exist in a single fixed state. Instead, it "collapses" into a specific rendering based on the **Observer's Intent**, revealing only the information relevant to that specific operational context.

### 2. Satisfice (Substrate)
The **Satisfice** module defines the minimal meaningful substrate—a stable data structure consisting of nodes with raw metrics (`entropy`, `semanticDepth`, `significance`, `load`, and `status`). It serves as the objective layer of the system, which is filtered and contextually rendered according to different **Observer Intents** (e.g., SRE, Security, Architect, Operator).

### 3. Latent (Instantiation)
Systems and services in Eigenform are not persistent entities; they are **Situational Instantiations**. The **Latent** view visualizes the "Situation Topology" where services transition from a latent (potential) state to an active (instantiated) state only when demand or observation warrants it.

### 4. Teller (Narration)
The **Teller** is a pure observational engine. It generates time-series narration of substrate events (e.g., *"Node node-0 increased by 0.32"*). It maintains strict non-judgmentalism, avoiding polarizing terms like "error" or "success", and instead employing objective systems vocabulary like *"recursive transition"* or *"equilibrium variance"*, paired with context-collapsed meaning.

### 5. Aporia (Blind Spots)
The **Aporia** module analyzes the gap between the substrate reality and the observer's metrics. It identifies "unknown unknowns" and **Observation Gaps**, including:
- **Spectral Entropy Leakage**: Internal chaos not captured by load metrics.
- **Ghost Interactions**: Processing occurring in services marked as latent.
- **Semantic Depletion**: Technically valid data that lacks contextual meaning.
- **Cross-Node Recursive Loops**: Escalating circular feedback between active nodes.

---

## Tech Stack

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Custom brutalist aesthetic with monospace technical hierarchy)
- **Animation**: [Motion](https://motion.dev/) (Hardware-accelerated layout transitions and entry effects)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Brutalist Vector SVGs
- **State & Simulation**: Centralized React Context (`SubstrateContext`) with local persistence and variable-speed drift engine
- **Testing**: [Vitest](https://vitest.dev/) for unit and integration testing

---

## Project Structure

```text
├── AUDIT.md                 # Comprehensive architectural and code audit
├── ARCHITECTURE.md          # Technical specifications and data flows
├── PURPOSE.md               # Product philosophy and target user personas
├── README.md                # Project overview, documentation, and setup
├── TODO.md                  # Development roadmap and production tasks
├── index.html               # Entry HTML with synchronized title and OpenGraph tags
├── metadata.json            # Application metadata and runtime permissions
├── package.json             # Dependencies, scripts, and build configuration
├── vite.config.ts           # Vite configuration with Tailwind CSS plugin
└── src/
    ├── main.tsx             # Application mount entry point
    ├── App.tsx              # View router, header status box, and layout shell
    ├── types.ts             # Framework-wide domain types and interfaces
    ├── index.css            # Global Tailwind CSS imports and custom brutalist styling
    ├── context/
    │   └── SubstrateContext.tsx # Central substrate state, time drift, and event stream
    ├── lib/
    │   ├── eigenform-core.ts    # Intent inference, Aporia probes, and Satisfice algorithms
    │   └── eigenform-core.test.ts # Vitest unit and integration test suite
    └── components/
        ├── Sidebar.tsx          # Navigation sidebar with bespoke brutalist SVGs
        ├── EigenformView.tsx    # Conceptual framework entry point and role collapse demo
        ├── SatisficeView.tsx    # Intent-filtered substrate node matrix and manual collapse
        ├── LatentView.tsx       # Situational topology and dynamic instantiation logs
        ├── TellerView.tsx       # Dual-channel narration stream and persistent history
        ├── AporiaView.tsx       # Observability void ratio and active gap probe engine
        └── DiagnosticStream.tsx # Live diagnostic ticker with global time drift controls
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Run Tests
```bash
npm run test
```
Executes the Vitest test suite for core algorithms, satisfice filters, and Aporia probes.

### 4. Code Verification & Type Checking
```bash
npm run lint
```

### 5. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory ready for deployment.

---

## Architectural Logic

The system operates on a continuous **Intent/Collapse Cycle**:

```text
[ Raw Substrate ] ──> ( State Drift / Metric Mutation )
       │
       ├──> [ Observer Selects Intent Lens ]
       │            │
       │            ▼
       ├──> [ Satisfice Engine Filters Observables ]
       │            │
       │            ▼
       ├──> [ Teller Narrates Event + Contextual Meaning ]
       │            │
       │            ▼
       └──> [ Aporia Probes Detect Unmetered Reality Gaps ]
```

1. **Substrate State**: Maintains raw, objective metrics across all active, latent, and idle nodes.
2. **Intent Inference**: Maps an observer's perspective (SRE, Security, Architect, Operator) to specific threshold criteria.
3. **Satisficed Collapse**: Filters the visible universe down to the minimal meaningful subset for that intent.
4. **Non-Judgmental Narration**: Records and broadcasts transitions using objective vocabulary paired with context-sensitive interpretation.
5. **Aporia Analysis**: Continuously calculates the blind ratio and surfaces phenomena that escape official telemetry.

---

*"The system is what you need it to be."*
