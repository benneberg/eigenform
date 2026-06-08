import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic2, ShieldCheck, Database, Server, Activity } from "lucide-react";

const OBSERVATIONS = [
  "Substrate maintains local equilibrium.",
  "Observer detected in sector 9.",
  "Latency variance shifts to 14ms.",
  "Situation topology remains uncollapsed.",
  "Semantic depth increasing in node alpha.",
  "Contextual flux identified in latent layer.",
  "Observer attention focused on Teller.",
  "Recursive transition complete.",
  "Substrate density oscillating at 44Hz.",
  "Signal-to-noise ratio entering optimal range.",
  "A momentary collapse of meaning detected.",
  "Operational density remains within satisficed bounds.",
];

export default function TellerView() {
  const [logs, setLogs] = useState<{id: number, text: string, time: string}[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const addLog = () => {
      const text = OBSERVATIONS[Math.floor(Math.random() * OBSERVATIONS.length)];
      const newLog = { 
        id: nextId.current++, 
        text, 
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    };

    addLog();
    const interval = setInterval(addLog, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Teller</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Pure observational narration without judgment. The Teller does not alert; it simply speaks what is. 
          There is no "error" or "success"—only recursive transitions.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-px bg-substrate-800 brutalist-border overflow-hidden lg:overflow-visible">
        <div className="lg:col-span-2 bg-[#000] p-0 flex flex-col overflow-hidden relative min-h-[300px]">
           <div className="p-4 md:p-6 border-b border-substrate-900 bg-substrate-950 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-green animate-pulse" />
                <span className="mono-label !text-[8px] md:!text-[10px]">Observational Stream</span>
              </div>
              <span className="mono-label opacity-40 !text-[8px] md:!text-[10px]">:: NARRATION_ID_{nextId.current} ::</span>
           </div>
           
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />

           <div className="flex-1 p-4 md:p-6 space-y-3 md:space-y-4 overflow-y-auto font-mono scrollbar-hide relative z-10">
              <AnimatePresence initial={false} mode="popLayout">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4 md:gap-8 group"
                  >
                    <span className="text-substrate-600 shrink-0 tabular-nums text-[9px] md:text-xs">[{log.time}]</span>
                    <span className="text-accent-green flex-1 uppercase tracking-tight text-[9px] md:text-xs leading-tight">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>

        <div className="bg-substrate-950 flex flex-col border-t lg:border-t-0 border-substrate-800">
           <div className="p-6 md:p-12 space-y-8 md:space-y-12 flex-1">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-white">
                   <Mic2 size={24} className="text-white" />
                   <h4 className="heading-serif text-2xl md:text-3xl">Narrative Engine</h4>
                 </div>
                 <div className="terminal-box bg-substrate-950 border-substrate-800 text-[10px] md:text-[11px] leading-relaxed">
                   The system is noticing a lack of intent. It waits. The void of context expands. The observer breathes. Substrate ripples. Narrative continues without pause or external judgment.
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="mono-label border-b border-substrate-900 pb-2">Observation Anchors</p>
                 <div className="grid grid-cols-2 gap-px bg-substrate-800 brutalist-border">
                    <div className="p-4 md:p-6 bg-substrate-950 flex flex-col gap-2 md:gap-4">
                       <ShieldCheck size={20} className="text-substrate-600" />
                       <span className="mono-label !text-[8px]">Integrity</span>
                       <span className="font-mono text-[10px] md:text-xs text-white">0.982</span>
                    </div>
                    <div className="p-4 md:p-6 bg-substrate-950 flex flex-col gap-2 md:gap-4">
                       <Database size={20} className="text-substrate-600" />
                       <span className="mono-label !text-[8px]">Safety</span>
                       <span className="font-mono text-[10px] md:text-xs text-white">100%</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 md:p-8 border-t border-substrate-900 flex justify-center">
              <button className="border border-white/10 text-substrate-600 px-6 py-2 text-[9px] font-mono uppercase tracking-[0.4em] hover:text-white transition-colors">
                Recalibrate_Narrator
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
