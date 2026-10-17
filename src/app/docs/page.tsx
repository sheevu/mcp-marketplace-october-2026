"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Laptop,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function DocsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Docs Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Model Context Protocol Setup Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Client Integration & Setup Instructions
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          Everything you need to connect Model Context Protocol (MCP) servers to your preferred AI coding assistants and chat applications.
        </p>
      </div>

      {/* Guide 1: Cursor */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            1. Configuring Cursor AI
          </h2>
          <span className="text-xs font-mono text-zinc-400">.cursor/mcp.json</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          Cursor supports MCP natively. You can configure MCP servers globally or per workspace by placing an <code className="text-violet-300 font-mono text-xs">mcp.json</code> file inside the root <code className="text-violet-300 font-mono text-xs">.cursor/</code> folder of your project.
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono">Example .cursor/mcp.json</span>
            <button
              onClick={() =>
                copySnippet(
                  "cursor",
                  `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}`
                )
              }
              className="text-zinc-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === "cursor" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "cursor" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto">
{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}`}
          </pre>
        </div>
      </section>

      {/* Guide 2: Claude Desktop */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            2. Configuring Claude Desktop
          </h2>
          <span className="text-xs font-mono text-zinc-400">claude_desktop_config.json</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          Claude Desktop looks for server definitions in its application settings folder:
        </p>

        <ul className="text-xs text-zinc-400 space-y-1 font-mono">
          <li>• Windows: <span className="text-zinc-300">%APPDATA%\Claude\claude_desktop_config.json</span></li>
          <li>• macOS: <span className="text-zinc-300">~/Library/Application Support/Claude/claude_desktop_config.json</span></li>
        </ul>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono">Example claude_desktop_config.json</span>
            <button
              onClick={() =>
                copySnippet(
                  "claude",
                  `{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://xyz.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOi..."
      }
    }
  }
}`
                )
              }
              className="text-zinc-400 hover:text-white flex items-center gap-1"
            >
              {copiedKey === "claude" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "claude" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto">
{`{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://xyz.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOi..."
      }
    }
  }
}`}
          </pre>
        </div>
      </section>

      {/* Guide 3: Claude Code CLI */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            3. Configuring Claude Code CLI
          </h2>
          <span className="text-xs font-mono text-zinc-400">claude mcp add</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          For Anthropic&apos;s new Claude Code terminal agent, install any MCP server directly via terminal with the single command syntax:
        </p>

        <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto">
          claude mcp add github npx -y @modelcontextprotocol/server-github -e GITHUB_PERSONAL_ACCESS_TOKEN="ghp_xxx"
        </pre>
      </section>

      {/* Security Best Practices */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border-amber-500/30">
        <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          Security & Credential Best Practices
        </h2>
        <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <strong>Never commit secrets:</strong> Add <code className="text-amber-300 font-mono">.cursor/mcp.json</code> or any files containing tokens to your project&apos;s <code className="text-amber-300 font-mono">.gitignore</code>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <strong>Restrict filesystem bounds:</strong> For filesystem MCP servers, only pass paths to explicit project subdirectories rather than user home directories or system drives.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <strong>Use least privilege:</strong> For database MCP servers (Postgres, Supabase), use read-only credentials unless explicit write capabilities are required.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
