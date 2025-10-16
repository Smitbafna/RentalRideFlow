import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/AppProvider";
import { StepProvider } from "@/providers/StepProvider";
import { GatorProvider } from "@/providers/GatorProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalRideFlow - Automated On-Chain Ride Payments",
  description: "Pay As You Go, On-Chain - Automated crypto payments for rides powered by MetaMask Delegation Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:text-white">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-[#1E2329] text-white font-sans antialiased max-w-full overflow-x-hidden`}
      >
        <AppProvider>
          <StepProvider>
            <GatorProvider>{children}</GatorProvider>
          </StepProvider>
        </AppProvider>
      </body>
    </html>
  );
}
