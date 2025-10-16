"use client";

import React, { useState } from "react";
import SpendingLimitSelector from "./SpendingLimitSelector";
import SpendingLimitCodeBlock from "./SpendingLimitCodeBlock";
import { ScopeType } from "@/hooks/useSpendingLimits";

export default function SpendingLimitDemoSection() {
  const [scopeType, setScopeType] = useState<ScopeType>("nativeTokenTransferAmount");
  const [tokenAddress, setTokenAddress] = useState<string>("0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92");
  const [tokenId, setTokenId] = useState<string>("1");
  const [maxAmount, setMaxAmount] = useState<string>("0.01");
  const [periodAmount, setPeriodAmount] = useState<string>("0.01");
  const [periodDuration, setPeriodDuration] = useState<string>("86400");
  const [amountPerSecond, setAmountPerSecond] = useState<string>("0.0001");
  const [initialAmount, setInitialAmount] = useState<string>("0.01");

  const handleConfigChange = (config: any) => {
    if (config.scopeType) setScopeType(config.scopeType);
    if (config.tokenAddress) setTokenAddress(config.tokenAddress);
    if (config.tokenId) setTokenId(config.tokenId);
    if (config.maxAmount) setMaxAmount(config.maxAmount);
    if (config.periodAmount) setPeriodAmount(config.periodAmount);
    if (config.periodDuration) setPeriodDuration(config.periodDuration);
    if (config.amountPerSecond) setAmountPerSecond(config.amountPerSecond);
    if (config.initialAmount) setInitialAmount(config.initialAmount);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Spending Limit Scopes</h1>
      <p className="text-gray-300">
        Configure different types of spending limit scopes to control how delegates can spend tokens on behalf of the delegator.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SpendingLimitSelector onConfigChange={handleConfigChange} />
        </div>
        <div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Code Example</h3>
            <SpendingLimitCodeBlock
              scopeType={scopeType}
              tokenAddress={tokenAddress}
              tokenId={tokenId}
              maxAmount={maxAmount}
              periodAmount={periodAmount}
              periodDuration={periodDuration}
              amountPerSecond={amountPerSecond}
              initialAmount={initialAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
