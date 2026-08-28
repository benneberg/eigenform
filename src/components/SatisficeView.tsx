import { motion } from "motion/react";
import { Database, Cpu, Activity, Target, Sliders, RotateCcw, Pin } from "lucide-react";
import { OBSERVER_INTENTS, renderSatisfice } from "../lib/eigenform-core";
import { useSubstrate } from "../context/SubstrateContext";
import { ObserverRole } from "../types";

export default function SatisficeView() {
  const { 
    nodes, 
    activeRole, 
    setActiveRole, 
    activeIntent, 
    customThreshold, 
    setCustomThreshold, 
    focalNodeIds, 
    toggleFocalNode, 
    clearFocalNodes, 
    triggerManualCollapse 
  } = useSubstrate();
  
  // Render satisficed nodes based on the current active intent (which factors in threshold and focal nodes)
  const satisficedNodes = renderSatisfice(nodes, activeIntent);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10" role="region" aria-label="Satisfice Substrate Plane View">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Satisfice</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          The core substrate: a minimal, stable data structure that exists independent of observation. 
          The system collapses into a meaningful state based on the observer's specific intent and calibrated threshold.
        </p>
      </header>

      <div className="brutalist-border p-6 md:p-12 bg-substrate-900 space-y-8 md:space-y-12 flex-1 flex flex-col relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-8 border-b border-substrate-800 pb-8 shrink-0 relative z-10">
          <div className="flex-1 space-y-6 w-full">
            {/* Observer Role Lens Selector */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <label className="mono-label !text-[8px] md:!text-[9px]">Active Observer Intent Lens</label>
                <p className="mono-label !text-[7px] text-substrate-500">Perspective shifts filter boundaries</p>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Observer Role Lenses">
                {Object.keys(OBSERVER_INTENTS).map(key => {
                  const roleKey = key as ObserverRole;
                  const isSelected = activeRole === roleKey;
                  return (
                    <button 
                      key={key}
                      onClick={() => setActiveRole(roleKey)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest transition-all ${
                        isSelected ? "bg-white text-black font-bold shadow-md" : "bg-substrate-950 text-substrate-600 hover:text-white"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Intent Configuration Card & Threshold Tuning */}
            <div className="p-6 bg-substrate-950 border border-substrate-800 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-substrate-900 pb-4">
                <div className="flex items-center gap-3">
                  <Target size={14} className="text-accent-green" />
                  <span className="mono-label !text-[9px] text-white">MODE: {activeIntent.type}</span>
                  <span className="mono-label !text-[7px] text-substrate-500">[{activeIntent.primaryMetric}]</span>
                </div>
                {focalNodeIds.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="mono-label !text-[7px] text-accent-green">
                      FOCAL OVERRIDE: {focalNodeIds.length} PINNED
                    </span>
                    <button 
                      onClick={clearFocalNodes} 
                      className="text-[7px] font-mono text-substrate-400 hover:text-white underline"
                    >
                      Clear Pins
                    </button>
                  </div>
                )}
              </div>

              {/* Threshold Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sliders size={12} className="text-substrate-400" />
                    <label htmlFor="threshold-slider" className="mono-label !text-[8px] text-white">
                      Filter Threshold: <span className="font-mono text-accent-green">{activeIntent.threshold.toFixed(2)}</span>
                    </label>
                  </div>
                  {customThreshold !== null && (
                    <button 
                      onClick={() => setCustomThreshold(null)}
                      className="flex items-center gap-1 font-mono text-[8px] text-substrate-400 hover:text-white transition-colors"
                      title="Reset threshold to default lens setting"
                    >
                      <RotateCcw size={10} />
                      <span>Reset Lens Default</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[8px] text-substrate-600">0.05 (Permissive)</span>
                  <input 
                    id="threshold-slider"
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={activeIntent.threshold}
                    onChange={(e) => setCustomThreshold(parseFloat(e.target.value))}
                    className="flex-1 accent-accent-green bg-substrate-800 h-1 cursor-pointer"
                    aria-label="Satisfice filter threshold slider"
                  />
                  <span className="font-mono text-[8px] text-substrate-600">0.95 (Restrictive)</span>
                </div>
              </div>

              <p className="text-[10px] text-substrate-400 font-mono leading-relaxed">
                Intent isolates nodes where <span className="text-white uppercase">{activeIntent.primaryMetric}</span> exceeds {activeIntent.threshold.toFixed(2)}, 
                collapsing {nodes.length} potential substrate nodes into {satisficedNodes.length} observable entities.
              </p>
            </div>
          </div>
          
          {/* Density Metric Card */}
          <div className="w-full lg:w-80 bg-substrate-950 p-6 border border-substrate-800 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent-green text-black font-black italic text-xl shadow-lg flex items-center justify-center shrink-0">
                {satisficedNodes.length}
              </div>
              <div>
                <p className="mono-label !text-[7px]">Satisficed Density</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                  {satisficedNodes.length < 2 ? "Sparse Observation" : satisficedNodes.length >= 4 ? "Saturated Observation" : "Nominal Observation"}
                </p>
                <p className="text-[8px] text-substrate-500 font-mono mt-1">
                  FILTER RATIO: {((satisficedNodes.length / nodes.length) * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="border-t border-substrate-900 pt-3 space-y-1">
              <div className="flex justify-between font-mono text-[8px] text-substrate-400">
                <span>COLLAPSE INVARIANCE:</span>
                <span className="text-white">0.999 PHI</span>
              </div>
              <div className="flex justify-between font-mono text-[8px] text-substrate-400">
                <span>INTENT POLARITY:</span>
                <span className="text-accent-green">{activeIntent.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide relative z-10">
          <div className="flex justify-between items-center">
            <p className="mono-label !text-[8px]">
              Satisficed Node Registry :: {satisficedNodes.length} Observables Filtered from {nodes.length}
            </p>
            <p className="mono-label !text-[7px] text-substrate-500">
              Pin node to anchor focal observation cluster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((node) => {
              const isVisible = satisficedNodes.some(sn => sn.id === node.id);
              const isPinned = focalNodeIds.includes(node.id);

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={false}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.08,
                    filter: isVisible ? "grayscale(0%)" : "grayscale(100%)",
                    scale: isVisible ? 1 : 0.98
                  }}
                  className={`p-6 brutalist-border flex flex-col gap-4 relative transition-all duration-300 ${
                    isVisible ? 'bg-substrate-800/40 border-substrate-700' : 'bg-black/20 overflow-hidden pointer-events-none'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {node.type === "GATEWAY" && <Cpu size={14} className="text-substrate-400" />}
                      {node.type === "DATABASE" && <Database size={14} className="text-substrate-400" />}
                      {node.type === "SERVICE" && <Activity size={14} className="text-substrate-400" />}
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase text-white block">{node.name}</span>
                        <span className="mono-label !text-[6px] text-substrate-500">ID: {node.id}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleFocalNode(node.id)}
                        title={isPinned ? "Unpin from focal cluster" : "Pin to focal cluster"}
                        aria-label={`Pin ${node.name} to focal observation cluster`}
                        className={`p-1 transition-colors ${
                          isPinned ? "text-accent-green" : "text-substrate-600 hover:text-white"
                        }`}
                      >
                        <Pin size={12} className={isPinned ? "fill-accent-green" : ""} />
                      </button>
                      <div className={`text-[8px] font-mono px-2 py-0.5 border ${
                        node.status === 'ACTIVE' ? 'border-accent-green text-accent-green animate-pulse' : 'border-substrate-700 text-substrate-600'
                      }`}>
                        {node.status}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <p className="mono-label !text-[7px]">
                          {activeIntent.primaryMetric === 'semanticDepth' ? 'FOCAL_DEPTH' : 'Semantic Depth'}
                        </p>
                        <p className="font-mono text-xs text-white">{(node.semanticDepth * 100).toFixed(0)}%</p>
                      </div>
                      <div className="h-1 bg-substrate-950 border border-substrate-800 overflow-hidden">
                        <motion.div 
                          className="h-full bg-white/20"
                          animate={{ width: `${node.semanticDepth * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <p className="mono-label !text-[7px]">Structural Significance</p>
                        <p className="font-mono text-xs text-white">{(node.significance * 100).toFixed(0)}%</p>
                      </div>
                      <div className="h-1 bg-substrate-950 border border-substrate-800 overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-green/40"
                          animate={{ width: `${node.significance * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-substrate-800 pt-4 mt-2">
                    <div className="space-y-1">
                      <p className="mono-label !text-[6px]">Entropy</p>
                      <p className="font-mono text-[9px] text-substrate-400">{node.entropy.toFixed(3)} Φ</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="mono-label !text-[6px]">Node Load</p>
                      <p className="font-mono text-[9px] text-substrate-400">{node.load}% Capacity</p>
                    </div>
                  </div>

                  {/* Manual Collapse trigger */}
                  {isVisible && (
                    <button
                      onClick={() => triggerManualCollapse(node.id)}
                      aria-label={`Force complete state collapse on node ${node.name}`}
                      className="mt-2 w-full py-1 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-[8px] font-mono uppercase tracking-widest text-substrate-400 hover:text-red-400 transition-all"
                    >
                      Force Complete Collapse
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
          <span className="heading-serif text-[120px] md:text-[240px] leading-none pointer-events-none select-none">S</span>
        </div>

        <p className="text-right text-[8px] md:text-[10px] text-substrate-600 font-mono italic uppercase tracking-widest pt-4 border-t border-substrate-900 mt-auto relative z-10">
          "The substrate sustains itself regardless of the gaze that falls upon it."
        </p>
      </div>
    </div>
  );
}
