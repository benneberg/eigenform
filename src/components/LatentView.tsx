import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, CloudRain, Cpu } from "lucide-react";

interface LatentService {
  id: string;
  name: string;
  icon: any;
  latency: number;
}

const SERVICES: LatentService[] = [
  { id: "auth", name: "Auth Sieve", icon: Cpu, latency: 12 },
  { id: "edge", name: "Edge Folding", icon: Zap, latency: 8 },
  { id: "stream", name: "Temporal Stream", icon: Activity, latency: 24 },
  { id: "cache", name: "Shadow Cache", icon: CloudRain, latency: 4 },
];

export default function LatentView() {
  const [activeServices, setActiveServices] = useState<string[]>([]);

  useEffect(() => {
    const updateActive = () => {
      const active = SERVICES.filter(() => Math.random() > 0.4).map(s => s.id);
      setActiveServices(active);
    };
    updateActive();
    const interval = setInterval(updateActive, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Latent</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Services are not persistent entities; they are situational instantiations created by demand. 
          When observation ceases, the service returns to a latent state.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-substrate-800 brutalist-border flex-1 overflow-hidden lg:overflow-visible">
        <div className="bg-substrate-950 p-6 md:p-12 flex flex-col relative overflow-hidden min-h-[350px]">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h3 className="heading-serif text-2xl md:text-3xl text-white">Situation Topology</h3>
            <div className="terminal-box !py-1 !px-3 shadow-lg !text-[8px] md:!text-[10px]">
              FABRIC: UNSTABLE
            </div>
          </div>

          <div className="flex-1 relative border border-substrate-900 overflow-hidden bg-black/40">
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 md:w-20 md:h-20 brutalist-border bg-substrate-950 flex items-center justify-center font-black italic text-xl md:text-2xl text-substrate-600">
                  CORE
                </div>
             </div>

             {SERVICES.map((service, i) => {
               const angle = (i / SERVICES.length) * 2 * Math.PI;
               const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 140;
               const isActive = activeServices.includes(service.id);

               return (
                 <div 
                   key={service.id}
                   className="absolute top-1/2 left-1/2"
                   style={{
                     transform: `translate(${Math.cos(angle) * radius - 20}px, ${Math.sin(angle) * radius - 20}px)`
                   }}
                 >
                   <AnimatePresence>
                     {isActive && (
                       <>
                        <motion.div 
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 0.1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          className="absolute h-px w-[90px] md:w-[140px] bg-white origin-left"
                          style={{
                             transform: `rotate(${angle + Math.PI}rad) translateX(20px)`
                          }}
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="w-10 h-10 md:w-12 md:h-12 bg-substrate-200 border border-white flex items-center justify-center text-black font-black uppercase text-[8px] md:text-[10px] italic shadow-xl z-20"
                        >
                          {service.id.slice(0, 1)}
                        </motion.div>
                        <motion.div 
                          className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        >
                          <p className="mono-label !text-[6px] md:!text-[7px] text-white bg-black px-1">{service.name}</p>
                        </motion.div>
                       </>
                     )}
                   </AnimatePresence>
                 </div>
               );
             })}
          </div>
        </div>

        <div className="bg-substrate-950 p-6 md:p-12 flex flex-col gap-6 md:gap-8 border-t lg:border-t-0 border-substrate-800">
          <h3 className="mono-label border-b border-substrate-900 pb-4">Instantiation Log</h3>
          <div className="flex-1 space-y-px overflow-y-auto pr-2 max-h-[300px]">
            <AnimatePresence mode="popLayout">
              {activeServices.map(sid => {
                const s = SERVICES.find(x => x.id === sid)!;
                return (
                  <motion.div
                    key={`${sid}-${Date.now()}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-3 md:p-4 bg-substrate-900/40 border-b border-substrate-900 flex justify-between items-center group transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-1.5 h-1.5 bg-accent-green" />
                      <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{s.name}</span>
                    </div>
                    <span className="font-mono text-[8px] md:text-[9px] opacity-40">INIT::{s.latency}MS</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="pt-6 md:pt-8 border-t border-substrate-900 flex justify-between items-end">
             <div className="space-y-2 md:space-y-4">
                <p className="mono-label !text-[8px] md:!text-[9px]">Active Surface</p>
                <div className="flex gap-1 md:gap-2">
                  {SERVICES.map(s => (
                    <div 
                      key={s.id} 
                      className={`h-3 w-1 md:h-4 transition-colors ${activeServices.includes(s.id) ? "bg-accent-green" : "bg-substrate-800"}`} 
                    />
                  ))}
                </div>
             </div>
             <div className="text-right">
                <p className="mono-label !text-[8px] md:!text-[9px]">Stability Score</p>
                <p className="heading-serif text-2xl md:text-3xl text-white leading-none">0.999 PHI</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
