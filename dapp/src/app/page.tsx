"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyAutomation from "@/components/WhyAutomation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[#1E2329] text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhyAutomation />
      <Footer />
    </div>
  );
}
