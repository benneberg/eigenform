import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, Database, Cpu, Plus, Minus } from "lucide-react";
import { useSubstrate } from "../context/SubstrateContext";

export default function LatentView() {
  const { nodes, toggleNodeStatus } = useSubstrate();

  const activeNodes = nodes.filter(n => n.status === "ACTIVE");

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "GATEWAY": return Cpu;
      case "DATABASE": return Database;
      default: return Activity;
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10" role="region" aria-label="Latent Situational Instantiation View">
      <header className="space-y-4">
        <h2 className="heading-serif text-4xl md:text-5xl text-white">Latent</h2>
        <p className="text-substrate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Services are not persistent entities; they are situational instantiations created by demand. 
          Click any substrate coordinate below to instantiate a service or return it to its latent state.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-substrate-800 brutalist-border flex-1 overflow-hidden lg:overflow-visible">
        {/* Situation Topology Canvas */}
        <div className="bg-substrate-950 p-6 md:p-12 flex flex-col relative overflow-hidden min-h-[360px]">
          <div className="flex justify-between items-center mb-8 md:mb-12 z-10">
            <div>
              <h3 className="heading-serif text-2xl md:text-3xl text-white">Situation Topology</h3>
              <p className="mono-label !text-[8px] text-substrate-500 mt-1">Interactive Substrate Nodes</p>
            </div>
            <div 
              className={`terminal-box !py-1 !px-3 shadow-lg !text-[8px] md:!text-[10px] ${
                activeNodes.length >= 4 ? "border-accent-green text-accent-green" : "border-substrate-700 text-substrate-400"
              }`}
            >
              FABRIC: {activeNodes.length === 0 ? "DORMANT" : activeNodes.length > 3 ? "SATURATED" : "ADAPTIVE"}
            </div>
          </div>

          <div className="flex-1 relative border border-substrate-900 overflow-hidden bg-black/40 flex items-center justify-center">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Core Gateway Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 brutalist-border bg-substrate-950 flex flex-col items-center justify-center text-center font-black italic text-xs md:text-sm text-substrate-300 shadow-2xl">
                <span>CORE</span>
                <span className="font-mono text-[7px] text-accent-green tracking-widest font-normal not-italic mt-0.5">SUBSTRATE</span>
              </div>
            </div>

            {/* Orbiting Substrate Nodes */}
            {nodes.map((node, i) => {
              const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
              const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 95 : 145;
              const isActive = node.status === "ACTIVE";
              const Icon = getNodeIcon(node.type);

              return (
                <div 
                  key={node.id}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(${Math.cos(angle) * radius - 24}px, ${Math.sin(angle) * radius - 24}px)`
                  }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 0.25, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute h-px w-[95px] md:w-[145px] bg-accent-green origin-left pointer-events-none"
                        style={{
                          transform: `rotate(${angle + Math.PI}rad) translateX(24px)`
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => toggleNodeStatus(node.id)}
                    aria-label={`Toggle instantiation of ${node.name}. Currently ${node.status}`}
                    className={`w-12 h-12 md:w-14 md:h-14 border transition-all duration-300 flex flex-col items-center justify-center relative group z-20 ${
                      isActive 
                        ? "bg-substrate-200 border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                        : "bg-substrate-950/80 border-dashed border-substrate-800 text-substrate-500 hover:border-substrate-500 hover:text-white"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-black" : "text-substrate-500 group-hover:text-white"} />
                    <span className="font-mono text-[7px] font-bold uppercase tracking-wider mt-1 leading-none">
                      {node.name.split(" ")[0]}
                    </span>
                    
                    {/* Hover Status Indicator Badge */}
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border border-black flex items-center justify-center text-[7px] font-black bg-white text-black">
                      {isActive ? <Minus size={8} /> : <Plus size={8} />}
                    </div>
                  </button>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-30">
                    <p className={`mono-label !text-[6px] md:!text-[7px] px-1 py-0.5 border ${
                      isActive ? "bg-black text-white border-substrate-700" : "bg-black/80 text-substrate-600 border-substrate-900"
                    }`}>
                      {node.name} // {node.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mono-label !text-[7px] text-substrate-600 text-center mt-4">
            Click any node coordinate to toggle between latent potential and active situational instantiation.
          </p>
        </div>

        {/* Instantiation Log & Active Control Panel */}
        <div className="bg-substrate-950 p-6 md:p-12 flex flex-col gap-6 md:gap-8 border-t lg:border-t-0 border-substrate-800">
          <div className="flex justify-between items-center border-b border-substrate-900 pb-4">
            <h3 className="mono-label">Active Surface Registry</h3>
            <span className="mono-label !text-[8px] text-accent-green">
              {activeNodes.length} / {nodes.length} INSTANTIATED
            </span>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-2 max-h-[340px]" role="log" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {nodes.map(node => {
                const isActive = node.status === "ACTIVE";
                const estimatedLatency = Math.max(4, Math.round(node.load * 0.35 + 4));

                return (
                  <motion.div
                    key={node.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 md:p-4 border flex justify-between items-center transition-all ${
                      isActive 
                        ? "bg-substrate-900/60 border-substrate-800" 
                        : "bg-substrate-950 border-substrate-900/50 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-2 h-2 ${isActive ? "bg-accent-green animate-pulse" : "bg-substrate-700"}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white">
                            {node.name}
                          </span>
                          <span className="mono-label !text-[7px] text-substrate-500">[{node.type}]</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 font-mono text-[8px] text-substrate-400">
                          <span>LOAD: {node.load}%</span>
                          <span>ENTROPY: {node.entropy.toFixed(3)} Φ</span>
                          {isActive && <span className="text-accent-green">LATENCY: {estimatedLatency}MS</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleNodeStatus(node.id)}
                      aria-label={`Toggle state for ${node.name}`}
                      className={`px-2.5 py-1 text-[8px] font-mono uppercase tracking-widest transition-all ${
                        isActive 
                          ? "border border-red-500/40 text-red-400 hover:bg-red-500/10" 
                          : "border border-accent-green/40 text-accent-green hover:bg-accent-green/10"
                      }`}
                    >
                      {isActive ? "Dematerialize" : "Instantiate"}
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="pt-6 md:pt-8 border-t border-substrate-900 flex justify-between items-end">
            <div className="space-y-2 md:space-y-4">
              <p className="mono-label !text-[8px] md:!text-[9px]">Active Instantiation Surface</p>
              <div className="flex gap-1.5 md:gap-2">
                {nodes.map(n => (
                  <div 
                    key={n.id} 
                    title={`${n.name}: ${n.status}`}
                    className={`h-4 w-2 md:h-5 md:w-3 transition-colors ${
                      n.status === "ACTIVE" ? "bg-accent-green shadow-[0_0_8px_rgba(0,255,102,0.4)]" : "bg-substrate-800"
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="mono-label !text-[8px] md:!text-[9px]">Instantiated Ratio</p>
              <p className="heading-serif text-2xl md:text-3xl text-white leading-none">
                {((activeNodes.length / nodes.length) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
