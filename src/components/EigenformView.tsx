import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ObserverRole } from "../types";
import { Eye, Activity, Target, Shield, Microscope } from "lucide-react";

const ROLES = [
  { id: ObserverRole.NEUTRAL, label: "Neutral Substrate", icon: Eye, activeClass: "text-substrate-400", bg: "#444" },
  { id: ObserverRole.SRE, label: "System Reliability", icon: Activity, activeClass: "text-accent-green", bg: "#00FF41" },
  { id: ObserverRole.MARKETER, label: "Growth Observer", icon: Target, activeClass: "text-white", bg: "#f2f2f2" },
  { id: ObserverRole.SECURITY, label: "Secure Boundary", icon: Shield, activeClass: "text-red-500", bg: "#ef4444" },
  { id: ObserverRole.RESEARCHER, label: "Conceptual Layer", icon: Microscope, activeClass: "text-blue-500", bg: "#3b82f6" },
];

export default function EigenformView() {
  const [activeRole, setActiveRole] = useState<ObserverRole>(ObserverRole.NEUTRAL);

  return (
    <div className="h-full flex flex-col gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-5xl text-white">Eigenform</h2>
        <p className="text-substrate-400 max-w-2xl leading-relaxed">
          Meaning is not intrinsic. The system collapses into a stable state only through the interaction of an observer. 
          Select a role to observe the system's recursive semantic shift.
        </p>
      </header>

      <div className="flex gap-1 p-1 bg-substrate-900 border border-substrate-800 w-fit">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                isActive ? "bg-substrate-200 text-black" : "text-substrate-500 hover:text-substrate-300"
              }`}
            >
              <Icon size={14} className={isActive ? "" : ""} />
              {role.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 relative flex items-center justify-center p-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full"
          >
            <div className="bg-substrate-200 text-black p-12 relative shadow-[20px_20px_0_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 text-black/50">
                    <div className="w-2 h-2 bg-black animate-pulse" />
                    Collapse Result: {activeRole} Node 0x{(Math.random() * 0xFFF | 0).toString(16).toUpperCase()}
                  </div>
                  <h3 className="heading-serif text-6xl py-4 leading-tight">
                    "{activeRole === ObserverRole.NEUTRAL && "Latent data fabric waiting for intent."}"
                    {activeRole === ObserverRole.SRE && "The system renders as a performance lattice."}
                    {activeRole === ObserverRole.MARKETER && "The substrate becomes a recursive funnel."}
                    {activeRole === ObserverRole.SECURITY && "Observation collapses into threat vectors."}
                    {activeRole === ObserverRole.RESEARCHER && "Recursive feedback analysis instantiated."}
                  </h3>
                </div>
                <div className="absolute top-0 right-0 p-8 text-right opacity-20">
                  <span className="text-[120px] font-black italic leading-none pointer-events-none select-none">
                     {activeRole.slice(0, 2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-8 items-end">
                <div className="flex-1 space-y-4">
                  <p className="text-sm font-medium leading-relaxed opacity-70 max-w-lg">
                    Meaning is not intrinsic. Your intent has forced the underlying substrate to collapse into a stable observational form.
                  </p>
                  <div className="flex gap-12 font-mono text-[10px] pt-4 border-t border-black/10">
                    <div><span className="opacity-40 block mb-1">BIAS</span> {activeRole === ObserverRole.NEUTRAL ? "0.00" : (Math.random() * 0.9).toFixed(3)}</div>
                    <div><span className="opacity-40 block mb-1">STABILITY</span> 0.999%</div>
                    <div><span className="opacity-40 block mb-1">ENTROPY</span> 0.12 η</div>
                  </div>
                </div>
                <div className="w-20 h-20 bg-accent-green flex items-center justify-center text-black font-black text-xl italic shadow-lg">
                  01
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Abstract circle decoration from Design HTML */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[600px] h-[600px] border border-white rounded-full flex items-center justify-center">
            <div className="w-[450px] h-[450px] border border-white rounded-full flex items-center justify-center">
              <div className="w-[300px] h-[300px] border border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
