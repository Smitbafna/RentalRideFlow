import { ScopeType } from "@/hooks/useSpendingLimits";
import {
  Keyword,
  Variable,
  Method,
  Property,
  StringLiteral,
  CodeBlock,
  NumberLiteral,
} from "@/components/CodeBlock";
import React from "react";

// Define the CodeLine interface to match the one in CodeBlock.tsx
interface CodeLine {
  prefix: "$" | ">";
  content: React.ReactNode;
}

interface SpendingLimitCodeBlockProps {
  scopeType: ScopeType;
  tokenAddress?: string;
  tokenId?: string;
  maxAmount?: string;
  periodAmount?: string;
  periodDuration?: string;
  amountPerSecond?: string;
  initialAmount?: string;
}

export default function SpendingLimitCodeBlock({
  scopeType,
  tokenAddress = "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  tokenId = "1",
  maxAmount = "0.01",
  periodAmount = "0.01",
  periodDuration = "86400",
  amountPerSecond = "0.0001",
  initialAmount = "0.01",
}: SpendingLimitCodeBlockProps) {
  // Determine which code example to show based on scopeType
  const renderCodeExample = (): CodeLine[] => {
    switch (scopeType) {
      case "nativeTokenTransferAmount":
        return nativeTokenTransferCode(maxAmount);
      case "nativeTokenPeriodTransfer":
        return nativeTokenPeriodCode(periodAmount, periodDuration);
      case "nativeTokenStreaming":
        return nativeTokenStreamingCode(amountPerSecond, initialAmount, maxAmount);
      case "erc20TransferAmount":
        return erc20TransferCode(tokenAddress, maxAmount);
      case "erc20PeriodTransfer":
        return erc20PeriodCode(tokenAddress, periodAmount, periodDuration);
      case "erc20Streaming":
        return erc20StreamingCode(tokenAddress, amountPerSecond, initialAmount, maxAmount);
      case "erc721Transfer":
        return erc721TransferCode(tokenAddress, tokenId);
      default:
        return nativeTokenTransferCode(maxAmount);
    }
  };

  return <CodeBlock lines={renderCodeExample()} />;
}

// Native token transfer amount code
function nativeTokenTransferCode(maxAmount: string): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create native token fixed amount delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"nativeTokenTransferAmount"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>maxAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(maxAmount)}n`}</NumberLiteral>, {"// "}{maxAmount} ETH
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// Native token period transfer code
function nativeTokenPeriodCode(periodAmount: string, periodDuration: string): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create native token periodic delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"nativeTokenPeriodTransfer"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>periodAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(periodAmount)}n`}</NumberLiteral>, {"// "}{periodAmount} ETH per period
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>periodDuration</Property>:{" "}
          <NumberLiteral>{periodDuration}</NumberLiteral>, {"// "} in seconds
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>startDate</Property>:{" "}
          <Method>Math.floor</Method>(<Method>Date.now</Method>() / <NumberLiteral>1000</NumberLiteral>),
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// Native token streaming code
function nativeTokenStreamingCode(
  amountPerSecond: string, 
  initialAmount: string, 
  maxAmount: string
): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create native token streaming delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"nativeTokenStreaming"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>amountPerSecond</Property>:{" "}
          <NumberLiteral>{`${parseEther(amountPerSecond)}n`}</NumberLiteral>, {"// "}{amountPerSecond} ETH per second
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>initialAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(initialAmount)}n`}</NumberLiteral>, {"// "}{initialAmount} ETH initially available
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>maxAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(maxAmount)}n`}</NumberLiteral>, {"// "}{maxAmount} ETH max
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>startTime</Property>:{" "}
          <Method>Math.floor</Method>(<Method>Date.now</Method>() / <NumberLiteral>1000</NumberLiteral>),
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// ERC-20 transfer amount code
function erc20TransferCode(tokenAddress: string, maxAmount: string): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create ERC-20 fixed amount delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"erc20TransferAmount"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>tokenAddress</Property>:{" "}
          <StringLiteral>"{tokenAddress}"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>maxAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(maxAmount)}n`}</NumberLiteral>, {"// "}{maxAmount} tokens
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// ERC-20 period transfer code
function erc20PeriodCode(
  tokenAddress: string, 
  periodAmount: string, 
  periodDuration: string
): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create ERC-20 periodic delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"erc20PeriodTransfer"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>tokenAddress</Property>:{" "}
          <StringLiteral>"{tokenAddress}"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>periodAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(periodAmount)}n`}</NumberLiteral>, {"// "}{periodAmount} tokens per period
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>periodDuration</Property>:{" "}
          <NumberLiteral>{periodDuration}</NumberLiteral>, {"// "} in seconds
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>startDate</Property>:{" "}
          <Method>Math.floor</Method>(<Method>Date.now</Method>() / <NumberLiteral>1000</NumberLiteral>),
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// ERC-20 streaming code
function erc20StreamingCode(
  tokenAddress: string, 
  amountPerSecond: string, 
  initialAmount: string, 
  maxAmount: string
): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create ERC-20 streaming delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"erc20Streaming"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>tokenAddress</Property>:{" "}
          <StringLiteral>"{tokenAddress}"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>amountPerSecond</Property>:{" "}
          <NumberLiteral>{`${parseEther(amountPerSecond)}n`}</NumberLiteral>, {"// "}{amountPerSecond} tokens per second
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>initialAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(initialAmount)}n`}</NumberLiteral>, {"// "}{initialAmount} tokens initially available
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>maxAmount</Property>:{" "}
          <NumberLiteral>{`${parseEther(maxAmount)}n`}</NumberLiteral>, {"// "}{maxAmount} tokens max
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>startTime</Property>:{" "}
          <Method>Math.floor</Method>(<Method>Date.now</Method>() / <NumberLiteral>1000</NumberLiteral>),
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

// ERC-721 transfer code
function erc721TransferCode(tokenAddress: string, tokenId: string): CodeLine[] {
  return [
    {
      prefix: "$" as const,
      content: "// Create ERC-721 (NFT) delegation",
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>import</Keyword> {"{"}{"createDelegation"}{"}"}{"from"}{" "}
          <StringLiteral>{"@metamask/delegation-toolkit"}</StringLiteral>;
        </>
      ),
    },
    {
      prefix: ">",
      content: <br />,
    },
    {
      prefix: ">",
      content: (
        <>
          <Keyword>const</Keyword> <Variable>delegation</Variable> ={" "}
          <Method>createDelegation</Method>({"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>scope</Property>: {"{"}
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>type</Property>:{" "}
          <StringLiteral>"erc721Transfer"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>tokenAddress</Property>:{" "}
          <StringLiteral>"{tokenAddress}"</StringLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"    "}<Property>tokenId</Property>:{" "}
          <NumberLiteral>{tokenId}n</NumberLiteral>,
        </>
      ),
    },
    {
      prefix: ">",
      content: "  },",
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>to</Property>: <Variable>delegateAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>from</Property>: <Variable>delegatorAccount</Variable>,
        </>
      ),
    },
    {
      prefix: ">",
      content: (
        <>
          {"  "}<Property>environment</Property>: <Variable>delegatorAccount</Variable>.environment,
        </>
      ),
    },
    {
      prefix: ">",
      content: "});",
    },
  ];
}

function parseEther(amount: string): string {
  // Simple utility to simulate parseEther functionality for display purposes
  try {
    const num = parseFloat(amount);
    if (isNaN(num)) return "1000000000000000000"; // Default to 1 ETH in wei
    const wei = Math.floor(num * 1e18);
    return wei.toString();
  } catch (e) {
    return "1000000000000000000"; // Default to 1 ETH in wei
  }
}
