"use client";

import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-[#050505] py-12 border-t border-white/5">
            <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2 tracking-wider">SDE<span className="text-[#8BC34A]">.ABROAD</span></h3>
                    <p className="text-[#A1A1AA] text-sm">© 2026 Utkarsh Priye. All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="text-white/40 hover:text-[#8BC34A] transition"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="text-white/40 hover:text-[#8BC34A] transition"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="text-white/40 hover:text-[#8BC34A] transition"><Github className="w-5 h-5" /></a>
                </div>
            </div>
        </footer>
    );
};
