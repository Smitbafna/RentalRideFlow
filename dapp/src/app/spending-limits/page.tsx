"use client";

import Footer from "@/components/Footer";
import SpendingLimitDemoSection from "@/components/SpendingLimitDemoSection";
import CreateHybridAccountButton from "@/components/CreateHybridAccountButton";

export default function SpendingLimitsPage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-4 font-geist-sans">
      <main className="flex flex-col gap-12 row-start-2 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Smart Account Management</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <CreateHybridAccountButton />
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">About Hybrid Smart Accounts</h2>
              <p className="text-gray-300 mb-4">
                A Hybrid smart account supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.
              </p>
              <p className="text-gray-300 mb-4">
                This account type allows you to combine the security of hardware-backed authentication with the flexibility of standard private key access.
              </p>
              <p className="text-gray-300">
                Use the button on the left to create a new Hybrid smart account with a randomly generated signer key. You can then use this account to create delegations with spending limits.
              </p>
            </div>
          </div>
        </div>
        
        <SpendingLimitDemoSection />
      </main>
      <Footer />
    </div>
  );
}
