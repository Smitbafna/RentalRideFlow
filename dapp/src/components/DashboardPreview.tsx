"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPreview() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  // Simulate a ride payment
  const handleSimulate = () => {
    setIsSimulating(true);
    
    // Simulate an async process
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 2500);
  };
  
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1E2329]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Live Demo Dashboard</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the RentalRideFlow dashboard with our interactive preview
          </p>
        </div>
        
        {/* Dashboard mockup */}
        <div className="bg-[#262E36] rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="bg-gradient-to-r from-[#1E2329] to-[#262E36] rounded-xl p-4 border border-white/5 shadow-inner">
            {/* Dashboard header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F6851B] to-[#F5B567] bg-clip-text text-transparent">RentalRideFlow Dashboard</h3>
                <p className="text-gray-400 text-sm">Connected to Sepolia Testnet</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-green-400 text-xs font-medium">Wallet Connected</span>
              </div>
            </div>
            
            {/* Dashboard content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left panel */}
              <div className="col-span-1">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <h4 className="text-lg font-medium mb-3">Active Delegations</h4>
                  <div className="space-y-2">
                    <div className="bg-[#1E2329] rounded-lg p-3 border border-[#F6851B]/20">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Daily Limit Delegation</span>
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">ACTIVE</span>
                      </div>
                      <div className="text-xs text-gray-400">10 USDC per day</div>
                    </div>
                    
                    <div className="bg-[#1E2329] rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Streaming Delegation</span>
                        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">INACTIVE</span>
                      </div>
                      <div className="text-xs text-gray-400">0.0001 USDC per second</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-medium mb-2">Auto Reset</h4>
                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F6851B]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-300">Enable period reset</span>
                  </label>
                </div>
              </div>
              
              {/* Middle panel */}
              <div className="col-span-1 space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-lg font-medium mb-3">Remaining Allowance</h4>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Daily Limit:</span>
                    <span className="font-medium">7.5 / 10 USDC</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#F6851B] to-[#00BFA5] h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">Resets in: 14 hours</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 h-[calc(100%-76px)]">
                  <h4 className="text-lg font-medium mb-3">Simulate Ride</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Destination</label>
                      <input
                        type="text"
                        defaultValue="Downtown Metro Station"
                        className="w-full px-3 py-2 bg-[#1E2329] border border-gray-700 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Price (USDC)</label>
                      <input
                        type="text"
                        defaultValue="5.00"
                        className="w-full px-3 py-2 bg-[#1E2329] border border-gray-700 rounded-md text-sm"
                      />
                    </div>
                    <button 
                      onClick={handleSimulate}
                      disabled={isSimulating}
                      className={`w-full py-2 rounded-md text-center text-sm font-medium transition-colors ${
                        simulationComplete 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-[#F6851B] hover:bg-[#E67510] text-white'
                      }`}
                    >
                      {isSimulating 
                        ? 'Processing...' 
                        : simulationComplete 
                          ? 'Payment Completed!' 
                          : 'Simulate Ride Payment'
                      }
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right panel */}
              <div className="col-span-1">
                <div className="bg-white/5 rounded-xl p-4 h-full">
                  <h4 className="text-lg font-medium mb-3">Ride History</h4>
                  <div className="space-y-3">
                    {simulationComplete && (
                      <div className="bg-[#1E2329] rounded-lg p-3 border border-green-500/20 animate-pulse">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Downtown Metro Station</span>
                          <span className="text-xs text-gray-400">Just now</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">5.00 USDC</span>
                          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">COMPLETED</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 truncate">
                          Tx: 0x71c...8f92
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-[#1E2329] rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Airport Terminal</span>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">2.50 USDC</span>
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">COMPLETED</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 truncate">
                        Tx: 0x92b...4e21
                      </div>
                    </div>
                    
                    <div className="bg-[#1E2329] rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Shopping Mall</span>
                        <span className="text-xs text-gray-400">Yesterday</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">4.25 USDC</span>
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">COMPLETED</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 truncate">
                        Tx: 0x45a...9c76
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* View full dashboard button */}
        <div className="mt-8 text-center">
          <Link 
            href="/ride-payments"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-colors"
          >
            Try Full Dashboard →
          </Link>
        </div>
      </div>
    </section>
  );
}
