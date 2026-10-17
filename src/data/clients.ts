import { McpClient, McpClientMeta } from "@/types/mcp";

export const SUPPORTED_CLIENTS: Record<McpClient, McpClientMeta> = {
  cursor: {
    id: "cursor",
    name: "Cursor AI",
    configFileName: ".cursor/mcp.json",
    configPathHint: {
      windows: "%USERPROFILE%\\.cursor\\mcp.json or workspace .cursor/mcp.json",
      macos: "~/.cursor/mcp.json or workspace .cursor/mcp.json",
      linux: "~/.cursor/mcp.json or workspace .cursor/mcp.json",
    },
    docUrl: "https://docs.cursor.com/context/model-context-protocol",
  },
  "claude-desktop": {
    id: "claude-desktop",
    name: "Claude Desktop",
    configFileName: "claude_desktop_config.json",
    configPathHint: {
      windows: "%APPDATA%\\Claude\\claude_desktop_config.json",
      macos: "~/Library/Application Support/Claude/claude_desktop_config.json",
      linux: "~/.config/Claude/claude_desktop_config.json",
    },
    docUrl: "https://modelcontextprotocol.io/quickstart/user",
  },
  vscode: {
    id: "vscode",
    name: "VS Code (GitHub Copilot / Roo Code / Cline)",
    configFileName: "settings.json / mcp.json",
    configPathHint: {
      windows: "%APPDATA%\\Code\\User\\globalStorage\\rooveterinaryinc.roo-cline\\settings\\cline_mcp_settings.json",
      macos: "~/Library/Application Support/Code/User/settings.json",
      linux: "~/.config/Code/User/settings.json",
    },
    docUrl: "https://code.visualstudio.com/docs/copilot/mcp",
  },
  "claude-code": {
    id: "claude-code",
    name: "Claude Code CLI",
    configFileName: "claude.json / config.json",
    configPathHint: {
      windows: "%USERPROFILE%\\.claude.json",
      macos: "~/.claude.json",
      linux: "~/.claude.json",
    },
    docUrl: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code",
  },
  "codex-cli": {
    id: "codex-cli",
    name: "Codex CLI",
    configFileName: "codex_mcp.json",
    configPathHint: {
      windows: "%USERPROFILE%\\.codex\\mcp.json",
      macos: "~/.codex/mcp.json",
      linux: "~/.codex/mcp.json",
    },
    docUrl: "https://github.com/modelcontextprotocol",
  },
  windsurf: {
    id: "windsurf",
    name: "Windsurf (Codeium)",
    configFileName: "mcp_config.json",
    configPathHint: {
      windows: "%USERPROFILE%\\.codeium\\windsurf\\mcp_config.json",
      macos: "~/.codeium/windsurf/mcp_config.json",
      linux: "~/.codeium/windsurf/mcp_config.json",
    },
    docUrl: "https://codeium.com/windsurf",
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT (Custom Actions / SSE)",
    configFileName: "openapi.json / mcp-sse.json",
    configPathHint: {
      windows: "Hosted SSE Endpoint URL or OpenAI Action Manifest",
      macos: "Hosted SSE Endpoint URL or OpenAI Action Manifest",
      linux: "Hosted SSE Endpoint URL or OpenAI Action Manifest",
    },
    docUrl: "https://platform.openai.com/docs/actions",
  },
};
