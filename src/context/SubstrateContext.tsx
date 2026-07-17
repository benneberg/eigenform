import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { SubstrateNode, SubstrateEvent, ObserverRole, ObserverIntent, ObservationGap } from "../types";
import { INITIAL_SUBSTRATE, OBSERVER_INTENTS, generateNarration, analyzeAporia } from "../lib/eigenform-core";

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
  const [nodes, setNodes] = useState<SubstrateNode[]>(() => {
    const saved = localStorage.getItem("eigenform_nodes");
    return saved ? JSON.parse(saved) : INITIAL_SUBSTRATE;
  });

  const [activeRole, setActiveRoleState] = useState<ObserverRole>(() => {
    const saved = localStorage.getItem("eigenform_active_role");
    return (saved as ObserverRole) || ObserverRole.SRE;
  });

  const [driftSpeed, setDriftSpeed] = useState<number>(1);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<{ id: string; timestamp: string; role: ObserverRole; nodeName: string; meaning: string }[]>(() => {
    const saved = localStorage.getItem("eigenform_collapse_history");
    return saved ? JSON.parse(saved) : [];
  });

  const logIdCounter = useRef(0);
  const mutationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Save state helpers
  useEffect(() => {
    localStorage.setItem("eigenform_nodes", JSON.stringify(nodes));
  }, [nodes]);

  const setActiveRole = (role: ObserverRole) => {
    setActiveRoleState(role);
    localStorage.setItem("eigenform_active_role", role);
    
    // Log the intent shift
    const newEntry: LogEntry = {
      id: logIdCounter.current++,
      message: `Observer shifted perspective to ${role} lens.`,
      timestamp: new Date().toLocaleTimeString(),
      type: "OBSERVATION",
      meaning: `Observational field collapsed relative to ${role} intent parameters.`
    };
    setLogs(prev => [newEntry, ...prev].slice(0, 50));
  };

  const activeIntent = OBSERVER_INTENTS[activeRole === ObserverRole.NEUTRAL ? "OPERATOR" : activeRole] || OBSERVER_INTENTS.OPERATOR;

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

  // Central event generation & node mutation
  const executeDrift = () => {
    setNodes(prevNodes => {
      // Pick a random node to mutate
      const randomIndex = Math.floor(Math.random() * prevNodes.length);
      const targetNode = prevNodes[randomIndex];
      
      // Determine mutation values
      const deltaLoad = Math.floor((Math.random() - 0.5) * 15);
      const deltaEntropy = (Math.random() - 0.5) * 0.15;
      const deltaDepth = (Math.random() - 0.5) * 0.1;

      const newLoad = Math.max(0, Math.min(100, targetNode.load + deltaLoad));
      const newEntropy = Math.max(0.01, Math.min(0.99, targetNode.entropy + deltaEntropy));
      const newDepth = Math.max(0.01, Math.min(0.99, targetNode.semanticDepth + deltaDepth));

      const updatedNode: SubstrateNode = {
        ...targetNode,
        load: targetNode.status === "LATENT" && Math.random() > 0.7 ? 15 : targetNode.status === "IDLE" ? Math.max(0, Math.min(20, newLoad)) : newLoad,
        entropy: Number(newEntropy.toFixed(3)),
        semanticDepth: Number(newDepth.toFixed(3)),
        status: targetNode.status === "LATENT" && newLoad > 10 ? "ACTIVE" : targetNode.status === "ACTIVE" && newLoad === 0 ? "IDLE" : targetNode.status,
        lastTransition: new Date().toISOString()
      };

      const updatedNodes = prevNodes.map((n, i) => i === randomIndex ? updatedNode : n);

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

      return updatedNodes;
    });
  };

  // Manual intervention trigger
  const triggerManualCollapse = (nodeId: string) => {
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === nodeId) {
          const updatedNode: SubstrateNode = {
            ...node,
            load: 95,
            entropy: 0.92,
            status: "ACTIVE",
            lastTransition: new Date().toISOString()
          };

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

          // Save history
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
  }, [driftSpeed, activeRole]);

  return (
    <SubstrateContext.Provider value={{
      nodes,
      activeRole,
      setActiveRole,
      activeIntent,
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
