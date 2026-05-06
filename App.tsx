/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { LLMMeshApp } from './components/LLMMeshApp';
import { MoMApp } from './components/MoMApp';
import { Layers } from 'lucide-react';

const App: React.FC = () => {
    const [page, setPage] = useState<'llmmesh' | 'mom'>('llmmesh');

    return (
        <div className="relative">
            {/* Global navigation to toggle pages */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-stone-700/50">
                <button 
                    onClick={() => setPage('llmmesh')}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${page === 'llmmesh' ? 'bg-white text-stone-900 shadow' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                    <Layers size={14} /> LLM-Mesh
                </button>
                <button 
                    onClick={() => setPage('mom')}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${page === 'mom' ? 'bg-white text-violet-900 shadow' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                >
                    <Layers size={14} /> MoM NSED
                </button>
            </div>

            {page === 'llmmesh' ? <LLMMeshApp /> : <MoMApp />}
        </div>
    );
};

export default App;
