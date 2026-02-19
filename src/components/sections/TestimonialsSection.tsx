"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Scene } from "@/components/three/Scene";
import { CommunityScene } from "@/components/three/CommunityScene";

const testimonials = [
    {
        name: "Aditya S.",
        role: "SDE-2 at Amazon UK",
        text: "Tanmay's guidance was pivotal. I moved from Bangalore to London in 3 months. The visa breakdown was a lifesaver.",
    },
    {
        name: "Priya M.",
        role: "Frontend Eng at Spotify Sweden",
        text: "I was confused about tax structures in EU. This masterclass cleared everything up. Highly recommended!",
    },
    {
        name: "Rahul K.",
        role: "SDE at Booking.com Amsterdam",
        text: "The salary negotiation tips alone were worth 10x the time investment. Don't think, just register.",
    }
];

export const TestimonialsSection = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section id="testimonials-section" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8BC34A]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3A5A28]/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Split Layout: Heading & 3D Scene */}
                <div className="flex flex-col lg:flex-row items-center mb-16 gap-12">

                    {/* Left: Text Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                            Stories from the <br />
                            <span className="text-[#8BC34A]">Global Community</span>
                        </h2>
                        <p className="text-[#A1A1AA] text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Join over 10,000 engineers who have successfully navigated the international job market. Real results, real impact.
                        </p>
                    </div>

                    {/* Right: 3D Community Scene */}
                    <div className="w-full lg:w-1/2 h-[400px] relative">
                        {isMounted && (
                            <Scene enableControls={false} cameraPosition={[0, 0, 7]}>
                                <CommunityScene />
                            </Scene>
                        )}
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="group bg-[#0A0F0A] p-10 rounded-3xl border border-white/5 hover:border-[#8BC34A]/30 transition-all duration-500 hover:shadow-[0_10px_50px_-10px_rgba(139,195,74,0.1)] flex flex-col justify-between">
                            <div>
                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-5 h-5 text-[#FFC107] fill-[#FFC107] drop-shadow-[0_0_8px_rgba(255,193,7,0.4)]" />
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif">"</span>
                                    <p className="text-[#E8F5E9] text-lg mb-8 leading-relaxed relative z-10 font-light">
                                        {t.text}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#2E4E1E] p-[1px] shadow-lg">
                                    <div className="w-full h-full rounded-full bg-[#0A0F0A] flex items-center justify-center text-[#8BC34A] font-bold text-lg">
                                        {t.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-white text-base">{t.name}</div>
                                    <div className="text-xs text-[#8BC34A] font-medium uppercase tracking-wider">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
