/**
 * Eigenform Core - Implementation of Satisfice Substrate and Aporia Analysis
 */

import { SubstrateNode, ObservationGap, ObserverIntent, IntentType, SubstrateEvent } from "../types";

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
  if (focusNodeIds.includes("node-0") || focusNodeIds.includes("node-3")) return OBSERVER_INTENTS.SRE;
  if (focusNodeIds.includes("node-2")) return OBSERVER_INTENTS.SECURITY;
  return OBSERVER_INTENTS.OPERATOR;
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
