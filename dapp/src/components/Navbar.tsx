"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConnectButton from '@/components/ConnectButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#1E2329]/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="/file.svg"
                  alt="RentalRideFlow Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#F6851B] to-[#F5B567] bg-clip-text text-transparent">
                RentalRideFlow
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#docs">Docs</NavLink>
              <NavLink href="/ride-payments">Dashboard</NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <ConnectButton className="bg-gradient-to-r from-[#F6851B] to-[#F5B567] hover:from-[#E67510] hover:to-[#F5A040] text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ConnectButton className="mr-4 bg-gradient-to-r from-[#F6851B] to-[#F5B567] hover:from-[#E67510] hover:to-[#F5A040] text-white font-medium py-2 px-3 text-sm rounded-lg shadow-md" />
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  className="h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1E2329]/95 backdrop-blur-md border-t border-gray-700 px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium">How It Works</NavLink>
            <NavLink href="#features" className="block px-3 py-2 rounded-md text-base font-medium">Features</NavLink>
            <NavLink href="#docs" className="block px-3 py-2 rounded-md text-base font-medium">Docs</NavLink>
            <NavLink href="/ride-payments" className="block px-3 py-2 rounded-md text-base font-medium">Dashboard</NavLink>
            <div className="pt-2 flex items-center">
              <ThemeToggle />
              <span className="ml-2 text-sm text-gray-400">Toggle theme</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:text-[#F6851B] px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  
  // This is just a placeholder - you'd implement actual theme switching logic
  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add actual theme toggle implementation
  };
  
  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full text-gray-300 hover:text-[#F6851B] transition-colors"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
