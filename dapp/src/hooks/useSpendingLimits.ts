import { useState, useCallback } from "react";
import { Address, parseEther, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useStorageClient from "@/hooks/useStorageClient";
import { 
  MetaMaskSmartAccount, 
  Delegation, 
  Implementation,
  toMetaMaskSmartAccount 
} from "@metamask/delegation-toolkit";
import * as spendingScopes from "@/utils/spendingLimitScopes";

export type ScopeType = 
  | "nativeTokenTransferAmount" 
  | "nativeTokenPeriodTransfer"
  | "nativeTokenStreaming"
  | "erc20TransferAmount"
  | "erc20PeriodTransfer"
  | "erc20Streaming"
  | "erc721Transfer";

export interface DelegationConfig {
  scopeType: ScopeType;
  tokenAddress?: Address;
  tokenId?: bigint;
  maxAmount?: bigint;
  periodAmount?: bigint;
  periodDuration?: number;
  amountPerSecond?: bigint;
  initialAmount?: bigint;
}

export function useSpendingLimits() {
  const { smartAccount: delegator } = useDelegatorSmartAccount();
  const { smartAccount: delegate } = useDelegateSmartAccount();
  const { storeDelegation } = useStorageClient();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSmartAccount, setNewSmartAccount] = useState<MetaMaskSmartAccount | null>(null);

  const createDelegation = useCallback(async (config: DelegationConfig) => {
    if (!delegator || !delegate) {
      setError("Delegator or delegate account not found");
      return null;
    }

    setIsCreating(true);
    setError(null);
    
    try {
      let delegation: Delegation;

      switch (config.scopeType) {
        case "nativeTokenTransferAmount":
          delegation = spendingScopes.createNativeTokenTransferScope(
            delegator,
            delegate.address,
            config.maxAmount || parseEther("0.01")
          );
          break;
        
        case "nativeTokenPeriodTransfer":
          delegation = spendingScopes.createNativeTokenPeriodScope(
            delegator,
            delegate.address,
            config.periodAmount || parseEther("0.01"),
            config.periodDuration || 86400
          );
          break;
        
        case "nativeTokenStreaming":
          delegation = spendingScopes.createNativeTokenStreamingScope(
            delegator,
            delegate.address,
            config.amountPerSecond || parseEther("0.0001"),
            config.initialAmount || parseEther("0.01"),
            config.maxAmount || parseEther("0.1")
          );
          break;
        
        case "erc20TransferAmount":
          if (!config.tokenAddress) {
            throw new Error("Token address is required for ERC-20 scopes");
          }
          delegation = spendingScopes.createErc20TransferScope(
            delegator,
            delegate.address,
            config.tokenAddress,
            config.maxAmount || parseEther("10")
          );
          break;
        
        case "erc20PeriodTransfer":
          if (!config.tokenAddress) {
            throw new Error("Token address is required for ERC-20 scopes");
          }
          delegation = spendingScopes.createErc20PeriodScope(
            delegator,
            delegate.address,
            config.tokenAddress,
            config.periodAmount || parseEther("10"),
            config.periodDuration || 86400
          );
          break;
        
        case "erc20Streaming":
          if (!config.tokenAddress) {
            throw new Error("Token address is required for ERC-20 scopes");
          }
          delegation = spendingScopes.createErc20StreamingScope(
            delegator,
            delegate.address,
            config.tokenAddress,
            config.amountPerSecond || 100000000n,
            config.initialAmount || parseEther("1"),
            config.maxAmount || parseEther("100")
          );
          break;
        
        case "erc721Transfer":
          if (!config.tokenAddress || config.tokenId === undefined) {
            throw new Error("Token address and token ID are required for ERC-721 scopes");
          }
          delegation = spendingScopes.createErc721TransferScope(
            delegator,
            delegate.address,
            config.tokenAddress,
            config.tokenId
          );
          break;
        
        default:
          throw new Error(`Unsupported scope type: ${config.scopeType}`);
      }

      // Sign the delegation
      const signature = await delegator.signDelegation({
        delegation,
      });

      const signedDelegation = {
        ...delegation,
        signature,
      };

      // Store the delegation
      storeDelegation(signedDelegation);
      return signedDelegation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error creating delegation";
      setError(errorMessage);
      console.error("Error creating delegation:", err);
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [delegator, delegate, storeDelegation]);

  const createHybridSmartAccount = useCallback(async (useGeneratedKey = true, existingPrivateKey?: string) => {
    try {
      setIsCreatingAccount(true);
      setError(null);
      
      // Create a public client for Sepolia
      const publicClient = createPublicClient({ 
        transport: http(), 
        chain: sepolia, 
      });
      
      // Generate a private key or use the provided one
      const privateKey = useGeneratedKey ? generatePrivateKey() : existingPrivateKey!;
      const account = privateKeyToAccount(privateKey);
      
      console.log("Creating smart account with address:", account.address);
      
      // Create a Hybrid smart account
      const smartAccount = await toMetaMaskSmartAccount({
        client: publicClient,
        implementation: Implementation.Hybrid,
        deployParams: [account.address, [], [], []],
        deploySalt: "0x",
        signer: { account },
      });
      
      console.log("Smart account created:", smartAccount.address);
      setNewSmartAccount(smartAccount);
      return { smartAccount, privateKey, account };
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error creating smart account";
      setError(errorMessage);
      console.error("Error creating smart account:", err);
      return null;
    } finally {
      setIsCreatingAccount(false);
    }
  }, []);

  return {
    createDelegation,
    createHybridSmartAccount,
    isCreating,
    isCreatingAccount,
    newSmartAccount,
    error
  };
}
