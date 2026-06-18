# Eigenform Code Review & Recommendations

## Honest Assessment
The current implementation of the Eigenform framework is a robust concept-demo with a highly polished visual layer and clear modular separation. The core logic in `eigenform-core.ts` successfully implements the "Intent/Collapse" cycle. However, much of the system's "life" is currently simulated through localized random generators rather than a centralized event-driven architecture.

### Strengths
- **Clean Type Definitions**: `src/types.ts` provides a solid foundation for further expansion.
- **Modular Components**: Each Eigenform concept (Satisfice, Teller, Aporia) is encapsulated in its own view.
- **Sophisticated UI**: Excellent use of Tailwind and Motion for a "high-tech/brutalist" aesthetic that fits the cybernetic theme.

### Weaknesses
- **State Fragmentation**: Substrate events are generated independently in `DiagnosticStream`, `TellerView`, and `LatentView`.
- **Hardcoded Substrate**: The `INITIAL_SUBSTRATE` is static.
- **Lack of Persistence**: No backend integration for saving simulation history.
- **No Test Coverage**: The core logic is critical but untested.

## Suggested Improvements
1. **Centralize System State**: Implement a `SubstrateStore` (using React Context or a lightweight store) to manage the common state of nodes and events.
2. **Unified Event Bus**: Create a central emitter for `SubstrateEvent`s so that `Teller`, `DiagnosticStream`, and `Aporia` all respond to the same "reality."
3. **Real-time Mutation**: Allow substrate metrics (Entropy, Load) to fluctuate globally over time rather than just being simulated in specific views.
4. **Persistence Layer**: Integrate Firebase (as per framework guidelines) to store long-term "Collapse" history.

## Development TODOs

### Core Logic & State
- [ ] Implement a centralized `SubstrateProvider` using React Context.
- [ ] Refactor `INITIAL_SUBSTRATE` to allow for dynamic state updates.
- [ ] Connect `DiagnosticStream` to the centralized event bus.
- [ ] Create a `MutationEngine` to simulate ongoing system drift and entropy fluctuations.

### Features & Integrations
- [ ] Add "History" persistence using Firestore.
- [ ] Implement real-time multi-user "Shared Intent" (multiple observers seeing the same collapse).
- [ ] Expand `Aporia` probes to include cross-node recursive loop detection.

### Testing & Infrastructure
- [ ] Set up a testing framework (e.g., Vitest).
- [ ] Add unit tests for `eigenform-core.ts` (Satisfice rendering, Intent inference).
- [ ] Add integration tests for Observer Role transitions.
- [ ] Replace `Math.random` simulations with deterministic seeded generators for reproducible scenarios.

### UI/UX
- [ ] Add mobile-specific optimizations for the "Aporia" gap analysis list.
- [ ] Implement a "Global Time" control to pause or accelerate the system substrate drift.
