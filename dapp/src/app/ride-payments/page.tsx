"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import RideDelegationSelector from "@/components/RideDelegationSelector";
import RidePaymentSimulator from "@/components/RidePaymentSimulator";
import Image from "next/image";

export default function RidePaymentPage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-4 font-geist-sans">
      <header className="w-full max-w-6xl flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">RentalRideFlow</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col gap-12 row-start-2 w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:w-1/3">
            <h1 className="text-3xl font-bold mb-6">Pay-Per-Ride System</h1>
            <p className="text-lg text-gray-300 mb-4">
              Set up automatic ride payments using MetaMask delegation with ERC-20 token scopes.
            </p>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-3">How It Works</h2>
              
              <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                <li>Create a delegation with periodic or streaming scope for ride payments</li>
                <li>Set your preferred payment limits (daily/weekly caps or continuous accrual)</li>
                <li>The Delegation Agent handles payments on your behalf when you book rides</li>
                <li>Payments are automatically executed with the limits you've set</li>
                <li>Usage is tracked and delegations can auto-revoke when limits are reached</li>
              </ol>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Benefits</h2>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>No need to approve transactions for every ride</li>
                <li>Hard caps on spending prevent overcharging</li>
                <li>Time-based limits ensure controlled spending</li>
                <li>Automatic renewal keeps the system working</li>
                <li>All payments execute on-chain for complete transparency</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">Step 1: Create Delegation</h2>
              <RideDelegationSelector />
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Step 2: Test Ride Payment System</h2>
          <div className="bg-gray-900 p-4 rounded-lg">
            <RidePaymentSimulator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
