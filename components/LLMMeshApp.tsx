/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './MeshScene';
import { HeadroomDiagram, MemoryHazardDiagram, MixedScenarioChart } from './LLMDiagrams';
import { ArrowDown, Menu, X, Share2, ServerCog, Cpu } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-blue-500/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-blue-500 mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

export const LLMMeshApp: React.FC = () => {
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
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1 border border-stone-700">M</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              LLM-MESH <span className="font-normal text-stone-500">2025</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-stone-900 transition-colors cursor-pointer uppercase">The Mismatch</a>
            <a href="#headroom" onClick={scrollToSection('headroom')} className="hover:text-stone-900 transition-colors cursor-pointer uppercase">Headroom</a>
            <a href="#memory" onClick={scrollToSection('memory')} className="hover:text-stone-900 transition-colors cursor-pointer uppercase">Memory Scaling</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-stone-900 transition-colors cursor-pointer uppercase">Authors</a>
            <a 
              href="https://arxiv.org/html/2507.00507v1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-stone-800 text-stone-800 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            arXiv • July 2025
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[1.1] mb-8 text-stone-900 drop-shadow-sm">
            LLM-Mesh <br/><span className="italic font-normal text-stone-600 text-3xl md:text-4xl block mt-4">Elastic Sharing for Serverless LLM Inference</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            A serverless inference scheme tackling fluctuating demands and GPU scarcity by enabling precise elastic sharing of multi-model LLMs across heterogeneous CPU/GPU setups.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>EXPLORE</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">The Problem</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Resource Mismatch</h2>
              <div className="w-16 h-1 bg-stone-900 mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-stone-900">T</span>he rise of private serverless deployments is dominated by small-to-medium-scale LLMs with low-frequency but highly variable workloads. Yet, modern infrastructure almost exclusively allocates massive, deeply-queued GPUs per model—leading to extreme resource over-provisioning.
              </p>
              <p>
                As a result, thousands of small model variants suffer from inefficient hosting. <strong>LLM-Mesh</strong> solves this using a unified hardware abstraction, discovering that modern CPUs (e.g., Intel AMX) and shared GPUs can effortlessly co-locate models. Through elastic sharing and precise, hardware-agnostic allocation, we substantially improve datacenter service capacity.
              </p>
              <div className="mt-8">
                  <MixedScenarioChart />
              </div>
            </div>
          </div>
        </section>

        {/* Headroom */}
        <section id="headroom" className="py-24 bg-[#F5F4F0] border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <HeadroomDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-blue-200">
                            <Cpu size={14}/> TOKEN-LEVEL SCHEDULING
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Headroom-Driven Compute</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            Rather than blocking an entire model instance to process one request, LLM-Mesh performs precise demand quantification and slices computation at the <strong>token-level</strong>.
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            It continuously evaluates the "Headroom"—the maximum allowable delay for a token generation iteration before missing a Service Level Objective (SLO)—and assigns the compute-heavy prefill or decode stages globally to the instance in most urgent need.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Hazard Aware Memory */}
        <section id="memory" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-blue-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-stone-300 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                           <ServerCog size={14}/> ORCHESTRATION
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Hazard-Aware Memory</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                           Given the volatile KV-Cache demands of diverse workloads, dynamically adjusting shared memory without creating massive operational overhead or causing an Out-Of-Memory (OOM) error requires finesse. 
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed max-w-lg mb-6">
                           Using a watermark-based scaling strategy, LLM-Mesh limits "ping-pong" resizing. More importantly, inspired by <strong>Tomasulo's out-of-order execution algorithm</strong>, it leverages an optimistic budgeting system with a Reservation Station to ensure scale-up commands never trigger an OOM hazard before an overlapping scale-down finishes releasing memory.
                        </p>
                    </div>
                    <div>
                        <MemoryHazardDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Efficiency Defragmentation */}
        <section className="py-24 bg-stone-50 border-t border-stone-200">
          <div className="container mx-auto px-6 md:px-12">
             <div className="max-w-3xl mx-auto text-center mb-16">
                 <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Efficiency-Oriented Defragmentation</h2>
                 <p className="text-lg text-stone-600 leading-relaxed">
                     In a loaded serverless environment, instance fragmentation is inevitable. LLM-Mesh maintains runtime speed using a dual approach to aggressively defragment overlapping model requirements.
                 </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-sm">
                     <h3 className="font-serif text-xl mb-4 text-stone-900">Proactive Preemption</h3>
                     <p className="text-sm text-stone-600 leading-relaxed">
                         When one instance finds its scale-up path blocked by a smaller neighbor, LLM-Mesh permits it to actively preempt the smaller instance—transferring the neighbor's requests gracefully, and thus freeing contiguous capacity without breaking guarantees.
                     </p>
                 </div>
                 <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-sm">
                     <h3 className="font-serif text-xl mb-4 text-stone-900">Reactive Bin-Packing</h3>
                     <p className="text-sm text-stone-600 leading-relaxed">
                         To continuously eliminate existing fragmentation, LLM-Mesh avoids generic load-spreading. Instead, new requests are funneled cleanly into high-batch instances, packing them into the tightest bins possible and leaving small fragmented instances to naturally expire.
                     </p>
                 </div>
             </div>
          </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F9F8F4]">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl mb-12 text-center text-stone-900">Research Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <AuthorCard name="Zijun Li" role="Shanghai Jiao Tong University" delay="0ms" />
              <AuthorCard name="Quan Chen" role="Shanghai Jiao Tong University" delay="100ms" />
              <AuthorCard name="Han Zhao" role="Shanghai Jiao Tong University" delay="200ms" />
              <AuthorCard name="Minyi Guo" role="Shanghai Jiao Tong University" delay="300ms" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 text-center border-t border-stone-800">
        <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="w-8 h-8 bg-stone-800 text-stone-500 rounded flex items-center justify-center font-serif font-bold text-xl mb-6 border border-stone-700">M</div>
            <p className="mb-4">Adapted from the research paper <a href="https://arxiv.org/html/2507.00507v1" className="text-white hover:underline">"LLM-Mesh: Enabling Elastic Sharing for Serverless LLM Inference"</a></p>
            <p className="text-xs text-stone-600">Visualized via interactive components referencing original data and diagrams.</p>
        </div>
      </footer>
    </div>
  );
};


