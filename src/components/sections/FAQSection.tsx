"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
    {
        q: "Is this masterclass really free?",
        a: "Yes, absolutely! It's a live community-initiative event — no hidden charges, no upsells during the session. Just pure, actionable value.",
    },
    {
        q: "Will there be a recording provided?",
        a: "No recording will be shared. This is a live-only session to maximise engagement, interactivity, and the dedicated Q&A at the end.",
    },
    {
        q: "Do I need any prior experience?",
        a: "The content is most relevant for working SDEs and final-year CS students. However, anyone curious about international tech careers is welcome to join.",
    },
    {
        q: "Can I ask questions directly during the session?",
        a: "Yes! There's a dedicated 45-minute live Q&A at the end of each session where Tanmay answers your questions in real time.",
    },
    {
        q: "How long is each session?",
        a: "Each day's session runs approximately 3 hours (5:00 PM – 8:00 PM IST), covering structured content followed by an open Q&A.",
    },
    {
        q: "Will I receive a certificate of completion?",
        a: "Yes — attendees who participate in both days will receive a digital certificate from SDE Abroad, which you can add to your LinkedIn profile.",
    },
    {
        q: "Which countries does this masterclass cover?",
        a: "The primary focus is the United Kingdom, Germany, the Netherlands, and the United States. All four have dedicated segments covering visa pathways, salary benchmarks, and job market dynamics.",
    },
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".faq-item",
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
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
            id="faq-section"
            className="py-32 bg-[#050505] relative overflow-hidden"
        >
            {/* ── Subtle background grid ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,195,74,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,195,74,0.03) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#8BC34A]/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-3xl relative z-10">

                {/* ── Section header ── */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-[#8BC34A] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        Got Questions?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Frequently Asked{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#C5E1A5]">
                            Questions
                        </span>
                    </h2>
                    <p className="text-[#A1A1AA] text-lg font-light max-w-xl mx-auto">
                        Everything you need to know before joining the March masterclass.
                    </p>
                </div>

                {/* ── Accordion list ── */}
                <div ref={itemsRef} className="space-y-3">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "faq-item group rounded-2xl overflow-hidden transition-all duration-300",
                                openIndex === index
                                    ? "shadow-[inset_3px_0_0_#8BC34A,0_0_32px_-8px_rgba(139,195,74,0.12)] bg-[#0A0F0A] border border-[#8BC34A]/20"
                                    : "bg-white/[0.025] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04]"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                className="w-full flex items-center gap-5 px-6 py-5 text-left outline-none"
                            >
                                {/* Number tag */}
                                <span className={cn(
                                    "text-sm font-black font-mono shrink-0 min-w-[2rem] transition-colors duration-300",
                                    openIndex === index ? "text-[#8BC34A]" : "text-white/20 group-hover:text-white/35"
                                )}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Question */}
                                <span className={cn(
                                    "flex-1 text-base md:text-lg font-medium transition-colors duration-300",
                                    openIndex === index ? "text-white" : "text-white/70 group-hover:text-white/90"
                                )}>
                                    {faq.q}
                                </span>

                                {/* Chevron */}
                                <div className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                    openIndex === index ? "bg-[#8BC34A]/20 rotate-180" : "bg-white/5 group-hover:bg-white/10"
                                )}>
                                    <ChevronDown className={cn(
                                        "w-4 h-4 transition-colors duration-300",
                                        openIndex === index ? "text-[#8BC34A]" : "text-white/40"
                                    )} />
                                </div>
                            </button>

                            {/* Answer */}
                            <div className={cn(
                                "pl-[calc(2rem+1.25rem+1rem)] pr-6 text-[#A1A1AA] overflow-hidden transition-all duration-500 ease-in-out",
                                openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <p className="leading-relaxed text-base font-light">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
