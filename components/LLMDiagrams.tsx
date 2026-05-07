import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Cpu, Server, Database, Layers } from 'lucide-react';

// --- ELASTIC SHARING DIAGRAM ---
export const ElasticSharingDiagram: React.FC = () => {
    const [cycle, setCycle] = useState(0);
    
    useEffect(() => {
        const t = setInterval(() => setCycle(c => (c + 1) % 5), 2500);
        return () => clearInterval(t);
    }, []);
    
    // Pre-defined states for stability
    const states = [
        // state 0: Low load
        [ { gpu: 30, cpu: 0 }, { gpu: 40, cpu: 0 }, { gpu: 20, cpu: 0 } ],
        // state 1: A spikes
        [ { gpu: 60, cpu: 20 }, { gpu: 20, cpu: 0 }, { gpu: 10, cpu: 0 } ],
        // state 2: B spikes
        [ { gpu: 20, cpu: 0 }, { gpu: 50, cpu: 40 }, { gpu: 20, cpu: 0 } ],
        // state 3: C spikes
        [ { gpu: 15, cpu: 0 }, { gpu: 15, cpu: 0 }, { gpu: 60, cpu: 50 } ],
        // state 4: All high
        [ { gpu: 30, cpu: 20 }, { gpu: 30, cpu: 30 }, { gpu: 30, cpu: 20 } ]
    ];
    
    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500'];
    const names = ['Inst A (7B)', 'Inst B (13B)', 'Inst C (3B)'];
    
    const currState = states[cycle];
    
    return (
        <div className="flex flex-col p-8 bg-white border border-stone-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="font-serif text-xl text-stone-900 mb-1">Dynamic Elastic Sharing</h3>
                    <p className="text-sm text-stone-500 max-w-sm">
                        Seamlessly pushing overflow to CPU memory.
                    </p>
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-stone-100 text-stone-500 rounded-full border border-stone-200">
                    Cycle {cycle + 1}/5
                </div>
            </div>
            
            <div className="space-y-6">
                {/* GPU Node */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center gap-2 mb-3">
                        <Server className="w-4 h-4 text-stone-600" />
                        <span className="text-sm font-bold text-stone-800 uppercase tracking-wider">Shared GPU Node (High Perf)</span>
                    </div>
                    <div className="w-full h-8 flex gap-1 rounded bg-stone-200 p-1 overflow-hidden">
                        {currState.map((alloc, i) => (
                            <motion.div 
                                key={`gpu-${i}`}
                                className={`h-full rounded-sm ${colors[i]} flex items-center justify-center overflow-hidden`}
                                animate={{ width: `${alloc.gpu}%` }}
                                transition={{ type: 'spring', bounce: 0.2 }}
                            >
                                {alloc.gpu > 15 && <span className="text-[10px] font-bold text-white whitespace-nowrap px-1">{names[i]}</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CPU Node */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-stone-600" />
                        <span className="text-sm font-bold text-stone-800 uppercase tracking-wider">Heterogeneous CPU Node (Large Cap)</span>
                    </div>
                    <div className="w-full h-8 flex gap-1 rounded bg-stone-200 p-1 overflow-hidden relative">
                        {currState.every(a => a.cpu === 0) && (
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-stone-400">IDLE</div>
                        )}
                        {currState.map((alloc, i) => (
                            <motion.div 
                                key={`cpu-${i}`}
                                className={`h-full rounded-sm ${colors[i]} opacity-70 flex items-center justify-center overflow-hidden`}
                                animate={{ width: `${alloc.cpu}%` }}
                                transition={{ type: 'spring', bounce: 0.2 }}
                            >
                                {alloc.cpu > 15 && <span className="text-[10px] font-bold text-white whitespace-nowrap px-1">{names[i]} (Spillover)</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
                {names.map((name, i) => (
                    <div key={name} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-sm ${colors[i]}`}></div>
                        <span className="text-xs text-stone-600 font-medium">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- HEADROOM SCHEDULING DIAGRAM ---
export const HeadroomDiagram: React.FC = () => {
  const [cycle, setCycle] = useState(0);

  // 3 instances sharing the node
  const [instances, setInstances] = useState([
    { id: 1, req: 'Req A', headroom: 3.5, active: false, color: 'bg-blue-500' },
    { id: 2, req: 'Req B', headroom: 2.1, active: false, color: 'bg-orange-500' },
    { id: 3, req: 'Req C', headroom: 4.2, active: false, color: 'bg-green-500' },
  ]);

  const stepSimulation = () => {
    setInstances(prev => {
      // Find instance with minimum headroom
      let minIdx = 0;
      let minVal = 999;
      prev.forEach((inst, i) => {
        if (inst.headroom < minVal) {
          minVal = inst.headroom;
          minIdx = i;
        }
      });

      return prev.map((inst, i) => ({
        ...inst,
        active: i === minIdx,
        // The active one generates a token, its headroom gets slightly longer due to next token SLO, 
        // others drop because time passes. Simplified for viz.
        headroom: i === minIdx ? inst.headroom + 1.2 : Math.max(0.1, inst.headroom - 0.5)
      }));
    });
    setCycle(c => c + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Headroom-driven Token-level Scheduling</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        LLM-Mesh accurately tracks the urgency of each request (Headroom). At each cycle, it selects the instance with the smallest headroom for the next iteration.
      </p>
      
      <div className="w-full max-w-sm flex flex-col gap-4 bg-[#F5F4F0] p-6 rounded-lg border border-stone-200">
        {instances.map((inst, i) => (
          <div key={inst.id} className={`p-3 rounded-lg border flex flex-col gap-2 transition-all duration-300 ${inst.active ? 'border-stone-800 bg-white ring-2 ring-stone-200' : 'border-stone-300 bg-transparent'}`}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-stone-700">{inst.req} (Instance {inst.id})</span>
              {inst.active && <span className="text-xs font-mono font-bold bg-stone-900 text-white px-2 py-0.5 rounded">COMPUTING...</span>}
            </div>
            
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden relative">
               <motion.div 
                 className={`h-full ${inst.color}`} 
                 animate={{ width: `${Math.min(100, (inst.headroom / 6) * 100)}%` }} 
                 transition={{ type: 'spring', stiffness: 100 }}
               />
            </div>
            <div className="text-xs font-mono text-stone-500 flex justify-between">
               <span>Urgency Limit</span>
               <span>T-{inst.headroom.toFixed(1)}s</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={stepSimulation} className="mt-6 flex items-center gap-2 px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm text-sm font-medium">
        <Play size={16} /> NEXT ITERATION
      </button>
    </div>
  );
};


// --- MEMORY HAZARD DIAGRAM ---
export const MemoryHazardDiagram: React.FC = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(s => (s + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-stone-100">Tomasulo-Inspired Memory Orchestration</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    To prevent out-of-memory (OOM) hazards without blocking instances, LLM-Mesh separates scale-up requests into optimistic tracking and pessimistic execution. Wait for scale-downs to free safety budget!
                </p>
                <div className="mt-6 font-mono text-xs text-stone-500 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Database size={14} className="text-emerald-400" />
                        <span className={step === 0 || step === 1 ? 'text-emerald-400 font-bold' : ''}>1: Request demands Scale-Up</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity size={14} className="text-amber-400" />
                        <span className={step === 2 ? 'text-amber-400 font-bold' : ''}>2: Pending in Reservation Station</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Layers size={14} className="text-blue-400" />
                        <span className={step === 3 ? 'text-blue-400 font-bold' : ''}>3: Neighbor Scale-Down Completes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Cpu size={14} className="text-green-400" />
                        <span className={step === 4 ? 'text-green-400 font-bold' : ''}>4: Scale-Up Executed Safely</span>
                    </div>
                </div>
            </div>
            
            <div className="relative w-72 h-72 bg-stone-800 rounded-xl border border-stone-700 p-4 flex flex-col justify-end">
                 {/* Memory representation */}
                 <div className="w-full flex-1 flex items-end gap-2 p-2 pb-6 relative border-l-2 border-b-2 border-stone-600">
                     <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-stone-500 tracking-widest uppercase">GPU RAM</span>
                     
                     {/* Scale Down Instance */}
                     <div className="flex-1 flex flex-col justify-end items-center h-full">
                         <motion.div 
                             className="w-full bg-blue-500/20 border border-blue-500/50 rounded-t"
                             initial={{height: '80%'}}
                             animate={{height: step >= 3 ? '40%' : '80%'}}
                             transition={{ type: 'spring' }}
                         >
                            <div className="w-full h-full flex items-center justify-center text-blue-400 text-xs font-bold">INST A</div>
                         </motion.div>
                     </div>

                     {/* Scale Up Instance */}
                     <div className="flex-1 flex flex-col justify-end items-center h-full">
                         <div className="relative w-full h-full flex flex-col justify-end">
                            {/* Target size phantom */}
                            <motion.div 
                                className="absolute bottom-0 w-full bg-emerald-500/10 border-t border-dashed border-emerald-500"
                                initial={{height: '50%'}}
                                animate={{height: step >= 1 ? '90%' : '50%'}}
                                transition={{ type: 'spring' }}
                            >
                                {step >= 1 && step < 4 && <div className="absolute top-2 w-full text-center text-[10px] text-amber-400 font-mono font-bold animate-pulse">PENDING...</div>}
                            </motion.div>

                            {/* Actual allocated size */}
                            <motion.div 
                                className="w-full bg-emerald-500/20 border border-emerald-500/50 rounded-t z-10"
                                initial={{height: '50%'}}
                                animate={{height: step >= 4 ? '90%' : '50%'}}
                                transition={{ type: 'spring' }}
                            >
                               <div className="w-full h-full flex items-center justify-center text-emerald-400 text-xs font-bold">INST B</div>
                            </motion.div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    )
}

// --- MIXED SCENARIO CHART ---
export const MixedScenarioChart: React.FC = () => {
    const [scenario, setScenario] = useState<'A' | 'B'>('A');

    return (
        <div className="flex flex-col p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
            <div className="mb-6">
                <h3 className="font-serif text-xl mb-4 text-stone-800">Resource Savings via Mixed Deployment</h3>
                <p className="text-sm text-stone-500 mb-6 max-w-xl">
                    Compared to traditional exclusive GPU allocation (e.g., ServerlessLLM), LLM-Mesh requires significantly fewer resources by sharing properly across GPUs and CPUs, especially when the workload is dominated by small models.
                </p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setScenario('A')} 
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${scenario === 'A' ? 'bg-stone-800 text-white border-stone-800' : 'bg-transparent text-stone-500 border-stone-300 hover:border-stone-500'}`}
                    >
                        Standard Exclusive
                    </button>
                    <button 
                         onClick={() => setScenario('B')} 
                         className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${scenario === 'B' ? 'bg-stone-800 text-white border-stone-800' : 'bg-transparent text-stone-500 border-stone-300 hover:border-stone-500'}`}
                    >
                        LLM-Mesh (Elastic Sharing)
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-lg h-48 bg-stone-100 rounded-xl p-4 flex gap-4">
                
                {scenario === 'A' ? (
                   <>
                      <div className="flex-1 rounded border border-red-200 bg-red-50 flex items-center justify-center text-red-600 font-bold p-4 text-center">
                          <Server className="mb-2 w-full text-red-400" />
                          GPU 1 (Model 7B)
                      </div>
                      <div className="flex-1 rounded border border-red-200 bg-red-50 flex items-center justify-center text-red-600 font-bold p-4 text-center">
                          <Server className="mb-2 w-full text-red-400" />
                          GPU 2 (Model 13B)
                      </div>
                      <div className="flex-1 rounded border border-red-200 bg-red-50 flex items-center justify-center text-red-600 font-bold p-4 text-center">
                          <Server className="mb-2 w-full text-red-400" />
                          GPU 3 (Model 3B)
                      </div>
                   </>
                ) : (
                   <>
                      <div className="flex-1 rounded border border-green-200 bg-green-50 flex flex-col justify-center text-green-700 font-bold p-4 text-center">
                           <div className="text-xs uppercase opacity-70 mb-2 font-mono">Heterogeneous CPU</div>
                           <div className="flex gap-1 justify-center">
                               <div className="px-2 py-1 bg-green-200 rounded text-[10px]">3B</div>
                               <div className="px-2 py-1 bg-green-200 rounded text-[10px]">7B</div>
                           </div>
                      </div>
                      <div className="flex-1 rounded border border-emerald-200 bg-emerald-50 flex flex-col justify-center text-emerald-700 font-bold p-4 text-center">
                          <div className="text-xs uppercase opacity-70 mb-2 font-mono">Shared GPU</div>
                           <div className="flex gap-1 justify-center">
                               <div className="px-2 py-1 bg-emerald-200 rounded text-[10px]">13B</div>
                               <div className="px-2 py-1 bg-emerald-200 rounded text-[10px]">7B</div>
                               <div className="px-2 py-1 bg-emerald-200 rounded text-[10px]">3B</div>
                           </div>
                      </div>
                   </>
                )}
                
            </div>
            {scenario === 'A' && <p className="mt-4 text-sm font-serif italic text-stone-500">Resource fragmented. Requires 1 dedicated GPU node per model instance.</p>}
            {scenario === 'B' && <p className="mt-4 text-sm font-serif italic text-green-600">Resource shared efficiently across heterogeneous available hardware.</p>}

        </div>
    )
}

// --- TAKEAWAY VISUALIZATION ---
export const LLMTakeawayViz: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-12 bg-stone-900 rounded-3xl overflow-hidden relative border border-stone-800 shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="text-stone-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Final Synthesis</div>
                <h3 className="text-white font-serif text-3xl md:text-5xl text-center mb-12 leading-tight">
                    Beyond Allocation: <br/>The <span className="text-blue-400 italic">Elastic Mesh</span> Era
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                    {/* Left: Problem */}
                    <div className="flex flex-col gap-6 opacity-60">
                         <div className="text-stone-500 font-mono text-[10px] uppercase border-b border-stone-800 pb-2">Traditional: Rigid Silos</div>
                         <div className="space-y-3">
                             {[1, 2, 3].map(i => (
                                 <div key={i} className="h-16 border border-stone-700 rounded-xl flex items-center px-4 gap-4 bg-stone-800/20">
                                     <div className="w-8 h-8 rounded bg-stone-700 flex items-center justify-center"><Server size={14} className="text-stone-500" /></div>
                                     <div className="flex-1">
                                         <div className="w-1/2 h-1.5 bg-stone-700/50 rounded mb-1"></div>
                                         <div className="w-1/3 h-1.5 bg-stone-700/30 rounded"></div>
                                     </div>
                                     <div className="text-[10px] font-mono text-red-400/50 uppercase">Over-Provisioned</div>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Mesh Arrow (hidden on mobile) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-20">
                        <motion.div 
                            animate={{ x: [-10, 10, -10] }} 
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 shadow-lg"
                        >
                            <Play size={24} className="text-blue-400 fill-blue-400" />
                        </motion.div>
                    </div>

                    {/* Right: Mesh Solution */}
                    <div className="flex flex-col gap-6">
                         <div className="text-blue-400 font-mono text-[10px] uppercase border-b border-blue-900/50 pb-2">LLM-Mesh: Elastic Unity</div>
                         <div className="relative h-64 border-2 border-blue-500/20 rounded-2xl bg-blue-500/5 overflow-hidden flex items-center justify-center">
                            {/* Grid lines */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                            
                            {/* Central Mesh Pulse */}
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-48 h-48 rounded-full bg-blue-500/20 blur-3xl absolute"
                            />

                            <div className="relative grid grid-cols-3 grid-rows-3 gap-2 p-4">
                                {[...Array(9)].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="w-12 h-12 rounded-lg bg-blue-400/10 border border-blue-400/30 backdrop-blur-md flex items-center justify-center "
                                    >
                                        <Cpu size={16} className={`text-blue-400 ${i % 3 === 0 ? 'animate-pulse' : ''}`} />
                                    </motion.div>
                                ))}
                                
                                {/* Connection lines */}
                                <div className="absolute inset-0 pointer-events-none p-4">
                                    <svg className="w-full h-full text-blue-500/40" viewBox="0 0 100 100" fill="none">
                                        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                        <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                        <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                        <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                                    </svg>
                                </div>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                                 <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">+4.2x Capacity</div>
                                 <div className="w-full h-1 bg-stone-800 rounded overflow-hidden">
                                     <motion.div initial={{width:0}} animate={{width:'100%'}} className="h-full bg-emerald-400"></motion.div>
                                 </div>
                             </div>
                             <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                                 <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">98.2% SLO Met</div>
                                 <div className="w-full h-1 bg-stone-800 rounded overflow-hidden">
                                     <motion.div initial={{width:0}} animate={{width:'98%'}} className="h-full bg-blue-400"></motion.div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>

                <div className="mt-12 text-center max-w-lg">
                    <p className="text-stone-500 text-sm leading-relaxed italic">
                        LLM-Mesh proves that by discarding model-exclusive isolation, we can reclaim "stranded" resources—turning every fragment of hardware into a performant inference engine.
                    </p>
                </div>
            </div>
        </div>
    );
};
