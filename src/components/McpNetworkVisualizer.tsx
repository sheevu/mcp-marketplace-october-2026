"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Sparkles, Activity, Zap } from "lucide-react";
import {
  CursorIcon,
  ClaudeIcon,
  VsCodeIcon,
  GitHubIcon,
  SupabaseIcon,
  WhatsAppIcon,
  VercelIcon,
  SudarshanChakraIcon,
} from "./BrandIcons";

interface VisualNode {
  id: string;
  label: string;
  subLabel: string;
  type: "client" | "hub" | "server";
  xPercent: number; // percentage of container width
  yPercent: number; // percentage of container height
  color: string;
  glowColor: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  tools: string[];
  latency: string;
  protocol: string;
}

const NETWORK_NODES: VisualNode[] = [
  // Central Hub
  {
    id: "hub",
    label: "Sudarshan MCP Hub",
    subLabel: "Quantum JSON-RPC Nexus",
    type: "hub",
    xPercent: 50,
    yPercent: 50,
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    IconComponent: SudarshanChakraIcon,
    tools: ["rpc.router", "auth.broker", "stream.meter", "governance.shield"],
    latency: "< 1ms",
    protocol: "MCP Core v1.0",
  },
  // AI Clients (Left)
  {
    id: "cursor",
    label: "Cursor AI",
    subLabel: "IDE Agent Host",
    type: "client",
    xPercent: 16,
    yPercent: 20,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    IconComponent: CursorIcon,
    tools: ["composer.agent", "codebase.indexing", "tab.autocomplete"],
    latency: "3ms",
    protocol: "Stdio Pipe",
  },
  {
    id: "claude",
    label: "Claude Desktop",
    subLabel: "Anthropic Client",
    type: "client",
    xPercent: 12,
    yPercent: 50,
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.4)",
    IconComponent: ClaudeIcon,
    tools: ["claude-3.7-sonnet", "tool_choice.auto", "thinking_mode"],
    latency: "4ms",
    protocol: "Stdio Transport",
  },
  {
    id: "vscode",
    label: "VS Code / Cline",
    subLabel: "Copilot & Extensions",
    type: "client",
    xPercent: 16,
    yPercent: 80,
    color: "#007acc",
    glowColor: "rgba(0, 122, 204, 0.4)",
    IconComponent: VsCodeIcon,
    tools: ["cline.orchestrator", "roo-code", "lsp.diagnostics"],
    latency: "2ms",
    protocol: "IPC Stdio",
  },
  // MCP Servers (Right)
  {
    id: "github",
    label: "GitHub MCP",
    subLabel: "Code & Workflows",
    type: "server",
    xPercent: 84,
    yPercent: 18,
    color: "#e2e8f0",
    glowColor: "rgba(226, 232, 240, 0.35)",
    IconComponent: GitHubIcon,
    tools: ["get_file_contents", "create_pull_request", "list_issues"],
    latency: "28ms",
    protocol: "JSON-RPC Stdio",
  },
  {
    id: "supabase",
    label: "Supabase DB",
    subLabel: "PostgreSQL & RLS",
    type: "server",
    xPercent: 88,
    yPercent: 42,
    color: "#3ecf8e",
    glowColor: "rgba(62, 207, 142, 0.4)",
    IconComponent: SupabaseIcon,
    tools: ["execute_query", "describe_table", "check_rls_policies"],
    latency: "14ms",
    protocol: "Encrypted Stdio",
  },
  {
    id: "whatsapp",
    label: "WhatsApp & GST",
    subLabel: "India Enterprise Suite",
    type: "server",
    xPercent: 84,
    yPercent: 68,
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.4)",
    IconComponent: WhatsAppIcon,
    tools: ["verify_gstin", "send_template", "calc_tax_breakup"],
    latency: "19ms",
    protocol: "REST & Meta SSE",
  },
  {
    id: "vercel",
    label: "Vercel Cloud",
    subLabel: "Edge Deployments",
    type: "server",
    xPercent: 80,
    yPercent: 90,
    color: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.4)",
    IconComponent: VercelIcon,
    tools: ["get_deployment_logs", "list_env_vars", "trigger_redeploy"],
    latency: "22ms",
    protocol: "HTTPS SSE Gateway",
  },
];

export function McpNetworkVisualizer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<VisualNode | null>(null);
  const [actionBurst, setActionBurst] = useState<{ text: string; x: number; y: number } | null>(null);
  const [activeMessage, setActiveMessage] = useState<string>(
    "Model Context Protocol Bus: JSON-RPC 2.0 streaming layer active across all connected nodes."
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle streams
    const particles: {
      sourceIdx: number;
      targetIdx: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }[] = [];

    const colors = ["#38bdf8", "#f97316", "#007acc", "#3ecf8e", "#22c55e", "#c084fc", "#e2e8f0"];

    // Populate animated signal packets
    for (let i = 0; i < 18; i++) {
      const isClientToHub = i % 2 === 0;
      particles.push({
        sourceIdx: isClientToHub ? Math.floor(Math.random() * 3) + 1 : 0,
        targetIdx: isClientToHub ? 0 : 4 + Math.floor(Math.random() * 4),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2.5 + Math.random() * 2,
      });
    }

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      const hubX = (width * NETWORK_NODES[0].xPercent) / 100;
      const hubY = (height * NETWORK_NODES[0].yPercent) / 100;

      // Draw Connections between Clients & Hub
      for (let i = 1; i <= 3; i++) {
        const client = NETWORK_NODES[i];
        const x = (width * client.xPercent) / 100;
        const y = (height * client.yPercent) / 100;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + (hubX - x) * 0.55, y, hubX - 80, hubY, hubX, hubY);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.22)";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Secondary glow beam
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + (hubX - x) * 0.55, y, hubX - 80, hubY, hubX, hubY);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Draw Connections between Hub & Servers
      for (let i = 4; i < NETWORK_NODES.length; i++) {
        const server = NETWORK_NODES[i];
        const x = (width * server.xPercent) / 100;
        const y = (height * server.yPercent) / 100;

        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.bezierCurveTo(hubX + 80, hubY, x - (x - hubX) * 0.55, y, x, y);
        ctx.strokeStyle = "rgba(6, 182, 212, 0.22)";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Secondary glow beam
        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.bezierCurveTo(hubX + 80, hubY, x - (x - hubX) * 0.55, y, x, y);
        ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Render floating animated data packets
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          if (p.sourceIdx === 0) {
            p.targetIdx = 4 + Math.floor(Math.random() * 4);
          } else {
            p.sourceIdx = Math.floor(Math.random() * 3) + 1;
          }
        }

        const sNode = NETWORK_NODES[p.sourceIdx];
        const tNode = NETWORK_NODES[p.targetIdx];
        if (!sNode || !tNode) return;

        const sx = (width * sNode.xPercent) / 100;
        const sy = (height * sNode.yPercent) / 100;
        const tx = (width * tNode.xPercent) / 100;
        const ty = (height * tNode.yPercent) / 100;

        // Quadratic interpolation
        const cx = (sx + tx) / 2;
        const cy = (sy + ty) / 2;
        const px = (1 - p.progress) * (1 - p.progress) * sx + 2 * (1 - p.progress) * p.progress * cx + p.progress * p.progress * tx;
        const py = (1 - p.progress) * (1 - p.progress) * sy + 2 * (1 - p.progress) * p.progress * cy + p.progress * p.progress * ty;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNodeClick = (node: VisualNode, e: React.MouseEvent) => {
    const randomTool = node.tools[Math.floor(Math.random() * node.tools.length)];
    const messages = [
      `⚡ ZAP! Invoked tool: ${randomTool} via JSON-RPC 2.0 (Latency: ${node.latency})`,
      `🚀 POW! Stdio packet stream established with ${node.label} (${node.protocol})`,
      `💥 BOOM! Discovered ${node.tools.length} active capabilities on ${node.label}`,
    ];
    const pickedMsg = messages[Math.floor(Math.random() * messages.length)];
    setActiveMessage(pickedMsg);

    // Show comic action burst effect
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setActionBurst({
        text: node.type === "hub" ? "CHAKRA POWER!" : "ZAP! " + randomTool,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setActionBurst(null), 1400);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border-2 border-violet-500/30 bg-[#060914] backdrop-blur-xl p-4 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] select-none"
    >
      {/* Comic Halftone Dot Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#8b5cf6 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Protocol Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="font-mono font-bold tracking-wide text-zinc-200">
            MCP Protocol Bus • JSON-RPC 2.0 Live Streaming
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span> AI Clients
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Sudarshan Hub
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified MCP Servers
          </span>
        </div>
      </div>

      {/* Interactive Network Stage */}
      <div className="relative w-full h-[440px] my-1">
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

        {/* DOM-Based Nodes with Official High-Res Brand Icons */}
        {NETWORK_NODES.map((node) => {
          const isHub = node.type === "hub";
          const Icon = node.IconComponent;
          const isHovered = hoveredNode?.id === node.id;

          return (
            <div
              key={node.id}
              onClick={(e) => handleNodeClick(node, e)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                left: `${node.xPercent}%`,
                top: `${node.yPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-20 flex flex-col items-center cursor-pointer group"
            >
              {/* Node Icon Avatar with glowing comic borders */}
              <div
                style={{
                  borderColor: node.color,
                  boxShadow: isHovered
                    ? `0 0 30px ${node.glowColor}, 0 0 60px ${node.glowColor}`
                    : `0 0 16px ${node.glowColor}`,
                }}
                className={`relative flex items-center justify-center rounded-2xl bg-[#090d1f] border-2 transition-all duration-300 transform group-hover:scale-125 ${
                  isHub ? "w-16 h-16 p-2 rounded-full border-purple-400" : "w-12 h-12 p-2.5"
                }`}
              >
                {/* Hub Pulsing Ring */}
                {isHub && (
                  <span className="absolute inset-0 rounded-full border border-purple-400/60 animate-ping pointer-events-none opacity-40"></span>
                )}

                {/* Latest Brand Icon */}
                <Icon className={isHub ? "w-9 h-9" : "w-6 h-6"} />

                {/* Mini Online Status Dot */}
                <span
                  style={{ backgroundColor: node.color }}
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#060914] shadow"
                />
              </div>

              {/* Node Label Below */}
              <div className="mt-2 text-center pointer-events-none">
                <span
                  style={{ color: isHovered ? node.color : "#f1f5f9" }}
                  className="text-xs font-bold tracking-tight block drop-shadow-md whitespace-nowrap transition-colors"
                >
                  {node.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block whitespace-nowrap">
                  {node.subLabel}
                </span>
              </div>

              {/* Rich Interactive HUD Tooltip on Hover */}
              {isHovered && (
                <div
                  style={{
                    borderColor: node.color,
                    boxShadow: `0 10px 25px -5px ${node.glowColor}`,
                  }}
                  className="absolute bottom-full mb-3 z-30 w-56 rounded-xl bg-[#0b1024]/95 border-2 p-3 text-left backdrop-blur-xl animate-in fade-in zoom-in-95 pointer-events-none"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5 mb-2">
                    <span className="font-bold text-xs text-white">{node.label}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Latency:</span>
                      <span className="text-cyan-400 font-bold">{node.latency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Transport:</span>
                      <span className="text-purple-300">{node.protocol}</span>
                    </div>
                    <div className="pt-1 border-t border-white/[0.06]">
                      <span className="text-[10px] uppercase font-sans text-zinc-400 font-semibold block mb-1">
                        Active Tools:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {node.tools.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Comic Action Burst Flash on Click */}
        {actionBurst && (
          <div
            style={{
              left: `${actionBurst.x}px`,
              top: `${actionBurst.y}px`,
              transform: "translate(-50%, -120%)",
            }}
            className="absolute z-40 pointer-events-none animate-bounce"
          >
            <div className="px-3 py-1.5 rounded-lg bg-yellow-400 border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#000000] rotate-[-6deg]">
              {actionBurst.text}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Telemetry & Comic Action Bar */}
      <div className="relative z-10 rounded-xl bg-zinc-950/90 border border-zinc-800/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 max-w-xl">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
          <span className="text-zinc-500 font-mono">Telemetry:</span>
          <span className="text-zinc-200 font-mono text-[11px] truncate">{activeMessage}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
            Click any node to simulate tool dispatch
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-violet-600/30 text-violet-300 border border-violet-500/40 rounded">
            STDIO / SSE ROUTING
          </span>
        </div>
      </div>
    </div>
  );
}
