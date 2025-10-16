"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { usePimlicoServices } from "@/hooks/usePimlicoServices";
import { Delegation, prepareRedeemDelegationData } from "@/utils/delegationUtils";
import { Address } from "viem";
import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";

interface RidePaymentExecutorProps {
  delegationId: string;
  delegation: any;
  amount: string;
  recipientAddress: Address;
  onExecuted: () => void;
}

export default function RidePaymentExecutor({
  delegationId,
  delegation,
  amount,
  recipientAddress,
  onExecuted
}: RidePaymentExecutorProps) {
  const { smartAccount } = useDelegateSmartAccount();
  const { bundlerClient, paymasterClient } = usePimlicoServices();
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const executePayment = async () => {
    if (!smartAccount || !delegation) {
      setError("Smart account or delegation not available");
      return;
    }
    
    try {
      setIsExecuting(true);
      setError(null);
      
      // Prepare data to execute the delegation 
      // In a real implementation, this would construct a proper
      // user operation to transfer tokens using the delegation
      const data = prepareRedeemDelegationData(delegation);
      
      // Get gas price
      const { bundlerClient: bundler, pimlicoClient } = usePimlicoServices();
      const { fast: fee } = await pimlicoClient!.getUserOperationGasPrice();
      
      // Execute the user operation
      const userOpHash = await bundlerClient!.sendUserOperation({
        account: smartAccount,
        calls: [
          {
            to: recipientAddress,
            data,
          }
        ],
        paymaster: paymasterClient,
        ...fee,
      });
      
      // Wait for the user operation receipt
      const { receipt } = await bundlerClient!.waitForUserOperationReceipt({
        hash: userOpHash,
      });
      
      setTxHash(receipt.transactionHash);
      onExecuted();
      console.log("Payment executed successfully:", receipt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error executing payment";
      setError(errorMessage);
      console.error("Error executing payment:", err);
    } finally {
      setIsExecuting(false);
    }
  };
  
  if (txHash) {
    return (
      <div className="p-4 bg-gray-800 rounded">
        <h3 className="font-medium mb-2">Payment Executed!</h3>
        <p className="text-green-400 mb-2">Transaction successfully executed</p>
        <p className="text-sm text-gray-400 break-all">
          Transaction Hash: {txHash}
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-gray-800 rounded">
      <h3 className="font-medium mb-2">Execute On-Chain Payment</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/30 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}
      
      <p className="text-sm text-gray-300 mb-4">
        This will execute an actual blockchain transaction using your delegation.
        The payment will be sent to the specified recipient using the delegate account.
      </p>
      
      <Button
        onClick={executePayment}
        disabled={isExecuting}
        className="w-full"
      >
        {isExecuting ? "Executing Payment..." : "Execute Payment"}
      </Button>
    </div>
  );
}
