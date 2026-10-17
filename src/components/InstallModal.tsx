"use client";

import { useState } from "react";
import { McpServer, McpClient } from "@/types/mcp";
import { generateMcpClientConfig, getSafeRemovalInstructions } from "@/lib/mcpConfigEngine";
import { SUPPORTED_CLIENTS } from "@/data/clients";
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  AlertTriangle, 
  Laptop, 
  ExternalLink,
  HelpCircle,
  ShieldCheck
} from "lucide-react";

interface InstallModalProps {
  server: McpServer | null;
  onClose: () => void;
}

export function InstallModal({ server, onClose }: InstallModalProps) {
  const [selectedClient, setSelectedClient] = useState<McpClient>("cursor");
  const [selectedOs, setSelectedOs] = useState<"windows" | "macos" | "linux">("windows");
  const [envValues, setEnvValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "env" | "troubleshooting">("config");

  if (!server) return null;

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

  const handleEnvChange = (name: string, value: string) => {
    setEnvValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/[0.12] bg-[#090e1d] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-[#0a1024]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Install {server.name}
              </h2>
              <p className="text-xs text-zinc-400">
                Official Model Context Protocol Configuration Generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Select AI Client */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              1. Choose Your AI Coding Client
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  "cursor",
                  "claude-desktop",
                  "vscode",
                  "claude-code",
                  "codex-cli",
                  "windsurf",
                  "chatgpt",
                ] as McpClient[]
              ).map((clientKey) => {
                const isSelected = selectedClient === clientKey;
                const clientMeta = SUPPORTED_CLIENTS[clientKey];
                return (
                  <button
                    key={clientKey}
                    onClick={() => setSelectedClient(clientKey)}
                    className={`px-3 py-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-violet-600/20 border-violet-500 text-white shadow-lg shadow-violet-600/15"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                    }`}
                  >
                    <div className="font-semibold">{clientMeta.name.split(" ")[0]}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{clientMeta.configFileName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: OS Selection & Path Hint */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/70 p-3.5 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Target OS:</span>
              {(["windows", "macos", "linux"] as const).map((os) => (
                <button
                  key={os}
                  onClick={() => setSelectedOs(os)}
                  className={`px-2 py-0.5 rounded text-[11px] uppercase font-mono transition-colors ${
                    selectedOs === os
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {os}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 truncate max-w-xs">
              File: <span className="text-zinc-300">{configResult.configFilePath}</span>
            </div>
          </div>

          {/* Step 3: Environment Variables Configuration */}
          {server.environmentVariables.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Configure Authentication & Secrets (Optional)
                </label>
                <span className="text-[10px] text-zinc-400">Values populated in preview directly</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {server.environmentVariables.map((env) => (
                  <div key={env.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-violet-300 font-semibold">{env.name}</span>
                      <span className="text-[11px] text-zinc-400">
                        {env.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <input
                      type={env.isSecret ? "password" : "text"}
                      placeholder={env.placeholder || `Enter ${env.name}`}
                      value={envValues[env.name] || ""}
                      onChange={(e) => handleEnvChange(env.name, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500"
                    />
                    <p className="text-[11px] text-zinc-400">{env.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Generated Code / CLI Command Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {configResult.format === "cli" ? "CLI Command" : "Client Configuration JSON"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                {configResult.format === "json" && (
                  <button
                    onClick={handleDownload}
                    className="px-2.5 py-1 rounded bg-violet-600/30 hover:bg-violet-600 text-xs text-violet-200 font-medium flex items-center gap-1.5 transition-colors border border-violet-500/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                )}
              </div>
            </div>

            <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs overflow-x-auto text-zinc-200 shadow-inner">
              <pre>{configResult.configContent}</pre>
            </div>
          </div>

          {/* Safe Removal Instructions */}
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-300 font-semibold">How to remove or uninstall:</span>{" "}
              {getSafeRemovalInstructions(server.slug, selectedClient)}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/[0.08] px-6 py-3.5 bg-[#0a1024] flex items-center justify-between text-xs">
          <div className="text-zinc-400">
            Runtime: <span className="font-mono text-zinc-300">{server.packageCommand} ({server.runtime})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
