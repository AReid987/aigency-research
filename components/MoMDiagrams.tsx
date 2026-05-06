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
