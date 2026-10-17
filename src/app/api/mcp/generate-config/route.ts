import { NextRequest, NextResponse } from "next/server";
import { MCP_SERVERS_CATALOG } from "@/data/mcpCatalog";
import { generateMcpClientConfig } from "@/lib/mcpConfigEngine";
import { McpClient } from "@/types/mcp";
import { z } from "zod";

const GenerateConfigSchema = z.object({
  serverSlug: z.string(),
  client: z.enum([
    "cursor",
    "claude-desktop",
    "vscode",
    "claude-code",
    "codex-cli",
    "chatgpt",
    "windsurf",
  ]),
  customEnv: z.record(z.string()).optional(),
  os: z.enum(["windows", "macos", "linux"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GenerateConfigSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { serverSlug, client, customEnv, os } = parsed.data;
    const server = MCP_SERVERS_CATALOG.find((s) => s.slug === serverSlug);

    if (!server) {
      return NextResponse.json(
        { error: `MCP server '${serverSlug}' not found in registry` },
        { status: 404 }
      );
    }

    const result = generateMcpClientConfig({
      server,
      client: client as McpClient,
      customEnv,
      os,
    });

    return NextResponse.json({
      success: true,
      server: {
        id: server.id,
        name: server.name,
        slug: server.slug,
        version: server.version,
      },
      installation: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}
