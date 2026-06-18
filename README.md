# Eigenform Framework

Eigenform is an **Observer-Relative Adaptive Systems Framework** designed to model complex systems where "meaning" is not an intrinsic property but an emergent phenomenon created through the interaction between an observer and a substrate.

This repository implements the core conceptual modules of the Eigenform specification, providing a real-time simulation of system state collapse, latent service instantiation, and non-judgmental observational narration.

## Documentation
- **[PURPOSE.md](./PURPOSE.md)**: Product vision, target audience, and value proposition.
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Technical overview of the Intent/Collapse cycle and core modules.
- **[TODO.md](./TODO.md)**: Code review feedback and future development roadmap.

## 核心概念 (Core Concepts)

### 1. Eigenform
The overarching design philosophy. In this framework, the system does not have a single fixed state. Instead, it "collapses" into a specific rendering based on the **Observer's Intent**, revealing only the information relevant to that specific context.

### 2. Satisfice (Substrate)
The **Satisfice** module defines the minimal meaningful substrate—a stable data structure that exists independently of any specific observation. It serves as the objective layer of the system, which is then filtered and satisfyingly rendered according to different **Observer Intents** (e.g., SRE, Security, Architect).

### 3. Latent (Instantiation)
Systems and services in Eigenform are not persistent entities; they are **Situational Instantiations**. The **Latent** view visualizes the "Situation Topology" where services transition from a latent (potential) state to an active (instantiated) state when demand or observation warrants it.

### 4. Teller (Narration)
The **Teller** is a pure observational engine. It generates time-series narration of substrate events (e.g., "Node node-0 increased by 0.32"). It maintains strict non-judgmentalism, avoiding words like "error" or "success", and instead using terms like "recursive transition" or "equilibrium variance."

### 5. Aporia (Blind Spots)
The **Aporia** module analyzes the gap between the substrate reality and the observer's metrics. It identifies "unknown unknowns" or **Observation Gaps**, such as:
- **Spectral Entropy Leakage**: Internal chaos not captured by load metrics.
- **Ghost Interactions**: Processing occurring in services marked as latent.
- **Semantic Depletion**: Technically valid data that lacks contextual meaning.

## 技术栈 (Tech Stack)

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Motion](https://motion.dev/) (fka Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Simulation**: Custom Intent Inference Engine & Substrate Event Generator

## 项目结构 (Project Structure)

```text
src/
├── components/         # Modular View Implementations (Latent, Teller, Aporia, etc.)
├── lib/
│   └── eigenform-core.ts # Core logic: Intent inference, Aporia analysis, Satisfice rendering
├── types.ts            # Framework-wide type definitions and interfaces
└── App.tsx             # Main application entry and view router
```

## 快速开始 (Quick Start)

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 代码检测
```bash
npm run lint
```

## 架构逻辑 (Architectural Logic)

The system operates on an **Intent/Collapse** cycle:

1. **Substrate Update**: The `INITIAL_SUBSTRATE` maintains raw metrics (entropy, load, semantic depth).
2. **Observer Interaction**: Users select an **Observer Role** (SRE, Operator, etc.).
3. **Intent Inference**: The system maps the role to an `ObserverIntent` (Stability, Efficiency, Security).
4. **Collapse (Satisfice)**: The framework filters the substrate nodes based on the intent thresholds.
5. **Narration (Teller)**: Events occurring at the substrate level are narrated through the lens of the specific intent.
6. **Gap Discovery (Aporia)**: Probes identify where the collapse hide critical complexity.

---

*"The system is what you need it to be."*
