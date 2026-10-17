"use client";

import { useState, useMemo } from "react";
import { MCP_SERVERS_CATALOG, CATEGORIES } from "@/data/mcpCatalog";
import { McpServer, McpCategory, PublisherType } from "@/types/mcp";
import { McpCard } from "@/components/McpCard";
import { InstallModal } from "@/components/InstallModal";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Layers,
  Sparkles,
  CheckCircle2,
  Tag,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPublisherType, setSelectedPublisherType] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"downloads" | "rating" | "name">("downloads");
  const [selectedServerForInstall, setSelectedServerForInstall] = useState<McpServer | null>(null);

  // Filter & Sort
  const filteredServers = useMemo(() => {
    return MCP_SERVERS_CATALOG.filter((server) => {
      // Search
      const matchesSearch =
        search.trim() === "" ||
        server.name.toLowerCase().includes(search.toLowerCase()) ||
        server.description.toLowerCase().includes(search.toLowerCase()) ||
        server.tagline.toLowerCase().includes(search.toLowerCase()) ||
        server.tools.some((t) => t.name.toLowerCase().includes(search.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === "All" || server.category === selectedCategory;

      // Publisher
      const matchesPublisher =
        selectedPublisherType === "All" || server.publisher.type === selectedPublisherType;

      // Pricing
      const matchesPricing =
        selectedPricing === "All" || server.pricing.type === selectedPricing;

      return matchesSearch && matchesCategory && matchesPublisher && matchesPricing;
    }).sort((a, b) => {
      if (sortBy === "downloads") return b.stats.downloads - a.stats.downloads;
      if (sortBy === "rating") return b.stats.rating - a.stats.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedCategory, selectedPublisherType, selectedPricing, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedPublisherType("All");
    setSelectedPricing("All");
    setSortBy("downloads");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Official & Community Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Model Context Protocol Marketplace
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Search, filter, and inspect verified MCP servers. Seamlessly configure integrations for Cursor, Claude Desktop, VS Code, and Claude Code CLI.
        </p>
      </div>

      {/* Search & Top Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search integrations, tools, databases, or publishers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/70"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="md:col-span-4 flex items-center justify-end gap-2">
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-950 border border-white/[0.1] text-xs text-zinc-200 focus:outline-none focus:border-violet-500"
          >
            <option value="downloads">Most Popular (Downloads)</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6 lg:border-r lg:border-white/[0.06] lg:pr-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
              Filter Catalog
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-zinc-500 hover:text-violet-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">Categories</label>
            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === "All"
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-zinc-500">{MCP_SERVERS_CATALOG.length}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const count = MCP_SERVERS_CATALOG.filter((s) => s.category === cat.name).length;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] text-zinc-500">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publisher Type */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">Publisher</label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { label: "All", value: "All" },
                { label: "Sudarshan AI", value: "sudarshan" },
                { label: "Official MCP", value: "official" },
                { label: "Community", value: "community" },
              ].map((pub) => (
                <button
                  key={pub.value}
                  onClick={() => setSelectedPublisherType(pub.value)}
                  className={`px-2.5 py-1.5 rounded-lg border text-left truncate transition-colors ${
                    selectedPublisherType === pub.value
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {pub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Model */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">Pricing</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: "All", value: "All" },
                { label: "Free", value: "free" },
                { label: "Paid", value: "paid" },
              ].map((price) => (
                <button
                  key={price.value}
                  onClick={() => setSelectedPricing(price.value)}
                  className={`px-2.5 py-1.5 rounded-lg border text-center transition-colors ${
                    selectedPricing === price.value
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {price.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Server Cards Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Showing <strong className="text-white">{filteredServers.length}</strong> integrations
            </span>
            {selectedCategory !== "All" && (
              <span className="font-mono text-violet-300">Category: {selectedCategory}</span>
            )}
          </div>

          {filteredServers.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center space-y-4">
              <div className="p-3 w-fit mx-auto rounded-xl bg-zinc-800 text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No MCP servers found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No matching integration for your active filter criteria. Try resetting filters or search for another keyword.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredServers.map((server) => (
                <McpCard
                  key={server.id}
                  server={server}
                  onQuickInstall={(s) => setSelectedServerForInstall(s)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Quick Install Modal */}
      <InstallModal
        server={selectedServerForInstall}
        onClose={() => setSelectedServerForInstall(null)}
      />
    </div>
  );
}
