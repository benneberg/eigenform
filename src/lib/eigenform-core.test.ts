import { describe, it, expect } from 'vitest';
import { renderSatisfice, inferIntent, analyzeAporia, INITIAL_SUBSTRATE, OBSERVER_INTENTS } from './eigenform-core';

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

  it('should render correct satisficed nodes for SRE', () => {
    const intent = OBSERVER_INTENTS.SRE;
    const satisficed = renderSatisfice(INITIAL_SUBSTRATE, intent);
    
    // Node-0 is focus, Node-3 should be included because of high entropy
    expect(satisficed.map(n => n.id)).toContain('node-0');
    expect(satisficed.map(n => n.id)).toContain('node-3');
  });

  it('should identify aporia gaps correctly', () => {
    const gaps = analyzeAporia(INITIAL_SUBSTRATE);
    
    // Node-3 is active with high entropy
    expect(gaps.some(g => g.id === 'gap-node-3-entropy')).toBe(true);
    
    // Node-1 is latent but has 0 load in INITIAL_SUBSTRATE, 
    // but Node-1 is latent so no ghost gap unless load > 0.
    // Let's create a custom node for that
    const customNodes = [
        ...INITIAL_SUBSTRATE,
        { id: "ghost", name: "Ghost", type: "SERVICE", status: "LATENT", load: 10, entropy: 0.1, semanticDepth: 0.5, lastTransition: "", significance: 0.5 }
    ] as any;
    const ghostGaps = analyzeAporia(customNodes);
    expect(ghostGaps.some(g => g.id === 'gap-ghost-ghost')).toBe(true);
  });

  it('should detect cross-node recursive loop gaps when multiple active nodes are high stress', () => {
    const stressNodes = [
      { id: "node-a", name: "Service A", type: "SERVICE", status: "ACTIVE", load: 80, entropy: 0.2, semanticDepth: 0.5, lastTransition: "", significance: 0.5 },
      { id: "node-b", name: "Service B", type: "SERVICE", status: "ACTIVE", load: 10, entropy: 0.7, semanticDepth: 0.5, lastTransition: "", significance: 0.5 },
    ] as any;
    
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
