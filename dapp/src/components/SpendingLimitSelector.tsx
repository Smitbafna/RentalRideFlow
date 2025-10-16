"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Button from "@/components/Button";
import { ScopeType, useSpendingLimits } from "@/hooks/useSpendingLimits";
import { Address, parseEther } from "viem";
import { useStepContext } from "@/hooks/useStepContext";

interface SpendingLimitSelectorProps {
  onConfigChange?: (config: {
    scopeType: ScopeType;
    tokenAddress?: string;
    tokenId?: string;
    maxAmount?: string;
    periodAmount?: string;
    periodDuration?: string;
    amountPerSecond?: string;
    initialAmount?: string;
  }) => void;
}

export default function SpendingLimitSelector({ onConfigChange }: SpendingLimitSelectorProps) {
  const { createDelegation, isCreating, error } = useSpendingLimits();
  const { changeStep } = useStepContext();
  const [scopeType, setScopeType] = useState<ScopeType>("nativeTokenTransferAmount");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("0.01");
  const [periodAmount, setPeriodAmount] = useState<string>("0.01");
  const [periodDuration, setPeriodDuration] = useState<string>("86400");
  const [amountPerSecond, setAmountPerSecond] = useState<string>("0.0001");
  const [initialAmount, setInitialAmount] = useState<string>("0.01");
  
  const handleScopeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setScopeType(e.target.value as ScopeType);
  };
  
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange({
        scopeType,
        tokenAddress,
        tokenId,
        maxAmount,
        periodAmount,
        periodDuration,
        amountPerSecond,
        initialAmount
      });
    }
  }, [
    scopeType, 
    tokenAddress, 
    tokenId, 
    maxAmount, 
    periodAmount, 
    periodDuration, 
    amountPerSecond, 
    initialAmount,
    onConfigChange
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const config = {
      scopeType,
      ...(tokenAddress && { tokenAddress: tokenAddress as Address }),
      ...(tokenId && { tokenId: BigInt(tokenId) }),
      ...(maxAmount && { maxAmount: parseEther(maxAmount) }),
      ...(periodAmount && { periodAmount: parseEther(periodAmount) }),
      ...(periodDuration && { periodDuration: parseInt(periodDuration, 10) }),
      ...(amountPerSecond && { amountPerSecond: parseEther(amountPerSecond) }),
      ...(initialAmount && { initialAmount: parseEther(initialAmount) }),
    };
    
    const signedDelegation = await createDelegation(config);
    if (signedDelegation) {
      changeStep(5);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Create Spending Limit Delegation</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/30 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Scope Type
          </label>
          <select
            value={scopeType}
            onChange={handleScopeChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="nativeTokenTransferAmount">Native Token Transfer (Fixed Amount)</option>
            <option value="nativeTokenPeriodTransfer">Native Token Transfer (Periodic)</option>
            <option value="nativeTokenStreaming">Native Token Transfer (Streaming)</option>
            <option value="erc20TransferAmount">ERC-20 Transfer (Fixed Amount)</option>
            <option value="erc20PeriodTransfer">ERC-20 Transfer (Periodic)</option>
            <option value="erc20Streaming">ERC-20 Transfer (Streaming)</option>
            <option value="erc721Transfer">ERC-721 Transfer (NFT)</option>
          </select>
        </div>

        {/* Token Address Field (for ERC-20 and ERC-721) */}
        {(scopeType.startsWith("erc20") || scopeType === "erc721Transfer") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Token Address
            </label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
        )}

        {/* Token ID Field (for ERC-721) */}
        {scopeType === "erc721Transfer" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Token ID
            </label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="1"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              required
            />
          </div>
        )}

        {/* Max Amount Field */}
        {(scopeType === "nativeTokenTransferAmount" || 
          scopeType === "erc20TransferAmount" || 
          scopeType === "nativeTokenStreaming" || 
          scopeType === "erc20Streaming") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Max Amount
            </label>
            <input
              type="text"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder={scopeType.startsWith("erc20") ? "10" : "0.01"}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        )}

        {/* Period Amount Field */}
        {(scopeType === "nativeTokenPeriodTransfer" || 
          scopeType === "erc20PeriodTransfer") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Period Amount
            </label>
            <input
              type="text"
              value={periodAmount}
              onChange={(e) => setPeriodAmount(e.target.value)}
              placeholder={scopeType.startsWith("erc20") ? "10" : "0.01"}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        )}

        {/* Period Duration Field */}
        {(scopeType === "nativeTokenPeriodTransfer" || 
          scopeType === "erc20PeriodTransfer") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Period Duration (seconds)
            </label>
            <input
              type="text"
              value={periodDuration}
              onChange={(e) => setPeriodDuration(e.target.value)}
              placeholder="86400"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <p className="text-xs text-gray-400 mt-1">86400 seconds = 1 day</p>
          </div>
        )}

        {/* Amount Per Second Field */}
        {(scopeType === "nativeTokenStreaming" || 
          scopeType === "erc20Streaming") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Amount Per Second
            </label>
            <input
              type="text"
              value={amountPerSecond}
              onChange={(e) => setAmountPerSecond(e.target.value)}
              placeholder={scopeType.startsWith("erc20") ? "0.1" : "0.0001"}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        )}

        {/* Initial Amount Field */}
        {(scopeType === "nativeTokenStreaming" || 
          scopeType === "erc20Streaming") && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Initial Amount
            </label>
            <input
              type="text"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              placeholder={scopeType.startsWith("erc20") ? "1" : "0.01"}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        )}

        <div className="mt-6">
          <Button 
            type="submit" 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? "Creating Delegation..." : "Create Delegation"}
          </Button>
        </div>
      </form>
    </div>
  );
}
