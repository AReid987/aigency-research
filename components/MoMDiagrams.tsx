import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const QuadraticVotingDiagram: React.FC = () => {
    // 3 agents
    const agents = ['Jaya (Gen)', 'Xue (Mix)', 'Alic (Crit)'];
    
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-violet-100 my-8">
            <h3 className="font-serif text-xl mb-4 text-slate-800">Identity-Masked Quadratic Voting Matrix</h3>
            <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
                A hard diagonal mask (zeros) mathematically prevents self-dealing. Agents must distribute their quadratic voting budget to peers.
            </p>
            
            <div className="grid grid-cols-4 gap-2 mb-4 w-full max-w-sm">
                <div className="text-xs text-slate-400 font-medium self-end justify-self-center">Voter \ Prop.</div>
                {agents.map(a => <div key={a} className="text-xs font-bold text-slate-600 justify-self-center text-center">{a}</div>)}
                
                {agents.map((voter, i) => (
                    <React.Fragment key={`row-${i}`}>
                        <div className="text-xs font-bold text-slate-600 self-center text-right pr-2">{voter}</div>
                        {agents.map((prop, j) => {
                            const isSelf = i === j;
                            const isHigh = !isSelf && ((i===1 && j===0) || (i===2 && j===0));
                            
                            return (
                                <div key={`${i}-${j}`} className={`h-12 w-full flex items-center justify-center rounded border ${isSelf ? 'bg-slate-100 border-dashed border-slate-300' : isHigh ? 'bg-violet-100 border-violet-300 text-violet-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                                    {isSelf ? '0.0 (Masked)' : isHigh ? '0.74' : '0.26'}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export const ThermodynamicCurveDiagram: React.FC = () => {
    return (
        <div className="flex flex-col p-8 bg-white rounded-xl shadow-sm border border-violet-100 my-8 w-full max-w-lg mx-auto">
             <h3 className="font-serif text-xl mb-4 text-slate-800">Thermodynamic Fatigue: Efficacy vs Rounds</h3>
             <p className="text-sm text-slate-500 mb-6 max-w-md">
                Iterative refinement yields rapid early gains, but eventually quadratic context fatigue (noise/sycophancy) overwhelms signal extraction, causing a dip in accuracy.
             </p>
             <div className="relative h-48 w-full flex items-end justify-between border-l-2 border-b-2 border-slate-300 p-2 pt-8 pb-0">
                 {/* Y Axis Label */}
                 <span className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Utility (Acc)</span>
                 
                 {/* X Axis Label */}
                 <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deliberation Round (t)</span>
                 
                 {[1,2,3,4,5,6,7].map(round => {
                     const heights = [40, 60, 75, 85, 92, 88, 70];
                     const heightStr = `${heights[round-1]}%`;
                     const isPeak = round === 5;
                     
                     return (
                         <div key={round} className="relative flex flex-col items-center justify-end w-8 h-full group">
                             {isPeak && <div className="absolute -top-6 text-xs font-bold text-violet-600 whitespace-nowrap bg-violet-100 px-2 py-0.5 rounded">T-opt Peak</div>}
                             <motion.div 
                                className={`w-full rounded-t-sm transition-all duration-300 ${isPeak ? 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-slate-300 group-hover:bg-violet-300'}`}
                                initial={{ height: 0 }}
                                animate={{ height: heightStr }}
                                transition={{ type: 'spring', delay: round * 0.1 }}
                             />
                             <span className="absolute -bottom-5 text-xs text-slate-500 font-mono">{round}</span>
                         </div>
                     );
                 })}
             </div>
        </div>
    )
}

export const MoMTakeawayViz: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-12 bg-slate-900 rounded-[3rem] overflow-hidden relative border border-slate-800 shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="text-violet-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Paradigm Shift</div>
                <h3 className="text-white font-serif text-3xl md:text-5xl text-center mb-16 leading-tight">
                    From Static Gating to <br/><span className="text-violet-400 italic">Dynamic Swarms</span>
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-16 w-full">
                    {/* Visual 1: Competitive Consensus */}
                    <div className="flex-1 w-full bg-slate-800/30 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm">
                         <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-6">Semantic Recurrence</div>
                         <div className="relative h-48 flex items-center justify-center">
                             {/* Central result */}
                             <motion.div 
                                animate={{ 
                                    boxShadow: ["0 0 20px rgba(139,92,246,0.3)", "0 0 60px rgba(139,92,246,0.6)", "0 0 20px rgba(139,92,246,0.3)"] 
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-20 h-20 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-xl z-20 border-4 border-slate-900 shadow-2xl"
                             >
                                 α
                             </motion.div>

                             {/* Revolving agents */}
                             {[0, 1, 2, 3].map(i => (
                                 <motion.div
                                    key={i}
                                    animate={{ 
                                        rotate: 360,
                                    }}
                                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                 >
                                     <motion.div 
                                        style={{ translateX: 80 }}
                                        className="w-10 h-10 rounded-xl bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 font-mono text-xs shadow-xl"
                                     >
                                         {['Gen', 'Crit', 'Mix', 'Ref'][i]}
                                     </motion.div>
                                 </motion.div>
                             ))}

                             {/* Evaluation signals */}
                             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100">
                                 <motion.circle 
                                    cx="50" cy="50" r="35" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="5 5" fill="none"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                 />
                             </svg>
                         </div>
                         <div className="mt-8 space-y-2">
                             <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                 <span>Consensus Score</span>
                                 <span className="text-violet-400">94.8%</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                 <motion.div initial={{width:0}} animate={{width:'94.8%'}} transition={{delay:1, duration:1.5}} className="h-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"></motion.div>
                             </div>
                         </div>
                    </div>

                    {/* Visual 2: The Takeaway List */}
                    <div className="flex-1 w-full space-y-6">
                        <div className="p-6 bg-slate-800/20 border-l-4 border-violet-500 rounded-r-2xl">
                            <h4 className="text-white font-serif text-xl mb-2 italic">Semantic HIDDEN States</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Natural language acts as a high-dimensional vector space where agents deliberate, refining the "latent state" of the query iteratively.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-800/20 border-l-4 border-pink-500 rounded-r-2xl">
                            <h4 className="text-white font-serif text-xl mb-2 italic">Collective Intelligence</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Three 7B models in a NSED loop mathematically outperform a single GPT-4 (1.8T) on logic benchmarks, proving scaling via depth of thought rather than size.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-800/20 border-l-4 border-emerald-500 rounded-r-2xl">
                            <h4 className="text-white font-serif text-xl mb-2 italic">Optimal Efficiency</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Thermodynamics identifies the point where further thought becomes entropy, allowing NSED to halt early and save compute when consensus is reached.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex items-center gap-4 text-slate-500">
                    <div className="h-px w-12 bg-slate-800"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Closing the Loop</span>
                    <div className="h-px w-12 bg-slate-800"></div>
                </div>
            </div>
        </div>
    );
};
