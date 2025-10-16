"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { 
  trackDelegation, 
  recordDelegationPayment, 
  getDelegationUsage,
  canExecutePayment,
  revokeDelegation,
  DelegationUsage 
} from "@/utils/delegationMonitor";
import { parseEther, formatEther, Address } from "viem";
import useStorageClient from "@/hooks/useStorageClient";
import RidePaymentExecutor from "@/components/RidePaymentExecutor";

export default function RidePaymentSimulator() {
  const { getDelegations } = useStorageClient();
  const [delegations, setDelegations] = useState<any[]>([]);
  const [selectedDelegation, setSelectedDelegation] = useState<string | null>(null);
  const [delegationUsage, setDelegationUsage] = useState<DelegationUsage | null>(null);
  const [rideDetails, setRideDetails] = useState({
    distance: "5.0",
    price: "10.0", 
    destination: "Downtown Metro Station",
    recipient: "0x8c79b90786aBd8073341dC41E687489DaA177ec2" as Address
  });
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load available delegations on mount
  useEffect(() => {
    const loadDelegations = () => {
      const storedDelegations = getDelegations();
      if (storedDelegations && storedDelegations.length > 0) {
        // Filter for only ERC-20 related delegations
        const relevantDelegations = storedDelegations.filter(
          (d: any) => d.scope?.type?.includes('erc20')
        );
        setDelegations(relevantDelegations);
      }
    };
    loadDelegations();
  }, [getDelegations]);

  // Initialize delegation tracking when a delegation is selected
  const handleSelectDelegation = (delegationId: string) => {
    const delegation = delegations.find(d => 
      `${d.from}-${d.to}-${JSON.stringify(d.scope)}` === delegationId
    );
    
    if (delegation) {
      setSelectedDelegation(delegationId);
      
      // Calculate initial allowance based on delegation type
      let initialAllowance = 0n;
      if (delegation.scope.type.includes('Period')) {
        initialAllowance = delegation.scope.periodAmount;
      } else if (delegation.scope.type.includes('Streaming')) {
        initialAllowance = delegation.scope.initialAmount;
      } else {
        initialAllowance = delegation.scope.maxAmount;
      }
      
      // Initialize tracking for this delegation
      const usage = trackDelegation(delegation, initialAllowance);
      setDelegationUsage(usage);
      
      // Add to simulation log
      addToLog(`Delegation selected: ${formatDelegationType(delegation.scope.type)}`);
      addToLog(`Initial allowance: ${formatEther(initialAllowance)} tokens`);
    }
  };

  // Helper to format delegation type for display
  const formatDelegationType = (type: string): string => {
    if (type.includes('Period')) return 'Periodic Payment';
    if (type.includes('Streaming')) return 'Streaming Payment';
    return 'Fixed Amount Payment';
  };

  // Add entry to simulation log
  const addToLog = (message: string) => {
    setSimulationLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // Process a ride payment
  const simulateRidePayment = async () => {
    if (!selectedDelegation || !delegationUsage) {
      addToLog("Error: No delegation selected");
      return;
    }
    
    setIsProcessing(true);
    
    // Convert ride price to wei
    const paymentAmount = parseEther(rideDetails.price);
    
    // Check if payment can be executed
    if (!canExecutePayment(selectedDelegation, paymentAmount)) {
      addToLog("🛑 Payment failed: Insufficient allowance or delegation inactive");
      setIsProcessing(false);
      return;
    }
    
    // Simulate blockchain delay
    addToLog(`🔄 Processing payment of ${rideDetails.price} tokens...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Record the payment
    const updatedUsage = recordDelegationPayment(selectedDelegation, paymentAmount);
    
    if (updatedUsage) {
      setDelegationUsage(updatedUsage);
      addToLog(`✅ Payment successful! Ride to ${rideDetails.destination} (${rideDetails.distance} miles)`);
      addToLog(`💰 Remaining allowance: ${formatEther(updatedUsage.remainingAllowance)} tokens`);
      
      // Check if period was reset
      if (updatedUsage.periodResetTime && 
          updatedUsage.lastUpdated > (delegationUsage.periodResetTime || 0) && 
          delegationUsage.periodResetTime) {
        addToLog(`🔄 Period reset: Allowance refreshed for new period`);
      }
      
      // Check if delegation is exhausted
      if (updatedUsage.status === 'EXHAUSTED') {
        addToLog(`⚠️ Delegation exhausted: No more payments can be made`);
      }
    } else {
      addToLog("❌ Payment failed: Delegation not found");
    }
    
    setIsProcessing(false);
  };

  // Generate a random ride
  const generateRandomRide = () => {
    const destinations = [
      "Downtown Metro Station", 
      "Central Park", 
      "Airport Terminal",
      "Shopping Mall",
      "University Campus", 
      "Business District"
    ];
    
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    const randomDistance = (1 + Math.random() * 15).toFixed(1);
    const randomPrice = (Number(randomDistance) * 1.5).toFixed(1);
    
    setRideDetails({
      destination: randomDestination,
      distance: randomDistance,
      price: randomPrice,
      recipient: "0x8c79b90786aBd8073341dC41E687489DaA177ec2" as Address
    });
  };

  // Revoke the current delegation
  const handleRevokeDelegation = () => {
    if (selectedDelegation) {
      revokeDelegation(selectedDelegation);
      addToLog("🚫 Delegation has been revoked");
      
      // Update delegation usage to show revoked status
      if (delegationUsage) {
        setDelegationUsage({
          ...delegationUsage,
          status: 'REVOKED'
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium text-lg mb-3">Available Delegations</h3>
        {delegations.length === 0 ? (
          <div className="p-3 bg-gray-800 rounded text-gray-400">
            No delegations available. Create a delegation first.
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            {delegations.map((delegation, index) => {
              const delegationId = `${delegation.from}-${delegation.to}-${JSON.stringify(delegation.scope)}`;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectDelegation(delegationId)}
                  className={`w-full p-3 text-left rounded ${
                    selectedDelegation === delegationId
                      ? "bg-purple-800 border border-purple-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <div className="font-medium">
                    {formatDelegationType(delegation.scope.type)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {delegation.scope.type.includes('Period') 
                      ? `${formatEther(delegation.scope.periodAmount)} tokens per ${delegation.scope.periodDuration / 86400} day(s)`
                      : delegation.scope.type.includes('Streaming')
                      ? `${formatEther(delegation.scope.amountPerSecond)} tokens per second (max: ${formatEther(delegation.scope.maxAmount)})`
                      : `Max: ${formatEther(delegation.scope.maxAmount)} tokens`
                    }
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {delegationUsage && (
          <div className="p-4 bg-gray-800 rounded mb-4">
            <h3 className="font-medium mb-2">Delegation Status</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Status:</div>
              <div className={`font-medium ${
                delegationUsage.status === 'ACTIVE' 
                  ? 'text-green-500' 
                  : delegationUsage.status === 'EXHAUSTED'
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}>
                {delegationUsage.status}
              </div>
              
              <div className="text-gray-400">Total Spent:</div>
              <div>{formatEther(delegationUsage.totalSpent)} tokens</div>
              
              <div className="text-gray-400">Remaining:</div>
              <div>{formatEther(delegationUsage.remainingAllowance)} tokens</div>
              
              {delegationUsage.periodResetTime && (
                <>
                  <div className="text-gray-400">Next Reset:</div>
                  <div>
                    {new Date(delegationUsage.periodResetTime * 1000).toLocaleString()}
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={handleRevokeDelegation}
                className="w-full bg-red-800 hover:bg-red-700"
              >
                Revoke Delegation
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="p-4 bg-gray-800 rounded mb-4">
          <h3 className="font-medium text-lg mb-3">Ride Details</h3>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input
                type="text"
                value={rideDetails.destination}
                onChange={(e) => setRideDetails({...rideDetails, destination: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Distance (miles)</label>
              <input
                type="text"
                value={rideDetails.distance}
                onChange={(e) => setRideDetails({...rideDetails, distance: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price (tokens)</label>
              <input
                type="text"
                value={rideDetails.price}
                onChange={(e) => setRideDetails({...rideDetails, price: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Recipient Address</label>
              <input
                type="text"
                value={rideDetails.recipient}
                onChange={(e) => setRideDetails({...rideDetails, recipient: e.target.value as Address})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">Ride operator's payment address</p>
            </div>
          
            <div className="flex gap-2">
              <Button 
                onClick={generateRandomRide}
                className="flex-1 bg-gray-700 hover:bg-gray-600"
              >
                Random Ride
              </Button>
              
              <Button 
                onClick={simulateRidePayment}
                disabled={!selectedDelegation || isProcessing}
                className="flex-1"
              >
                {isProcessing ? "Processing..." : "Simulate Payment"}
              </Button>
            </div>
            
            {selectedDelegation && delegationUsage && delegationUsage.status === 'ACTIVE' && (
              <div className="mt-4">
                <RidePaymentExecutor 
                  delegationId={selectedDelegation}
                  delegation={delegations.find(d => 
                    `${d.from}-${d.to}-${JSON.stringify(d.scope)}` === selectedDelegation
                  )}
                  amount={rideDetails.price}
                  recipientAddress={rideDetails.recipient}
                  onExecuted={() => {
                    addToLog("✅ On-chain payment executed successfully!");
                    // Update delegation usage
                    if (delegationUsage) {
                      recordDelegationPayment(
                        selectedDelegation,
                        parseEther(rideDetails.price)
                      );
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded h-64 overflow-y-auto">
          <h3 className="font-medium text-lg mb-2">Payment Log</h3>
          <div className="text-sm space-y-1 font-mono">
            {simulationLog.length === 0 ? (
              <div className="text-gray-500">No activity yet</div>
            ) : (
              simulationLog.map((log, i) => (
                <div key={i} className="border-l-2 border-gray-700 pl-2">{log}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
