import Link from "next/link";
import { Cpu, ShieldCheck, Heart, Terminal, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#03050a] text-zinc-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#070a14] rounded-[7px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-tight">SUDARSHAN MCP HUB</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Discover. Connect. Automate. Build. India&apos;s premier marketplace and integration ecosystem for Model Context Protocol (MCP) servers, tools, and bespoke enterprise AI agents.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official MCP Spec v1.0 Compliant
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/marketplace?category=Software+Development" className="hover:text-white transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Databases" className="hover:text-white transition-colors">
                  Databases (Postgres, Supabase)
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Cloud+%26+Deployment" className="hover:text-white transition-colors">
                  Cloud & Vercel
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Indian+Business+Automation" className="hover:text-white transition-colors text-amber-300">
                  India Business Suite
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=Browser+Automation" className="hover:text-white transition-colors">
                  Browser Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Custom */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Custom MCP Development
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Enterprise Plans (INR)
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Client Setup Guides
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Publisher & Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Compatible Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Supported Clients</h4>
            <ul className="space-y-2 text-xs">
              <li>Cursor AI</li>
              <li>Claude Desktop</li>
              <li>VS Code / Roo Code / Cline</li>
              <li>Claude Code CLI</li>
              <li>Windsurf (Codeium)</li>
              <li>Codex CLI</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Sudarshan AI Labs. Built for Indian innovators, enterprises, and builders worldwide.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-zinc-200">Security & Permissions</Link>
            <Link href="/docs" className="hover:text-zinc-200">Privacy Policy</Link>
            <Link href="/docs" className="hover:text-zinc-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
