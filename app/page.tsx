"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Scene from "@/components/Scene";
import { MoveRight, RefreshCcw } from "lucide-react";

export default function Home() {
  const [seed, setSeed] = useState(0);

  return (
    <main className="relative h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-mono">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
  <Suspense fallback={null}>
    {/* pages: 3 means the scroll length is 3 screens long */}
    <ScrollControls pages={3} damping={0.2}>
      <Scene seed={seed} />
    </ScrollControls>
  </Suspense>
</Canvas>
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16 pointer-events-none">
        <header className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase italic">MURRAY MACARTHUR</h1>
            <p className="opacity-50 text-sm mt-1">GENERATIVE EXPERIMENT V.1</p>
          </div>
          <nav className="space-y-2 text-right hidden md:block">
            <a href="#" className="block hover:line-through transition-all">RESOURCES</a>
            <a href="#" className="block hover:line-through transition-all">CONTACT</a>
            <a href="#" className="block hover:line-through transition-all">ABOUT</a>
          </nav>
        </header>

        <section className="max-w-2xl">
          <h2 className="text-6xl md:text-8xl font-black leading-tight uppercase mb-6">
            FOCUSING ON <br />
            <span className="text-transparent border-white border-[1px] px-4 rounded-full italic" 
                  style={{ WebkitTextStroke: "1px white" }}>CREATING</span>
          </h2>
          <button 
            onClick={() => setSeed(Math.random())}
            className="pointer-events-auto flex items-center gap-4 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-110 transition-transform uppercase italic"
          >
            Randomize <RefreshCcw size={18} />
          </button>
        </section>

        <footer className="flex justify-between items-end pointer-events-auto">
          <div className="flex gap-8 text-xs uppercase opacity-50">
            <span>© 2026 MURRAY MACARTHUR</span>
            <span>BUILT WITH ELECTRONS, PHOTONS & NEURONS</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="group-hover:mr-4 transition-all uppercase italic font-bold">Scroll to Play</span>
            <MoveRight className="animate-pulse" />
          </div>
        </footer>
      </div>
    </main>
  );
}
