"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── CSS 3D Illustration: Isometric Cube with Accent Sticks ─────────────────
// Matches Spline's "Express your creativity" card
function CubeIllustration() {
    // 3-face isometric cube using clip-path
    // Container: 140 × 110 px; cube drawn at bottom-right
    const W = 120; // cube width in px
    const H = 104; // total height (W * 0.866 ≈ isometric proportions)
    const hH = H / 2; // half height ≈ where top meets sides

    const top = `polygon(50% 0%, 100% ${hH}px, 50% ${H}px, 0% ${hH}px)`;
    const left = `polygon(0% ${hH}px, 50% ${H}px, 50% ${H + 48}px, 0% ${hH + 48}px)`;
    const right = `polygon(50% ${H}px, 100% ${hH}px, 100% ${hH + 48}px, 50% ${H + 48}px)`;

    return (
        <div className="absolute bottom-0 right-0 w-40 h-52 pointer-events-none overflow-visible">
            {/* Top face — green tinted */}
            <div style={{
                position: "absolute", width: W, height: H + 48, top: 0, left: 10,
                clipPath: top,
                background: "linear-gradient(135deg, #1e3520 0%, #131a10 100%)",
                boxShadow: "0 0 30px rgba(139,195,74,0.15)",
            }} />
            {/* Left face — medium dark */}
            <div style={{
                position: "absolute", width: W, height: H + 48, top: 0, left: 10,
                clipPath: left,
                background: "#131313",
            }} />
            {/* Right face — darkest */}
            <div style={{
                position: "absolute", width: W, height: H + 48, top: 0, left: 10,
                clipPath: right,
                background: "#0c0c0c",
            }} />
            {/* Thin top edge highlight */}
            <div style={{
                position: "absolute", width: W, height: 2, top: H - 2, left: 10,
                background: "rgba(139,195,74,0.35)",
                clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
                filter: "blur(1px)",
            }} />

            {/* Accent sticks — like Spline screenshot */}
            <div style={{ position: "absolute", bottom: 22, left: 8, width: 4, height: 22, background: "#8BC34A", borderRadius: 2, boxShadow: "0 0 10px #8BC34A, 0 0 20px rgba(139,195,74,0.4)" }} />
            <div style={{ position: "absolute", bottom: 12, left: 20, width: 22, height: 4, background: "#5b9bd5", borderRadius: 2, boxShadow: "0 0 10px #5b9bd5, 0 0 20px rgba(91,155,213,0.4)" }} />
            <div style={{ position: "absolute", bottom: 8, left: 36, width: 16, height: 4, background: "#ef5350", borderRadius: 2, boxShadow: "0 0 10px #ef5350, 0 0 20px rgba(239,83,80,0.4)" }} />
        </div>
    );
}

// ─── CSS 3D Illustration: Stacked Isometric Layers ──────────────────────────
// Matches Spline's "Layer-based materials" card
function LayerStackIllustration() {
    // Each layer is a flat rhombus in isometric perspective
    const rhombus = "polygon(50% 0%, 100% 28%, 50% 56%, 0% 28%)";
    const layers = [
        { bg: "#111111", border: "rgba(255,255,255,0.07)", shadow: "none", top: 80 },
        { bg: "linear-gradient(135deg,#b71c1c,#c62828)", border: "rgba(244,67,54,0.45)", shadow: "0 6px 16px rgba(0,0,0,0.5)", top: 58 },
        { bg: "linear-gradient(135deg,#e65100,#ff8f00)", border: "rgba(255,152,0,0.45)", shadow: "0 6px 20px rgba(0,0,0,0.5)", top: 36 },
    ];

    return (
        <div className="absolute bottom-4 right-6 w-36 h-44 pointer-events-none">
            {layers.map((l, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: 96, height: 56,
                        top: l.top, left: 16,
                        clipPath: rhombus,
                        background: l.bg,
                        boxShadow: l.shadow,
                        filter: i === 2 ? "drop-shadow(0 0 8px rgba(255,152,0,0.4))" : "none",
                    }}
                />
            ))}
        </div>
    );
}

// ─── CSS 3D Illustration: Tilted Screen / Laptop ─────────────────────────────
// Matches Spline's "Interactivity & Motion" card
function ScreenIllustration() {
    return (
        <div className="absolute bottom-6 right-6 pointer-events-none" style={{ perspective: "500px" }}>
            {/* Main body — dark box */}
            <div style={{
                width: 110, height: 80,
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                transform: "rotateX(14deg) rotateY(-14deg)",
                position: "relative",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            }}>
                {/* Screen area */}
                <div style={{
                    position: "absolute", inset: 7,
                    background: "linear-gradient(135deg, #0a0f08, #0d130a)",
                    borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 10,
                }}>
                    {/* Large circle control */}
                    <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        border: "1.5px solid rgba(255,255,255,0.22)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                    </div>
                    {/* Small indicator lines */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ width: 22, height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 1 }} />
                        <div style={{ width: 16, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1 }} />
                        <div style={{ width: 20, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 1 }} />
                    </div>
                </div>
                {/* Top camera dot */}
                <div style={{
                    position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
                    width: 6, height: 6, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    boxShadow: "0 0 6px rgba(255,255,255,0.15)",
                }} />
            </div>
        </div>
    );
}

// ─── CSS 3D Illustration: Isometric Platform + Glowing Sphere ────────────────
// Matches Spline's "Variables & Data" card
function SpherePlatformIllustration() {
    const diamond = "polygon(50% 0%, 100% 28%, 50% 56%, 0% 28%)";

    return (
        <div className="absolute bottom-4 right-4 pointer-events-none" style={{ width: 140, height: 110 }}>
            {/* Back dark layer for depth */}
            <div style={{
                position: "absolute", width: 120, height: 66, top: 44, left: 8,
                clipPath: diamond,
                background: "#0a0a0a",
            }} />
            {/* Main platform */}
            <div style={{
                position: "absolute", width: 120, height: 66, top: 38, left: 8,
                clipPath: diamond,
                background: "linear-gradient(135deg, #161616, #0f0f0f)",
                border: "1px solid rgba(255,255,255,0.07)",
            }} />
            {/* Platform grid lines (subtle) */}
            <div style={{
                position: "absolute", width: 120, height: 66, top: 38, left: 8,
                clipPath: diamond,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
            }} />

            {/* Glowing sphere */}
            <div className="animate-float-y" style={{
                position: "absolute", width: 42, height: 42, borderRadius: "50%",
                top: 0, left: "50%", transform: "translateX(-50%)",
                background: "radial-gradient(circle at 35% 32%, #90caf9, #1565c0 55%, #0d47a1)",
                boxShadow: "0 0 20px rgba(21,101,192,0.8), 0 0 45px rgba(21,101,192,0.35), 0 0 80px rgba(21,101,192,0.15)",
            }} />

            {/* Small orbit ring around sphere */}
            <div style={{
                position: "absolute", width: 56, height: 24, top: 9, left: "50%",
                transform: "translateX(-50%) rotateX(75deg)",
                border: "1px solid rgba(144,202,249,0.25)", borderRadius: "50%",
            }} />
        </div>
    );
}

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
    {
        title: "Visa Strategy",
        desc: "Decode the exact steps, documents, and timelines to get sponsored and legally relocate to the UK or EU.",
        features: ["Skilled Worker Visa deep-dive", "Company sponsorship walkthrough", "Application timelines & mistakes"],
        Illustration: CubeIllustration,
    },
    {
        title: "Salary Intelligence",
        desc: "Real numbers — base pay, bonuses, RSUs, and post-tax take-home across UK, Germany & Netherlands.",
        features: ["Industry salary benchmarks", "Tax & take-home breakdown", "Negotiation frameworks"],
        Illustration: LayerStackIllustration,
    },
    {
        title: "Job Search Tactics",
        desc: "Where to apply, how to beat ATS filters, and exactly how to crack senior SDE interviews abroad.",
        features: ["UK job portals & LinkedIn tactics", "Referral & networking hacks", "Interview prep frameworks"],
        Illustration: ScreenIllustration,
    },
    {
        title: "Relocation & Living",
        desc: "Everything about the actual move — housing, banking, cost of living, and cultural adjustment.",
        features: ["City-by-city cost comparison", "Housing & accommodation guide", "NI number, banking & insurance"],
        Illustration: SpherePlatformIllustration,
    },
];

// ─── Main component ────────────────────────────────────────────────────────────
export const AboutSection = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".about-card",
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: "power3.out",
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
        <section ref={containerRef} id="about-section" className="py-32 bg-[#050505] relative overflow-hidden">

            {/* ── Dot-grid background (matches Spline's section bg) ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                }}
            />
            {/* Fade top/bottom so dots blend with section */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

            {/* Center ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8BC34A]/[0.04] blur-[180px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── Section header ── */}
                <div className="text-center mb-14">
                    <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-[#8BC34A] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        The Masterclass
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Built for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#C5E1A5]">
                            Ambition
                        </span>
                    </h2>
                    <p className="text-[#666] text-lg font-light max-w-lg mx-auto">
                        Every module is distilled from real experience — no theory, just what actually works.
                    </p>
                </div>

                {/* ── 2×2 Bento Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-5xl mx-auto">
                    {CARDS.map(({ title, desc, features, Illustration }, i) => (
                        <div
                            key={i}
                            className="about-card group relative bg-[#111111] border border-white/[0.055] rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-[#141414] min-h-[280px]"
                            style={{ opacity: 0 }}
                        >
                            {/* Text content — upper-left, capped at ~58% width */}
                            <div className="relative z-10 p-8 max-w-[58%]">
                                <h3 className="text-white font-bold text-[18px] leading-snug mb-3">{title}</h3>
                                <p className="text-[#555] text-[13px] leading-relaxed mb-5 font-light">{desc}</p>
                                <ul className="space-y-2.5">
                                    {features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-2.5">
                                            <Check className="w-3.5 h-3.5 text-[#8BC34A] shrink-0" />
                                            <span className="text-[#666] text-[13px]">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 3D CSS Illustration — bleeds from bottom-right */}
                            <Illustration />

                            {/* Bottom-right gradient vignette so illustration fades cleanly */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#111111] via-transparent to-transparent pointer-events-none z-20" />

                            {/* Subtle hover glow */}
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#8BC34A]/[0.04] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
