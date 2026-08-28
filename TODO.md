# Eigenform Development Roadmap & Production Readiness

This document tracks the tasks required to align the application with the specifications in `ARCHITECTURE.md` and `PURPOSE.md`, and to elevate the codebase to portfolio-grade production standards.

---

## Active Development Tasks

### 1. Architectural Alignment & Substrate Synchronization
- [ ] **Latent View Substrate Unification**: Refactor `LatentView.tsx` to directly consume and instantiate services defined in `SubstrateContext.nodes` (e.g. `Auth Ghost`, `Packet Void`, `Shadow Buffer`) rather than maintaining a disconnected static service array.
- [ ] **Correlated Cascade Engine**: Enhance `executeDrift` in `SubstrateContext.tsx` to simulate correlated cascade failures (e.g., when a gateway node load exceeds 85%, interconnected downstream services experience entropy spikes).
- [ ] **Dynamic Intent Inference Interaction**: Enable user selection of arbitrary node clusters in `SatisficeView` to trigger `inferIntent(focusNodeIds)` automatically, demonstrating reverse intent inference in real time.

### 2. Observer Controls & Intent Customization
- [ ] **Interactive Threshold Tuning**: Add an expandable parameter tuning drawer in `SatisficeView` allowing the observer to adjust the sensitivity threshold (e.g., entropy filter from 0.1 to 0.9) and watch nodes collapse or reveal dynamically.
- [ ] **Custom Observer Role Builder**: Allow creating custom observer profiles (e.g., "Chaos Engineer", "Data Compliance Officer") with custom primary metrics and focus node assignments.
- [ ] **Substrate State Reset & Seeded Snapshots**: Provide one-click preset scenario loaders ("Cascade Avalanche", "Substrate Quiescence", "Zero-Day Incursion") to make demonstrations deterministic and compelling during portfolio walkthroughs.

### 3. Production Hardening & Accessibility (WCAG 2.1 AA)
- [ ] **Accessibility Attributes (ARIA)**: Add comprehensive `aria-label`, `role`, and `aria-live` attributes to the live diagnostic ticker, pause/speed controls, manual collapse triggers, and view switcher buttons.
- [ ] **Keyboard Navigation & Hotkeys**: Support numeric keyboard shortcuts (`1` through `5`) to instantly cycle through Eigenform views, and `Space` to toggle global time pause.
- [ ] **Data Export & Snapshot Serialization**: Add a "Export Telemetry JSON" feature in the header allowing users to download the current substrate state and collapsed narrative history.
- [ ] **Local Storage Schema Migration**: Add a versioned schema validator for `localStorage` items to prevent runtime crashes if saved state structure evolves.

### 4. Testing, Benchmarking & Reliability
- [ ] **Substrate Context Unit Tests**: Add test suites verifying `SubstrateContext` state drift clamping, speed multiplier logic, and log buffer bounds.
- [ ] **Property-Based Bounds Testing**: Implement property tests verifying that node metrics (`entropy`, `load`, `semanticDepth`, `significance`) strictly stay within mathematical limits `[0, 1]` or `[0, 100]` across thousands of simulated drift cycles.
- [ ] **Mocked Timer Scenario Tests**: Add Vitest tests using `vi.useFakeTimers()` to verify that drift timers cleanly start, stop, and update rates when `driftSpeed` changes.

---

## Completed Foundation Milestones

*All preliminary architecture tasks have been successfully implemented and validated:*
- **Centralized Substrate Provider**: React Context state management implemented in `/src/context/SubstrateContext.tsx` with dynamic metric updates and event propagation.
- **Unified Event Bus & Ticker**: Diagnostic log stream and ticker tape unified with live speed scaling (`0x`, `1x`, `2x`, `5x`).
- **Persistent History Layer**: Persistent collapse history storage with client-side synchronization and clear operations.
- **Cross-Node Recursive Loop Detection**: Multi-node feedback loop discovery added to `analyzeAporia` in `eigenform-core.ts`.
- **Vitest Testing Framework**: Testing infrastructure established with passing unit and integration tests in `src/lib/eigenform-core.test.ts`.
- **Brutalist SVG Design System**: Minimalist bespoke SVG icons crafted and integrated into `Sidebar.tsx`.
- **Internationalization & Language Cleanup**: Removed mixed Chinese text across all user-facing components and documentation to maintain 100% English portfolio standard.
