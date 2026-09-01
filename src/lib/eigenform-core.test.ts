import { describe, it, expect } from 'vitest';
import { 
  renderSatisfice, 
  inferIntent, 
  analyzeAporia, 
  clampSubstrateNode, 
  applyCorrelatedCascade, 
  validateSubstrateNodes, 
  validateHistory, 
  INITIAL_SUBSTRATE, 
  OBSERVER_INTENTS, 
  PRESET_SCENARIOS 
} from './eigenform-core';
import { SubstrateNode } from '../types';

describe('Eigenform Core Logic', () => {
  it('should infer SRE intent correctly', () => {
    const focusNodes = ["node-0"];
    const intent = inferIntent(focusNodes);
    expect(intent.type).toBe('STABILITY');
  });

  it('should infer SECURITY intent correctly', () => {
    const focusNodes = ["node-2"];
    const intent = inferIntent(focusNodes);
    expect(intent.type).toBe('SECURITY');
  });

  it('should infer ARCHITECT intent correctly for edge and latent nodes', () => {
    const focusNodes = ["node-1", "node-4"];
    const intent = inferIntent(focusNodes);
    expect(intent.type).toBe('DISCOVERY');
  });

  it('should render correct satisficed nodes for SRE', () => {
    const intent = OBSERVER_INTENTS.SRE;
    const satisficed = renderSatisfice(INITIAL_SUBSTRATE, intent);
    
    // Node-0 is focus, Node-3 should be included because of high entropy
    expect(satisficed.map(n => n.id)).toContain('node-0');
    expect(satisficed.map(n => n.id)).toContain('node-3');
  });

  it('should support dynamic threshold filtering in renderSatisfice', () => {
    const baseIntent = OBSERVER_INTENTS.OPERATOR;
    
    // Very permissive threshold
    const permissiveIntent = { ...baseIntent, threshold: 0.05 };
    const permissiveSatisficed = renderSatisfice(INITIAL_SUBSTRATE, permissiveIntent);
    
    // Very restrictive threshold
    const restrictiveIntent = { ...baseIntent, threshold: 0.95 };
    const restrictiveSatisficed = renderSatisfice(INITIAL_SUBSTRATE, restrictiveIntent);

    expect(permissiveSatisficed.length).toBeGreaterThanOrEqual(restrictiveSatisficed.length);
  });

  it('should identify aporia gaps correctly', () => {
    const gaps = analyzeAporia(INITIAL_SUBSTRATE);
    
    // Node-3 is active with high entropy
    expect(gaps.some(g => g.id === 'gap-node-3-entropy')).toBe(true);
    
    const customNodes: SubstrateNode[] = [
      ...INITIAL_SUBSTRATE,
      { id: "ghost", name: "Ghost", type: "SERVICE", status: "LATENT", load: 10, entropy: 0.1, semanticDepth: 0.5, lastTransition: "", significance: 0.5 }
    ];
    const ghostGaps = analyzeAporia(customNodes);
    expect(ghostGaps.some(g => g.id === 'gap-ghost-ghost')).toBe(true);
  });

  it('should detect cross-node recursive loop gaps when multiple active nodes are high stress', () => {
    const stressNodes: SubstrateNode[] = [
      { id: "node-a", name: "Service A", type: "SERVICE", status: "ACTIVE", load: 80, entropy: 0.2, semanticDepth: 0.5, lastTransition: "", significance: 0.5 },
      { id: "node-b", name: "Service B", type: "SERVICE", status: "ACTIVE", load: 10, entropy: 0.7, semanticDepth: 0.5, lastTransition: "", significance: 0.5 },
    ];
    
    const gaps = analyzeAporia(stressNodes);
    expect(gaps.some(g => g.id === 'gap-recursive-loop')).toBe(true);
  });

  it('should support integration flows for observer role transitions', () => {
    // SRE focus
    const sreIntent = OBSERVER_INTENTS.SRE;
    const sreSatisficed = renderSatisfice(INITIAL_SUBSTRATE, sreIntent);
    expect(sreSatisficed.some(n => n.id === 'node-0')).toBe(true); // Core Sieve is focus

    // Transition to Security
    const secIntent = OBSERVER_INTENTS.SECURITY;
    const secSatisficed = renderSatisfice(INITIAL_SUBSTRATE, secIntent);
    expect(secSatisficed.some(n => n.id === 'node-2')).toBe(true); // Auth Ghost is focus
    expect(secSatisficed.some(n => n.id === 'node-0')).toBe(false); // Core Sieve not focus in Security
  });
});

describe('Mathematical Bounds & Invariance Clamping', () => {
  it('should clamp arbitrary out-of-bounds node values strictly to [0, 100] and [0.01, 0.99]', () => {
    const outOfBoundsNode: SubstrateNode = {
      id: "test-node",
      name: "Out of Bounds Node",
      type: "SERVICE",
      status: "ACTIVE",
      load: 150,
      entropy: 1.8,
      semanticDepth: -0.5,
      significance: 2.5,
      lastTransition: "2026-08-31"
    };

    const clamped = clampSubstrateNode(outOfBoundsNode);
    expect(clamped.load).toBe(100);
    expect(clamped.entropy).toBe(0.99);
    expect(clamped.semanticDepth).toBe(0.01);
    expect(clamped.significance).toBe(1.0);
  });

  it('should satisfy property-based invariant checks across 500 stochastic drift cycles', () => {
    let testNode: SubstrateNode = { ...INITIAL_SUBSTRATE[0] };

    for (let i = 0; i < 500; i++) {
      const deltaLoad = (Math.random() - 0.5) * 50;
      const deltaEntropy = (Math.random() - 0.5) * 0.8;
      const deltaDepth = (Math.random() - 0.5) * 0.6;

      testNode = clampSubstrateNode({
        ...testNode,
        load: testNode.load + deltaLoad,
        entropy: testNode.entropy + deltaEntropy,
        semanticDepth: testNode.semanticDepth + deltaDepth
      });

      expect(testNode.load).toBeGreaterThanOrEqual(0);
      expect(testNode.load).toBeLessThanOrEqual(100);
      expect(testNode.entropy).toBeGreaterThanOrEqual(0.01);
      expect(testNode.entropy).toBeLessThanOrEqual(0.99);
      expect(testNode.semanticDepth).toBeGreaterThanOrEqual(0.01);
      expect(testNode.semanticDepth).toBeLessThanOrEqual(0.99);
    }
  });
});

describe('Correlated Cascade Simulation', () => {
  it('should trigger downstream cascade when an active gateway exceeds load threshold', () => {
    const cascadeInitial: SubstrateNode[] = [
      { id: "node-0", name: "Core Sieve Gateway", type: "GATEWAY", status: "ACTIVE", load: 92, entropy: 0.85, semanticDepth: 0.9, significance: 0.9, lastTransition: "" },
      { id: "node-1", name: "Packet Void", type: "SERVICE", status: "ACTIVE", load: 20, entropy: 0.10, semanticDepth: 0.4, significance: 0.6, lastTransition: "" },
      { id: "node-2", name: "Auth Ghost", type: "SERVICE", status: "ACTIVE", load: 15, entropy: 0.12, semanticDepth: 0.8, significance: 0.8, lastTransition: "" }
    ];

    const result = applyCorrelatedCascade(cascadeInitial);
    expect(result.cascadeTriggered).toBe(true);
    expect(result.message).toContain('Cascade Avalanche');
    
    // Downstream nodes should have elevated entropy
    const downstreamNode1 = result.updatedNodes.find(n => n.id === 'node-1');
    expect(downstreamNode1?.entropy).toBeGreaterThan(0.10);
  });
});

describe('Preset Scenarios & Schema Validators', () => {
  it('should validate all preset scenarios successfully', () => {
    const scenarioKeys = Object.keys(PRESET_SCENARIOS) as (keyof typeof PRESET_SCENARIOS)[];
    expect(scenarioKeys.length).toBeGreaterThanOrEqual(4);

    scenarioKeys.forEach(key => {
      const scenario = PRESET_SCENARIOS[key];
      expect(scenario.title).toBeDefined();
      expect(scenario.nodes.length).toBe(5);
      expect(scenario.role).toBeDefined();
    });
  });

  it('should validate and sanitize valid substrate node schema arrays', () => {
    const validData = INITIAL_SUBSTRATE;
    const validated = validateSubstrateNodes(validData);
    expect(validated).not.toBeNull();
    expect(validated?.length).toBe(5);
  });

  it('should reject malformed substrate node schemas', () => {
    const corruptedData = [{ id: "bad", missingFields: true }];
    const validated = validateSubstrateNodes(corruptedData);
    expect(validated).toBeNull();

    expect(validateSubstrateNodes(null)).toBeNull();
    expect(validateSubstrateNodes("not an array")).toBeNull();
  });

  it('should validate and sanitize collapse history records', () => {
    const validHistory = [
      { id: "hist-1", timestamp: "12:00:00", role: "SRE" as const, nodeName: "Core Sieve", meaning: "Test meaning" }
    ];
    const validated = validateHistory(validHistory);
    expect(validated).not.toBeNull();
    expect(validated?.length).toBe(1);

    expect(validateHistory([{ corrupted: true }])).toBeNull();
  });
});

