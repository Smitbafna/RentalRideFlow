"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface StepProps {
  number: string;
  title: string;
  description: React.ReactNode;
  icon?: string;
}

function Step({ number, title, description, icon }: StepProps) {
  return (
    <div className="relative">
      {/* Step number/icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#F6851B] to-[#F5B567] text-white font-bold text-lg mb-4 shadow-lg shadow-[#F6851B]/20">
        {icon || number}
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-gray-300">
        {description}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E2329] to-[#262E36]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Your Ride, Your Wallet, Your Rules</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow these simple steps to get started with automated ride payments
          </p>
        </div>
        
        {/* Desktop timeline */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-12 relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-0.5 bg-gradient-to-r from-[#F6851B] to-[#00BFA5]"></div>
          
          <Step 
            number="1"
            title="Setup Delegation"
            description={
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Connect MetaMask</li>
                <li>Define spending limit</li>
                <li>Sign delegation</li>
              </ul>
            }
          />
          
          <Step 
            number="2"
            title="Book a Ride"
            description={
              <p>Operator triggers auto payment on completion, with no extra approvals needed.</p>
            }
          />
          
          <Step 
            number="3"
            title="Pay-as-You-Go"
            description={
              <p>Payment streamed or deducted per trip — Envio monitors delegation automatically.</p>
            }
          />
        </div>
        
        {/* Mobile timeline */}
        <div className="md:hidden space-y-12 relative">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-[#F6851B] to-[#00BFA5]"></div>
          
          <div className="pl-16">
            <Step 
              number="1"
              title="Setup Delegation"
              description={
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Connect MetaMask</li>
                  <li>Define spending limit</li>
                  <li>Sign delegation</li>
                </ul>
              }
            />
          </div>
          
          <div className="pl-16">
            <Step 
              number="2"
              title="Book a Ride"
              description={
                <p>Operator triggers auto payment on completion, with no extra approvals needed.</p>
              }
            />
          </div>
          
          <div className="pl-16">
            <Step 
              number="3"
              title="Pay-as-You-Go"
              description={
                <p>Payment streamed or deducted per trip — Envio monitors delegation automatically.</p>
              }
            />
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Link 
            href="/ride-payments"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F6851B] to-[#00BFA5] hover:from-[#E67510] hover:to-[#00A693] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start with Sepolia Testnet → Try Demo Ride
          </Link>
        </div>
      </div>
    </section>
  );
}
