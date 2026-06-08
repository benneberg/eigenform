/**
 * Eigenform - Observer-Relative Adaptive Systems Framework 
 */

export enum ObserverRole {
  NEUTRAL = "NEUTRAL",
  SRE = "SRE",
  MARKETER = "MARKETER",
  SECURITY = "SECURITY",
  RESEARCHER = "RESEARCHER"
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

export interface ConceptDefinition {
  id: string;
  name: string;
  principle: string;
}

export const CONCEPTS: ConceptDefinition[] = [
  { id: "eigenform", name: "Eigenform", principle: "Observer-dependent collapse of system meaning" },
  { id: "satisfice", name: "Satisfice", principle: "Minimum meaningful substrate for context" },
  { id: "latent", name: "Latent", principle: "Situationally instantiated services" },
  { id: "teller", name: "Teller", principle: "Pure observational narration" },
  { id: "aporia", name: "Aporia", principle: "Revealing blind spots in predefined observability" }
];
