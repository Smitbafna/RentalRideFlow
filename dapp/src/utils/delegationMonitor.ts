import { 
  Delegation, 
  DelegationStatus 
} from "@metamask/delegation-toolkit";
import { Address } from "viem";

/**
 * Simulates tracking delegation usage and monitoring for the ride payment system
 * In a production environment, this would connect to a real indexer service
 */
export interface DelegationUsage {
  delegationId: string;
  delegator: Address;
  delegate: Address;
  tokenAddress: Address;
  scopeType: string;
  totalSpent: bigint;
  remainingAllowance: bigint;
  periodResetTime?: number;
  lastUpdated: number;
  status: DelegationStatus;
}

// In-memory storage for demonstration
const delegationUsageStore = new Map<string, DelegationUsage>();

/**
 * Get a unique identifier for a delegation
 */
function getDelegationId(delegation: Delegation): string {
  return `${delegation.from}-${delegation.to}-${JSON.stringify(delegation.scope)}`;
}

/**
 * Initialize tracking for a delegation
 */
export function trackDelegation(
  delegation: Delegation,
  initialRemainingAllowance: bigint
): DelegationUsage {
  const delegationId = getDelegationId(delegation);
  const scopeType = delegation.scope.type;
  
  // Extract token address from scope if it exists
  const tokenAddress = 'tokenAddress' in delegation.scope 
    ? delegation.scope.tokenAddress as Address 
    : '0x0000000000000000000000000000000000000000' as Address;
  
  // Calculate period reset time for periodic delegations
  const periodResetTime = scopeType.includes('Period') && 'startDate' in delegation.scope && 'periodDuration' in delegation.scope
    ? (delegation.scope.startDate as number) + (delegation.scope.periodDuration as number)
    : undefined;
  
  const usage: DelegationUsage = {
    delegationId,
    delegator: delegation.from as Address,
    delegate: delegation.to as Address,
    tokenAddress,
    scopeType,
    totalSpent: 0n,
    remainingAllowance: initialRemainingAllowance,
    periodResetTime,
    lastUpdated: Math.floor(Date.now() / 1000),
    status: DelegationStatus.ACTIVE
  };
  
  delegationUsageStore.set(delegationId, usage);
  return usage;
}

/**
 * Record a payment made through this delegation
 */
export function recordDelegationPayment(
  delegationId: string,
  amount: bigint
): DelegationUsage | null {
  const usage = delegationUsageStore.get(delegationId);
  if (!usage) return null;
  
  // Update usage tracking
  const updatedUsage = {
    ...usage,
    totalSpent: usage.totalSpent + amount,
    remainingAllowance: usage.remainingAllowance - amount,
    lastUpdated: Math.floor(Date.now() / 1000)
  };
  
  // Check if we need to reset the period
  if (updatedUsage.periodResetTime && updatedUsage.periodResetTime < updatedUsage.lastUpdated) {
    // Calculate new period reset time
    const periodDuration = updatedUsage.scopeType.includes('Period') ? 
      parseInt(updatedUsage.delegationId.split('periodDuration":')[1].split(',')[0], 10) : 86400;
    
    updatedUsage.periodResetTime = updatedUsage.lastUpdated + periodDuration;
    
    // Reset the remaining allowance for new period
    const maxAmount = updatedUsage.scopeType.includes('Period') ?
      BigInt(updatedUsage.delegationId.split('periodAmount":')[1].split(',')[0]) : updatedUsage.totalSpent + updatedUsage.remainingAllowance;
    
    updatedUsage.remainingAllowance = maxAmount;
    updatedUsage.totalSpent = 0n;
  }
  
  // Update the status if needed
  if (updatedUsage.remainingAllowance <= 0n) {
    updatedUsage.status = DelegationStatus.EXHAUSTED;
  }
  
  delegationUsageStore.set(delegationId, updatedUsage);
  return updatedUsage;
}

/**
 * Get current usage information for a delegation
 */
export function getDelegationUsage(delegationId: string): DelegationUsage | null {
  return delegationUsageStore.get(delegationId) || null;
}

/**
 * Get all delegations for a specific delegator
 */
export function getDelegatorUsage(delegator: Address): DelegationUsage[] {
  return Array.from(delegationUsageStore.values())
    .filter(usage => usage.delegator === delegator);
}

/**
 * Get all delegations for a specific delegate
 */
export function getDelegateUsage(delegate: Address): DelegationUsage[] {
  return Array.from(delegationUsageStore.values())
    .filter(usage => usage.delegate === delegate);
}

/**
 * Revoke a delegation
 */
export function revokeDelegation(delegationId: string): boolean {
  const usage = delegationUsageStore.get(delegationId);
  if (!usage) return false;
  
  usage.status = DelegationStatus.REVOKED;
  delegationUsageStore.set(delegationId, usage);
  return true;
}

/**
 * Check if a delegation is still active and has sufficient allowance
 */
export function canExecutePayment(delegationId: string, amount: bigint): boolean {
  const usage = delegationUsageStore.get(delegationId);
  if (!usage) return false;
  
  // Check if delegation is active
  if (usage.status !== DelegationStatus.ACTIVE) return false;
  
  // Check for period reset if applicable
  if (usage.periodResetTime && usage.periodResetTime < Math.floor(Date.now() / 1000)) {
    // Would reset the period and allowance in a real implementation
    return true;
  }
  
  // Check remaining allowance
  return usage.remainingAllowance >= amount;
}
