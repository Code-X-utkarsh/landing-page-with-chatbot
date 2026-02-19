"use client";

import { ArrowRight } from "lucide-react";

export const CTASection = () => {
    return (
        <section id="cta-section" className="py-40 bg-[#050505] relative overflow-hidden flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1F2918_0%,#050505_70%)] pointer-events-none opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-[#8BC34A]/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-10 backdrop-blur-md">
                    🚀 Limited Spots for Feb Batch
                </div>

                <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
                    READY TO GO <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] via-[#C5E1A5] to-[#8BC34A] animate-shimmer bg-[length:200%_auto]">GLOBAL?</span>
                </h2>
                <p className="text-xl md:text-2xl text-[#A1A1AA] mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                    Don't let another year pass wondering "what if". Secure your future in tech abroad today.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <button className="group relative bg-[#8BC34A] hover:bg-[#7CB342] text-black px-12 py-6 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(139,195,74,0.4)] flex items-center gap-3 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center gap-3">
                            Register Now
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <p className="text-[#A1A1AA] text-sm font-medium tracking-wide opacity-80">
                        No credit card required • Instant Access
                    </p>
                </div>
            </div>
        </section>
    );
};
