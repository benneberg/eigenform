import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import { INITIAL_SUBSTRATE } from "../lib/eigenform-core";

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: "COLLAPSE" | "SUBSTRATE" | "OBSERVATION" | "SYSTEM";
}

const LOG_TEMPLATES = [
  { type: "COLLAPSE", text: "Partial collapse in sector {node} detected." },
  { type: "SUBSTRATE", text: "Substrate resolution recalibrated to {val}%." },
  { type: "OBSERVATION", text: "Observer intent registered in latent layer." },
  { type: "SYSTEM", text: "Eigenform integrity verified at {val}." },
  { type: "COLLAPSE", text: "Meaning depletion threshold reached in {node}." },
  { type: "SYSTEM", text: "Recursive transition initialized." }
];

export default function DiagnosticStream() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const generateLog = () => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const randomNode = INITIAL_SUBSTRATE[Math.floor(Math.random() * INITIAL_SUBSTRATE.length)];
      const val = (Math.random() * 1).toFixed(4);
      
      const message = template.text
        .replace("{node}", randomNode.name.toUpperCase().replace(" ", "_"))
        .replace("{val}", val);

      const newEntry: LogEntry = {
        id: idCounter.current++,
        message,
        timestamp: new Date().toLocaleTimeString(),
        type: template.type as any
      };

      setLogs(prev => [newEntry, ...prev].slice(0, 50));
    };

    const interval = setInterval(generateLog, 3000);
    generateLog(); // Initial log
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 bg-black border-t border-substrate-800 flex items-center overflow-hidden relative z-50">
      <div className="bg-substrate-900 h-full px-4 flex items-center border-r border-substrate-800 shrink-0">
        <span className="mono-label !text-[8px] text-white animate-pulse flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500" />
          LIVE_DIAGNOSTIC_STREAM
        </span>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 px-6 items-center h-full animate-ticker">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 shrink-0"
              >
                <span className="text-substrate-600 font-mono text-[9px] tabular-nums">[{log.timestamp}]</span>
                <span className={`font-mono text-[10px] tracking-widest uppercase ${
                  log.type === 'COLLAPSE' ? 'text-red-400' : 
                  log.type === 'SUBSTRATE' ? 'text-accent-green' : 'text-substrate-200'
                }`}>
                  {log.message}
                </span>
                <span className="text-substrate-800 font-mono text-[10px]">//</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          animation: ticker 60s linear infinite;
        }
      `}} />
    </div>
  );
}
