"use client";

import Image from "next/image";

const benefits = [
    { title: "Global Network", desc: "Connect with devs worldwide.", image: "/benefit-2.png", color: "from-purple-500/20 to-blue-500/5" },
    { title: "Higher Pay", desc: "Unlock 3x-5x salary growth.", image: "/benefit-3.png", color: "from-green-500/20 to-emerald-500/5" },
    { title: "Better WLB", desc: "Experience true work-life balance.", image: "/benefit-1.png", color: "from-orange-500/20 to-amber-500/5" },
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
                                {/* Image Container */}
                                <div className={`h-48 w-full mb-8 rounded-2xl overflow-hidden relative border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-105 bg-gradient-to-br ${b.color}`}>
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <div className="relative w-full h-full drop-shadow-2xl hover:drop-shadow-[0_20px_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                                            <Image
                                                src={b.image}
                                                alt={b.title}
                                                fill
                                                className="object-contain"
                                                priority={i === 0}
                                            />
                                        </div>
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
