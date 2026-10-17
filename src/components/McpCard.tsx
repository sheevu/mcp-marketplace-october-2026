"use client";

import Link from "next/link";
import { McpServer } from "@/types/mcp";
import { formatInr } from "@/lib/utils";
import { 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ShieldAlert, 
  Terminal, 
  Star, 
  Sparkles,
  Zap
} from "lucide-react";

interface McpCardProps {
  server: McpServer;
  onQuickInstall?: (server: McpServer) => void;
}

export function McpCard({ server, onQuickInstall }: McpCardProps) {
  return (
    <div className="glass-card group relative flex flex-col justify-between rounded-xl p-5 overflow-hidden">
      {/* Background subtle radial gradient */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/20 transition-all pointer-events-none"></div>

      <div>
        {/* Top Badges & Publisher */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              {server.category}
            </span>
            {server.isIndianBusinessSuite && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                India Suite
              </span>
            )}
          </div>

          {/* Pricing tag */}
          <div className="text-right">
            {server.pricing.type === "free" ? (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                Free
              </span>
            ) : (
              <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                {server.pricing.priceInr ? `${formatInr(server.pricing.priceInr)}/mo` : "Paid"}
              </span>
            )}
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-2">
          <Link href={`/marketplace/${server.slug}`} className="block">
            <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-2">
              {server.name}
              {server.publisher.verified && (
                <span title="Verified Publisher">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                </span>
              )}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
            By <span className="text-zinc-300 font-medium">{server.publisher.name}</span>
          </p>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {server.description}
        </p>

        {/* Available Tools Preview */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
            Included Tools ({server.tools.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {server.tools.slice(0, 3).map((tool) => (
              <span
                key={tool.name}
                className="px-2 py-0.5 rounded bg-zinc-900/90 text-[11px] font-mono text-zinc-300 border border-zinc-800"
              >
                {tool.name}
              </span>
            ))}
            {server.tools.length > 3 && (
              <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-400">
                +{server.tools.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="flex items-center gap-1 text-amber-300 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            {server.stats.rating}
          </span>
          <span>•</span>
          <span className="font-mono text-[11px] text-zinc-400">
            {server.transport.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onQuickInstall && (
            <button
              onClick={() => onQuickInstall(server)}
              className="px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors flex items-center gap-1"
              title="Quick Configuration"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Install</span>
            </button>
          )}

          <Link
            href={`/marketplace/${server.slug}`}
            className="px-2.5 py-1 text-xs font-medium text-violet-300 hover:text-white bg-violet-600/20 hover:bg-violet-600 border border-violet-500/30 rounded-lg transition-all flex items-center gap-1"
          >
            <span>View</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
