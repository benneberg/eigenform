import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { SubstrateNode, SubstrateEvent, ObserverRole, ObserverIntent, ObservationGap, ScenarioKey } from "../types";
import { 
  INITIAL_SUBSTRATE, 
  OBSERVER_INTENTS, 
  PRESET_SCENARIOS, 
  generateNarration, 
  analyzeAporia, 
  applyCorrelatedCascade, 
  clampSubstrateNode, 
  inferIntent, 
  validateSubstrateNodes, 
  validateHistory, 
  CURRENT_SCHEMA_VERSION 
} from "../lib/eigenform-core";

export interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: "COLLAPSE" | "SUBSTRATE" | "OBSERVATION" | "SYSTEM";
  meaning?: string;
  nodeId?: string;
}

interface SubstrateContextType {
  nodes: SubstrateNode[];
  activeRole: ObserverRole;
  setActiveRole: (role: ObserverRole) => void;
  activeIntent: ObserverIntent;
  customThreshold: number | null;
  setCustomThreshold: (threshold: number | null) => void;
  focalNodeIds: string[];
  toggleFocalNode: (nodeId: string) => void;
  clearFocalNodes: () => void;
  activeScenario: ScenarioKey | "CUSTOM";
  loadPresetScenario: (key: ScenarioKey) => void;
  toggleNodeStatus: (nodeId: string) => void;
  exportTelemetry: () => void;
  logs: LogEntry[];
  addCustomLog: (message: string, type: LogEntry["type"]) => void;
  clearLogs: () => void;
  driftSpeed: number; // 0 (paused), 1 (normal), 2 (fast), 5 (hyper)
  setDriftSpeed: (speed: number) => void;
  history: { id: string; timestamp: string; role: ObserverRole; nodeName: string; meaning: string }[];
  clearHistory: () => void;
  aporiaGaps: ObservationGap[];
  triggerManualCollapse: (nodeId: string) => void;
}

const SubstrateContext = createContext<SubstrateContextType | undefined>(undefined);

export const SubstrateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Versioned schema migration
  const [nodes, setNodes] = useState<SubstrateNode[]>(() => {
    try {
      const storedVersion = localStorage.getItem("eigenform_schema_version");
      if (storedVersion !== String(CURRENT_SCHEMA_VERSION)) {
        localStorage.setItem("eigenform_schema_version", String(CURRENT_SCHEMA_VERSION));
        localStorage.setItem("eigenform_nodes", JSON.stringify(INITIAL_SUBSTRATE));
        return INITIAL_SUBSTRATE;
      }
      const saved = localStorage.getItem("eigenform_nodes");
      if (saved) {
        const parsed = JSON.parse(saved);
        const validated = validateSubstrateNodes(parsed);
        if (validated) return validated;
      }
    } catch {
      // Fallback
    }
    return INITIAL_SUBSTRATE;
  });

  const [activeRole, setActiveRoleState] = useState<ObserverRole>(() => {
    const saved = localStorage.getItem("eigenform_active_role");
    return (saved as ObserverRole) || ObserverRole.SRE;
  });

  const [activeScenario, setActiveScenario] = useState<ScenarioKey | "CUSTOM">("NOMINAL");
  const [customThreshold, setCustomThreshold] = useState<number | null>(null);
  const [focalNodeIds, setFocalNodeIds] = useState<string[]>([]);
  const [driftSpeed, setDriftSpeed] = useState<number>(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  const [history, setHistory] = useState<{ id: string; timestamp: string; role: ObserverRole; nodeName: string; meaning: string }[]>(() => {
    try {
      const saved = localStorage.getItem("eigenform_collapse_history");
      if (saved) {
        const validated = validateHistory(JSON.parse(saved));
        if (validated) return validated;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const logIdCounter = useRef(0);
  const mutationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem("eigenform_nodes", JSON.stringify(nodes));
    localStorage.setItem("eigenform_schema_version", String(CURRENT_SCHEMA_VERSION));
  }, [nodes]);

  const setActiveRole = (role: ObserverRole) => {
    setActiveRoleState(role);
    localStorage.setItem("eigenform_active_role", role);
    setFocalNodeIds([]); // Reset manual focus when switching predefined role
    
    const newEntry: LogEntry = {
      id: logIdCounter.current++,
      message: `Observer shifted perspective to ${role} lens.`,
      timestamp: new Date().toLocaleTimeString(),
      type: "OBSERVATION",
      meaning: `Observational field collapsed relative to ${role} intent parameters.`
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 50));
  };

  // Base intent with optional dynamic threshold override
  const baseIntent = OBSERVER_INTENTS[activeRole === ObserverRole.NEUTRAL ? "OPERATOR" : activeRole] || OBSERVER_INTENTS.OPERATOR;
  const activeIntent: ObserverIntent = {
    ...baseIntent,
    focusNodes: focalNodeIds.length > 0 ? focalNodeIds : baseIntent.focusNodes,
    threshold: customThreshold !== null ? customThreshold : baseIntent.threshold
  };

  // Dynamic focal cluster selection & reverse intent inference
  const toggleFocalNode = (nodeId: string) => {
    setFocalNodeIds(prev => {
      const next = prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId];
      if (next.length > 0) {
        const inferred = inferIntent(next);
        const matchingRole = Object.entries(OBSERVER_INTENTS).find(
          ([, intent]) => intent.type === inferred.type
        );
        if (matchingRole) {
          setActiveRoleState(matchingRole[0] as ObserverRole);
        }
        
        const newEntry: LogEntry = {
          id: logIdCounter.current++,
          message: `Reverse Intent Inferred: ${inferred.type} based on focal cluster [${next.join(", ")}].`,
          timestamp: new Date().toLocaleTimeString(),
          type: "OBSERVATION",
          meaning: `Intent reconstructed dynamically from observer's focal fixation pattern.`
        };
        setLogs(l => [newEntry, ...l].slice(0, 50));
      }
      return next;
    });
  };

  const clearFocalNodes = () => {
    setFocalNodeIds([]);
  };

  // Preset scenario loading
  const loadPresetScenario = (key: ScenarioKey) => {
    const preset = PRESET_SCENARIOS[key];
    if (!preset) return;

    setNodes(preset.nodes.map(clampSubstrateNode));
    setActiveRoleState(preset.role);
    setActiveScenario(key);
    setCustomThreshold(null);
    setFocalNodeIds([]);

    const newEntry: LogEntry = {
      id: logIdCounter.current++,
      message: `Scenario '${preset.title}' initialized into substrate plane.`,
      timestamp: new Date().toLocaleTimeString(),
      type: "SYSTEM",
      meaning: preset.description
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 50));
  };

  // Situational instantiation / latency toggling
  const toggleNodeStatus = (nodeId: string) => {
    setNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        const isCurrentlyActive = node.status === "ACTIVE";
        const nextStatus: "ACTIVE" | "LATENT" = isCurrentlyActive ? "LATENT" : "ACTIVE";
        const nextLoad = isCurrentlyActive ? 0 : 45;
        const nextEntropy = isCurrentlyActive ? 0.05 : 0.35;

        const updated = clampSubstrateNode({
          ...node,
          status: nextStatus,
          load: nextLoad,
          entropy: nextEntropy,
          lastTransition: new Date().toISOString()
        });

        const newEntry: LogEntry = {
          id: logIdCounter.current++,
          message: `Situational Instantiation: '${node.name}' transitioned from ${node.status} to ${nextStatus}.`,
          timestamp: new Date().toLocaleTimeString(),
          type: "COLLAPSE",
          meaning: nextStatus === "ACTIVE" 
            ? `Demand instantiated temporary service topology for '${node.name}'.` 
            : `Observation ceased. '${node.name}' returned to latent potential.`,
          nodeId: node.id
        };
        setLogs(l => [newEntry, ...l].slice(0, 50));
        return updated;
      }
      return node;
    }));
  };

  // Telemetry serialization & export
  const exportTelemetry = () => {
    const telemetryData = {
      framework: "Eigenform",
      version: "1.0.0",
      schemaVersion: CURRENT_SCHEMA_VERSION,
      exportTimestamp: new Date().toISOString(),
      activeRole,
      activeIntent,
      activeScenario,
      driftSpeed,
      nodes,
      aporiaGaps,
      history,
      recentLogs: logs
    };

    const blob = new Blob([JSON.stringify(telemetryData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eigenform-telemetry-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const newEntry: LogEntry = {
      id: logIdCounter.current++,
      message: "Telemetry snapshot serialized and exported successfully.",
      timestamp: new Date().toLocaleTimeString(),
      type: "SYSTEM"
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 50));
  };

  const aporiaGaps = analyzeAporia(nodes);

  const addCustomLog = (message: string, type: LogEntry["type"]) => {
    const newEntry: LogEntry = {
      id: logIdCounter.current++,
      message,
      timestamp: new Date().toLocaleTimeString(),
      type
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 50));
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("eigenform_collapse_history");
  };

  // Central event generation, state drift & correlated cascade
  const executeDrift = () => {
    setNodes(prevNodes => {
      // Pick random node to mutate
      const randomIndex = Math.floor(Math.random() * prevNodes.length);
      const targetNode = prevNodes[randomIndex];
      
      const deltaLoad = Math.floor((Math.random() - 0.5) * 16);
      const deltaEntropy = (Math.random() - 0.5) * 0.14;
      const deltaDepth = (Math.random() - 0.5) * 0.10;

      const newLoad = Math.max(0, Math.min(100, targetNode.load + deltaLoad));
      const newEntropy = Math.max(0.01, Math.min(0.99, targetNode.entropy + deltaEntropy));
      const newDepth = Math.max(0.01, Math.min(0.99, targetNode.semanticDepth + deltaDepth));

      const updatedNode = clampSubstrateNode({
        ...targetNode,
        load: targetNode.status === "LATENT" && Math.random() > 0.75 ? 12 : targetNode.status === "IDLE" ? Math.max(0, Math.min(20, newLoad)) : newLoad,
        entropy: newEntropy,
        semanticDepth: newDepth,
        status: targetNode.status === "LATENT" && newLoad > 10 ? "ACTIVE" : targetNode.status === "ACTIVE" && newLoad === 0 ? "IDLE" : targetNode.status,
        lastTransition: new Date().toISOString()
      });

      let mutatedNodes = prevNodes.map((n, i) => i === randomIndex ? updatedNode : n);

      // Apply Correlated Cascade propagation
      const cascadeResult = applyCorrelatedCascade(mutatedNodes);
      if (cascadeResult.cascadeTriggered && cascadeResult.message) {
        mutatedNodes = cascadeResult.updatedNodes;
        const cascadeLog: LogEntry = {
          id: logIdCounter.current++,
          message: cascadeResult.message,
          timestamp: new Date().toLocaleTimeString(),
          type: "COLLAPSE",
          meaning: "High-stress cascade ripple detected across interdependent substrate topology."
        };
        setLogs(prev => [cascadeLog, ...prev].slice(0, 50));
      }

      // Trigger standard substrate event & Teller generation
      const changeType = deltaLoad >= 0 ? "increased" : "decreased";
      const event: SubstrateEvent = {
        timestamp: new Date().toISOString(),
        nodeId: targetNode.id,
        change: changeType,
        magnitude: Math.abs(deltaLoad)
      };

      const result = generateNarration(event, activeIntent);
      
      const newEntry: LogEntry = {
        id: logIdCounter.current++,
        message: result.narration,
        timestamp: new Date().toLocaleTimeString(),
        type: updatedNode.status !== targetNode.status ? "COLLAPSE" : "SUBSTRATE",
        meaning: result.meaning,
        nodeId: targetNode.id
      };

      setLogs(prev => [newEntry, ...prev].slice(0, 50));

      // Append to persistent History
      const historyItem = {
        id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toLocaleTimeString(),
        role: activeRole,
        nodeName: targetNode.name,
        meaning: result.meaning
      };

      setHistory(prevHist => {
        const nextHist = [historyItem, ...prevHist].slice(0, 100);
        localStorage.setItem("eigenform_collapse_history", JSON.stringify(nextHist));
        return nextHist;
      });

      return mutatedNodes;
    });
  };

  // Manual intervention trigger
  const triggerManualCollapse = (nodeId: string) => {
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode = clampSubstrateNode({
            ...node,
            load: 95,
            entropy: 0.92,
            status: "ACTIVE",
            lastTransition: new Date().toISOString()
          });

          const event: SubstrateEvent = {
            timestamp: new Date().toISOString(),
            nodeId: node.id,
            change: "forced collapse",
            magnitude: 0.9
          };

          const result = generateNarration(event, activeIntent);
          
          const newEntry: LogEntry = {
            id: logIdCounter.current++,
            message: `Observer forced complete state collapse on Node '${node.name}'.`,
            timestamp: new Date().toLocaleTimeString(),
            type: "COLLAPSE",
            meaning: result.meaning,
            nodeId: node.id
          };

          setLogs(prev => [newEntry, ...prev].slice(0, 50));

          const historyItem = {
            id: `hist-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            role: activeRole,
            nodeName: node.name,
            meaning: `State Forced Collapse: ${result.meaning}`
          };
          setHistory(prevHist => {
            const nextHist = [historyItem, ...prevHist].slice(0, 100);
            localStorage.setItem("eigenform_collapse_history", JSON.stringify(nextHist));
            return nextHist;
          });

          return updatedNode;
        }
        return node;
      });
    });
  };

  useEffect(() => {
    if (mutationIntervalRef.current) clearInterval(mutationIntervalRef.current);

    if (driftSpeed > 0) {
      const intervalMs = 3000 / driftSpeed;
      mutationIntervalRef.current = setInterval(executeDrift, intervalMs);
    }

    return () => {
      if (mutationIntervalRef.current) clearInterval(mutationIntervalRef.current);
    };
  }, [driftSpeed, activeRole, customThreshold]);

  return (
    <SubstrateContext.Provider value={{
      nodes,
      activeRole,
      setActiveRole,
      activeIntent,
      customThreshold,
      setCustomThreshold,
      focalNodeIds,
      toggleFocalNode,
      clearFocalNodes,
      activeScenario,
      loadPresetScenario,
      toggleNodeStatus,
      exportTelemetry,
      logs,
      addCustomLog,
      clearLogs,
      driftSpeed,
      setDriftSpeed,
      history,
      clearHistory,
      aporiaGaps,
      triggerManualCollapse
    }}>
      {children}
    </SubstrateContext.Provider>
  );
};

export const useSubstrate = () => {
  const context = useContext(SubstrateContext);
  if (!context) {
    throw new Error("useSubstrate must be used within a SubstrateProvider");
  }
  return context;
};
