import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Target, Eye, Trash2 } from "lucide-react";
import { OBSERVER_INTENTS } from "../lib/eigenform-core";
import { useSubstrate } from "../context/SubstrateContext";
import { ObserverRole } from "../types";

export default function TellerView() {
  const { 
    logs, 
    activeRole, 
    setActiveRole, 
    activeIntent, 
    clearLogs, 
    history, 
    clearHistory 
  } = useSubstrate();

  // Filter logs that have a meaning generated (collapsed observations)
  const meaningLogs = logs.filter(log => log.meaning);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Teller</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          The primary interface for meaning generation. The Teller witnesses substrate transitions 
          and generates context-specific meaning by collapsing raw data into the observer's specific intent.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-px bg-substrate-800 brutalist-border overflow-hidden lg:overflow-visible">
        <div className="lg:col-span-2 bg-[#000] p-0 flex flex-col overflow-hidden relative min-h-[400px]">
           <div className="p-4 md:p-6 border-b border-substrate-900 bg-substrate-950 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-green animate-pulse" />
                <span className="mono-label !text-[8px] md:!text-[10px]">Active Observation Stream :: {activeRole} lens</span>
              </div>
              <span className="mono-label opacity-40 !text-[8px] md:!text-[10px]">SITUATION_拓扑 :: NARRATIVE_FLOW</span>
           </div>
           
           <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto font-mono scrollbar-hide relative z-10">
              <AnimatePresence initial={false} mode="popLayout">
                {meaningLogs.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full opacity-25 py-20">
                      <Eye size={40} className="mb-4 animate-pulse" />
                      <p className="text-[10px] uppercase tracking-widest text-substrate-400">Awaiting Substrate Transitions...</p>
                      <p className="text-[8px] text-substrate-600 mt-1">Make sure Global Time is not paused (see footer).</p>
                   </div>
                )}
                {meaningLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2 border-l border-white/10 pl-6 relative"
                   >
                    <div className="absolute left-0 top-0 w-1 h-full bg-accent-green/20" />
                    <div className="flex justify-between items-center">
                       <span className="text-substrate-600 tabular-nums text-[9px] md:text-xs">[{log.timestamp}] SUBSTRATE_EVENT:</span>
                       <span className="text-[8px] text-substrate-500 uppercase">ID: {log.id}</span>
                    </div>
                    <p className="text-white/60 tracking-tight text-[10px] md:text-[11px] leading-snug font-mono italic">
                      "{log.message}"
                    </p>
                    <div className="bg-substrate-900/50 p-3 mt-2 border border-white/5">
                       <div className="flex items-center gap-2 mb-1">
                          <Target size={10} className="text-accent-green" />
                          <span className="text-[8px] text-white/40 uppercase tracking-tighter font-bold">Generated Meaning</span>
                       </div>
                       <p className="text-accent-green text-[11px] md:text-xs uppercase tracking-tight font-bold">
                         {log.meaning}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        <div className="bg-substrate-950 flex flex-col border-t lg:border-t-0 border-substrate-800">
           <div className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-white">
                   <Target size={20} className="text-white" />
                   <h4 className="heading-serif text-xl">Observer Lens</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    {Object.keys(OBSERVER_INTENTS).map(key => {
                      const roleKey = key as ObserverRole;
                      return (
                        <button 
                          key={key}
                          onClick={() => setActiveRole(roleKey)}
                          className={`text-[9px] p-2 border font-mono uppercase tracking-widest transition-all ${
                            activeRole === roleKey ? "bg-white text-black border-white font-bold" : "border-substrate-800 text-substrate-600 hover:text-white"
                          }`}
                        >
                          {key}
                        </button>
                      );
                    })}
                 </div>
              </div>

              {/* Persisted History Panel */}
              <div className="space-y-4 border-t border-substrate-900 pt-6">
                 <div className="flex justify-between items-center border-b border-substrate-900 pb-2">
                    <p className="mono-label !text-[8px]">Collapse History (Saved)</p>
                    {history.length > 0 && (
                      <button 
                        onClick={clearHistory}
                        className="text-red-500 hover:text-red-400 font-mono text-[7px] uppercase tracking-wider flex items-center gap-1"
                        title="Clear Saved History"
                      >
                        <Trash2 size={8} /> Clear
                      </button>
                    )}
                 </div>
                 <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-hide">
                    {history.length === 0 ? (
                      <p className="text-[8px] text-substrate-600 font-mono italic">No collapse history saved yet.</p>
                    ) : (
                      history.slice(0, 10).map((hist) => (
                        <div key={hist.id} className="p-2 bg-substrate-900/40 border border-white/5 space-y-1">
                          <div className="flex justify-between items-center text-[7px] text-substrate-500 font-mono">
                            <span>[{hist.timestamp}] {hist.role}</span>
                            <span className="text-white/30 uppercase">{hist.nodeName}</span>
                          </div>
                          <p className="text-[8.5px] font-mono text-accent-green leading-snug uppercase">
                            {hist.meaning}
                          </p>
                        </div>
                      ))
                    )}
                    {history.length > 10 && (
                      <p className="text-[7px] text-substrate-600 text-center font-mono">
                        + {history.length - 10} older collapsed state meanings saved
                      </p>
                    )}
                 </div>
              </div>

              <div className="space-y-4 border-t border-substrate-900 pt-6">
                 <p className="mono-label border-b border-substrate-900 pb-2">Narrative Metadata</p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-substrate-900/50 p-4 brutalist-border">
                       <div className="flex items-center gap-3">
                          <Eye size={16} className="text-substrate-400" />
                          <span className="mono-label !text-[8px]">Inferred Mode</span>
                       </div>
                       <span className="text-[10px] font-mono text-white">{activeIntent.type}</span>
                    </div>
                    <div className="terminal-box bg-substrate-950 border-substrate-800 text-[10px] leading-relaxed italic text-substrate-500">
                       The Teller operates under the constraint of the current observer's focus. It ignores what is not "meant" to be seen.
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 border-t border-substrate-900 flex justify-center gap-4 bg-substrate-950 shrink-0">
              <button 
                onClick={clearLogs}
                className="border border-white/10 text-substrate-600 px-6 py-2 text-[9px] font-mono uppercase tracking-[0.4em] hover:text-white transition-colors"
                >
                Clear_Narration
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
