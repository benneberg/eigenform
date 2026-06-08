import { useState } from "react";
import { motion } from "motion/react";
import { Sliders } from "lucide-react";

export default function SatisficeView() {
  const [density, setDensity] = useState(40);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Satisfice</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          The system maintains a minimum meaningful substrate for a given context. 
          Optimization is a local phenomenon—satisficing is global stability.
        </p>
      </header>

      <div className="brutalist-border p-6 md:p-12 bg-substrate-900 space-y-8 md:space-y-12 flex-1 flex flex-col relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-8 md:gap-12 border-b border-substrate-800 pb-8 md:pb-12">
          <div className="flex-1 space-y-4 md:space-y-6 w-full">
            <div className="flex justify-between items-center">
              <label className="mono-label !text-[8px] md:!text-[9px]">Operational Density</label>
              <span className="text-2xl md:text-4xl font-black italic text-white tracking-widest leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                {density}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={density} 
              onChange={(e) => setDensity(parseInt(e.target.value))}
              className="w-full accent-white h-2 bg-substrate-800 rounded-none appearance-none cursor-pointer border border-substrate-700"
            />
            <div className="flex justify-between font-mono text-[7px] text-substrate-600 uppercase tracking-tighter">
              <span>Entropy_Min</span>
              <span>Context_Limit</span>
              <span>Total_Fabric</span>
            </div>
          </div>
          <div className="w-full md:w-80 bg-substrate-950 p-4 md:p-6 border border-substrate-800 flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-green text-black font-black italic text-lg shadow-lg flex items-center justify-center shrink-0">
              {density < 20 ? "L" : density < 70 ? "C" : "O"}
            </div>
            <div>
              <p className="mono-label !text-[7px]">Substrate Mode</p>
              <p className="text-[9px] md:text-xs font-bold text-white uppercase tracking-wider mt-1">
                {density < 20 ? "Latent Substrate" : 
                 density < 70 ? "Contextual Flux" : "Total Observability"}
              </p>
              <p className="text-[8px] text-substrate-500 font-mono mt-1 leading-none">STATUS: {density > 90 ? "UNSTABLE" : "STABLE"}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-substrate-800 brutalist-border overflow-hidden min-h-[300px]">
          {Array.from({ length: 48 }).map((_, i) => {
            const isVisible = i < (density / 100) * 48;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  backgroundColor: isVisible ? "#F2F2F2" : "#0A0A0A",
                  color: isVisible ? "#000000" : "#444444",
                  scale: isVisible ? [1, 1.02, 1] : 1
                }}
                transition={isVisible ? { duration: 2, repeat: Infinity } : {}}
                className={`p-2 md:p-4 aspect-square flex flex-col justify-between transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[6px] md:text-[8px] font-bold uppercase tracking-tighter">N_{i.toString(16).toUpperCase()}</span>
                  {isVisible && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent-green" />}
                </div>
                {isVisible && (
                  <div className="space-y-1">
                    <p className="font-mono text-[5px] md:text-[7px] font-bold leading-none">V:{(Math.random() * 1).toFixed(2)}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
           <span className="heading-serif text-[120px] md:text-[240px] leading-none pointer-events-none select-none">S</span>
        </div>

        <p className="text-right text-[8px] md:text-[10px] text-substrate-600 font-mono italic uppercase tracking-widest pt-4">
          "Information is only meaningful relative to the constraint of its observation."
        </p>
      </div>
    </div>
  );
}
