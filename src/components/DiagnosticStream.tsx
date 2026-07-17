import { motion, AnimatePresence } from "motion/react";
import { useSubstrate } from "../context/SubstrateContext";
import { Play, Pause, ChevronRight } from "lucide-react";

export default function DiagnosticStream() {
  const { logs, driftSpeed, setDriftSpeed } = useSubstrate();

  return (
    <div className="h-10 bg-black border-t border-substrate-800 flex items-center overflow-hidden relative z-50 justify-between">
      <div className="flex items-center h-full">
        <div className="bg-substrate-900 h-full px-4 flex items-center border-r border-substrate-800 shrink-0">
          <span className="mono-label !text-[8px] text-white animate-pulse flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500" />
            LIVE_DIAGNOSTIC_STREAM
          </span>
        </div>
        
        <div className="overflow-hidden max-w-[60vw] md:max-w-[70vw]">
          <div className="flex whitespace-nowrap gap-12 px-6 items-center h-full animate-ticker">
            <AnimatePresence initial={false}>
              {logs.length === 0 ? (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-substrate-500 font-mono text-[9px] uppercase tracking-widest animate-pulse">
                    Substrate silent. Awaiting observer action...
                  </span>
                </div>
              ) : (
                logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 shrink-0"
                  >
                    <span className="text-substrate-600 font-mono text-[9px] tabular-nums">[{log.timestamp}]</span>
                    <span className={`font-mono text-[10px] tracking-widest uppercase ${
                      log.type === 'COLLAPSE' ? 'text-red-400 font-bold' : 
                      log.type === 'SUBSTRATE' ? 'text-accent-green' : 'text-substrate-200'
                    }`}>
                      {log.message}
                    </span>
                    <span className="text-substrate-800 font-mono text-[10px]">//</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Global Time Control Widget */}
      <div className="bg-substrate-900 h-full px-4 flex items-center border-l border-substrate-800 shrink-0 gap-3">
        <span className="mono-label !text-[8px] text-substrate-400 uppercase tracking-widest hidden sm:inline">
          Global Time:
        </span>
        <div className="flex items-center bg-black border border-substrate-800 p-0.5">
          <button
            onClick={() => setDriftSpeed(0)}
            title="Pause Substrate Drift"
            className={`p-1 transition-all ${
              driftSpeed === 0 ? "bg-red-500 text-black font-bold" : "text-substrate-500 hover:text-white"
            }`}
          >
            <Pause size={8} />
          </button>
          {[1, 2, 5].map((speed) => (
            <button
              key={speed}
              onClick={() => setDriftSpeed(speed)}
              title={`Set Drift Speed to ${speed}x`}
              className={`px-1.5 py-0.5 text-[8px] font-mono transition-all font-bold ${
                driftSpeed === speed ? "bg-accent-green text-black" : "text-substrate-500 hover:text-white"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          animation: ticker 90s linear infinite;
        }
      `}} />
    </div>
  );
}
