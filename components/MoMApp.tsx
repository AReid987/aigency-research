import React, { useState, useEffect } from 'react';
import { MoMHeroScene } from './MoMScene';
import { QuadraticVotingDiagram, ThermodynamicCurveDiagram, MoMTakeawayViz } from './MoMDiagrams';
import { ArrowDown, Menu, X, Users, Anchor, Layers, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MoMApp: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-violet-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-50/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">N</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              MoM-NSED <span className="font-normal text-slate-500">2026</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-violet-600 transition-colors cursor-pointer uppercase text-xs tracking-widest">The Paradigm</a>
            <a href="#topology" onClick={scrollToSection('topology')} className="hover:text-violet-600 transition-colors cursor-pointer uppercase text-xs tracking-widest">Trustless Topology</a>
            <a href="#thermodynamics" onClick={scrollToSection('thermodynamics')} className="hover:text-violet-600 transition-colors cursor-pointer uppercase text-xs tracking-widest">Thermodynamics</a>
            <a href="#takeaway" onClick={scrollToSection('takeaway')} className="hover:text-violet-600 transition-colors cursor-pointer uppercase text-xs tracking-widest">Takeaway</a>
            <a 
              href="https://arxiv.org/html/2601.16863v1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors shadow-sm cursor-pointer text-xs"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <MoMHeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.92)_0%,rgba(248,250,252,0.6)_50%,rgba(248,250,252,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-3 py-1 border border-violet-800 text-violet-800 text-[10px] tracking-[0.4em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30"
          >
            arXiv • January 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-7xl font-medium leading-tight md:leading-[1.1] mb-8 text-slate-900 drop-shadow-sm"
          >
            Mixture-of-Models <br/><span className="italic font-normal text-slate-600 text-3xl md:text-4xl block mt-4">Unifying Heterogeneous Agents via N-Way Self-Evaluating Deliberation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-light leading-relaxed mb-12"
          >
            Transitioning from fixed-gating static MoEs to runtime dynamic swarms, where consumer-grade models use thermodynamic loops and quadratic voting to outperform 100B+ monolithic models.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span className="text-[10px] tracking-[0.2em] font-bold">DISCOVER NSED</span>
                <span className="p-3 border border-slate-300 rounded-full group-hover:border-violet-600 transition-all group-hover:scale-110 bg-white/50">
                    <ArrowDown size={14} />
                </span>
             </a>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-violet-500 uppercase">System 2 Deliberation</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">Inference-Time Computation</h2>
              <div className="w-16 h-1 bg-violet-600 mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-violet-700">T</span>he trajectory of AI has been defined by static pre-training scaling laws. But a paradigm shift is happening toward <em>Inference-Time Compute Scaling</em>. By letting models "think" longer, they simulate System 2 logic—planning, verifying, and backtracking.
              </p>
              <p>
                Rather than relying on massive, opaque monolithic models, <strong>NSED (N-Way Self-Evaluating Deliberation)</strong> provides a structured semantic recurrent topology. It dynamically orchestrates multiple heterogeneous "expert" agents, acting collectively like a recurrent neural network where natural language acts as the hidden state. 
              </p>
            </div>
          </div>
        </section>

        {/* Topology */}
        <section id="topology" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <QuadraticVotingDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-violet-200">
                            <Users size={14}/> TRUSTLESS CONSENSUS
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Preventing Sycophancy</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Standard multi-agent systems often suffer from "herding"—smaller models blindly agreeing with the fastest or largest model. 
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            NSED enforces a <strong>Double-Blind Quadratic Voting</strong> protocol. Agents evaluate anonymized peer proposals and are mathematically blocked from self-voting via a hard Diagonal Mask (v_&#123;i,i&#125; = 0). This ensures the emergent consensus is based strictly on semantic merit, reducing manipulative "Dark Patterns" and sycophancy drastically.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Thermodynamics */}
        <section id="thermodynamics" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-pink-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-violet-600 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-pink-400 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-700">
                           <Anchor size={14}/> OPTIMAL STOPPING
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Cognitive Thermodynamics</h2>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                           "Thinking longer" is not infinitely beneficial. NSED conceptualizes deliberation as a competition between Signal Extraction (yielding gains) and Entropic Fatigue (hallucinations compounding as context length grows quadratically). 
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                           Our empirical model demonstrates predictable optimal stopping points ($T_&#123;opt&#125;$). High-performance monolithic ensembles actually hit "entropy saturation" faster due to base-rate sycophancy, while highly chaotic heterogeneous consumer setups extract truth from noise slower but sustain improvements longer.
                        </p>
                    </div>
                    <div>
                        <ThermodynamicCurveDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Takeaway Section */}
        <section id="takeaway" className="py-32 bg-white">
          <div className="container mx-auto px-6">
             <MoMTakeawayViz />
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="w-8 h-8 bg-violet-900 text-violet-300 rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-6 border border-violet-700 shadow-xl">N</div>
            <p className="mb-4">Adapted from the research paper <a href="https://arxiv.org/html/2601.16863v1" className="text-white hover:underline transition-colors">"Mixture-of-Models: Unifying Heterogeneous Agents via NSED"</a></p>
            <p className="text-[10px] text-slate-600 tracking-widest uppercase">Visualized via interactive components referencing original data and diagrams.</p>
        </div>
      </footer>
    </div>
  );
};
