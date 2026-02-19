"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Benefits", href: "#about-section" },
        { name: "Agenda", href: "#agenda-section" },
        { name: "Stories", href: "#testimonials-section" },
        { name: "FAQ", href: "#faq-section" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] max-w-5xl z-50 transition-all duration-300 rounded-full border",
                scrolled
                    ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3 px-6"
                    : "bg-transparent border-transparent py-5 px-6"
            )}
        >
            <div className="flex justify-between items-center w-full">
                {/* Logo */}
                <div className="text-xl font-bold text-white tracking-widest font-accent">
                    SDE<span className="text-[#8BC34A]">.ABROAD</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/5 backdrop-blur-sm">
                        Log In
                    </button>
                    <button className="bg-[#8BC34A] hover:bg-[#7CB342] text-black px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(139,195,74,0.3)]">
                        Register Free
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-white/80 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        <button className="w-full bg-white/10 py-3 rounded-lg text-white font-semibold">
                            Log In
                        </button>
                        <button className="w-full bg-[#8BC34A] py-3 rounded-lg text-black font-bold">
                            Register Free
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
