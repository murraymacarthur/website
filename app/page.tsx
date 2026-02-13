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
            <Scene seed={seed} />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16 pointer-events-none">
        <header className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase italic">ABSTRACT.OS</h1>
            <p className="opacity-50 text-sm mt-1">GENERATIVE EXPERIMENT V.1</p>
          </div>
          <nav className="space-y-2 text-right hidden md:block">
            <a href="#" className="block hover:line-through transition-all">WORK</a>
            <a href="#" className="block hover:line-through transition-all">ABOUT</a>
            <a href="#" className="block hover:line-through transition-all">CONTACT</a>
          </nav>
        </header>

        <section className="max-w-2xl">
          <h2 className="text-6xl md:text-8xl font-black leading-tight uppercase mb-6">
            Dreaming in <br />
            <span className="text-transparent border-white border-[1px] px-4 rounded-full italic" 
                  style={{ WebkitTextStroke: "1px white" }}>Shaders</span>
          </h2>
          <button 
            onClick={() => setSeed(Math.random())}
            className="pointer-events-auto flex items-center gap-4 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-110 transition-transform uppercase italic"
          >
            Randomize Abstract <RefreshCcw size={18} />
          </button>
        </section>

        <footer className="flex justify-between items-end pointer-events-auto">
          <div className="flex gap-8 text-xs uppercase opacity-50">
            <span>© 2026 YOUR_NAME</span>
            <span>BUILT WITH NOISE & LIGHT</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="group-hover:mr-4 transition-all uppercase italic font-bold">Scroll to Explore</span>
            <MoveRight className="animate-pulse" />
          </div>
        </footer>
      </div>
    </main>
  );
}
