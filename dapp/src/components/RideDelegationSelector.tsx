"use client";

import { useState } from "react";
import Button from "@/components/Button";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { useStepContext } from "@/hooks/useStepContext";
import { 
  prepareRidePeriodicDelegation, 
  prepareRideStreamingDelegation, 
  prepareRideFixedAmountDelegation 
} from "@/utils/delegationUtils";
import { Address } from "viem";

export default function RideDelegationSelector() {
  const { smartAccount: delegatorAccount } = useDelegatorSmartAccount();
  const { smartAccount: delegateAccount } = useDelegateSmartAccount();
  const { storeDelegation } = useStorageClient();
  const { changeStep } = useStepContext();
  
  const [delegationType, setDelegationType] = useState<'periodic' | 'streaming' | 'fixed'>('periodic');
  const [tokenAddress, setTokenAddress] = useState<string>("0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da");
  const [amount, setAmount] = useState<string>("10");
  const [periodDuration, setPeriodDuration] = useState<string>("86400");
  const [amountPerSecond, setAmountPerSecond] = useState<string>("0.0001");
  const [initialAmount, setInitialAmount] = useState<string>("1");
  const [maxAmount, setMaxAmount] = useState<string>("100");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateDelegation = async () => {
    if (!delegatorAccount || !delegateAccount) {
      setError("Delegator or delegate account not found");
      return;
    }

    try {
      setIsCreating(true);
      setError(null);
      
      let delegation;
      
      if (delegationType === 'periodic') {
        delegation = prepareRidePeriodicDelegation(
          delegatorAccount,
          delegateAccount.address as Address,
          tokenAddress as Address,
          amount,
          parseInt(periodDuration, 10)
        );
      } else if (delegationType === 'streaming') {
        delegation = prepareRideStreamingDelegation(
          delegatorAccount,
          delegateAccount.address as Address,
          tokenAddress as Address,
          amountPerSecond,
          initialAmount,
          maxAmount
        );
      } else {
        delegation = prepareRideFixedAmountDelegation(
          delegatorAccount,
          delegateAccount.address as Address,
          tokenAddress as Address,
          amount
        );
      }
      
      const signature = await delegatorAccount.signDelegation({
        delegation,
      });

      const signedDelegation = {
        ...delegation,
        signature,
      };

      console.log("Ride payment delegation created:", signedDelegation);
      storeDelegation(signedDelegation);
      changeStep(5);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error creating delegation";
      setError(errorMessage);
      console.error("Error creating delegation:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Configure Ride Payment Delegation</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/30 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Delegation Type</label>
        <div className="flex gap-2">
          <button
            className={`px-3 py-2 rounded-md flex-1 ${
              delegationType === 'periodic' 
                ? 'bg-purple-700 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setDelegationType('periodic')}
          >
            Daily Limit
          </button>
          <button
            className={`px-3 py-2 rounded-md flex-1 ${
              delegationType === 'streaming' 
                ? 'bg-purple-700 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setDelegationType('streaming')}
          >
            Streaming
          </button>
          <button
            className={`px-3 py-2 rounded-md flex-1 ${
              delegationType === 'fixed' 
                ? 'bg-purple-700 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setDelegationType('fixed')}
          >
            Fixed Amount
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Token Address (USDC or other ERC-20)
        </label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
        />
      </div>
      
      {delegationType === 'periodic' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Amount Per Period (tokens)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            />
            <p className="mt-1 text-xs text-gray-400">Maximum tokens allowed per period (e.g., 10 USDC per day)</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Period Duration (seconds)
            </label>
            <input
              type="text"
              value={periodDuration}
              onChange={(e) => setPeriodDuration(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            />
            <p className="mt-1 text-xs text-gray-400">86400 = 1 day, 604800 = 1 week</p>
          </div>
        </>
      )}
      
      {delegationType === 'streaming' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Amount Per Second (tokens)
            </label>
            <input
              type="text"
              value={amountPerSecond}
              onChange={(e) => setAmountPerSecond(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            />
            <p className="mt-1 text-xs text-gray-400">Rate at which tokens accrue (e.g., 0.0001 USDC per second)</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Initial Amount (tokens)
            </label>
            <input
              type="text"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            />
            <p className="mt-1 text-xs text-gray-400">Amount available immediately when delegation starts</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Max Amount (tokens)
            </label>
            <input
              type="text"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            />
            <p className="mt-1 text-xs text-gray-400">Maximum total amount that can be spent</p>
          </div>
        </>
      )}
      
      {delegationType === 'fixed' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Maximum Amount (tokens)
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
          />
          <p className="mt-1 text-xs text-gray-400">Total tokens allowed for all rides (no time restrictions)</p>
        </div>
      )}
      
      <div className="mt-6">
        <Button onClick={handleCreateDelegation} disabled={isCreating} className="w-full">
          {isCreating ? "Creating Delegation..." : "Create Ride Payment Delegation"}
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <p>
          {delegationType === 'periodic' && "Creates a daily allowance for ride payments that automatically resets each period."}
          {delegationType === 'streaming' && "Creates a continuous accrual of spending allowance over time."}
          {delegationType === 'fixed' && "Creates a one-time maximum spending allowance for rides."}
        </p>
      </div>
    </div>
  );
}
