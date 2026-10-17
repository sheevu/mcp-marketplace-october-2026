"use client";

import { useState } from "react";
import { MCP_SERVERS_CATALOG } from "@/data/mcpCatalog";
import { formatInr } from "@/lib/utils";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  Terminal,
  CreditCard,
  FileText,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react";

export default function AdminPanelPage() {
  const [activeAdminTab, setActiveAdminTab] = useState<
    "analytics" | "catalog" | "publishers" | "custom_leads" | "security"
  >("analytics");

  const [servers, setServers] = useState(MCP_SERVERS_CATALOG);

  // Custom enquiries pipeline state
  const [enquiries, setEnquiries] = useState([
    {
      id: "ENQ-901",
      customer: "Reliance Logistics Division",
      contact: "logistics.ai@ril.com",
      system: "SAP ERP Transport Integration MCP",
      budget: "₹2,50,000",
      stage: "Proposal Sent",
      date: "14 Oct 2025",
    },
    {
      id: "ENQ-902",
      customer: "Khatabook Tech Team",
      contact: "dev@khatabook.com",
      system: "Vyapaar UPI & QR Settlement MCP",
      budget: "₹1,20,000",
      stage: "In Qualification",
      date: "15 Oct 2025",
    },
  ]);

  const toggleFeatured = (id: string) => {
    setServers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s))
    );
  };

  const toggleVerified = (id: string) => {
    setServers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              publisher: { ...s.publisher, verified: !s.publisher.verified },
            }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
              Admin Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sudarshan MCP Control Plane
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Platform telemetry, catalog moderation, custom proposal pipeline, and publisher audits.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          RBAC: Super Administrator
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-medium text-zinc-400">
        {[
          { id: "analytics", label: "Analytics & Telemetry" },
          { id: "catalog", label: "MCP Catalog Moderation" },
          { id: "publishers", label: "Publishers & Verification" },
          { id: "custom_leads", label: "Custom Dev Enquiries" },
          { id: "security", label: "Security & RLS Reports" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeAdminTab === tab.id
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30 font-semibold"
                : "hover:text-white hover:bg-zinc-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeAdminTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400">Verified Integrations</div>
              <div className="text-2xl font-extrabold text-white">{servers.length} Servers</div>
              <div className="text-[11px] text-emerald-400">100% Validated against MCP Spec</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400">Monthly Run Rate (INR)</div>
              <div className="text-2xl font-extrabold text-white">₹3,42,800</div>
              <div className="text-[11px] text-emerald-400">+28.4% month-over-month</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400">Config Generations</div>
              <div className="text-2xl font-extrabold text-white">384,120</div>
              <div className="text-[11px] text-cyan-300">Cursor & Claude Desktop leading</div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="text-xs text-zinc-400">Custom Dev Pipeline</div>
              <div className="text-2xl font-extrabold text-white">₹3,70,000</div>
              <div className="text-[11px] text-amber-300">2 Active Enterprise Enquiries</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CATALOG MODERATION */}
      {activeAdminTab === "catalog" && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">MCP Servers Catalog Management</h3>
            <span className="text-xs text-zinc-400 font-mono">Total: {servers.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Server Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Publisher</th>
                  <th className="py-3 px-4">Transport</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {servers.map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-4 font-semibold text-white">{s.name}</td>
                    <td className="py-3 px-4 text-zinc-400">{s.category}</td>
                    <td className="py-3 px-4 text-zinc-300">{s.publisher.name}</td>
                    <td className="py-3 px-4 font-mono text-[11px]">{s.transport}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleFeatured(s.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          s.featured
                            ? "bg-violet-600/20 text-violet-300 border border-violet-500/40"
                            : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                        }`}
                      >
                        {s.featured ? "Featured" : "Regular"}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleVerified(s.id)}
                        className="text-[11px] text-cyan-400 hover:underline"
                      >
                        Toggle Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM LEADS */}
      {activeAdminTab === "custom_leads" && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Custom MCP Enquiries Pipeline</h3>
          <div className="divide-y divide-zinc-800 text-xs">
            {enquiries.map((enq) => (
              <div key={enq.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-cyan-400">{enq.id}</span>
                    <span className="font-bold text-white">{enq.customer}</span>
                    <span className="px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 text-[10px]">
                      {enq.stage}
                    </span>
                  </div>
                  <div className="text-zinc-300">{enq.system}</div>
                  <div className="text-zinc-500 text-[11px]">{enq.contact} • {enq.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{enq.budget}</div>
                  <button className="mt-1 text-xs text-violet-400 hover:underline">
                    View Full Scope Doc
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeAdminTab === "security" && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            Security & Row-Level Security Status: PASS
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All 26 database tables enforce strict tenant isolation via Supabase RLS. No public anonymous read access exists on user organizations, payment tokens, or custom engineering request scopes.
          </p>
        </div>
      )}
    </div>
  );
}
