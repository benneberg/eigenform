import { useState, useEffect, ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import EigenformView from "./components/EigenformView";
import SatisficeView from "./components/SatisficeView";
import LatentView from "./components/LatentView";
import TellerView from "./components/TellerView";
import AporiaView from "./components/AporiaView";
import DiagnosticStream from "./components/DiagnosticStream";
import { motion, AnimatePresence } from "motion/react";
import { useSubstrate } from "./context/SubstrateContext";
import { Download, Layers, Sparkles } from "lucide-react";
import { ScenarioKey, CONCEPTS } from "./types";
import { PRESET_SCENARIOS } from "./lib/eigenform-core";

export default function App() {
  const [activeConcept, setActiveConcept] = useState("eigenform");
  const { 
    activeScenario, 
    loadPresetScenario, 
    exportTelemetry, 
    driftSpeed, 
    setDriftSpeed,
    nodes
  } = useSubstrate();

  const views: Record<string, ReactNode> = {
    eigenform: <EigenformView />,
    satisfice: <SatisficeView />,
    latent: <LatentView />,
    teller: <TellerView />,
    aporia: <AporiaView />,
  };

  // Keyboard navigation & accessibility shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focusing an input or textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= "1" && e.key <= "5") {
        const index = parseInt(e.key, 10) - 1;
        if (CONCEPTS[index]) {
          setActiveConcept(CONCEPTS[index].id);
        }
      } else if (e.key.toLowerCase() === "p") {
        setDriftSpeed(driftSpeed === 0 ? 1 : 0);
      } else if (e.key.toLowerCase() === "e") {
        exportTelemetry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [driftSpeed, setDriftSpeed, exportTelemetry]);

  // Calculate active statistics
  const activeCount = nodes.filter(n => n.status === "ACTIVE").length;
  const avgEntropy = (nodes.reduce((acc, n) => acc + n.entropy, 0) / nodes.length).toFixed(3);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex flex-1 bg-substrate-950 text-substrate-200 overflow-hidden font-sans border-[6px] md:border-[12px] border-[#151515] relative flex-col md:flex-row min-h-0">
        <Sidebar activeId={activeConcept} onSelect={setActiveConcept} />
        
        <main 
          className="flex-1 relative overflow-hidden flex flex-col p-4 md:p-10 pt-6 md:pt-10 overflow-y-auto scrollbar-hide z-10"
          role="main"
          aria-label="Eigenform Substrate Workspace"
        >
          <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative">
            
            {/* Header & Scenario Presets Toolbar */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-6 md:mb-8 gap-6 border-b border-substrate-900 pb-6">
              <div>
                <h1 className="heading-serif text-5xl md:text-7xl leading-none uppercase text-white tracking-tight">
                  Eigenform
                </h1>
                <p className="mono-label mt-2 text-substrate-400">
                  Observer-Relative Adaptive Systems // Portfolio Edition v1.0
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="mono-label !text-[7px] text-substrate-600">SHORTCUTS:</span>
                  <span className="font-mono text-[8px] bg-substrate-900 px-1.5 py-0.5 text-substrate-300 border border-substrate-800">
                    [1-5] View Tabs
                  </span>
                  <span className="font-mono text-[8px] bg-substrate-900 px-1.5 py-0.5 text-substrate-300 border border-substrate-800">
                    [P] Pause Drift
                  </span>
                  <span className="font-mono text-[8px] bg-substrate-900 px-1.5 py-0.5 text-substrate-300 border border-substrate-800">
                    [E] Export Snapshot
                  </span>
                </div>
              </div>

              {/* Scenario Presets & Telemetry Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                {/* Preset Scenario Selector */}
                <div className="bg-substrate-950 p-2 border border-substrate-800 flex flex-col gap-1 w-full sm:w-auto">
                  <div className="flex items-center gap-1.5 text-substrate-400">
                    <Layers size={10} className="text-accent-green" />
                    <span className="mono-label !text-[7px]">Preset Stress Scenarios</span>
                  </div>
                  <div className="flex flex-wrap gap-1" role="group" aria-label="Preset Stress Scenarios">
                    {(Object.keys(PRESET_SCENARIOS) as ScenarioKey[]).map((sKey) => {
                      const isSelected = activeScenario === sKey;
                      return (
                        <button
                          key={sKey}
                          onClick={() => loadPresetScenario(sKey)}
                          title={PRESET_SCENARIOS[sKey].description}
                          aria-pressed={isSelected}
                          className={`px-2 py-1 text-[8px] font-mono uppercase tracking-wider transition-all border ${
                            isSelected 
                              ? "bg-white text-black border-white font-bold shadow-sm" 
                              : "bg-substrate-900 border-substrate-800 text-substrate-400 hover:text-white hover:border-substrate-600"
                          }`}
                        >
                          {sKey}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Telemetry Status & Export Button */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <div className="terminal-box text-left !p-2 !text-[8px] leading-tight">
                    STATUS: OPERATIONAL // ACT: {activeCount}/{nodes.length}<br />
                    ENTROPY_AVG: {avgEntropy} Φ<br />
                    SCENARIO: {activeScenario}
                  </div>
                  <button
                    onClick={exportTelemetry}
                    aria-label="Export Telemetry Snapshot JSON"
                    className="w-full border border-accent-green/40 hover:border-accent-green bg-accent-green/10 hover:bg-accent-green/20 text-accent-green py-1.5 px-3 font-mono text-[8px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download size={10} />
                    <span>Export Telemetry</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Concept View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex-1 min-h-0"
              >
                {views[activeConcept]}
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-substrate-900 flex flex-col md:flex-row justify-between items-start md:items-end opacity-60 gap-4">
            <div className="flex flex-wrap gap-4 md:gap-12 mono-label text-[8px] md:text-[9px] tracking-[0.2em] uppercase">
              <span>AXIOM_01: Meaning is Extrinsic</span>
              <span>AXIOM_02: Meaning is Emergent</span>
              <span>AXIOM_03: Observation Collapses State</span>
            </div>
            <div className="text-substrate-600 italic font-serif text-xs md:text-sm">
              "The system is what you need it to be."
            </div>
          </footer>
        </main>

        {/* Decorative background branding */}
        <div className="hidden md:block absolute top-1/2 -right-24 transform -rotate-90 origin-center pointer-events-none select-none z-0">
          <span className="text-[#151515] font-black text-[140px] leading-none uppercase tracking-tighter">SUBSTRATE</span>
        </div>
      </div>
      <DiagnosticStream />
    </div>
  );
}

