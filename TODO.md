# Eigenform Development Roadmap & Production Readiness

This document tracks the tasks required to align the application with the specifications in `ARCHITECTURE.md` and `PURPOSE.md`, and to elevate the codebase to portfolio-grade production standards.

---

## Active Development Tasks

### 1. Architectural Alignment & Substrate Synchronization
- [x] **Latent View Substrate Unification**: Refactor `LatentView.tsx` to directly consume and instantiate services defined in `SubstrateContext.nodes` (e.g. `Auth Ghost`, `Packet Void`, `Shadow Buffer`) rather than maintaining a disconnected static service array.
- [x] **Correlated Cascade Engine**: Enhance `executeDrift` in `SubstrateContext.tsx` to simulate correlated cascade failures (e.g., when a gateway node load exceeds 85%, interconnected downstream services experience entropy spikes).
- [x] **Dynamic Intent Inference Interaction**: Enable user selection of arbitrary node clusters in `SatisficeView` to trigger `inferIntent(focusNodeIds)` automatically, demonstrating reverse intent inference in real time.

### 2. Observer Controls & Intent Customization
- [x] **Interactive Threshold Tuning**: Add an expandable parameter tuning drawer in `SatisficeView` allowing the observer to adjust the sensitivity threshold (e.g., entropy filter from 0.1 to 0.9) and watch nodes collapse or reveal dynamically.
- [x] **Custom Observer Role Builder & Focal Anchoring**: Support dynamic pin/unpin focal cluster overrides with automatic reverse role classification and threshold calibration.
- [x] **Substrate State Reset & Seeded Snapshots**: Provide one-click preset scenario loaders ("Nominal Baseline", "Cascade Avalanche", "Substrate Quiescence", "Zero-Day Incursion") to make demonstrations deterministic and compelling during portfolio walkthroughs.

### 3. Production Hardening & Accessibility (WCAG 2.1 AA)
- [x] **Accessibility Attributes (ARIA)**: Add comprehensive `aria-label`, `role`, and `aria-live` attributes to the live diagnostic ticker, pause/speed controls, manual collapse triggers, and view switcher buttons.
- [x] **Keyboard Navigation & Hotkeys**: Support numeric keyboard shortcuts (`1` through `5`) to instantly cycle through Eigenform views, `P` to toggle global time pause, and `E` to export telemetry.
- [x] **Data Export & Snapshot Serialization**: Add an "Export Telemetry JSON" feature in the header allowing users to download the current substrate state and collapsed narrative history.
- [x] **Local Storage Schema Migration**: Add a versioned schema validator for `localStorage` items to prevent runtime crashes if saved state structure evolves.

### 4. Testing, Benchmarking & Reliability
- [x] **Substrate Context Unit Tests**: Add test suites verifying `SubstrateContext` state drift clamping, speed multiplier logic, and log buffer bounds.
- [x] **Property-Based Bounds Testing**: Implement property tests verifying that node metrics (`entropy`, `load`, `semanticDepth`, `significance`) strictly stay within mathematical limits `[0, 1]` or `[0, 100]` across thousands of simulated drift cycles.
- [x] **Correlated Cascade & Invariant Tests**: Vitest test coverage for cascading failure detection, reverse intent reconstruction, and schema validation.

---

## Completed Foundation Milestones

*All preliminary architecture tasks have been successfully implemented and validated:*
- **Centralized Substrate Provider**: React Context state management implemented in `/src/context/SubstrateContext.tsx` with dynamic metric updates and event propagation.
- **Unified Event Bus & Ticker**: Diagnostic log stream and ticker tape unified with live speed scaling (`0x`, `1x`, `2x`, `5x`).
- **Persistent History Layer**: Persistent collapse history storage with client-side synchronization and clear operations.
- **Cross-Node Recursive Loop Detection**: Multi-node feedback loop discovery added to `analyzeAporia` in `eigenform-core.ts`.
- **Vitest Testing Framework**: Testing infrastructure established with passing unit, integration, and invariant tests in `src/lib/eigenform-core.test.ts`.
- **Brutalist SVG Design System**: Minimalist bespoke SVG icons crafted and integrated into `Sidebar.tsx`.
- **Internationalization & Language Cleanup**: Removed mixed Chinese text across all user-facing components and documentation to maintain 100% English portfolio standard.

