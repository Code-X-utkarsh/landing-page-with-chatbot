"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { RealisticGlobe } from "@/components/three/RealisticGlobe";
import { ConnectionLines } from "@/components/three/ConnectionLines";
import { ParticleSystem } from "@/components/three/ParticleSystem";
import { Calendar, Clock, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            tl.to(headlineRef.current, {
                y: -100,
                opacity: 0,
                scale: 0.9,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="hero-section" className="relative h-screen bg-[#050505] overflow-hidden">
            {/* 3D Canvas - Full screen */}
            <div className="absolute inset-0 z-0">
                {isMounted && (
                    <Scene>
                        <RealisticGlobe />
                        <ConnectionLines />
                        <ParticleSystem count={800} color="#3A5A28" />
                    </Scene>
                )}
                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,#050505_90%)] z-10 pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none pt-20">

                {/* Credential Badge - Glassmorphism */}
                <div className="pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-3 mb-8 hover:bg-white/10 transition-colors animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-[#8BC34A] animate-pulse"></span>
                    <span className="text-sm font-medium text-[#E8F5E9] tracking-wide">MASTERCLASS BY TANMAY KACKER</span>
                </div>

                {/* Headline */}
                <div className="text-center mb-8 relative">
                    <h1 ref={headlineRef} className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                        BECOME AN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#C5E1A5]">SDE ABROAD</span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-[#A1A1AA] text-center mb-10 max-w-2xl font-light">
                    The blueprint to crack high-paying tech roles in the UK, Europe & US. <br className="hidden md:block" />
                    Decode visas, salaries, and relocation logistics.
                </p>

                {/* Event Details */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 pointer-events-auto">
                    <div className="flex items-center gap-2 bg-[#0A0F0A] border border-white/10 px-5 py-3 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#8BC34A]" />
                        <span className="text-white font-medium">21st Feb, Sat</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#0A0F0A] border border-white/10 px-5 py-3 rounded-xl">
                        <Clock className="w-5 h-5 text-[#8BC34A]" />
                        <span className="text-white font-medium">5:00 PM - 8:00 PM</span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-6 pointer-events-auto">
                    <button className="bg-[#8BC34A] hover:bg-[#7CB342] text-black px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(139,195,74,0.4)]">
                        Register for Free
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-all flex items-center gap-2">
                        View Curriculum <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-50 pointer-events-none">
                <ChevronDown className="w-6 h-6 text-white" />
            </div>
        </section>
    );
};
