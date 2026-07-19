import React from "react";
import { motion } from "motion/react";
import { CONCEPTS } from "../types";

// Bespoke Brutalist SVG Icons
function EigenformIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function SatisficeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="4" y="15" width="16" height="5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LatentIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="9" y="9" width="9" height="9" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function TellerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" />
      <path d="M7 8l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
      <line x1="13" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function AporiaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="17" r="2.5" fill="currentColor" />
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  eigenform: EigenformIcon,
  satisfice: SatisficeIcon,
  latent: LatentIcon,
  teller: TellerIcon,
  aporia: AporiaIcon,
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
          const IconComponent = ICON_MAP[concept.id];

          return (
            <button
              key={concept.id}
              onClick={() => onSelect(concept.id)}
              className={`group text-left transition-all relative whitespace-nowrap md:whitespace-normal shrink-0 flex items-center md:items-start gap-3 md:gap-4 ${
                isActive ? "text-white" : "text-substrate-600 hover:text-substrate-400"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-marker"
                  className="absolute -bottom-1 md:-bottom-0 md:-left-[33px] left-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[3px] h-[2px] md:h-8 bg-white"
                />
              )}

              {/* Brutalist SVG Icon Box */}
              <div className={`p-1.5 md:p-2 border transition-all shrink-0 flex items-center justify-center ${
                isActive 
                  ? "bg-white text-black border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]" 
                  : "bg-substrate-950 border-substrate-800 text-substrate-600 group-hover:text-substrate-400 group-hover:border-substrate-600"
              }`}>
                {IconComponent && <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4" />}
              </div>

              <div className="flex-1 min-w-0">
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
