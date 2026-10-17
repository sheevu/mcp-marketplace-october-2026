"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  Search, 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  Menu, 
  X,
  CreditCard
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <div className="w-full h-full bg-[#070a14] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                SUDARSHAN
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                MCP HUB
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 tracking-wider">AI LABS • INDIA</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-300">
          <Link
            href="/marketplace"
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-violet-400" />
            Marketplace
          </Link>
          <Link
            href="/marketplace?category=Indian+Business+Automation"
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 text-amber-200/90 hover:text-amber-200"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            India Suite
          </Link>
          <Link
            href="/studio"
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Custom Studio
          </Link>
          <Link
            href="/pricing"
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            Pricing
          </Link>
          <Link
            href="/docs"
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Right CTA & Account */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/marketplace"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span>Search MCPs...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded text-zinc-400 border border-zinc-700">⌘K</kbd>
          </Link>

          <Link
            href="/dashboard"
            className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:opacity-90 shadow-md shadow-violet-600/20 transition-all"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className="px-3 py-1 text-xs font-semibold bg-violet-600 text-white rounded-md"
          >
            Dashboard
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#070a14] px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Marketplace
          </Link>
          <Link
            href="/marketplace?category=Indian+Business+Automation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-amber-300 hover:bg-zinc-900"
          >
            India Suite (GST & WhatsApp)
          </Link>
          <Link
            href="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Custom MCP Studio
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Pricing (INR)
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-violet-300 hover:bg-zinc-900"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
