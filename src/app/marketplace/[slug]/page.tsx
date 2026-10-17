"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MCP_SERVERS_CATALOG } from "@/data/mcpCatalog";
import { SUPPORTED_CLIENTS } from "@/data/clients";
import { McpClient } from "@/types/mcp";
import { generateMcpClientConfig, getSafeRemovalInstructions } from "@/lib/mcpConfigEngine";
import { formatInr } from "@/lib/utils";
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  Terminal,
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  Laptop,
  AlertTriangle,
  FileCode2,
  Star,
  Users,
  Layers,
  HelpCircle,
  Share2,
  Bookmark,
} from "lucide-react";

export default function McpDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const server = MCP_SERVERS_CATALOG.find((s) => s.slug === resolvedParams.slug);

  if (!server) {
    notFound();
  }

  const [selectedClient, setSelectedClient] = useState<McpClient>("cursor");
  const [selectedOs, setSelectedOs] = useState<"windows" | "macos" | "linux">("windows");
  const [envValues, setEnvValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const configResult = generateMcpClientConfig({
    server,
    client: selectedClient,
    customEnv: envValues,
    os: selectedOs,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(configResult.configContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([configResult.configContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = SUPPORTED_CLIENTS[selectedClient].configFileName.split("/").pop() || "mcp_config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to MCP Marketplace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isSaved
                ? "bg-violet-600/20 text-violet-300 border-violet-500/40"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? "Saved" : "Save Integration"}</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {server.category}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
                v{server.version}
              </span>
              {server.isIndianBusinessSuite && (
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Sudarshan India Suite
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              {server.name}
              {server.publisher.verified && (
                <span title="Verified Publisher">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                </span>
              )}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
              {server.tagline}
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
              <span>
                Publisher: <strong className="text-zinc-200">{server.publisher.name}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                {server.stats.rating} ({server.stats.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span>{server.stats.downloads.toLocaleString()} active downloads</span>
            </div>
          </div>

          {/* Access & Plan Card */}
          <div className="shrink-0 p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] text-right space-y-3 min-w-[220px]">
            <div className="text-xs text-zinc-400">Platform Access</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Verified Protocol Server
            </div>
            <Link
              href="/pricing"
              className="block w-full py-2.5 rounded-xl bg-violet-600/25 hover:bg-violet-600 border border-violet-500/40 text-violet-200 hover:text-white font-semibold text-xs text-center transition-all shadow-sm"
            >
              View Builder &amp; Team Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Installation Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Documentation, Tools, Security */}
        <div className="lg:col-span-7 space-y-8">
          {/* Overview */}
          <section className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-violet-400" />
              Overview & Architecture
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {server.longDescription || server.description}
            </p>

            {server.useCases && server.useCases.length > 0 && (
              <div className="pt-3 space-y-2">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Primary Use Cases
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {server.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Tools & Capabilities */}
          <section className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Available MCP Tools ({server.tools.length})
              </h2>
              <span className="text-xs text-zinc-500 font-mono">JSON-RPC 2.0</span>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {server.tools.map((tool) => (
                <div key={tool.name} className="py-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-violet-300">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Security & Permissions */}
          <section className="glass-card rounded-2xl p-6 space-y-4 border-amber-500/20">
            <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Security & Permissions Notice
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {server.securityNotice ||
                "Standard sandboxed runtime. Always review environment variables and avoid supplying excessive permissions beyond required tasks."}
            </p>
            {server.requiredPermissions && server.requiredPermissions.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Requested Scopes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {server.requiredPermissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Version History */}
          <section className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Changelog & Version History</h2>
            <div className="space-y-3">
              {server.versionHistory.map((vh) => (
                <div key={vh.version} className="border-l-2 border-violet-500/50 pl-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">v{vh.version}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{vh.releaseDate}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{vh.notes}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Interactive Client Installation Engine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 glass-panel rounded-2xl p-6 border-violet-500/30 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Installation Engine
              </h2>
              <p className="text-xs text-zinc-400">
                Choose your AI coding client to generate production-ready configuration.
              </p>
            </div>

            {/* Client selector tabs */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                Target AI Client
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    "cursor",
                    "claude-desktop",
                    "vscode",
                    "claude-code",
                    "codex-cli",
                    "windsurf",
                  ] as McpClient[]
                ).map((clientKey) => {
                  const isSelected = selectedClient === clientKey;
                  const clientMeta = SUPPORTED_CLIENTS[clientKey];
                  return (
                    <button
                      key={clientKey}
                      onClick={() => setSelectedClient(clientKey)}
                      className={`px-3 py-2 rounded-xl text-left border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-violet-600/25 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="font-semibold">{clientMeta.name.split(" ")[0]}</div>
                      <div className="text-[10px] text-zinc-500 truncate">{clientMeta.configFileName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target OS & Path */}
            <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-cyan-400" /> OS:
                </span>
                <div className="flex gap-1">
                  {(["windows", "macos", "linux"] as const).map((os) => (
                    <button
                      key={os}
                      onClick={() => setSelectedOs(os)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        selectedOs === os
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {os}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono truncate">
                Path: <span className="text-zinc-300">{configResult.configFilePath}</span>
              </div>
            </div>

            {/* Environment Variables Inputs */}
            {server.environmentVariables.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                  Configuration & Credentials
                </span>
                <div className="space-y-2">
                  {server.environmentVariables.map((env) => (
                    <div key={env.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-violet-300 text-[11px]">{env.name}</span>
                        <span className="text-[10px] text-zinc-500">
                          {env.required ? "Required" : "Optional"}
                        </span>
                      </div>
                      <input
                        type={env.isSecret ? "password" : "text"}
                        placeholder={env.placeholder || `Enter ${env.name}`}
                        value={envValues[env.name] || ""}
                        onChange={(e) =>
                          setEnvValues((prev) => ({ ...prev, [env.name]: e.target.value }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated Output Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {configResult.format === "cli" ? "Run in Terminal" : "Configuration Preview"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  {configResult.format === "json" && (
                    <button
                      onClick={handleDownload}
                      className="px-2.5 py-1 rounded bg-violet-600/30 hover:bg-violet-600 text-xs text-violet-200 font-medium flex items-center gap-1 transition-colors border border-violet-500/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3.5 font-mono text-xs overflow-x-auto text-zinc-200 max-h-56">
                <pre>{configResult.configContent}</pre>
              </div>
            </div>

            {/* Troubleshooting Checklist */}
            <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/80 p-3.5 space-y-2 text-xs">
              <span className="font-semibold text-zinc-300 block">Verification & Restart</span>
              <ul className="space-y-1 text-zinc-400 text-[11px]">
                {configResult.troubleshootingNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Uninstall notice */}
            <div className="text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-3">
              <span className="text-zinc-400 font-medium">To uninstall:</span>{" "}
              {getSafeRemovalInstructions(server.slug, selectedClient)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
