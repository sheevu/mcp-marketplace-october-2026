"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MCP_SERVERS_CATALOG, CATEGORIES } from "@/data/mcpCatalog";
import { McpServer } from "@/types/mcp";
import { McpCard } from "@/components/McpCard";
import { ComicMcpCard } from "@/components/ComicMcpCard";
import { McpNetworkVisualizer } from "@/components/McpNetworkVisualizer";
import { InstallModal } from "@/components/InstallModal";
import { formatInr } from "@/lib/utils";
import {
  Search,
  Sparkles,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
  Lock,
  Globe2,
  Users,
  Code2,
  HelpCircle,
  TrendingUp,
  FileCheck,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServerForInstall, setSelectedServerForInstall] = useState<McpServer | null>(null);

  const featuredServers = MCP_SERVERS_CATALOG.filter((s) => s.featured);
  const trendingServers = MCP_SERVERS_CATALOG.filter((s) => s.trending);
  const indianBusinessServers = MCP_SERVERS_CATALOG.filter((s) => s.isIndianBusinessSuite);

  const searchResults = searchQuery.trim()
    ? MCP_SERVERS_CATALOG.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Hero Stagger Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 24,
        stiffness: 180,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background atmospheric animated glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: ["-50%", "-48%", "-50%"],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 w-full max-w-7xl h-[650px] bg-radial-gradient pointer-events-none -z-10 blur-2xl"
      />

      {/* Floating secondary ambient light orbs */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none -z-10"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-40 right-10 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -z-10"
      />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative floating badges (Desktop) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:flex absolute top-28 left-6 items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-violet-500/30 text-[11px] font-mono text-violet-300 shadow-xl backdrop-blur-md pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>⚡ Anthropic MCP v1.0</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden xl:flex absolute top-48 right-6 items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-xl backdrop-blur-md pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>🔒 Stdio Sandboxed</span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          {/* Pill Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/30 shadow-lg shadow-violet-500/10 hover:border-violet-500/50 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>Discover. Connect. Automate. Build.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-zinc-300">India&apos;s First MCP Hub</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
          >
            The MCP Marketplace for the{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              AI-Powered Future
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-200 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Discover, connect and build powerful AI integrations—all in one place. Connect Cursor, Claude Desktop, VS Code, and Codex CLI to your databases, APIs, and Indian enterprise workflows.
          </motion.p>

          {/* Hero CTAs with Magnetic Spring & Hover Lift */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 hover:shadow-cyan-500/20 transition-all flex items-center gap-2 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Layers className="w-4 h-4" />
                <span>Explore MCP Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/studio"
                className="px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-sm transition-all flex items-center gap-2 hover:border-zinc-500 shadow-md"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Build Custom MCP</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Global Search Bar with Live Suggestions & Motion Glow */}
          <motion.div variants={itemVariants} className="pt-6 max-w-2xl mx-auto relative">
            <div className="relative flex items-center rounded-2xl bg-zinc-950/90 border border-white/[0.14] shadow-2xl p-2 focus-within:border-violet-500/80 focus-within:ring-4 focus-within:ring-violet-500/20 transition-all">
              <Search className="w-5 h-5 text-zinc-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search MCPs (e.g. GitHub, Supabase, WhatsApp, GST, Playwright)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-zinc-400 focus:outline-none"
              />
              <span className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-mono font-medium bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800 mr-2 shrink-0">
                21 Verified MCPs
              </span>
            </div>

            {/* Live Search Popup */}
            {searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl bg-[#090e1e] border border-white/[0.16] shadow-2xl p-3 text-left max-h-80 overflow-y-auto"
              >
                <div className="text-[11px] font-semibold uppercase text-zinc-400 px-3 py-1">
                  Matching MCP Servers ({searchResults.length})
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-300">
                    No MCP server found matching &ldquo;{searchQuery}&rdquo;. Need a custom one?{" "}
                    <Link href="/studio" className="text-violet-400 underline font-semibold">
                      Request custom development
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchResults.map((server) => (
                      <div
                        key={server.id}
                        className="p-2.5 rounded-xl hover:bg-zinc-800/80 flex items-center justify-between transition-colors cursor-pointer"
                        onClick={() => setSelectedServerForInstall(server)}
                      >
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                            {server.name}
                            <span className="text-[10px] font-normal text-zinc-400 font-mono">
                              ({server.category})
                            </span>
                          </div>
                          <div className="text-xs text-zinc-300 truncate max-w-md">{server.tagline}</div>
                        </div>
                        <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-violet-600/40 text-violet-200 border border-violet-500/50 hover:bg-violet-600/60">
                          Install
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Quick Metrics Protocol Pills */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-zinc-300"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Anthropic Spec</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Client Config Engines</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Zero-Token Security</span>
            </div>
          </motion.div>
        </motion.div>

        {/* HERO INTERACTIVE NETWORK CANVAS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <McpNetworkVisualizer />
        </motion.div>
      </section>

      {/* INDIA-FIRST FLAGSHIP SUITE — COMIC ART + MODERN MOTION GRAPHICS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-2 border-dashed border-violet-500/30 relative">
        {/* Comic Speed Lines Accent Background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            {/* Comic Action Header Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_0px_#000000] rotate-[-2deg]">
                💥 POWERED FOR BHARAT
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-violet-500/20 text-violet-300 border border-violet-500/40">
                ⚡ COMIC ART MOTION EDITION
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% LIVE PROTOCOL SPEC
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Indian Business &amp; Enterprise Suite</span>
            </h2>

            <p className="text-sm text-zinc-300 max-w-2xl font-medium leading-relaxed">
              Purpose-built MCP integrations for Indian startups, D2C brands, and MSMEs. Connect your AI coding agents directly to WhatsApp Cloud API, GST portals, Shiprocket logistics, and MCA filings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/marketplace?category=Indian+Business+Automation"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:opacity-95 text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all flex items-center gap-2"
            >
              <span>Explore All Indian MCPs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Comic Motion Live Feature Ticker */}
        <div className="mb-8 rounded-xl bg-zinc-950/90 border border-zinc-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-zinc-400 font-bold">BHARAT ACTIVE CHANNELS:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
              💬 WhatsApp Cloud API
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-purple-300">
              🛡️ GST 2025 Checksum Engine
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400">
              🚀 Shiprocket AWB Logistics
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-300">
              🔍 MCA CIN Corporate Intel
            </span>
          </div>
        </div>

        {/* High-Voltage Comic Art MCP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {indianBusinessServers.map((server) => (
            <ComicMcpCard
              key={server.id}
              server={server}
              onQuickInstall={(s) => setSelectedServerForInstall(s)}
            />
          ))}
        </div>
      </section>

      {/* FEATURED & TRENDING MCPs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Verified Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trending & Official Integrations
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Researched, verified, and ready for instant client configuration in Cursor, Claude, and VS Code.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            <span>Browse Full Catalog ({MCP_SERVERS_CATALOG.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServers.slice(0, 6).map((server) => (
            <McpCard
              key={server.id}
              server={server}
              onQuickInstall={(s) => setSelectedServerForInstall(s)}
            />
          ))}
        </div>
      </section>

      {/* HOW MCP WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Open Standard Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How Model Context Protocol Works</h2>
          <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
            MCP is an open protocol created by Anthropic that standardizes how AI models discover tools and inspect data sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white">AI Host Client</h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              Your preferred IDE or chat interface (Cursor, Claude Desktop, VS Code, Codex CLI) initializes an MCP connection.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white">JSON-RPC Stdio/SSE</h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              Client spawns the MCP server process locally via stdio or connects to a secure remote SSE endpoint.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white">Dynamic Tool Discovery</h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              The server advertises available tools, JSON schemas, resources, and prompt templates to the LLM agent.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              4
            </div>
            <h3 className="text-base font-bold text-white">Target APIs & DBs</h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              Model invokes parameterized tools with verified schemas, querying GitHub, Supabase, GST portals, or WhatsApp APIs.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SUDARSHAN MCP HUB - BENTO GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Enterprise Advantage
          </span>
          <h2 className="text-3xl font-extrabold text-white">Why Sudarshan MCP Hub?</h2>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
            Engineered with deep focus on security, verified installations, and Indian business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-8 space-y-4 md:col-span-2">
            <div className="p-3 w-fit rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Zero Fake Configurations</h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              Every listing is backed by accurate vendor specifications and validated CLI/JSON templates. We never fabricate installation success or prompt for unsafe credentials on public pages.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono font-medium text-zinc-200">
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700">.cursor/mcp.json</span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700">claude_desktop_config.json</span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700">settings.json</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 space-y-4">
            <div className="p-3 w-fit rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">India First Stack</h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              Native modules for WhatsApp Cloud API, GSTIN verification, e-invoicing JSON formatting, Razorpay payments, and MCA registry lookup.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 space-y-4">
            <div className="p-3 w-fit rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Security & Sandboxing</h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              Granular permission auditing, path boundary enforcement on filesystem tools, and read-only flags for production database drivers.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 space-y-4 md:col-span-2">
            <div className="p-3 w-fit rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Bespoke MCP Development Studio</h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
              Need a private internal MCP server for proprietary ERPs, Tally Prime, Zoho Books, or custom internal microservices? Our specialized MCP engineers build, test, and deliver production-grade servers for your team.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING OVERVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Fair, Transparent Pricing
          </span>
          <h2 className="text-3xl font-extrabold text-white">Plans for Builders and Teams</h2>
          <p className="text-sm text-zinc-400">
            Configurable launch tiers with native Razorpay checkout in Indian Rupees (INR).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Free Tier */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-zinc-300">Community</div>
              <div className="mt-4 text-3xl font-extrabold text-white">₹0</div>
              <div className="text-xs text-zinc-400 mt-1">Free forever</div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Full MCP catalog discovery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Client config generator
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Public installation guides
                </li>
              </ul>
            </div>
            <Link
              href="/marketplace"
              className="mt-8 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center text-xs font-semibold text-white transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-violet-500/40 relative shadow-xl shadow-violet-600/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-violet-600 text-white uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="text-sm font-bold text-violet-300">Pro Developer</div>
              <div className="mt-4 text-3xl font-extrabold text-white">₹499</div>
              <div className="text-xs text-zinc-400 mt-1">per month (INR)</div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  All Community features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sudarshan SEO MCP access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Unlimited saved integrations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Priority setup support
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-center text-xs font-semibold text-white transition-opacity"
            >
              Subscribe to Pro
            </Link>
          </div>

          {/* Business Tier */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-cyan-300">Business</div>
              <div className="mt-4 text-3xl font-extrabold text-white">₹1,999</div>
              <div className="text-xs text-zinc-400 mt-1">per month (INR)</div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Full India Business Suite
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp & GST integrations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Team access (5 developers)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  GST Tax Invoices with GSTIN
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center text-xs font-semibold text-white transition-colors"
            >
              Get Business Plan
            </Link>
          </div>

          {/* Custom Dev Tier */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-amber-300">Custom Studio</div>
              <div className="mt-4 text-3xl font-extrabold text-white">Custom</div>
              <div className="text-xs text-zinc-400 mt-1">Quotation based</div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Custom MCP server development
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Proprietary ERP / API bridges
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  End-to-end testing & SLA
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Private code escrow & handoff
                </li>
              </ul>
            </div>
            <Link
              href="/studio"
              className="mt-8 w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-center text-xs font-semibold transition-colors"
            >
              Request Custom MCP
            </Link>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.06]">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">Everything you need to know about MCP and Sudarshan Hub.</p>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white">What is Model Context Protocol (MCP)?</h3>
            <p className="text-sm text-zinc-200 mt-2.5 leading-relaxed font-normal">
              Model Context Protocol (MCP) is an open standard introduced by Anthropic that provides a unified JSON-RPC interface for LLMs to securely interact with local databases, development tools, filesystems, and remote APIs without custom ad-hoc plumbing for every client.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white">Are my private API keys and tokens stored on Sudarshan MCP Hub?</h3>
            <p className="text-sm text-zinc-200 mt-2.5 leading-relaxed font-normal">
              No. Our configuration generator builds your local configuration files directly inside your browser or as commands you execute on your local machine. Your private API keys and secrets run in your local client environment and are never transmitted to or stored on our servers.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white">Can I request a custom MCP for internal company tools?</h3>
            <p className="text-sm text-zinc-200 mt-2.5 leading-relaxed font-normal">
              Yes. Through our Custom MCP Development Studio, our engineering team architects, builds, audits, and delivers bespoke MCP servers connecting to your internal microservices, private databases, legacy databases, or Indian SaaS stacks (Tally, Zoho, etc.).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white">Do you support Indian GST invoices?</h3>
            <p className="text-sm text-zinc-200 mt-2.5 leading-relaxed font-normal">
              Yes. All paid subscriptions and custom development projects on Sudarshan MCP Hub are billed in INR via Razorpay with formal tax invoices containing your company GSTIN for full input tax credit.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-10 sm:p-14 border border-violet-500/30 bg-gradient-to-b from-[#131733] to-[#070b18] overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
            Start Building with MCP Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Supercharge Your AI Coding Environment
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Browse verified MCP servers, generate instant configurations for Cursor and Claude, or partner with Sudarshan AI Labs for bespoke enterprise integrations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/marketplace"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 hover:opacity-95 transition-all"
            >
              Explore MCP Marketplace
            </Link>
            <Link
              href="/studio"
              className="px-7 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-sm transition-all"
            >
              Order Custom Integration
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Install Modal */}
      <InstallModal
        server={selectedServerForInstall}
        onClose={() => setSelectedServerForInstall(null)}
      />
    </div>
  );
}
