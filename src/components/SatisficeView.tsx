import { useState } from "react";
import { motion } from "motion/react";
import { Sliders, Database, Cpu, Activity, User, Target } from "lucide-react";
import { INITIAL_SUBSTRATE, OBSERVER_INTENTS, renderSatisfice } from "../lib/eigenform-core";
import { ObserverIntent } from "../types";

export default function SatisficeView() {
  const [selectedIntentKey, setSelectedIntentKey] = useState<string>("SRE");
  const intent = OBSERVER_INTENTS[selectedIntentKey];
  const satisficedNodes = renderSatisfice(INITIAL_SUBSTRATE, intent);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Satisfice</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          The core substrate: a minimal, stable data structure that exists independent of observation. 
          The system collapses into a meaningful state based on the observer's specific intent.
        </p>
      </header>

      <div className="brutalist-border p-6 md:p-12 bg-substrate-900 space-y-8 md:space-y-12 flex-1 flex flex-col relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-8 md:gap-12 border-b border-substrate-800 pb-8 md:pb-12 h-auto shrink-0">
          <div className="flex-1 space-y-4 md:space-y-6 w-full">
            <div className="flex justify-between items-center">
              <label className="mono-label !text-[8px] md:!text-[9px]">Active Observer Intent</label>
              <div className="flex gap-2">
                {Object.keys(OBSERVER_INTENTS).map(key => (
                  <button 
                    key={key}
                    onClick={() => setSelectedIntentKey(key)}
                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest transition-all ${
                      selectedIntentKey === key ? "bg-white text-black" : "bg-substrate-950 text-substrate-600 hover:text-white"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-substrate-950 border border-substrate-800 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                 <Target size={14} className="text-accent-green" />
                 <span className="mono-label !text-[9px] text-white">MODE: {intent.type}</span>
              </div>
              <p className="text-[10px] text-substrate-400 font-mono leading-relaxed">
                Primary filter: <span className="text-white uppercase">{intent.primaryMetric}</span> threshold {intent.threshold}. 
                The observer's intent forces a collapse of the substrate into {satisficedNodes.length} meaningful nodes.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-80 bg-substrate-950 p-4 md:p-6 border border-substrate-800 flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-green text-black font-black italic text-lg shadow-lg flex items-center justify-center shrink-0">
              {satisficedNodes.length}
            </div>
            <div>
              <p className="mono-label !text-[7px]">Satisficed Density</p>
              <p className="text-[9px] md:text-xs font-bold text-white uppercase tracking-wider mt-1">
                {satisficedNodes.length < 3 ? "Sparse Observation" : "Dense Observation"}
              </p>
              <p className="text-[8px] text-substrate-500 font-mono mt-1 leading-none">COLLAPSE_STABILITY: 0.99</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
          <p className="mono-label !text-[8px]">Satisficed Node Registry :: {satisficedNodes.length} Observables filtered from {INITIAL_SUBSTRATE.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_SUBSTRATE.map((node, i) => {
              const isVisible = satisficedNodes.some(sn => sn.id === node.id);
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={false}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.05,
                    filter: isVisible ? "grayscale(0%)" : "grayscale(100%)",
                    scale: isVisible ? 1 : 0.98
                  }}
                  className={`p-6 brutalist-border flex flex-col gap-4 relative transition-all duration-500 ${isVisible ? 'bg-substrate-800/40' : 'bg-black/20 overflow-hidden pointer-events-none'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {node.type === "GATEWAY" && <Cpu size={14} className="text-substrate-400" />}
                      {node.type === "DATABASE" && <Database size={14} className="text-substrate-400" />}
                      {node.type === "SERVICE" && <Activity size={14} className="text-substrate-400" />}
                      <span className="font-mono text-[10px] font-bold uppercase text-white">{node.name}</span>
                    </div>
                    <div className={`text-[8px] font-mono px-2 py-0.5 border ${node.status === 'ACTIVE' ? 'border-accent-green text-accent-green' : 'border-substrate-700 text-substrate-600'}`}>
                      {node.status}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="mono-label !text-[7px]">{intent.primaryMetric === 'semanticDepth' ? 'FOCAL_DEPTH' : 'Semantic Depth'}</p>
                      <p className="font-mono text-xs text-white">{(node.semanticDepth * 100).toFixed(0)}%</p>
                    </div>
                    <div className="h-1 bg-substrate-950 border border-substrate-800 overflow-hidden">
                      <motion.div 
                        className="h-full bg-white/20"
                        animate={{ width: `${node.semanticDepth * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-substrate-800 pt-4 mt-2">
                    <div className="space-y-1">
                      <p className="mono-label !text-[6px]">Entropy</p>
                      <p className="font-mono text-[9px] text-substrate-400">{node.entropy.toFixed(3)} Φ</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="mono-label !text-[6px]">ID</p>
                      <p className="font-mono text-[9px] text-substrate-400">{node.id.toUpperCase()}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
           <span className="heading-serif text-[120px] md:text-[240px] leading-none pointer-events-none select-none">S</span>
        </div>

        <p className="text-right text-[8px] md:text-[10px] text-substrate-600 font-mono italic uppercase tracking-widest pt-4 border-t border-substrate-900 mt-auto">
          "The substrate sustains itself regardless of the gaze that falls upon it."
        </p>
      </div>
    </div>
  );
}
