"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Button from "@/components/Button";
import Image from "next/image";

export default function ConnectButton({ className }: { className?: string }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const metamaskConnector = connectors.find(c => c.id === 'metaMask') || connectors[0];
  
  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (isConnected && address) {
    return (
      <div className="relative wallet-dropdown">
        <Button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 ${className}`}
        >
          <div className="w-5 h-5 relative">
            <Image 
              src="/metamask.svg" 
              alt="MetaMask"
              fill
              className="object-contain"
            />
          </div>
          <span>{formatAddress(address)}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#262E36] rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50">
            <div className="p-3 border-b border-gray-700">
              <div className="text-sm font-medium text-gray-300">Connected Wallet</div>
              <div className="text-xs text-gray-400 truncate">{address}</div>
            </div>
            
            <div className="p-2">
              <button 
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
              >
                Disconnect
              </button>
              
              <a 
                href={`https://sepolia.etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
              >
                View on Etherscan
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Button 
      onClick={() => connect({ connector: metamaskConnector })}
      className={className}
      disabled={isPending}
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
