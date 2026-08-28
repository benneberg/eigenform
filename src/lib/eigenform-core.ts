/**
 * Eigenform Core - Implementation of Satisfice Substrate and Aporia Analysis
 */

import { SubstrateNode, ObservationGap, ObserverIntent, IntentType, SubstrateEvent, ScenarioPreset, ScenarioKey, ObserverRole } from "../types";

export const OBSERVER_INTENTS: Record<string, ObserverIntent> = {
  SRE: { type: "STABILITY", primaryMetric: "entropy", focusNodes: ["node-0", "node-3"], threshold: 0.5 },
  SECURITY: { type: "SECURITY", primaryMetric: "semanticDepth", focusNodes: ["node-2"], threshold: 0.8 },
  ARCHITECT: { type: "DISCOVERY", primaryMetric: "load", focusNodes: ["node-1", "node-4"], threshold: 0.2 },
  OPERATOR: { type: "EFFICIENCY", primaryMetric: "load", focusNodes: [], threshold: 0.3 }
};

export const INITIAL_SUBSTRATE: SubstrateNode[] = [
  { id: "node-0", name: "Core Sieve", type: "GATEWAY", status: "ACTIVE", load: 22, entropy: 0.12, semanticDepth: 0.98, lastTransition: "2026-06-09T18:00:00Z", significance: 0.95 },
  { id: "node-1", name: "Packet Void", type: "SERVICE", status: "LATENT", load: 0, entropy: 0.05, semanticDepth: 0.44, lastTransition: "2026-06-08T22:15:00Z", significance: 0.30 },
  { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "ACTIVE", load: 45, entropy: 0.33, semanticDepth: 0.88, lastTransition: "2026-06-09T19:22:00Z", significance: 0.85 },
  { id: "node-3", name: "Latency Sink", type: "DATABASE", status: "ACTIVE", load: 88, entropy: 0.67, semanticDepth: 0.92, lastTransition: "2026-06-09T19:44:00Z", significance: 0.70 },
  { id: "node-4", name: "Shadow Buffer", type: "SERVICE", status: "IDLE", load: 12, entropy: 0.11, semanticDepth: 0.12, lastTransition: "2026-06-07T12:00:00Z", significance: 0.15 },
];

export const PRESET_SCENARIOS: Record<ScenarioKey, ScenarioPreset> = {
  NOMINAL: {
    id: "NOMINAL",
    title: "Nominal Substrate",
    description: "Standard equilibrium with baseline operational entropy and balanced load across services.",
    role: ObserverRole.OPERATOR,
    nodes: [
      { id: "node-0", name: "Core Sieve", type: "GATEWAY", status: "ACTIVE", load: 24, entropy: 0.12, semanticDepth: 0.96, lastTransition: new Date().toISOString(), significance: 0.95 },
      { id: "node-1", name: "Packet Void", type: "SERVICE", status: "LATENT", load: 0, entropy: 0.04, semanticDepth: 0.45, lastTransition: new Date().toISOString(), significance: 0.30 },
      { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "ACTIVE", load: 42, entropy: 0.28, semanticDepth: 0.89, lastTransition: new Date().toISOString(), significance: 0.85 },
      { id: "node-3", name: "Latency Sink", type: "DATABASE", status: "ACTIVE", load: 52, entropy: 0.34, semanticDepth: 0.91, lastTransition: new Date().toISOString(), significance: 0.70 },
      { id: "node-4", name: "Shadow Buffer", type: "SERVICE", status: "IDLE", load: 10, entropy: 0.09, semanticDepth: 0.14, lastTransition: new Date().toISOString(), significance: 0.15 },
    ]
  },
  CASCADE_AVALANCHE: {
    id: "CASCADE_AVALANCHE",
    title: "Cascade Avalanche",
    description: "Core Gateway saturated at 96% load, causing downstream recursive entropy surge and service strain.",
    role: ObserverRole.SRE,
    nodes: [
      { id: "node-0", name: "Core Sieve", type: "GATEWAY", status: "ACTIVE", load: 96, entropy: 0.88, semanticDepth: 0.62, lastTransition: new Date().toISOString(), significance: 0.95 },
      { id: "node-1", name: "Packet Void", type: "SERVICE", status: "ACTIVE", load: 84, entropy: 0.75, semanticDepth: 0.38, lastTransition: new Date().toISOString(), significance: 0.30 },
      { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "ACTIVE", load: 78, entropy: 0.69, semanticDepth: 0.72, lastTransition: new Date().toISOString(), significance: 0.85 },
      { id: "node-3", name: "Latency Sink", type: "DATABASE", status: "ACTIVE", load: 94, entropy: 0.92, semanticDepth: 0.85, lastTransition: new Date().toISOString(), significance: 0.70 },
      { id: "node-4", name: "Shadow Buffer", type: "SERVICE", status: "ACTIVE", load: 66, entropy: 0.58, semanticDepth: 0.21, lastTransition: new Date().toISOString(), significance: 0.15 },
    ]
  },
  QUIESCENCE: {
    id: "QUIESCENCE",
    title: "Substrate Quiescence",
    description: "Cold dormant state. Minimal load (<10%) and near-zero entropy across all observable planes.",
    role: ObserverRole.ARCHITECT,
    nodes: [
      { id: "node-0", name: "Core Sieve", type: "GATEWAY", status: "ACTIVE", load: 6, entropy: 0.03, semanticDepth: 0.99, lastTransition: new Date().toISOString(), significance: 0.95 },
      { id: "node-1", name: "Packet Void", type: "SERVICE", status: "LATENT", load: 0, entropy: 0.01, semanticDepth: 0.50, lastTransition: new Date().toISOString(), significance: 0.30 },
      { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "LATENT", load: 0, entropy: 0.02, semanticDepth: 0.95, lastTransition: new Date().toISOString(), significance: 0.85 },
      { id: "node-3", name: "Latency Sink", type: "DATABASE", status: "IDLE", load: 4, entropy: 0.04, semanticDepth: 0.98, lastTransition: new Date().toISOString(), significance: 0.70 },
      { id: "node-4", name: "Shadow Buffer", type: "SERVICE", status: "LATENT", load: 0, entropy: 0.01, semanticDepth: 0.20, lastTransition: new Date().toISOString(), significance: 0.15 },
    ]
  },
  ZERO_DAY: {
    id: "ZERO_DAY",
    title: "Zero-Day Incursion",
    description: "Anomalous boundary penetration targeting Auth Ghost. Extreme semantic flux and ghost interactions.",
    role: ObserverRole.SECURITY,
    nodes: [
      { id: "node-0", name: "Core Sieve", type: "GATEWAY", status: "ACTIVE", load: 40, entropy: 0.35, semanticDepth: 0.90, lastTransition: new Date().toISOString(), significance: 0.95 },
      { id: "node-1", name: "Packet Void", type: "SERVICE", status: "LATENT", load: 28, entropy: 0.55, semanticDepth: 0.20, lastTransition: new Date().toISOString(), significance: 0.30 },
      { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "ACTIVE", load: 92, entropy: 0.89, semanticDepth: 0.18, lastTransition: new Date().toISOString(), significance: 0.85 },
      { id: "node-3", name: "Latency Sink", type: "DATABASE", status: "ACTIVE", load: 60, entropy: 0.48, semanticDepth: 0.88, lastTransition: new Date().toISOString(), significance: 0.70 },
      { id: "node-4", name: "Shadow Buffer", type: "SERVICE", status: "IDLE", load: 15, entropy: 0.14, semanticDepth: 0.15, lastTransition: new Date().toISOString(), significance: 0.15 },
    ]
  }
};

/**
 * Bounds clamping helper ensuring strict mathematical invariants:
 * load: [0, 100], entropy: [0.01, 0.99], semanticDepth: [0.01, 0.99], significance: [0, 1]
 */
export function clampSubstrateNode(node: SubstrateNode): SubstrateNode {
  return {
    ...node,
    load: Math.max(0, Math.min(100, Math.round(node.load))),
    entropy: Number(Math.max(0.01, Math.min(0.99, node.entropy)).toFixed(3)),
    semanticDepth: Number(Math.max(0.01, Math.min(0.99, node.semanticDepth)).toFixed(3)),
    significance: Number(Math.max(0, Math.min(1, node.significance)).toFixed(2))
  };
}

/**
 * Correlated Cascade Engine
 * Propagates stress from saturated upstream nodes to connected downstream services.
 */
export function applyCorrelatedCascade(nodes: SubstrateNode[]): { updatedNodes: SubstrateNode[]; cascadeTriggered: boolean; message?: string } {
  const gateway = nodes.find(n => n.type === "GATEWAY");
  
  if (gateway && gateway.status === "ACTIVE" && gateway.load > 80) {
    // Gateway pressure ripples to downstream services
    let affected = 0;
    const updatedNodes = nodes.map(node => {
      if (node.id !== gateway.id && (node.type === "SERVICE" || node.type === "DATABASE")) {
        affected++;
        const loadIncrement = Math.floor(Math.random() * 8) + 4;
        const entropyIncrement = (Math.random() * 0.08) + 0.02;
        return clampSubstrateNode({
          ...node,
          load: node.load + loadIncrement,
          entropy: node.entropy + entropyIncrement,
          status: node.status === "LATENT" ? "ACTIVE" : node.status,
          lastTransition: new Date().toISOString()
        });
      }
      return node;
    });

    return {
      updatedNodes,
      cascadeTriggered: true,
      message: `Cascade Avalanche: Gateway '${gateway.name}' saturation (${gateway.load}%) propagated load pressure to ${affected} downstream nodes.`
    };
  }

  return { updatedNodes: nodes, cascadeTriggered: false };
}

export function analyzeAporia(nodes: SubstrateNode[]): ObservationGap[] {
  const gaps: ObservationGap[] = [];

  nodes.forEach(node => {
    if (node.status === "ACTIVE" && node.entropy > 0.4) {
      gaps.push({
        id: `gap-${node.id}-entropy`,
        source: node.name,
        phenomenon: "Spectral Entropy Leakage",
        severity: "HIGH",
        description: `Node '${node.name}' exhibits high internal chaos that isn't captured by current load metrics.`
      });
    }

    if (node.status === "LATENT" && node.load > 0) {
      gaps.push({
        id: `gap-${node.id}-ghost`,
        source: node.name,
        phenomenon: "Ghost Interaction",
        severity: "MEDIUM",
        description: `Services marked as latent are actively processing signals outside official telemetry.`
      });
    }

    if (node.status === "ACTIVE" && node.semanticDepth < 0.2) {
      gaps.push({
        id: `gap-${node.id}-shallow`,
        source: node.name,
        phenomenon: "Semantic Depletion",
        severity: "LOW",
        description: `Observations of '${node.name}' are returning technically valid but contextually empty data.`
      });
    }
  });

  // Cross-node recursive feedback loop detection
  const activeHighStressNodes = nodes.filter(n => n.status === "ACTIVE" && (n.load > 60 || n.entropy > 0.5));
  if (activeHighStressNodes.length >= 2) {
    gaps.push({
      id: "gap-recursive-loop",
      source: activeHighStressNodes.map(n => n.name).join(" ↔ "),
      phenomenon: "Cross-Node Recursive Loop",
      severity: "HIGH",
      description: `Potential self-reinforcing feedback loop identified between ${activeHighStressNodes.map(n => `'${n.name}'`).join(" and ")}. Signal is cycling recursively, escalating entropy.`
    });
  }

  return gaps;
}

/**
 * Intent Inference Engine
 * Models potential observer goals based on interaction focal points.
 */
export function inferIntent(focusNodeIds: string[]): ObserverIntent {
  if (focusNodeIds.length === 0) return OBSERVER_INTENTS.OPERATOR;
  
  // Security focus (Auth Ghost)
  if (focusNodeIds.includes("node-2") && !focusNodeIds.includes("node-0") && !focusNodeIds.includes("node-3")) {
    return { ...OBSERVER_INTENTS.SECURITY, focusNodes: focusNodeIds };
  }
  
  // Architect focus (Latent or Edge services: Packet Void, Shadow Buffer)
  if ((focusNodeIds.includes("node-1") || focusNodeIds.includes("node-4")) && !focusNodeIds.includes("node-0") && !focusNodeIds.includes("node-3")) {
    return { ...OBSERVER_INTENTS.ARCHITECT, focusNodes: focusNodeIds };
  }
  
  // SRE focus (Core Sieve, Latency Sink, or critical infrastructure)
  if (focusNodeIds.includes("node-0") || focusNodeIds.includes("node-3")) {
    return { ...OBSERVER_INTENTS.SRE, focusNodes: focusNodeIds };
  }

  return { ...OBSERVER_INTENTS.OPERATOR, focusNodes: focusNodeIds };
}

/**
 * Versioned Schema Validator for LocalStorage persistence
 */
export const CURRENT_SCHEMA_VERSION = 2;

export function validateSubstrateNodes(data: unknown): SubstrateNode[] | null {
  if (!Array.isArray(data) || data.length === 0) return null;
  const isValid = data.every(item => 
    typeof item === "object" && item !== null &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.load === "number" &&
    typeof item.entropy === "number" &&
    typeof item.semanticDepth === "number" &&
    (item.status === "ACTIVE" || item.status === "LATENT" || item.status === "IDLE")
  );
  if (!isValid) return null;
  return (data as SubstrateNode[]).map(clampSubstrateNode);
}

export function validateHistory(data: unknown): { id: string; timestamp: string; role: ObserverRole; nodeName: string; meaning: string }[] | null {
  if (!Array.isArray(data)) return null;
  const isValid = data.every(item => 
    typeof item === "object" && item !== null &&
    typeof item.id === "string" &&
    typeof item.timestamp === "string" &&
    typeof item.nodeName === "string" &&
    typeof item.meaning === "string"
  );
  return isValid ? data : null;
}

/**
 * Satisfice Substrate Logic
 * Returns the minimal subset of nodes required to satisfy a specific intent.
 */
export function renderSatisfice(nodes: SubstrateNode[], intent: ObserverIntent): SubstrateNode[] {
  if (intent.type === "DISCOVERY") return nodes; // Architects see everything
  
  // SREs and Operators only see nodes relevant to their intent or nodes above threshold
  return nodes.filter(node => 
    intent.focusNodes.includes(node.id) || 
    (intent.type === "STABILITY" && node.entropy > intent.threshold) ||
    (intent.type === "EFFICIENCY" && (node.load / 100) > intent.threshold)
  );
}

/**
 * Teller Narration & Meaning Generation
 * Pure observation paired with intent-collapsed meaning.
 */
export function generateNarration(event: SubstrateEvent, intent: ObserverIntent): { narration: string, meaning: string } {
  const { nodeId, change, magnitude } = event;
  const node = INITIAL_SUBSTRATE.find(n => n.id === nodeId);
  const nodeName = node ? node.name : nodeId;
  
  const narration = `Node ${nodeId} (${nodeName}) ${change} by ${magnitude.toFixed(2)}. Transition recorded in substrate.`;
  
  let meaning = "";
  switch (intent.type) {
    case "STABILITY":
      meaning = magnitude > 0.3 ? "System stability challenged. Recalibrating equilibrium." : "Nominal fluctuations. Stability maintained.";
      break;
    case "SECURITY":
      meaning = change === "increased" ? "Incursion probability rising. Validating boundaries." : "Security posture hardening. Intent verified.";
      break;
    case "EFFICIENCY":
      meaning = change === "decreased" ? "Waste reduction in progress. Streamlining load." : "Resource consumption shift detected. Observation density stable.";
      break;
    case "DISCOVERY":
      meaning = "New topology emerged. Expanding latent coordinate map.";
      break;
    default:
      meaning = "Situation topology metadata updated.";
  }

  return { narration, meaning };
}
