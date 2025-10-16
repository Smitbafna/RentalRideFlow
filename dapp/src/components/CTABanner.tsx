"use client";

import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F6851B] to-[#00BFA5] opacity-90"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20"></div>
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-black/10 blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            The Future of Ride Payments is On-Chain
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Experience rental mobility without prepaying or trusting intermediaries.
            Take control of your payments with delegated smart accounts.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/ride-payments" 
              className="px-8 py-4 bg-white text-[#F6851B] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Start a Ride
            </Link>
            <a 
              href="#" 
              className="px-8 py-4 bg-black/30 backdrop-blur-sm text-white font-medium rounded-lg border border-white/30 hover:bg-black/40 transition-colors duration-200"
            >
              Read Whitepaper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
