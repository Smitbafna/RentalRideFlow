"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E2329] pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-radial from-[#F6851B]/30 to-transparent blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          
          {/* Hero content */}
          <div className="relative z-10 text-center max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Pay As You Go,{' '}
              <span className="text-[#F6851B]">On-Chain</span> 🚗
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 mx-auto">
              RentalRideFlow lets you pay automatically per ride — no deposits, 
              no overcharging, just real-time crypto streaming.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link 
                href="/ride-payments" 
                className="px-6 py-3 bg-gradient-to-r from-[#F6851B] to-[#F5B567] hover:from-[#E67510] hover:to-[#F5A040] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start a Ride
              </Link>
              
              <Link 
                href="#how-it-works" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-medium rounded-lg backdrop-blur-sm transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-gray-400">
              Powered by MetaMask Delegation Toolkit + Envio Automation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


