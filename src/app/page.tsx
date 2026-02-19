"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SpeakerSection } from "@/components/sections/SpeakerSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { AgendaSection } from "@/components/sections/AgendaSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="bg-[#1A2F12] min-h-screen">
      <HeroSection />
      <AboutSection />
      <SpeakerSection />
      <BenefitsSection />
      <AgendaSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
