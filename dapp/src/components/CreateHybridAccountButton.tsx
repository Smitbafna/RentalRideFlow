"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useSpendingLimits } from "@/hooks/useSpendingLimits";
import { CodeBlock } from "@/components/CodeBlock";
import { Keyword, Method, Property, StringLiteral, Variable } from "@/components/CodeBlock";

export default function CreateHybridAccountButton() {
  const { createHybridSmartAccount, isCreatingAccount, error } = useSpendingLimits();
  const [result, setResult] = useState<{
    smartAccountAddress: string;
    signerAddress: string;
    privateKey: string;
  } | null>(null);
  const [isCreated, setIsCreated] = useState(false);

  const handleCreateAccount = async () => {
    const accountData = await createHybridSmartAccount();
    
    if (accountData) {
      setResult({
        smartAccountAddress: accountData.smartAccount.address,
        signerAddress: accountData.account.address,
        privateKey: accountData.privateKey,
      });
      setIsCreated(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Hybrid Smart Account</h2>
      <p className="text-gray-300 mb-2">
        Create a Hybrid smart account that supports both an EOA owner and passkey signers
      </p>
      
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-600 rounded-md text-red-200">
          {error}
        </div>
      )}
      
      <Button 
        onClick={handleCreateAccount} 
        disabled={isCreatingAccount}
        className="w-full max-w-xs"
      >
        {isCreatingAccount ? "Creating..." : "Create Account"}
      </Button>
      
      {isCreated && result && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Account Created!</h3>
          
          <div className="mb-2">
            <span className="text-gray-400 text-sm">Smart Account Address:</span>
            <p className="font-mono bg-gray-900 p-1 rounded">{result.smartAccountAddress}</p>
          </div>
          
          <div className="mb-2">
            <span className="text-gray-400 text-sm">Signer Address:</span>
            <p className="font-mono bg-gray-900 p-1 rounded">{result.signerAddress}</p>
          </div>
          
          <div className="mb-4">
            <span className="text-gray-400 text-sm">Private Key:</span>
            <p className="font-mono bg-gray-900 p-1 rounded break-all">{result.privateKey}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Code Example:</h4>
            <CodeBlock lines={[
              {
                prefix: "$" as const,
                content: "// Create a Hybrid smart account with an Account signer",
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>import</Keyword> {"{"}{"createPublicClient, http"}{"}"}{"from"}{" "}
                    <StringLiteral>{"viem"}</StringLiteral>;
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>import</Keyword> {"{"}{"sepolia"}{"}"}{"from"}{" "}
                    <StringLiteral>{"viem/chains"}</StringLiteral>;
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>import</Keyword> {"{"}{"privateKeyToAccount"}{"}"}{"from"}{" "}
                    <StringLiteral>{"viem/accounts"}</StringLiteral>;
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>import</Keyword> {"{"}{"Implementation, toMetaMaskSmartAccount"}{"}"}{"from"}{" "}
                    <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: <br />,
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>const</Keyword> <Variable>publicClient</Variable> = <Method>createPublicClient</Method>({"{"}{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>transport</Property>: <Method>http</Method>(),{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>chain</Property>: <Variable>sepolia</Variable>,{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: "});",
              },
              {
                prefix: ">" as const,
                content: <br />,
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>const</Keyword> <Variable>privateKey</Variable> = <StringLiteral>"{result.privateKey}"</StringLiteral>;
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>const</Keyword> <Variable>account</Variable> = <Method>privateKeyToAccount</Method>(<Variable>privateKey</Variable>);
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: <br />,
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    <Keyword>const</Keyword> <Variable>smartAccount</Variable> = <Keyword>await</Keyword> <Method>toMetaMaskSmartAccount</Method>({"{"}{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>client</Property>: <Variable>publicClient</Variable>,{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>implementation</Property>: <Variable>Implementation</Variable>.<StringLiteral>Hybrid</StringLiteral>,{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>deployParams</Property>: [<Variable>account</Variable>.<Property>address</Property>, [], [], []],{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>deploySalt</Property>: <StringLiteral>"0x"</StringLiteral>,{" "}
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: (
                  <>
                    {"  "}<Property>signer</Property>: {"{ "}<Variable>account</Variable>{" }"},
                  </>
                ),
              },
              {
                prefix: ">" as const,
                content: "});",
              },
            ]} />
          </div>
        </div>
      )}
    </div>
  );
}
