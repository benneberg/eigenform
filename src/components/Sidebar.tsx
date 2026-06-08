import { motion } from "motion/react";
import { 
  Dna, 
  Layers, 
  Zap, 
  Terminal, 
  EyeOff, 
  ChevronRight 
} from "lucide-react";
import { CONCEPTS } from "../types";

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const ICON_MAP: Record<string, any> = {
  eigenform: Dna,
  satisfice: Layers,
  latent: Zap,
  teller: Terminal,
  aporia: EyeOff,
};

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-substrate-800 p-4 md:p-10 flex flex-row md:flex-col gap-6 md:gap-12 bg-substrate-950 z-20 items-center md:items-start shrink-0 overflow-x-auto md:overflow-x-visible scrollbar-hide">
      <div className="space-y-4 shrink-0 hidden md:block">
        <div className="w-12 h-12 brutalist-border flex items-center justify-center font-bold text-white italic aspect-square">
          EF
        </div>
        <p className="mono-label leading-tight">System<br />Topology</p>
      </div>

      <nav className="flex flex-row md:flex-col gap-4 md:gap-8 md:py-8 md:border-l border-substrate-800 md:pl-8 flex-1">
        {CONCEPTS.map((concept, index) => {
          const isActive = activeId === concept.id;

          return (
            <button
              key={concept.id}
              onClick={() => onSelect(concept.id)}
              className={`group text-left transition-all relative whitespace-nowrap md:whitespace-normal shrink-0 ${
                isActive ? "text-white" : "text-substrate-600 hover:text-substrate-400"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-marker"
                  className="absolute -bottom-1 md:-bottom-0 md:-left-[33px] left-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[3px] h-[2px] md:h-4 bg-white"
                />
              )}
              <span className="hidden md:block mono-label !text-[8px] mb-1 opacity-50">0{index + 1} / CONCEPT</span>
              <h3 className={`text-base md:text-xl font-bold italic tracking-tight ${isActive ? "text-white" : ""}`} style={{ fontFamily: 'Georgia, serif' }}>
                {concept.name}
              </h3>
              <div className="hidden md:block">
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-substrate-400 mt-2 leading-snug max-w-[180px]"
                  >
                    {concept.principle}
                  </motion.p>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="pt-0 md:pt-8 md:border-t border-substrate-900 shrink-0">
        <button className="border border-substrate-200 px-4 md:px-6 py-2 md:py-3 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-substrate-200 hover:bg-substrate-200 hover:text-black transition-colors whitespace-nowrap">
          Observe
        </button>
      </div>
    </div>
  );
}
