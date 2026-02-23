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

// Gradient colors for the social-proof avatar stack
const AVATAR_GRADIENTS = [
    "from-pink-400 to-rose-500",
    "from-blue-400 to-cyan-500",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-teal-500",
];

export const HeroSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const eventRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);

    // Holds scrollProgress (0-1) for the 3D globe — ref avoids re-renders
    const scrollProgressRef = useRef(0);

    const [isMounted, setIsMounted] = useState(false);

    // Mount guard (avoids SSR mismatch)
    useEffect(() => { setIsMounted(true); }, []);

    // GSAP entrance stagger + scroll-out parallax
    useEffect(() => {
        if (!isMounted) return;

        const ctx = gsap.context(() => {
            const elements = [
                badgeRef.current,
                headlineRef.current,
                subtitleRef.current,
                eventRef.current,
                ctaRef.current,
                socialRef.current,
            ];

            // --- Entrance: stagger each element in from below ---
            gsap.fromTo(
                elements,
                { opacity: 0, y: 45 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.13,
                    ease: "power3.out",
                    delay: 0.25,
                }
            );

            // --- Scroll-out: all elements drift up and fade as section exits ---
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            }).to(elements, {
                y: -110,
                opacity: 0,
                scale: 0.94,
                stagger: 0.04,
                ease: "none",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isMounted]);

    // Track scroll progress and feed it to the 3D globe via ref
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            scrollProgressRef.current = Math.max(0, Math.min(1, -rect.top / rect.height));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Smooth-scroll helper
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section ref={containerRef} id="hero-section" className="relative h-screen bg-[#050505] overflow-hidden">

            {/* ── 3D Canvas layer ────────────────────────────────────── */}
            <div className="absolute inset-0 z-0">
                {isMounted && (
                    <Scene>
                        <RealisticGlobe scrollRef={scrollProgressRef} />
                        <ConnectionLines />
                        <ParticleSystem count={800} color="#8BC34A" />
                    </Scene>
                )}
                {/* Gradient vignette for text legibility */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,#050505_88%)] z-10 pointer-events-none" />
            </div>

            {/* ── Content layer ──────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none pt-20">

                {/* Live-event badge */}
                <div
                    ref={badgeRef}
                    style={{ opacity: 0 }}
                    className="pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-3 mb-8 hover:bg-white/10 transition-colors"
                >
                    <span className="flex h-2 w-2 rounded-full bg-[#8BC34A] animate-pulse" />
                    <span className="text-sm font-medium text-[#E8F5E9] tracking-wide">
                        MASTERCLASS BY TANMAY KACKER
                    </span>
                </div>

                {/* Headline */}
                <div ref={headlineRef} style={{ opacity: 0 }} className="text-center mb-8 relative">
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                        BECOME AN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#C5E1A5]">
                            SDE ABROAD
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    style={{ opacity: 0 }}
                    className="text-lg md:text-xl text-[#A1A1AA] text-center mb-10 max-w-2xl font-light"
                >
                    The blueprint to crack high-paying tech roles in the UK, Europe &amp; US.{" "}
                    <br className="hidden md:block" />
                    Decode visas, salaries, and relocation logistics.
                </p>

                {/* Event details chips */}
                <div
                    ref={eventRef}
                    style={{ opacity: 0 }}
                    className="flex flex-wrap justify-center gap-3 mb-12 pointer-events-auto"
                >
                    {/* Day 1 */}
                    <div className="flex items-center gap-2.5 bg-[#0A0F0A] border border-[#8BC34A]/20 px-5 py-3 rounded-xl shadow-[0_0_18px_rgba(139,195,74,0.07)]">
                        <Calendar className="w-4 h-4 text-[#8BC34A] shrink-0" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-[#8BC34A]/70 font-semibold tracking-wider uppercase">Day 1</span>
                            <span className="text-white font-semibold text-sm">2nd Mar, Mon</span>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="flex items-center gap-2.5 bg-[#0A0F0A] border border-[#8BC34A]/20 px-5 py-3 rounded-xl shadow-[0_0_18px_rgba(139,195,74,0.07)]">
                        <Calendar className="w-4 h-4 text-[#8BC34A] shrink-0" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-[#8BC34A]/70 font-semibold tracking-wider uppercase">Day 2</span>
                            <span className="text-white font-semibold text-sm">3rd Mar, Tue</span>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2.5 bg-[#0A0F0A] border border-[#8BC34A]/20 px-5 py-3 rounded-xl shadow-[0_0_18px_rgba(139,195,74,0.07)]">
                        <Clock className="w-4 h-4 text-[#8BC34A] shrink-0" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-[#8BC34A]/70 font-semibold tracking-wider uppercase">Time</span>
                            <span className="text-white font-semibold text-sm">5:00 PM – 8:00 PM IST</span>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div
                    ref={ctaRef}
                    style={{ opacity: 0 }}
                    className="flex flex-col md:flex-row gap-4 pointer-events-auto"
                >
                    <button
                        onClick={() => scrollTo("cta-section")}
                        className="bg-[#8BC34A] hover:bg-[#7CB342] text-black px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-[0_0_28px_rgba(139,195,74,0.45)]"
                    >
                        Register for Free
                    </button>
                    <button
                        onClick={() => scrollTo("agenda-section")}
                        className="bg-transparent border border-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/6 transition-all flex items-center justify-center gap-2"
                    >
                        View Curriculum <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                {/* Social proof — avatar stack */}
                <div
                    ref={socialRef}
                    style={{ opacity: 0 }}
                    className="flex items-center gap-3 mt-8 pointer-events-auto"
                >
                    <div className="flex items-center -space-x-2.5">
                        {AVATAR_GRADIENTS.map((grad, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} border-2 border-[#050505]`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-[#A1A1AA]">
                        <span className="text-white font-semibold">2,400+</span> engineers already registered
                    </p>
                </div>
            </div>

            {/* ── Scroll indicator ───────────────────────────────────── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
                <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll to explore</span>
                <div className="relative h-10 w-px bg-white/10 overflow-hidden rounded-full">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#8BC34A] to-transparent rounded-full animate-scroll-dot" />
                </div>
            </div>
        </section>
    );
};
