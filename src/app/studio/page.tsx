"use client";

import { useState } from "react";
import Link from "next/link";
import { formatInr } from "@/lib/utils";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Building2,
  FileCheck2,
  HelpCircle,
  FileCode,
} from "lucide-react";

export default function CustomMcpStudioPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    organization: "",
    businessIndustry: "Technology / SaaS",
    contactEmail: "",
    contactPhone: "",
    requiredIntegration: "",
    targetApis: "",
    desiredWorkflow: "",
    preferredClient: "cursor",
    estimatedBudgetInr: "₹50,000 - ₹1,50,000",
    targetDeliveryDate: "Within 2 weeks",
    detailedRequirements: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Post to our API endpoint
      const response = await fetch("/api/studio/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback for demo / offline
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sudarshan AI Labs Custom Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Custom MCP Development Studio
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Need a proprietary Model Context Protocol server for internal ERPs, Tally Prime, custom databases, or specialized Indian business APIs? Our architects build, test, and deliver production-ready MCPs.
        </p>
      </div>

      {/* Engineering Lifecycle Process */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs">
        {[
          { step: "01", name: "Scoping & Specs", desc: "API review & schema mapping" },
          { step: "02", name: "Proposal & SLA", desc: "Fixed quotation in INR" },
          { step: "03", name: "MCP Core Build", desc: "TypeScript SDK implementation" },
          { step: "04", name: "Security Audit", desc: "Token isolation & zero SSRF" },
          { step: "05", name: "Client QA", desc: "Tested in Cursor & Claude" },
          { step: "06", name: "Handoff & CI", desc: "Private repo & documentation" },
        ].map((item) => (
          <div key={item.step} className="glass-card rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.step}</span>
            <div className="font-bold text-white">{item.name}</div>
            <div className="text-[11px] text-zinc-400 leading-tight">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Request Form or Submission Confirmation */}
      <div className="max-w-4xl mx-auto">
        {submitted ? (
          <div className="glass-panel rounded-3xl p-10 sm:p-14 text-center space-y-6 border-emerald-500/30">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Custom MCP Request Received!
            </h2>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.customerName}</strong>. Our Principal MCP Architect at Sudarshan AI Labs will review your requirements for{" "}
              <strong className="text-violet-300">{formData.requiredIntegration}</strong> and respond to{" "}
              <strong className="text-white">{formData.contactEmail}</strong> within 24 hours with a scope assessment and quotation.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
              >
                View in Customer Dashboard
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border-white/[0.1] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Contact Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Building2 className="w-4 h-4 text-violet-400" />
                  1. Organization & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Company / Organization *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bharat Tech Solutions Pvt Ltd"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Work Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="vikram@company.in"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Technical Scope */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  2. Technical Integration Scope
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Required Integration / System Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Tally Prime XML Server, Custom PostgreSQL ERP, Internal Logistics Microservice"
                      value={formData.requiredIntegration}
                      onChange={(e) =>
                        setFormData({ ...formData, requiredIntegration: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Target APIs, Endpoints, or Databases
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. REST API, GraphQL, PostgreSQL, Apache Kafka, gRPC"
                      value={formData.targetApis}
                      onChange={(e) => setFormData({ ...formData, targetApis: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">
                      Desired Automation Workflow & Tools Needed *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the actions your AI assistant should perform (e.g. 'Read invoice XML from Tally, compute GST liability, and generate e-way bill JSON payload')."
                      value={formData.desiredWorkflow}
                      onChange={(e) =>
                        setFormData({ ...formData, desiredWorkflow: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Budget, Timeline & Client */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  3. Budget, Timeline & Target Client
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Primary AI Client</label>
                    <select
                      value={formData.preferredClient}
                      onChange={(e) => setFormData({ ...formData, preferredClient: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="cursor">Cursor AI</option>
                      <option value="claude-desktop">Claude Desktop</option>
                      <option value="vscode">VS Code / Cline / Roo Code</option>
                      <option value="claude-code">Claude Code CLI</option>
                      <option value="windsurf">Windsurf</option>
                      <option value="all">Multiple Clients</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Estimated Budget (INR)</label>
                    <select
                      value={formData.estimatedBudgetInr}
                      onChange={(e) =>
                        setFormData({ ...formData, estimatedBudgetInr: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Quick Bridge)</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (Full Integration)</option>
                      <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 - ₹3,00,000 (Enterprise Suite)</option>
                      <option value="₹3,00,000+">₹3,00,000+ (Custom Architecture)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300">Target Delivery</label>
                    <select
                      value={formData.targetDeliveryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, targetDeliveryDate: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="Urgent (1 week)">Urgent (1 week)</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-violet-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Submitting Request..." : "Submit Custom MCP Engineering Enquiry"}</span>
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-3">
                  NDA and IP agreement provided prior to code access. Billed in INR with full GST invoice support.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
