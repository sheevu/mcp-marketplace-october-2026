"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Cpu, Database, Cloud, MessageSquare, Shield, Layers, Sparkles } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "client" | "hub" | "server";
  x: number;
  y: number;
  icon?: string;
  color: string;
  tools?: string[];
}

export function McpNetworkVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>("hub");
  const [activeMessage, setActiveMessage] = useState<string>(
    "Model Context Protocol: Standardized JSON-RPC 2.0 streaming layer active."
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    // Nodes positions (Clients on left, Hub in center, Servers on right)
    const getNodes = (): Node[] => [
      // Central Hub
      { id: "hub", label: "Sudarshan MCP Hub", type: "hub", x: width * 0.5, y: height * 0.5, color: "#a855f7" },
      // AI Clients
      { id: "cursor", label: "Cursor AI", type: "client", x: width * 0.16, y: height * 0.22, color: "#38bdf8" },
      { id: "claude", label: "Claude Desktop", type: "client", x: width * 0.14, y: height * 0.5, color: "#f97316" },
      { id: "vscode", label: "VS Code / Cline", type: "client", x: width * 0.18, y: height * 0.78, color: "#06b6d4" },
      // Servers / Services
      { id: "github", label: "GitHub MCP", type: "server", x: width * 0.82, y: height * 0.18, color: "#e2e8f0" },
      { id: "supabase", label: "Supabase DB", type: "server", x: width * 0.86, y: height * 0.42, color: "#34d399" },
      { id: "whatsapp", label: "WhatsApp & GST", type: "server", x: width * 0.82, y: height * 0.68, color: "#22c55e" },
      { id: "vercel", label: "Vercel Cloud", type: "server", x: width * 0.78, y: height * 0.88, color: "#c084fc" },
    ];

    let t = 0;
    const particles: { sourceIdx: number; targetIdx: number; progress: number; speed: number }[] = [];

    // Pre-populate animated signal packets
    for (let i = 0; i < 10; i++) {
      particles.push({
        sourceIdx: Math.floor(Math.random() * 3) + 1, // client
        targetIdx: 0, // hub
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.007,
      });
      particles.push({
        sourceIdx: 0, // hub
        targetIdx: 4 + Math.floor(Math.random() * 4), // server
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.007,
      });
    }

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      const nodes = getNodes();
      const hubNode = nodes[0];

      // Draw connections from clients to hub
      for (let i = 1; i <= 3; i++) {
        const clientNode = nodes[i];
        ctx.beginPath();
        ctx.moveTo(clientNode.x, clientNode.y);
        ctx.bezierCurveTo(
          clientNode.x + (hubNode.x - clientNode.x) * 0.5,
          clientNode.y,
          hubNode.x - 60,
          hubNode.y,
          hubNode.x,
          hubNode.y
        );
        ctx.strokeStyle = "rgba(139, 92, 246, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw connections from hub to servers
      for (let i = 4; i < nodes.length; i++) {
        const serverNode = nodes[i];
        ctx.beginPath();
        ctx.moveTo(hubNode.x, hubNode.y);
        ctx.bezierCurveTo(
          hubNode.x + 60,
          hubNode.y,
          serverNode.x - (serverNode.x - hubNode.x) * 0.5,
          serverNode.y,
          serverNode.x,
          serverNode.y
        );
        ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw floating animated data packets
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

        const s = nodes[p.sourceIdx];
        const target = nodes[p.targetIdx];
        if (!s || !target) return;

        // Quadratic interpolation along bezier
        const cx = (s.x + target.x) / 2;
        const cy = (s.y + target.y) / 2;
        const px = (1 - p.progress) * (1 - p.progress) * s.x + 2 * (1 - p.progress) * p.progress * cx + p.progress * p.progress * target.x;
        const py = (1 - p.progress) * (1 - p.progress) * s.y + 2 * (1 - p.progress) * p.progress * cy + p.progress * p.progress * target.y;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.sourceIdx === 0 ? "#22d3ee" : "#c084fc";
        ctx.shadowColor = p.sourceIdx === 0 ? "#06b6d4" : "#a855f7";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const isHub = node.type === "hub";
        const radius = isHub ? 32 : 18;

        // Pulse glow for Hub
        if (isHub) {
          const pulse = Math.sin(t * 2) * 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 12 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(168, 85, 247, 0.12)";
          ctx.fill();
        }

        // Node base
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#090d1a";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHub ? 2.5 : 1.5;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHub ? 16 : 8;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = isHub ? "bold 13px Inter, sans-serif" : "11px Inter, sans-serif";
        ctx.fillStyle = "#e2e8f0";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + radius + 16);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#070b18]/70 backdrop-blur-xl p-4 overflow-hidden shadow-2xl">
      {/* Top status header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-zinc-300">MCP Protocol Bus • JSON-RPC 2.0 Live</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span> AI Clients
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Sudarshan Hub
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span> MCP Tools
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[400px]">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Live Telemetry status */}
      <div className="mt-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-violet-400" />
          <span className="text-zinc-400 font-mono">Stream:</span>
          <span className="text-zinc-200 font-mono truncate max-w-md sm:max-w-xl">
            {activeMessage}
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded">
          STDIO / SSE ROUTING
        </span>
      </div>
    </div>
  );
}
