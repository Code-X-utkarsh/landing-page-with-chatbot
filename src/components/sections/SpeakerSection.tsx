"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/three/Scene";
import { PremiumBadge } from "@/components/three/PremiumBadge";
import { CheckCircle, Award, Users } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const SpeakerSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(".speaker-info", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2
            })
                .from(statsRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8
                }, "-=0.4");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="speaker-section" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 w-1/2 h-full bg-[#8BC34A]/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">

                {/* Left: Premium 3D Badge */}
                <div className="w-full lg:w-1/2 h-[500px] relative order-1">
                    {isMounted && (
                        <Scene enableControls={false} cameraPosition={[0, 0, 4]}>
                            <PremiumBadge />
                        </Scene>
                    )}
                </div>

                {/* Right: Speaker Content */}
                <div className="w-full lg:w-1/2 order-2 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2918] border border-[#8BC34A]/20 mb-6 speaker-info">
                        <Award className="w-4 h-4 text-[#8BC34A]" />
                        <span className="text-xs font-bold text-[#8BC34A] tracking-wider uppercase">Your Expert Guide</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight speaker-info">
                        Tanmay Kacker
                    </h2>

                    <p className="text-xl text-[#A1A1AA] mb-8 leading-relaxed speaker-info">
                        Senior SDE at Top UK Company. With <span className="text-white font-semibold">8+ years of experience</span>, I've navigated the complex world of international tech careers, visas, and relocation to help you succeed.
                    </p>

                    <div className="space-y-5 mb-12 speaker-info">
                        {[
                            "Relocated 50+ engineers to UK/EU",
                            "Expert in Skilled Worker Visas",
                            "Negotiated £100k+ packages"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-[#8BC34A]/10 flex items-center justify-center group-hover:bg-[#8BC34A] transition-colors duration-300">
                                    <CheckCircle className="w-5 h-5 text-[#8BC34A] group-hover:text-black transition-colors duration-300" />
                                </div>
                                <span className="text-lg text-white/90 group-hover:text-white transition-colors duration-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Stats */}
                    <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-sm text-[#A1A1AA] uppercase tracking-wide">Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">4.9<span className="text-[#FF9800] text-2xl">★</span></div>
                            <div className="text-sm text-[#A1A1AA] uppercase tracking-wide">Rating</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-1">95%</div>
                            <div className="text-sm text-[#A1A1AA] uppercase tracking-wide">Success</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
