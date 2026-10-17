# ☸️ Sudarshan MCP Hub

> **Discover. Connect. Automate. Build.**  
> India's premier marketplace for Model Context Protocol (MCP) integrations, tools, and enterprise AI workflows.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![MCP SDK](https://img.shields.io/badge/Model%20Context%20Protocol-1.6.1-8a2be2)](https://modelcontextprotocol.io/)

---

## 🌟 Overview

**Sudarshan MCP Hub** is an India-focused marketplace and developer platform built on Anthropic's **Model Context Protocol (MCP)** specification. It allows developers, agencies, and enterprises to discover, install, configure, and purchase verified MCP servers for leading AI clients including **Cursor**, **Claude Desktop**, **VS Code**, and **Claude Code CLI**.

### Key Highlights
- **Interactive Protocol Network Canvas:** Real-time visualizer mapping clients (Cursor, Claude, VS Code) to servers (GitHub, Supabase, Cloudflare, WhatsApp) with live latency and comic action bursts.
- **Indian Business & Enterprise Suite:** Specialized Bharat integrations with WhatsApp Cloud API, GST validation engine, Shiprocket AWB tracking, and MCA CIN company intelligence.
- **Multi-Client Config Engine:** Automatic generator for valid, client-specific JSON configs with OS-specific path hints (macOS, Windows, Linux) and one-click copy.
- **Comic Art + Modern Motion Graphics:** High-voltage comic pop art aesthetics with halftone dots, speech bubbles, and interactive tool execution simulators.
- **Centralized Builder & Team Pricing:** Fair INR plans with Razorpay checkout (`₹0 Community`, `₹499/mo Pro`, `₹1,999/mo Business`, and Custom Enterprise).
- **Custom MCP Studio:** Enterprise quotation intake and bespoke integration ordering workflow.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Motion:** [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion), [Lucide React](https://lucide.dev/)
- **Protocol:** Official `@modelcontextprotocol/sdk` (v1.6.1)
- **Database & Auth:** Supabase PostgreSQL with 26 normalized tables and Row-Level Security (RLS)
- **Payments:** Razorpay INR checkout with server-side HMAC-SHA256 signature verification
- **Validation:** Zod v3 schema validation

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sheevu/mcp-marketplace-october-2026.git
cd mcp-marketplace-october-2026
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay (Indian Payments)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage with animated hero & Indian suite
│   │   ├── marketplace/
│   │   │   ├── page.tsx           # Searchable MCP catalog with category filters
│   │   │   └── [slug]/page.tsx    # Server detail page & multi-client config generator
│   │   ├── pricing/page.tsx       # Plans for Builders and Teams (₹0, ₹499, ₹1,999)
│   │   ├── studio/page.tsx        # Custom MCP Development Studio form
│   │   ├── dashboard/page.tsx     # User integration & config history dashboard
│   │   ├── admin/page.tsx         # Platform management & revenue analytics
│   │   └── api/                   # Server routes (payments, webhooks, config generator)
│   ├── components/
│   │   ├── BrandIcons.tsx         # Official SVG icons (Cursor, Claude, VS Code, WhatsApp, etc.)
│   │   ├── ComicMcpCard.tsx       # Comic Art + Motion Graphics card for Bharat suite
│   │   ├── McpCard.tsx            # Standard verified MCP server card
│   │   ├── McpNetworkVisualizer.tsx# Canvas-based live protocol network graph
│   │   └── InstallModal.tsx       # Interactive multi-client installer dialog
│   ├── data/
│   │   └── mcpCatalog.ts          # 21 verified MCP server definitions
│   ├── lib/
│   │   ├── mcpConfigEngine.ts     # Multi-client adapter configuration generator
│   │   ├── razorpay.ts            # Payment orders and HMAC verification
│   │   └── supabase.ts            # Supabase database client
│   └── types/
│       └── mcp.ts                 # TypeScript types for MCP servers, tools, and configs
├── supabase/
│   └── migrations/                # PostgreSQL schema with 26 tables & RLS
└── public/                        # Static assets and icons
```

---

## 🛡️ Supported AI Clients

| Client | Config Location | Format |
| :--- | :--- | :--- |
| **Cursor** | `.cursor/mcp.json` | JSON with `mcpServers` object |
| **Claude Desktop** | `claude_desktop_config.json` | JSON with `mcpServers` object |
| **VS Code** | `.vscode/settings.json` | `mcp.servers` settings |
| **Claude Code CLI** | CLI command arguments | `claude mcp add ...` |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` | JSON configuration |

---

## 📜 License

Private & Confidential © 2026 **Sudarshan AI Labs**. All rights reserved.