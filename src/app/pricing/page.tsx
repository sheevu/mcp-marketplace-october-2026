"use client";

import { useState } from "react";
import Link from "next/link";
import { formatInr } from "@/lib/utils";
import {
  CheckCircle2,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Zap,
  Building,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleCheckout = async (planKey: string) => {
    setIsProcessing(planKey);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, billingCycle }),
      });
      const data = await res.json();
      if (data.orderId) {
        alert(
          `Razorpay Checkout Initialized!\nOrder ID: ${data.orderId}\nAmount: ${formatInr(
            data.amountInr
          )}\nIn test/production mode, Razorpay Standard Checkout opens here.`
        );
      }
    } catch {
      alert("Checkout demo initiated.");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Pricing Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transparent Pricing in Indian Rupees (INR)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple Plans for Developers, Startups & Enterprises
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Discover open-source MCPs for free, or upgrade to Sudarshan Pro & Business for our flagship India Business Automation Suite, verified connectors, and priority support.
        </p>

        {/* Billing cycle toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Annual (Save 20%)</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
              Offer
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Free Plan */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Community</h3>
            <p className="text-xs text-zinc-400">For individual developers exploring MCP.</p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-white">₹0</span>
              <span className="text-xs text-zinc-400"> / forever</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full catalog search & filters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Client configuration generator (Cursor, Claude)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All open-source official servers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Community Discord & Docs</span>
              </li>
            </ul>
          </div>
          <Link
            href="/marketplace"
            className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs text-center border border-zinc-700 transition-colors"
          >
            Start Discovering Free
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between space-y-8 border-violet-500/50 relative shadow-2xl shadow-violet-600/15">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-violet-600 text-white uppercase tracking-wider shadow-lg">
            Recommended
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-violet-300">Pro Developer</h3>
            <p className="text-xs text-zinc-400">For professional AI pair-programmers & freelancers.</p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-white">
                {billingCycle === "monthly" ? "₹499" : "₹399"}
              </span>
              <span className="text-xs text-zinc-400"> / month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Everything in Community</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sudarshan SEO MCP Server access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited saved bundles & export</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Priority email & Discord support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tax invoices with GSTIN</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout("pro")}
            disabled={isProcessing === "pro"}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-violet-600/25 transition-all"
          >
            {isProcessing === "pro" ? "Creating Order..." : "Upgrade to Pro"}
          </button>
        </div>

        {/* Business Plan */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-cyan-300">Business Suite</h3>
            <p className="text-xs text-zinc-400">For agencies, D2C brands & Indian MSMEs.</p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-white">
                {billingCycle === "monthly" ? "₹1,999" : "₹1,599"}
              </span>
              <span className="text-xs text-zinc-400"> / month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full India Suite: GSTIN, WhatsApp, E-commerce</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 5 team seats with RBAC</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Centralized configuration manager</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated WhatsApp support SLA</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleCheckout("business")}
            disabled={isProcessing === "business"}
            className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors"
          >
            {isProcessing === "business" ? "Creating Order..." : "Subscribe to Business"}
          </button>
        </div>

        {/* Custom Studio Plan */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-300">Custom Engineering</h3>
            <p className="text-xs text-zinc-400">Bespoke MCP server development for enterprises.</p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-white">Custom</span>
              <span className="text-xs text-zinc-400"> / quotation</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Architected for proprietary legacy APIs & ERPs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated Sudarshan Senior Architect</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full TypeScript source code ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Security audit & penetration testing report</span>
              </li>
            </ul>
          </div>
          <Link
            href="/studio"
            className="w-full py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-xs text-center border border-amber-500/40 transition-colors"
          >
            Request Quotation
          </Link>
        </div>
      </div>

      {/* Tax & GST Compliance Section */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <strong className="text-white block">100% Tax Compliant Indian Invoicing</strong>
            Enter your GSTIN during checkout to receive automatic tax invoices for full input tax credit claim.
          </div>
        </div>
        <div className="font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 shrink-0">
          Razorpay Secured (Cards, UPI, Netbanking)
        </div>
      </div>
    </div>
  );
}
