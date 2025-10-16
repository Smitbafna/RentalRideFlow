import {
  createDelegation,
  createExecution,
  Delegation,
  MetaMaskSmartAccount,
  ExecutionMode,
} from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { Address, Hex, parseEther, zeroAddress } from "viem";

// USDC token address - replace with actual token address for your network
const DEFAULT_ERC20_TOKEN = "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da";

/**
 * Create an ERC-20 periodic scope delegation for ride payments
 * This allows for per-period (e.g., daily) spending limits that reset automatically
 */
export function prepareRidePeriodicDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address = DEFAULT_ERC20_TOKEN,
  amountPerPeriod: string = "10", // Amount of tokens per period (e.g., 10 USDC per day)
  periodDuration: number = 86400, // Default period: 1 day in seconds
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20PeriodTransfer",
      tokenAddress,
      periodAmount: parseEther(amountPerPeriod),
      periodDuration,
      startDate: Math.floor(Date.now() / 1000), // Start now
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Create an ERC-20 streaming scope delegation for ride payments
 * This allows for continuous accumulation of spending allowance over time
 */
export function prepareRideStreamingDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address = DEFAULT_ERC20_TOKEN,
  amountPerSecond: string = "0.0001", // Rate of token accrual (e.g., 0.0001 USDC per second)
  initialAmount: string = "1", // Initial amount available (e.g., 1 USDC)
  maxAmount: string = "100", // Maximum allowance (e.g., 100 USDC)
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20Streaming",
      tokenAddress,
      amountPerSecond: parseEther(amountPerSecond),
      initialAmount: parseEther(initialAmount),
      maxAmount: parseEther(maxAmount),
      startTime: Math.floor(Date.now() / 1000), // Start now
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Create a fixed-amount ERC-20 delegation for ride payments
 * This is a simple one-time allowance with no time-based constraints
 */
export function prepareRideFixedAmountDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address = DEFAULT_ERC20_TOKEN,
  maxAmount: string = "50", // Maximum tokens allowed (e.g., 50 USDC)
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20TransferAmount",
      tokenAddress,
      maxAmount: parseEther(maxAmount),
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

// Original implementation - kept for backward compatibility
export function prepareRootDelegation(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
): Delegation {
  return createDelegation({
    scope: {
      type: "nativeTokenTransferAmount",
      maxAmount: parseEther("0.001"),
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Prepare data for executing a delegation to make a payment
 * This generates the calldata for redeeming the delegation
 */
export function prepareRedeemDelegationData(delegation: Delegation): Hex {
  const execution = createExecution({ 
    target: 'tokenAddress' in delegation.scope ? 
      delegation.scope.tokenAddress as Address : 
      zeroAddress 
  });
  
  const data = DelegationManager.encode.redeemDelegations({
    delegations: [[delegation]],
    modes: [ExecutionMode.SingleDefault],
    executions: [[execution]],
  });

  return data;
}
