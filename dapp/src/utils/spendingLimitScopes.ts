import { 
  createDelegation,
  Delegation,
  MetaMaskSmartAccount 
} from "@metamask/delegation-toolkit";
import { Address, parseEther } from "viem";

/**
 * Creates an ERC-20 periodic transfer delegation scope
 * Allows delegate to spend a fixed amount of ERC-20 tokens within each time period
 */
export function createErc20PeriodScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address,
  dailyAmount: bigint = parseEther("10"), // Default 10 tokens
  periodDuration: number = 86400, // Default 1 day in seconds
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20PeriodTransfer",
      tokenAddress,
      periodAmount: dailyAmount,
      periodDuration,
      startDate: Math.floor(Date.now() / 1000), // Current timestamp
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates an ERC-20 streaming delegation scope
 * Allows delegate to spend ERC-20 tokens that accrue linearly over time
 */
export function createErc20StreamingScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address,
  amountPerSecond: bigint = 100000000n, // 0.1 tokens per second (assuming 18 decimals)
  initialAmount: bigint = parseEther("1"), // Initial 1 token
  maxAmount: bigint = parseEther("100"), // Max 100 tokens
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20Streaming",
      tokenAddress,
      amountPerSecond,
      initialAmount,
      maxAmount,
      startTime: Math.floor(Date.now() / 1000), // Current timestamp
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates an ERC-20 transfer amount delegation scope
 * Allows delegate to spend up to a fixed amount of ERC-20 tokens without time restrictions
 */
export function createErc20TransferScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address,
  maxAmount: bigint = parseEther("10"), // Default 10 tokens
): Delegation {
  return createDelegation({
    scope: {
      type: "erc20TransferAmount",
      tokenAddress,
      maxAmount,
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates an ERC-721 transfer delegation scope
 * Allows delegate to transfer a specific NFT
 */
export function createErc721TransferScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  tokenAddress: Address,
  tokenId: bigint,
): Delegation {
  return createDelegation({
    scope: {
      type: "erc721Transfer",
      tokenAddress,
      tokenId,
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates a native token periodic transfer delegation scope
 * Allows delegate to spend a fixed amount of native tokens within each time period
 */
export function createNativeTokenPeriodScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  dailyAmount: bigint = parseEther("0.01"), // Default 0.01 ETH
  periodDuration: number = 86400, // Default 1 day in seconds
): Delegation {
  return createDelegation({
    scope: {
      type: "nativeTokenPeriodTransfer",
      periodAmount: dailyAmount,
      periodDuration,
      startDate: Math.floor(Date.now() / 1000), // Current timestamp
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates a native token streaming delegation scope
 * Allows delegate to spend native tokens that accrue linearly over time
 */
export function createNativeTokenStreamingScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  amountPerSecond: bigint = parseEther("0.0001"), // 0.0001 ETH per second
  initialAmount: bigint = parseEther("0.01"), // Initial 0.01 ETH
  maxAmount: bigint = parseEther("0.1"), // Max 0.1 ETH
): Delegation {
  return createDelegation({
    scope: {
      type: "nativeTokenStreaming",
      amountPerSecond,
      initialAmount,
      maxAmount,
      startTime: Math.floor(Date.now() / 1000), // Current timestamp
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}

/**
 * Creates a native token transfer amount delegation scope
 * Allows delegate to spend up to a fixed amount of native tokens without time restrictions
 */
export function createNativeTokenTransferScope(
  delegator: MetaMaskSmartAccount,
  delegate: Address,
  maxAmount: bigint = parseEther("0.01"), // Default 0.01 ETH
): Delegation {
  return createDelegation({
    scope: {
      type: "nativeTokenTransferAmount",
      maxAmount,
    },
    to: delegate,
    from: delegator.address,
    environment: delegator.environment,
  });
}
