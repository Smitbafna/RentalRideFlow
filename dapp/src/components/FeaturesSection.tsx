"use client";

import { useState } from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 ${
        isHovered ? 'border-[#F6851B] shadow-lg shadow-[#F6851B]/10' : 'border-white/10'
      } border flex items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: '',
      title: 'On-Chain Pay-Per-Ride'
    },
    {
      icon: '',
      title: 'MetaMask Smart Accounts'
    },
    {
      icon: '',
      title: 'Envio Indexing'
    },
    {
      icon: '',
      title: 'Secure & Revoke Anytime'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1E2329]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
