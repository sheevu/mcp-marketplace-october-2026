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
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-zinc-800/90 text-zinc-200 border border-zinc-700">
              {server.category}
            </span>
            {server.isIndianBusinessSuite && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                India Suite
              </span>
            )}
          </div>

          {/* Protocol Badge */}
          <div className="text-right">
            <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              MCP Spec
            </span>
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-2">
          <Link href={`/marketplace/${server.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-2">
              {server.name}
              {server.publisher.verified && (
                <span title="Verified Publisher">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                </span>
              )}
            </h3>
          </Link>
          <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1 font-medium">
            By <strong className="text-white">{server.publisher.name}</strong>
          </p>
        </div>

        {/* Tagline / Description */}
        <p className="text-sm text-zinc-200 line-clamp-2 leading-relaxed mb-4 font-normal">
          {server.description}
        </p>

        {/* Available Tools Preview */}
        <div className="space-y-1.5 mb-4">
          <span className="text-xs text-zinc-300 uppercase tracking-wider font-semibold">
            Included Tools ({server.tools.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {server.tools.slice(0, 3).map((tool) => (
              <span
                key={tool.name}
                className="px-2 py-0.5 rounded bg-zinc-900 text-xs font-mono font-medium text-zinc-100 border border-zinc-700/80"
              >
                {tool.name}
              </span>
            ))}
            {server.tools.length > 3 && (
              <span className="px-1.5 py-0.5 text-xs font-mono font-medium text-zinc-300">
                +{server.tools.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
          <span className="flex items-center gap-1 text-amber-300 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            {server.stats.rating}
          </span>
          <span>•</span>
          <span className="font-mono text-xs text-zinc-300">
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
