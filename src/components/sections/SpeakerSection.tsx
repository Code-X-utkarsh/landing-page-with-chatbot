"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Award, Briefcase, ExternalLink } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Load Lottie lazily — must be client-only (uses browser APIs)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const CREDENTIALS = [
    "Relocated 50+ engineers to UK & EU markets",
    "Expert in Skilled Worker & Tier-2 Visa applications",
    "Negotiated £100K+ compensation packages",
    "Built a 500+ community of global SDE expats",
];

const STATS = [
    { value: "500+", label: "Students" },
    { value: "4.9★", label: "Rating" },
    { value: "95%", label: "Success Rate" },
];

export const SpeakerSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [animData, setAnimData] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);

        // Fetch the Lottie JSON from the public folder (same origin — no CORS)
        fetch("/animations/Digitalmedia3d.json")
            .then((r) => r.json())
            .then((data) => setAnimData(data))
            .catch(console.error);

        const ctx = gsap.context(() => {
            gsap.fromTo(".speaker-info",
                { x: -60, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
            gsap.fromTo(statsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 65%",
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
            id="speaker-section"
            className="py-28 bg-[#050505] relative overflow-hidden"
        >
            {/* Background ambience */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#8BC34A]/5 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3A5A28]/8 blur-[120px] rounded-full pointer-events-none" />

            {/* Faint grid on the right half */}
            <div
                className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-25"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,195,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,195,74,0.05) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                {/* ── LEFT: Lottie Animation ── */}
                <div className="w-full lg:w-1/2 h-[480px] relative order-1 shrink-0 flex items-center justify-center">
                    {isMounted && animData ? (
                        <Lottie
                            animationData={animData}
                            loop={true}
                            autoplay={true}
                            style={{ width: "100%", height: "100%" }}
                            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                        />
                    ) : (
                        // Placeholder while animation loads
                        <div className="w-24 h-24 rounded-full border-2 border-[#8BC34A]/20 border-t-[#8BC34A] animate-spin" />
                    )}
                    {/* Subtle glow beneath the animation */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-16 bg-[#8BC34A]/12 blur-3xl rounded-full pointer-events-none" />
                </div>

                {/* ── RIGHT: Speaker content ── */}
                <div className="w-full lg:w-1/2 order-2 relative z-10">

                    {/* Eyebrow badge */}
                    <div className="speaker-info inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8BC34A]/10 border border-[#8BC34A]/25 mb-5">
                        <Award className="w-3.5 h-3.5 text-[#8BC34A]" />
                        <span className="text-xs font-bold text-[#8BC34A] tracking-widest uppercase">Meet Your Mentor</span>
                    </div>

                    {/* Name */}
                    <h2 className="speaker-info text-5xl md:text-6xl font-black tracking-tight mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8F5E9] to-[#8BC34A]">
                            Tanmay Kacker
                        </span>
                    </h2>

                    {/* Role chip */}
                    <div className="speaker-info flex items-center gap-2 mb-7">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-[#8BC34A]" />
                            <span className="text-sm text-[#A1A1AA] font-medium">Senior SDE · Leading UK Tech Company</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="speaker-info text-lg text-[#A1A1AA] mb-8 leading-relaxed">
                        With{" "}
                        <span className="text-[#8BC34A] font-semibold">8+ years</span>{" "}
                        navigating international tech careers, visas, and relocation, Tanmay has personally helped over{" "}
                        <span className="text-white font-semibold">50 engineers</span>{" "}
                        land high-paying roles across the UK and Europe.
                    </p>

                    {/* Credentials */}
                    <div className="speaker-info space-y-2.5 mb-10">
                        {CREDENTIALS.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 group hover:border-[#8BC34A]/30 hover:bg-[#8BC34A]/[0.04] transition-all duration-300"
                            >
                                <div className="w-7 h-7 rounded-full bg-[#8BC34A]/12 flex items-center justify-center shrink-0 group-hover:bg-[#8BC34A]/22 transition-colors">
                                    <CheckCircle className="w-4 h-4 text-[#8BC34A]" />
                                </div>
                                <span className="text-base text-white/80 font-medium group-hover:text-white transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div ref={statsRef} className="grid grid-cols-3 gap-3 mb-8">
                        {STATS.map(({ value, label }) => (
                            <div
                                key={label}
                                className="bg-white/[0.04] border border-white/8 rounded-2xl p-4 text-center group hover:border-[#8BC34A]/30 hover:bg-[#8BC34A]/[0.05] hover:shadow-[0_0_24px_-4px_rgba(139,195,74,0.15)] transition-all duration-300"
                            >
                                <div className="text-2xl font-black text-white mb-1 group-hover:text-[#C5E1A5] transition-colors">{value}</div>
                                <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* LinkedIn CTA */}
                    <a
                        href="#"
                        className="speaker-info inline-flex items-center gap-2.5 border border-white/12 hover:border-[#8BC34A]/40 text-white/50 hover:text-[#8BC34A] px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Connect on LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};
