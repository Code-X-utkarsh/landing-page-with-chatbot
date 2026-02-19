"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    { q: "Is this masterclass really free?", a: "Yes, absolutely! It's a free community initiative by Scaler." },
    { q: "Will there be a recording provided?", a: "No, this is a live-only session to ensure maximum engagement and Q&A interaction." },
    { q: "Do I need any prior experience?", a: "It helps if you are a working professional (SDE) or final year student, but all are welcome." },
    { q: "Can I ask questions directly?", a: "Yes, there is a dedicated 45-minute Q&A session at the end." },
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq-section" className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 tracking-tight">
                    Frequently Asked <span className="text-[#8BC34A]">Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group border rounded-2xl overflow-hidden transition-all duration-300",
                                openIndex === index
                                    ? "bg-[#0A0F0A] border-[#8BC34A]/30 shadow-[0_0_30px_-10px_rgba(139,195,74,0.1)]"
                                    : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                            >
                                <span className={cn(
                                    "text-lg md:text-xl font-medium transition-colors duration-300",
                                    openIndex === index ? "text-[#8BC34A]" : "text-white group-hover:text-[#E8F5E9]"
                                )}>
                                    {faq.q}
                                </span>
                                <div className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    openIndex === index ? "bg-[#8BC34A]/20 rotate-180" : "bg-white/5 group-hover:bg-white/10"
                                )}>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-[#8BC34A]" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-white/50" />
                                    )}
                                </div>
                            </button>
                            <div
                                className={cn(
                                    "px-6 md:px-8 text-[#A1A1AA] overflow-hidden transition-all duration-500 ease-in-out",
                                    openIndex === index ? "max-h-48 pb-8 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <p className="leading-relaxed text-base md:text-lg font-light">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
