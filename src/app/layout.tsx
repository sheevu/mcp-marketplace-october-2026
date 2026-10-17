import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sudarshan MCP Hub — The MCP Marketplace for AI-Powered Future",
  description:
    "Discover, connect, and build production-ready Model Context Protocol (MCP) integrations for Cursor, Claude Desktop, VS Code, and Indian enterprises. Powered by Sudarshan AI Labs.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "Cursor MCP",
    "Claude Desktop MCP",
    "VS Code MCP",
    "Indian Business Automation",
    "WhatsApp MCP",
    "GST MCP",
    "Sudarshan AI Labs",
  ],
  authors: [{ name: "Sudarshan AI Labs" }],
  openGraph: {
    title: "Sudarshan MCP Hub — Discover, Connect & Build MCP Integrations",
    description:
      "India's premier marketplace for Model Context Protocol (MCP) servers, tools, and bespoke enterprise AI agents.",
    url: "https://mcp.sudarshan.ai",
    siteName: "Sudarshan MCP Hub",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#05070f] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
