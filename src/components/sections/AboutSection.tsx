"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, DollarSign, FileText, Plane, Building, Users } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
    { icon: FileText, title: "Visa Process", desc: "Step-by-step guidance on Tier-2 & Skilled Worker visas." },
    { icon: DollarSign, title: "Salary Breakdown", desc: "Real numbers: Base, Bonus, RSUs, and Taxes." },
    { icon: Users, title: "Cost of Living", desc: "Rent, groceries, and savings analysis." },
    { icon: Building, title: "Tax Structure", desc: "Understanding tax brackets and take-home pay." },
    { icon: Globe, title: "Work Culture", desc: "WLB, office environments, and expectations." },
    { icon: Plane, title: "Relocation Tips", desc: "Moving logistics, accommodation, and settling in." },
];

// New Voxel Workspace Scene (Pixel Art Theme)
import { VoxelWorkspace } from "@/components/three/VoxelWorkspace";
import { Scene } from "@/components/three/Scene";

export const AboutSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section id="about-section" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8BC34A]/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#8BC34A] font-semibold tracking-widest text-sm uppercase mb-4 block">The Masterclass</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for <span className="text-[#8BC34A]">Ambition</span></h2>
                </div>

                {/* THE BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">

                    {/* CARD A: The Roadmap Core (Large, 2x2) */}
                    <div className="md:col-span-2 md:row-span-2 bg-[#0A0F0A] border border-white/5 rounded-3xl overflow-hidden relative group hover:border-[#00E5FF]/30 transition-all duration-500">
                        {/* Text Content */}
                        <div className="absolute top-8 left-8 z-20 max-w-xs">
                            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                I prioritize <br />
                                <span className="text-[#00E5FF]">clarity & results</span>.
                            </h3>
                            <p className="text-[#A1A1AA] text-sm leading-relaxed">
                                No fluff. Just the exact steps, documents, and negotiation tactics I used to crack a top UK tech job.
                            </p>
                        </div>

                        {/* Visual: The Scene */}
                        <div className="absolute inset-0 flex items-center justify-center translate-x-1/4 translate-y-10 group-hover:scale-105 transition-transform duration-700">
                            <div className="w-[600px] h-[600px]">
                                {isMounted && (
                                    <Scene enableControls={false}>
                                        <VoxelWorkspace />
                                    </Scene>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CARD B: Curriculum Stack (Wide, 2x1) */}
                    <div className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 relative overflow-hidden hover:bg-[#161616] transition-colors group">
                        <h4 className="text-white font-bold text-lg mb-4">Master the Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Visa Process", "Salary Negotiation", "Tax Optimization", "Rent & Living", "Culture Fit"].map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A1A1AA] text-xs font-mono hover:text-[#8BC34A] hover:border-[#8BC34A]/50 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-t from-[#8BC34A]/10 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* CARD C: Global (1x1) */}
                    <div className="bg-gradient-to-br from-[#8BC34A] to-[#33691E] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        <div className="relative z-10">
                            <h4 className="text-white font-bold text-xl leading-tight mb-2">Start your <br />global journey.</h4>
                        </div>

                        <button className="relative z-10 bg-black/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-black/40 transition-all group-hover:gap-3">
                            Join Now <Plane className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
