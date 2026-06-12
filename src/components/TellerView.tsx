import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic2, ShieldCheck, Database, Target, Eye } from "lucide-react";
import { generateNarration, OBSERVER_INTENTS, INITIAL_SUBSTRATE } from "../lib/eigenform-core";
import { SubstrateEvent } from "../types";

export default function TellerView() {
  const [selectedIntentKey, setSelectedIntentKey] = useState<string>("OPERATOR");
  const [logs, setLogs] = useState<{id: number, text: string, time: string}[]>([]);
  const nextId = useRef(0);
  const intent = OBSERVER_INTENTS[selectedIntentKey];

  useEffect(() => {
    const addLog = () => {
      // Simulate a substrate event
      const node = INITIAL_SUBSTRATE[Math.floor(Math.random() * INITIAL_SUBSTRATE.length)];
      const event: SubstrateEvent = {
        timestamp: new Date().toISOString(),
        nodeId: node.id,
        change: Math.random() > 0.5 ? "increased" : "decreased",
        magnitude: Math.random() * 0.5
      };

      const text = generateNarration(event, intent);
      const newLog = { 
        id: nextId.current++, 
        text, 
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    };

    const interval = setInterval(addLog, 3000);
    return () => clearInterval(interval);
  }, [intent]);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Teller</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Pure observational narration based on current context. The Teller does not infer motive—it merely
          witnesses the recursive transitions of the substrate through the lens of active intent.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-px bg-substrate-800 brutalist-border overflow-hidden lg:overflow-visible">
        <div className="lg:col-span-2 bg-[#000] p-0 flex flex-col overflow-hidden relative min-h-[300px]">
           <div className="p-4 md:p-6 border-b border-substrate-900 bg-substrate-950 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-green animate-pulse" />
                <span className="mono-label !text-[8px] md:!text-[10px]">Pure Stream :: {selectedIntentKey} lens</span>
              </div>
              <span className="mono-label opacity-40 !text-[8px] md:!text-[10px]">:: NARRATION_ID_{nextId.current} ::</span>
           </div>
           
           <div className="flex-1 p-4 md:p-6 space-y-3 md:space-y-4 overflow-y-auto font-mono scrollbar-hide relative z-10">
              <AnimatePresence initial={false} mode="popLayout">
                {logs.length === 0 && (
                   <p className="text-substrate-800 text-xs italic">Waiting for substrate transition...</p>
                )}
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4 md:gap-8 group"
                   >
                    <span className="text-substrate-600 shrink-0 tabular-nums text-[9px] md:text-xs">[{log.time}]</span>
                    <span className="text-white/80 flex-1 tracking-tight text-[9px] md:text-xs leading-tight font-mono">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        <div className="bg-substrate-950 flex flex-col border-t lg:border-t-0 border-substrate-800">
           <div className="p-6 md:p-12 space-y-8 md:space-y-12 flex-1">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-white">
                   <Target size={24} className="text-white" />
                   <h4 className="heading-serif text-2xl md:text-3xl">Observer Lens</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    {Object.keys(OBSERVER_INTENTS).map(key => (
                      <button 
                        key={key}
                        onClick={() => setSelectedIntentKey(key)}
                        className={`text-[9px] p-2 border font-mono uppercase tracking-widest transition-all ${
                          selectedIntentKey === key ? "bg-white text-black border-white" : "border-substrate-800 text-substrate-600 hover:text-white"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="mono-label border-b border-substrate-900 pb-2">Narrative Metadata</p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-substrate-900/50 p-4 brutalist-border">
                       <div className="flex items-center gap-3">
                          <Eye size={16} className="text-substrate-400" />
                          <span className="mono-label !text-[8px]">Inferred Mode</span>
                       </div>
                       <span className="text-[10px] font-mono text-white">{intent.type}</span>
                    </div>
                    <div className="terminal-box bg-substrate-950 border-substrate-800 text-[10px] md:text-[11px] leading-relaxed italic text-substrate-500">
                       The Teller operates under the constraint of the current observer's focus. It ignores what is not "meant" to be seen.
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 md:p-8 border-t border-substrate-900 flex justify-center">
              <button 
                onClick={() => setLogs([])}
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
