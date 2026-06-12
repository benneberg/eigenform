import { useState, ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import EigenformView from "./components/EigenformView";
import SatisficeView from "./components/SatisficeView";
import LatentView from "./components/LatentView";
import TellerView from "./components/TellerView";
import AporiaView from "./components/AporiaView";
import DiagnosticStream from "./components/DiagnosticStream";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeConcept, setActiveConcept] = useState("eigenform");

  const views: Record<string, ReactNode> = {
    eigenform: <EigenformView />,
    satisfice: <SatisficeView />,
    latent: <LatentView />,
    teller: <TellerView />,
    aporia: <AporiaView />,
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex flex-1 bg-substrate-950 text-substrate-200 overflow-hidden font-sans border-[6px] md:border-[12px] border-[#151515] relative flex-col md:flex-row min-h-0">
        <Sidebar activeId={activeConcept} onSelect={setActiveConcept} />
        
        <main className="flex-1 relative overflow-hidden flex flex-col p-4 md:p-10 pt-8 md:pt-12 overflow-y-auto scrollbar-hide z-10">
          <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative">
            
            {/* Header - Compact on mobile */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 gap-4">
              <div>
                <h1 className="heading-serif text-5xl md:text-8xl leading-none uppercase text-white">Eigenform</h1>
                <p className="mono-label mt-2">Observer-Relative Adaptive Systems // v1.0</p>
              </div>
              <div className="text-right w-full md:w-auto">
                <div className="terminal-box text-left">
                  STATUS: OPERATIONAL<br />
                  COLLAPSE_PROBABILITY: 0.9842<br />
                  SUBSTRATE_INTEGRITY: 100%
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 min-h-0"
              >
                {views[activeConcept]}
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-substrate-900 flex flex-col md:flex-row justify-between items-start md:items-end opacity-50 gap-4">
            <div className="flex flex-wrap gap-4 md:gap-12 mono-label text-[8px] md:text-[9px] tracking-[0.2em] uppercase">
              <span>AXIOM_01: Meaning is Extrinsic</span>
              <span>AXIOM_02: Meaning is Emergent</span>
            </div>
            <div className="text-substrate-700 italic font-serif text-xs md:text-sm">
              "The system is what you need it to be."
            </div>
          </footer>
        </main>

        {/* Decorative vertical text - Hide on mobile */}
        <div className="hidden md:block absolute top-1/2 -right-24 transform -rotate-90 origin-center pointer-events-none select-none z-0">
          <span className="text-[#151515] font-black text-[140px] leading-none uppercase tracking-tighter">SUBSTRATE</span>
        </div>
      </div>
      <DiagnosticStream />
    </div>
  );
}

