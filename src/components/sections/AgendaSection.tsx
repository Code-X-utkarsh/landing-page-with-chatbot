"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const agendaItems = [
    { time: "5:00 PM", title: "Introduction & Welcome", desc: "Get to know the landscape of tech abroad." },
    { time: "5:30 PM", title: "Visa Types & Requirements", desc: "Deep dive into Skilled Worker visas and permits." },
    { time: "6:15 PM", title: "Salary Breakdown", desc: "Understanding gross vs net, taxes, and savings." },
    { time: "7:00 PM", title: "Job Search Strategies", desc: "How to apply, interview prep, and referral hacks." },
    { time: "7:45 PM", title: "Q&A Session", desc: "Open floor for all your burning questions." },
];

export const AgendaSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            });

            // Animate progress line (Laser Glass Effect)
            tl.fromTo(lineRef.current,
                { height: "0%", opacity: 0 },
                { height: "100%", opacity: 1, ease: "none" }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="agenda-section" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Glows for Depth */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8BC34A]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3A5A28]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 relative">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#8BC34A] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        Masterclass Schedule
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-white">Roadmap</span>
                    </h2>
                    <p className="text-[#A1A1AA] max-w-2xl mx-auto text-lg font-light">
                        A precision-engineered timeline to take you from applicant to offer letter.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line Background (Subtle Glass Rod) */}
                    <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full" />

                    {/* Animated Progress Line (Laser Glow) */}
                    <div ref={lineRef} className="absolute left-[29px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#8BC34A] via-white to-[#8BC34A] origin-top shadow-[0_0_20px_#8BC34A] rounded-full opacity-0" />

                    <div className="space-y-20">
                        {agendaItems.map((item, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Time Bubble (Center) - Glassmorphic Orb */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(139,195,74,0.2)] transition-transform duration-300 hover:scale-110 group">
                                    <div className="absolute inset-0 bg-[#8BC34A] opacity-20 blur-md rounded-full group-hover:opacity-40 transition-opacity" />
                                    <Clock className="w-6 h-6 text-white relative z-10" />
                                </div>

                                {/* Content Card - Frosted Glass */}
                                <div className={`w-full md:w-[calc(50%-60px)] pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-[#8BC34A]/30 transition-all duration-500 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                        <div className={`inline-block mb-3 px-3 py-1 rounded-md bg-[#8BC34A]/20 text-[#8BC34A] font-mono text-sm font-bold tracking-wider`}>
                                            {item.time}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#E8F5E9] transition-colors">{item.title}</h3>
                                        <p className="text-[#A1A1AA] text-base leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
