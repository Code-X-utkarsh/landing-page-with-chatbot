"use client";

import { ArrowRight, Zap, Tv, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TRUST = [
    { icon: <Award className="w-4 h-4" />, label: "Free to Attend" },
    { icon: <Tv className="w-4 h-4" />, label: "Live Sessions" },
    { icon: <Award className="w-4 h-4" />, label: "Certificate Included" },
];

export const CTASection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                [headlineRef.current, contentRef.current],
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="cta-section"
            className="py-40 bg-[#050505] relative overflow-hidden flex items-center justify-center"
        >
            {/* ── Animated grid background ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,195,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,195,74,0.04) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />

            {/* ── Radial gradient overlays ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a2910_0%,#050505_65%)] pointer-events-none opacity-70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8BC34A]/8 blur-[140px] rounded-full pointer-events-none" />

            {/* ── Corner accent dots ── */}
            <div className="absolute top-14 left-14 w-3 h-3 rounded-full bg-[#8BC34A] blur-[3px] opacity-50 animate-pulse" />
            <div className="absolute top-14 right-14 w-2 h-2 rounded-full bg-[#C5E1A5] blur-[3px] opacity-35 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-14 left-14 w-2 h-2 rounded-full bg-[#8BC34A] blur-[3px] opacity-35 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-14 right-14 w-3 h-3 rounded-full bg-[#C5E1A5] blur-[3px] opacity-50 animate-pulse" style={{ animationDelay: "1.5s" }} />

            <div className="container mx-auto px-6 relative z-10 text-center">

                {/* ── Urgency badge ── */}
                <div ref={headlineRef} style={{ opacity: 0 }}>
                    <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-[#8BC34A]/10 border border-[#8BC34A]/25 text-[#8BC34A] text-sm font-semibold mb-10 backdrop-blur-md">
                        <Zap className="w-4 h-4 fill-[#8BC34A]" />
                        <span>73 spots remaining &mdash; March Batch</span>
                    </div>

                    {/* ── Headline ── */}
                    <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
                        READY TO GO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] via-[#C5E1A5] to-[#8BC34A]">
                            GLOBAL?
                        </span>
                    </h2>
                </div>

                {/* ── Body + CTAs ── */}
                <div ref={contentRef} style={{ opacity: 0 }}>
                    <p className="text-xl md:text-2xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Don&apos;t let another year pass wondering &ldquo;what if&rdquo;. Secure your future
                        in tech abroad — it starts here, for free.
                    </p>

                    {/* ── CTA buttons ── */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-10">
                        <button className="group relative bg-[#8BC34A] hover:bg-[#7CB342] text-black px-12 py-5 rounded-full text-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-[0_0_40px_rgba(139,195,74,0.4)] flex items-center gap-3 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 flex items-center gap-3">
                                Register Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className="flex items-center gap-2 border border-white/15 hover:border-[#8BC34A]/35 text-white/50 hover:text-[#8BC34A] px-8 py-5 rounded-full text-base font-medium transition-all duration-200">
                            Share with a friend
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* ── Trust signals ── */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {TRUST.map(({ icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 bg-white/[0.04] border border-white/8 rounded-full px-4 py-2 text-sm text-white/50"
                            >
                                <span className="text-[#8BC34A]">{icon}</span>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
