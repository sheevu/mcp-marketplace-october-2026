"use client";

import { useState } from "react";
import Link from "next/link";
import { MCP_SERVERS_CATALOG } from "@/data/mcpCatalog";
import { formatInr } from "@/lib/utils";
import {
  Layers,
  Bookmark,
  Terminal,
  CreditCard,
  Bell,
  Settings,
  Building,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Download,
  Key,
  Laptop,
  Shield,
  FileCode,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "saved" | "installs" | "custom_projects" | "billing" | "settings"
  >("overview");

  // Sample customer state
  const user = {
    name: "Arjun Verma",
    email: "arjun.verma@indiatraveltech.com",
    company: "India TravelTech Pvt Ltd",
    plan: "Pro Developer (₹499/mo)",
    status: "Active",
  };

  const savedServers = MCP_SERVERS_CATALOG.slice(0, 4);

  const customProjects = [
    {
      id: "prj-8492",
      title: "Tally Prime ERP & GST Ledger MCP",
      status: "in_development",
      statusLabel: "In Development (Sprint 2/3)",
      targetClient: "Cursor & Claude Desktop",
      budgetInr: 85000,
      quotationStatus: "Paid",
      milestones: [
        { name: "XML Protocol & Schema Specification", status: "completed" },
        { name: "Local Stdio Server Implementation", status: "completed" },
        { name: "GSTIN Verification & Tax Breakup", status: "in_progress" },
        { name: "End-to-End Security Audit & Packaging", status: "pending" },
      ],
    },
  ];

  const recentOrders = [
    {
      id: "order_Qz8492Lkj",
      date: "12 Oct 2025",
      description: "Pro Developer Plan - Monthly Subscription",
      amountInr: 499,
      status: "Paid",
      invoiceNumber: "INV-2025-0841",
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {user.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {user.company} • Active Subscription: <span className="text-violet-300 font-semibold">{user.plan}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>New Custom MCP</span>
          </Link>
          <Link
            href="/marketplace"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:text-white transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-white/[0.06] pb-3 text-xs font-medium text-zinc-400">
        {[
          { id: "overview", label: "Overview", icon: Layers },
          { id: "saved", label: "Saved MCPs (4)", icon: Bookmark },
          { id: "installs", label: "Client Configurations", icon: Laptop },
          { id: "custom_projects", label: "Custom Projects (1)", icon: Terminal },
          { id: "billing", label: "Billing & Invoices", icon: CreditCard },
          { id: "settings", label: "Account & Org", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Metric Cards Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Active Integrations</span>
                <Laptop className="w-4 h-4 text-violet-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">6 Servers</div>
              <div className="text-[11px] text-emerald-400">Configured in Cursor & Claude</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Custom Projects</span>
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">1 Active</div>
              <div className="text-[11px] text-cyan-300">Tally Prime ERP MCP</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Monthly Plan</span>
                <CreditCard className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">₹499/mo</div>
              <div className="text-[11px] text-zinc-400">Renews on 12 Nov 2025</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Tax Compliance</span>
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">GSTIN Verified</div>
              <div className="text-[11px] text-zinc-400">27AAACH7409R1ZZ</div>
            </div>
          </div>

          {/* Active Custom Project Progress Tracker */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                  Custom Engineering Milestone
                </span>
                <h3 className="text-lg font-bold text-white">{customProjects[0].title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 w-fit">
                {customProjects[0].statusLabel}
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              Developed by Sudarshan AI Labs engineering. Target clients: {customProjects[0].targetClient}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {customProjects[0].milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    m.status === "completed"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                      : m.status === "in_progress"
                      ? "bg-violet-500/15 border-violet-500/40 text-violet-200 animate-pulse"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    {m.status === "completed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span>Milestone 0{idx + 1}</span>
                  </div>
                  <div className="font-semibold text-zinc-200 text-xs">{m.name}</div>
                  <div className="text-[10px] capitalize">{m.status.replace("_", " ")}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Integrations Quick List */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-violet-400" />
                Bookmarked MCP Servers
              </h3>
              <Link href="/marketplace" className="text-xs text-violet-400 hover:underline">
                Explore more
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedServers.map((server) => (
                <div
                  key={server.id}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{server.name}</h4>
                    <p className="text-xs text-zinc-400 font-mono">{server.category}</p>
                  </div>
                  <Link
                    href={`/marketplace/${server.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium transition-colors"
                  >
                    View Config
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAVED SERVERS */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Saved MCP Integrations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedServers.map((server) => (
              <div key={server.id} className="glass-card rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">{server.category}</span>
                  <span className="text-xs text-emerald-400 font-semibold">Saved</span>
                </div>
                <h4 className="text-base font-bold text-white">{server.name}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">{server.description}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">{server.transport.toUpperCase()}</span>
                  <Link
                    href={`/marketplace/${server.slug}`}
                    className="px-3 py-1 rounded bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs"
                  >
                    Configure
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT CONFIGURATIONS */}
      {activeTab === "installs" && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your MCP Client Settings</h3>
            <p className="text-xs text-zinc-400">
              Download your consolidated configuration JSON ready to drop into Cursor or Claude Desktop.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-violet-300">Cursor (.cursor/mcp.json)</span>
              <button
                onClick={() => alert("Consolidated .cursor/mcp.json downloaded!")}
                className="px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Active Bundle</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-zinc-300 bg-zinc-900 p-3 rounded-lg overflow-x-auto">
{`{
  "mcpServers": {
    "github-mcp": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
    "supabase-mcp": { "command": "npx", "args": ["-y", "@supabase/mcp-server"] },
    "sudarshan-seo-mcp": { "command": "npx", "args": ["-y", "@sudarshan-ai/mcp-seo"] }
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM PROJECTS */}
      {activeTab === "custom_projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Your Custom MCP Projects</h3>
            <Link
              href="/studio"
              className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold"
            >
              Order New Integration
            </Link>
          </div>

          {customProjects.map((proj) => (
            <div key={proj.id} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400">{proj.id}</span>
                  <h4 className="text-base font-bold text-white">{proj.title}</h4>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{formatInr(proj.budgetInr)}</div>
                  <span className="text-xs text-emerald-400 font-semibold">{proj.quotationStatus}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {proj.milestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                    <div className="text-[10px] text-zinc-500">Milestone {idx + 1}</div>
                    <div className="font-semibold text-white mt-0.5">{m.name}</div>
                    <div className="text-[11px] text-violet-300 mt-1 capitalize">{m.status.replace("_", " ")}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: BILLING & INVOICES */}
      {activeTab === "billing" && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Billing & Tax Invoices</h3>
              <p className="text-xs text-zinc-400">Processed securely via Razorpay in INR.</p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              Pro Active
            </span>
          </div>

          <div className="divide-y divide-zinc-800 text-xs">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{order.description}</div>
                  <div className="text-zinc-500 text-[11px]">{order.date} • {order.invoiceNumber}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{formatInr(order.amountInr)}</div>
                  <span className="text-emerald-400 text-[11px] font-semibold">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === "settings" && (
        <div className="glass-panel rounded-2xl p-6 space-y-6 max-w-2xl">
          <h3 className="text-lg font-bold text-white">Account & Company Profile</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Full Name</label>
              <input
                disabled
                value={user.name}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Email Address</label>
              <input
                disabled
                value={user.email}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Registered Entity & GSTIN</label>
              <input
                disabled
                value="27AAACH7409R1ZZ (Maharashtra)"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
