/**
 * Eigenform - Observer-Relative Adaptive Systems Framework 
 */

export enum ObserverRole {
  NEUTRAL = "NEUTRAL",
  SRE = "SRE",
  SECURITY = "SECURITY",
  ARCHITECT = "ARCHITECT",
  OPERATOR = "OPERATOR"
}

export type IntentType = "STABILITY" | "EFFICIENCY" | "SECURITY" | "DISCOVERY";

export interface ObserverIntent {
  type: IntentType;
  primaryMetric: string;
  focusNodes: string[]; // IDs of nodes the observer is interested in
  threshold: number;
}

export interface SubstrateEvent {
  timestamp: string;
  nodeId: string;
  change: string;
  magnitude: number;
}

export interface SystemNode {
  id: string;
  name: string;
  type: "SERVICE" | "DATABASE" | "GATEWAY";
  status: "ACTIVE" | "LATENT" | "IDLE";
  load: number;
}

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "UP" | "DOWN" | "STABLE";
}

export interface SubstrateNode extends SystemNode {
  entropy: number;
  semanticDepth: number;
  lastTransition: string;
  significance: number; // 0 to 1, inherent importance of the node
}

export interface ObservationGap {
  id: string;
  source: string;
  phenomenon: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  description: string;
}

export interface ConceptDefinition {
  id: string;
  name: string;
  principle: string;
}

export type ScenarioKey = "NOMINAL" | "CASCADE_AVALANCHE" | "QUIESCENCE" | "ZERO_DAY";

export interface ScenarioPreset {
  id: ScenarioKey;
  title: string;
  description: string;
  role: ObserverRole;
  nodes: SubstrateNode[];
}

export interface ObserverProfile {
  id: string;
  name: string;
  role: ObserverRole;
  intent: ObserverIntent;
  description: string;
}

export const CONCEPTS: ConceptDefinition[] = [
  { id: "eigenform", name: "Eigenform", principle: "Observer-dependent collapse of system meaning" },
  { id: "satisfice", name: "Satisfice", principle: "Minimum meaningful substrate for context" },
  { id: "latent", name: "Latent", principle: "Situationally instantiated services" },
  { id: "teller", name: "Teller", principle: "Pure observational narration" },
  { id: "aporia", name: "Aporia", principle: "Revealing blind spots in predefined observability" }
];
