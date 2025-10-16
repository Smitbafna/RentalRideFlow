"use client";

import { useConnect } from "wagmi";
import Button from "@/components/Button";

export default function ConnectButton({ className }: { className?: string }) {
  const { connect, connectors } = useConnect();
  const metamaskConnector = connectors.find(c => c.id === 'metaMask') || connectors[0];

  return (
    <Button 
      onClick={() => connect({ connector: metamaskConnector })}
      className={className}
    >
      Connect Wallet
    </Button>
  );
}
