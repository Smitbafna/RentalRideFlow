import {
  Keyword,
  Variable,
  Method,
  Property,
  StringLiteral,
  CodeBlock,
} from "@/components/CodeBlock";

export default function CreateHybridAccountCodeBlock() {
  const lines = [
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
          <Keyword>import</Keyword> {"{"}{"privateKeyToAccount, generatePrivateKey"}{"}"}{"from"}{" "}
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
          <Keyword>const</Keyword> <Variable>privateKey</Variable> = <Method>generatePrivateKey</Method>();
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
  ];
  
  return <CodeBlock lines={lines} />;
}
