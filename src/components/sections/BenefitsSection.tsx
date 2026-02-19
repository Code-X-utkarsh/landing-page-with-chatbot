"use client";


// import { NetworkScene, PayScene, WLBScene } from "@/components/three/BenefitsScenes"; // Using lightweight motion graphics now
import { DigitalConstellation, GrowthBeam, ZenBloom } from "@/components/three/MotionGraphics";

const benefits = [
    { title: "Global Network", desc: "Connect with devs worldwide.", color: "#FF9800", shape: "box" },
    { title: "Higher Pay", desc: "Unlock 3x-5x salary growth.", color: "#8BC34A", shape: "octahedron" },
    { title: "Better WLB", desc: "Experience true work-life balance.", color: "#FF7043", shape: "sphere" },
];

export const BenefitsSection = () => {
    return (
        <section id="benefits-section" className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#8BC34A]/5 blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[#8BC34A] font-bold tracking-widest text-sm uppercase mb-4 block">Why SDE Abroad?</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        More Than Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8BC34A] to-[#DCEDC8]">Job Change</span>
                    </h2>
                    <p className="text-[#A1A1AA] max-w-2xl mx-auto text-lg leading-relaxed">
                        Unlock a lifestyle and career trajectory that simply isn't possible elsewhere.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((b, i) => (
                        <div key={i} className="group relative">
                            {/* Hover Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8BC34A] to-[#3A5A28] rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

                            <div className="relative h-full bg-[#0A0F0A] p-8 rounded-3xl border border-white/10 overflow-hidden flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2">
                                {/* 3D Icon Container */}
                                <div className="h-48 w-full mb-8 rounded-2xl overflow-hidden bg-[#050505] relative border border-white/5 shadow-inner">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,195,74,0.1)_0%,transparent_70%)]" />
                                    {/* Motion Graphics Container */}
                                    <div className="w-full h-full relative">
                                        {i === 0 && <DigitalConstellation color={b.color} />}
                                        {i === 1 && <GrowthBeam color={b.color} />}
                                        {i === 2 && <ZenBloom color={b.color} />}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">{b.title}</h3>
                                <p className="text-[#A1A1AA] leading-relaxed">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
