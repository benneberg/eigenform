import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, AlertTriangle, EyeOff, Sparkles, Zap } from "lucide-react";
import { INITIAL_SUBSTRATE, analyzeAporia } from "../lib/eigenform-core";
import { ObservationGap } from "../types";

export default function AporiaView() {
  const [isProbing, setIsProbing] = useState(false);
  const [probesFound, setProbesFound] = useState<ObservationGap[]>([]);

  const handleProbe = () => {
    setIsProbing(true);
    setTimeout(() => {
      const g = analyzeAporia(INITIAL_SUBSTRATE);
      setProbesFound(g);
      setIsProbing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Aporia</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          The module for identifying blind spots. Aporia reveals interactions occurring outside predefined metrics, 
          highlighting the drift between system reality and observer measurement.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-px bg-substrate-800 brutalist-border overflow-hidden lg:overflow-visible">
        <div className="lg:col-span-2 bg-[#000] p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
           {/* Abstract Complexity Grid */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #888 0%, transparent 1%)', backgroundSize: '40px 40px' }} />

           <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 max-w-lg">
              <motion.div 
                animate={isProbing ? { rotate: [12, -12, 12], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="relative"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 brutalist-border bg-substrate-950 flex items-center justify-center transform rotate-12 relative">
                   <div className="absolute inset-2 border border-dashed border-substrate-800 rounded-full" />
                   <EyeOff size={32} className="text-white md:size-[48px] -rotate-12" />
                </div>
              </motion.div>
              <div className="space-y-2 md:space-y-4">
                <h3 className="heading-serif text-3xl md:text-5xl text-white">Observability Void</h3>
                <p className="text-[10px] font-mono text-substrate-500 max-w-sm uppercase tracking-widest leading-relaxed">
                  Analyzing substrate for unmetered phenomena
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 md:gap-16 mt-8 md:mt-12 w-full pt-8 md:pt-12 border-t border-substrate-900">
                <div className="flex flex-col gap-1 md:gap-2">
                  <p className="mono-label !text-[7px]">Measured</p>
                  <p className="text-2xl md:text-3xl font-black text-white italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {INITIAL_SUBSTRATE.length}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                   <p className="mono-label !text-[7px]">Unknowns</p>
                   <p className="text-2xl md:text-3xl font-black italic text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    {probesFound.length || "?"}
                   </p>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                   <p className="mono-label !text-[7px]">Blind Ratio</p>
                   <p className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    {((probesFound.length / INITIAL_SUBSTRATE.length) || 0.44).toFixed(2)}
                   </p>
                </div>
              </div>
           </div>
        </div>

        <div className="bg-substrate-950 flex flex-col p-6 md:p-12 md:space-y-10 border-t lg:border-t-0 border-substrate-800 lg:overflow-y-auto">
           <div className="space-y-6">
              <div className="flex items-center gap-3 text-white">
                <AlertTriangle size={20} className="text-white" />
                <span className="heading-serif text-xl md:text-2xl">Gap Analysis</span>
              </div>
              <p className="text-xs text-substrate-400 leading-relaxed">
                Observers are often trapped in a hallucination of control. 
                Running Aporia probes identifies where the substrate is diverging from measurement.
              </p>
              <button 
                onClick={handleProbe}
                disabled={isProbing}
                className={`w-full mt-4 py-4 px-6 text-black text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 ${
                  isProbing ? "bg-substrate-500 cursor-not-allowed" : "bg-substrate-200 hover:bg-white"
                }`}
              >
                {isProbing ? <Sparkles size={14} className="animate-spin" /> : <Zap size={14} />}
                {isProbing ? "Analyzing..." : "Probe Substrate"}
              </button>
           </div>

           <div className="space-y-6 md:space-y-8 border-t border-substrate-900 pt-8 mt-8 md:mt-0">
              <h4 className="mono-label">Observation Gaps Identifed</h4>
              <div className="space-y-6 min-h-[100px]">
                 <AnimatePresence mode="popLayout">
                   {probesFound.length > 0 ? (
                     probesFound.map((gap, i) => (
                       <motion.div 
                        key={gap.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex flex-col gap-2 p-4 bg-white/5 border-l-2 border-white/20 transition-colors"
                       >
                         <div className="flex justify-between items-center">
                            <span className="mono-label !text-[7px] text-white/40">SRC::{gap.source}</span>
                            <span className={`text-[7px] font-mono px-2 py-0.5 border ${
                               gap.severity === 'HIGH' ? 'border-red-500 text-red-500' : 
                               gap.severity === 'MEDIUM' ? 'border-orange-500 text-orange-500' : 'border-blue-500 text-blue-500'
                            }`}>{gap.severity}</span>
                         </div>
                         <p className="text-[10px] text-white font-bold tracking-widest uppercase">{gap.phenomenon}</p>
                         <p className="text-[9px] text-substrate-400 leading-relaxed italic">{gap.description}</p>
                       </motion.div>
                     ))
                   ) : (
                     <p className="text-[10px] text-substrate-700 italic uppercase tracking-widest">Awaiting substrate probe...</p>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
