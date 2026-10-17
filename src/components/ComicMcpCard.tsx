"use client";

import { useState } from "react";
import Link from "next/link";
import { McpServer } from "@/types/mcp";
import { formatInr } from "@/lib/utils";
import {
  Sparkles,
  Zap,
  Terminal,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Star,
  Copy,
  Check,
  Flame,
  ArrowUpRight,
  Play,
} from "lucide-react";

interface ComicMcpCardProps {
  server: McpServer;
  onQuickInstall?: (server: McpServer) => void;
}

// Comic Art Action Badges & Character Motifs
const COMIC_MOTIFS: Record<
  string,
  {
    heroTag: string;
    soundEffect: string;
    actionColor: string;
    accentGlow: string;
    comicDialog: string;
    iconEmoji: string;
  }
> = {
  "sudarshan-seo-mcp": {
    heroTag: "THE RANK CRUSHER",
    soundEffect: "BOOM! TOP #1 RANKING",
    actionColor: "from-amber-500 via-orange-500 to-red-500",
    accentGlow: "rgba(249, 115, 22, 0.5)",
    comicDialog: "Agent: 'Scanning 45 Vernacular Hindi & Hinglish search keywords... Found 3 high-volume low-competition targets!'",
    iconEmoji: "🎯",
  },
  "vyapaar-crm-mcp": {
    heroTag: "THE DEAL CLOSER",
    soundEffect: "ZAP! LEAD CONVERTED",
    actionColor: "from-blue-600 via-indigo-600 to-purple-600",
    accentGlow: "rgba(99, 102, 241, 0.5)",
    comicDialog: "Agent: 'Logged follow-up on WhatsApp & generated branded GST quotation in INR. Ready for customer signoff!'",
    iconEmoji: "💼",
  },
  "whatsapp-business-mcp": {
    heroTag: "HYPER MESSENGER",
    soundEffect: "PING! 100% DELIVERED",
    actionColor: "from-emerald-500 via-green-600 to-teal-600",
    accentGlow: "rgba(34, 197, 94, 0.5)",
    comicDialog: "Agent: 'Dispatched Meta-approved delivery template with interactive quick-reply buttons via Cloud API!'",
    iconEmoji: "💬",
  },
  "indian-business-mcp": {
    heroTag: "GST GUARDIAN",
    soundEffect: "POW! TAX VERIFIED",
    actionColor: "from-violet-600 via-purple-600 to-pink-600",
    accentGlow: "rgba(168, 85, 247, 0.5)",
    comicDialog: "Agent: 'Validated 27AAACH7409R1ZZ checksum & calculated split: CGST 9% + SGST 9%. Full ITC eligibility!'",
    iconEmoji: "🛡️",
  },
  "indian-ecommerce-mcp": {
    heroTag: "LOGISTICS ROCKET",
    soundEffect: "SWOOSH! SHIPMENT IN TRANSIT",
    actionColor: "from-cyan-500 via-sky-600 to-blue-600",
    accentGlow: "rgba(6, 182, 212, 0.5)",
    comicDialog: "Agent: 'Tracked Shiprocket AWB checkpoint & scored COD return risk as LOW (4.2%). Automated dispatch approved!'",
    iconEmoji: "🚀",
  },
  "lead-intelligence-mcp": {
    heroTag: "MCA CORPORATE DETECTIVE",
    soundEffect: "AHA! FOUND RECORD",
    actionColor: "from-fuchsia-600 via-rose-600 to-amber-600",
    accentGlow: "rgba(225, 29, 72, 0.5)",
    comicDialog: "Agent: 'Introspected MCA registry: CIN verified, authorized capital ₹5 Cr, 3 registered directors identified.'",
    iconEmoji: "🔍",
  },
};

export function ComicMcpCard({ server, onQuickInstall }: ComicMcpCardProps) {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const motif = COMIC_MOTIFS[server.slug] || {
    heroTag: "AI SUPER-INTEGRATION",
    soundEffect: "KABOOM! ACTIVE",
    actionColor: "from-violet-600 to-cyan-500",
    accentGlow: "rgba(139, 92, 246, 0.4)",
    comicDialog: `Agent: 'Executing ${server.tools[0]?.name || "tool"} through Model Context Protocol JSON-RPC stream!'`,
    iconEmoji: "⚡",
  };

  const handleSimulateCall = (toolName: string) => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
      setTestResult(
        `✓ JSON-RPC response from [${server.slug}]: { status: "success", tool: "${toolName}", executionTime: "12ms", verified: true }`
      );
    }, 450);
  };

  return (
    <div className="relative group flex flex-col justify-between rounded-2xl bg-[#080d1e] border-2 border-white/[0.12] hover:border-violet-400/90 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(139,92,246,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(139,92,246,0.7)] hover:-translate-y-1 overflow-hidden">
      {/* Comic Halftone Dot Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(#8b5cf6 1.2px, transparent 1.2px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Comic Top Sound Effect Banner */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-white/[0.1] bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-base">{motif.iconEmoji}</span>
          <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000000] rotate-[-2deg]">
            {motif.heroTag}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            INDIA SUITE
          </span>
        </div>
      </div>

      <div className="relative z-10 p-5 space-y-4">
        {/* Title & Status Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/marketplace/${server.slug}`} className="group-hover:text-cyan-300 transition-colors">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {server.name}
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              </h3>
            </Link>
            <span className="text-xs font-medium text-zinc-300 block mt-1">
              By <strong className="text-white">Sudarshan AI Labs</strong> • v{server.version}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
            <span className="text-[10px] font-mono font-medium text-zinc-300 mt-1 block">JSON-RPC 2.0</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-zinc-100 leading-relaxed font-normal">
          {server.tagline}
        </p>

        {/* Comic Dialogue Bubble (Agent Thought/Action) */}
        <div className="relative rounded-xl bg-zinc-950/95 border border-violet-400/40 p-3.5 shadow-inner">
          <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-violet-600 text-white font-mono text-[10px] font-bold rounded uppercase">
            Live AI Dialog
          </div>
          <p className="text-xs text-zinc-100 font-sans leading-relaxed pt-1 font-medium">
            &ldquo;{motif.comicDialog}&rdquo;
          </p>
        </div>

        {/* Tools Badges with Comic Action Test */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-zinc-200">
              Interactive Tools ({server.tools.length})
            </span>
            <span className="font-mono text-xs font-semibold text-cyan-400">STDIO PIPE</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {server.tools.slice(0, 3).map((tool) => (
              <button
                key={tool.name}
                onClick={() => handleSimulateCall(tool.name)}
                title="Click to test tool call"
                className="group/btn px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-violet-950/80 border border-zinc-700 hover:border-violet-400 text-xs font-mono font-medium text-zinc-100 hover:text-white flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 text-cyan-400 group-hover/btn:text-yellow-300" />
                <span>{tool.name}</span>
              </button>
            ))}
          </div>

          {/* Test Simulation Terminal Result */}
          {testResult && (
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-emerald-400/60 text-xs font-mono text-emerald-300 animate-in fade-in flex items-center justify-between">
              <span className="truncate">{testResult}</span>
              <button
                onClick={() => setTestResult(null)}
                className="text-xs text-zinc-400 hover:text-white ml-2 underline"
              >
                close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="relative z-10 p-4 border-t border-white/[0.1] bg-black/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
          <Star className="w-4 h-4 fill-amber-300" />
          <span>{server.stats.rating}</span>
          <span className="text-xs text-zinc-300 font-normal">
            ({server.stats.downloads.toLocaleString()} installs)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onQuickInstall && (
            <button
              onClick={() => onQuickInstall(server)}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-600 transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Install</span>
            </button>
          )}

          <Link
            href={`/marketplace/${server.slug}`}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-violet-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
