import { McpServer, McpClient, InstallationConfigResult } from "@/types/mcp";
import { SUPPORTED_CLIENTS } from "@/data/clients";

export interface GenerateConfigOptions {
  server: McpServer;
  client: McpClient;
  customEnv?: Record<string, string>;
  os?: "windows" | "macos" | "linux";
}

/**
 * Generates valid client-specific configuration according to official vendor specs
 */
export function generateMcpClientConfig(options: GenerateConfigOptions): InstallationConfigResult {
  const { server, client, customEnv = {}, os = "windows" } = options;
  const clientMeta = SUPPORTED_CLIENTS[client] || SUPPORTED_CLIENTS["cursor"];
  const configPath = clientMeta.configPathHint[os];

  // Prepare environment variable entries with placeholders if not provided
  const envEntries: Record<string, string> = {};
  server.environmentVariables.forEach((env) => {
    envEntries[env.name] =
      customEnv[env.name] || (env.isSecret ? `YOUR_${env.name}_HERE` : env.defaultValue || env.placeholder || "");
  });

  const envInstructions: string[] = server.environmentVariables.map((env) => {
    return `${env.name} (${env.required ? "Required" : "Optional"}): ${env.description}${
      env.defaultValue ? ` [Default: ${env.defaultValue}]` : ""
    }`;
  });

  const troubleshootingNotes: string[] = [
    `Verify ${server.runtime === "python" ? "Python / uvx" : "Node.js (>= 18) and npx"} are installed in your PATH.`,
    `Ensure required environment variables (${server.environmentVariables
      .filter((e) => e.required)
      .map((e) => e.name)
      .join(", ") || "None"}) are populated with valid tokens.`,
    `After updating the configuration file, fully restart ${clientMeta.name}.`,
    `Check ${clientMeta.name} logs for any stdio connection timeouts or spawn errors.`,
  ];

  let configContent = "";
  let cliCommand: string | undefined;
  let format: "json" | "cli" | "yaml" = "json";

  switch (client) {
    case "cursor": {
      // Cursor uses .cursor/mcp.json in workspace or global directory
      const cursorConfig = {
        mcpServers: {
          [server.slug]: {
            command: server.packageCommand,
            args: server.packageArgs,
            ...(Object.keys(envEntries).length > 0 ? { env: envEntries } : {}),
          },
        },
      };
      configContent = JSON.stringify(cursorConfig, null, 2);
      break;
    }

    case "claude-desktop": {
      // Claude Desktop claude_desktop_config.json
      const claudeConfig = {
        mcpServers: {
          [server.slug]: {
            command: server.packageCommand,
            args: server.packageArgs,
            ...(Object.keys(envEntries).length > 0 ? { env: envEntries } : {}),
          },
        },
      };
      configContent = JSON.stringify(claudeConfig, null, 2);
      break;
    }

    case "vscode": {
      // VS Code Cline / Roo Code / Copilot MCP format
      const vscodeConfig = {
        mcpServers: {
          [server.slug]: {
            command: server.packageCommand,
            args: server.packageArgs,
            env: Object.keys(envEntries).length > 0 ? envEntries : undefined,
            disabled: false,
            autoApprove: [],
          },
        },
      };
      configContent = JSON.stringify(vscodeConfig, null, 2);
      break;
    }

    case "claude-code": {
      // Claude Code CLI format uses `claude mcp add`
      format = "cli";
      const envFlags = Object.entries(envEntries)
        .map(([k, v]) => `-e ${k}="${v}"`)
        .join(" ");

      cliCommand = `claude mcp add ${server.slug} ${server.packageCommand} ${server.packageArgs.join(" ")}${
        envFlags ? " " + envFlags : ""
      }`;
      configContent = cliCommand;
      break;
    }

    case "codex-cli": {
      format = "cli";
      const envFlags = Object.entries(envEntries)
        .map(([k, v]) => `--env ${k}="${v}"`)
        .join(" ");

      cliCommand = `codex mcp register ${server.slug} --command "${server.packageCommand} ${server.packageArgs.join(" ")}"${
        envFlags ? " " + envFlags : ""
      }`;
      configContent = cliCommand;
      break;
    }

    case "windsurf": {
      // Windsurf ~/.codeium/windsurf/mcp_config.json
      const windsurfConfig = {
        mcpServers: {
          [server.slug]: {
            command: server.packageCommand,
            args: server.packageArgs,
            env: envEntries,
          },
        },
      };
      configContent = JSON.stringify(windsurfConfig, null, 2);
      break;
    }

    case "chatgpt": {
      // OpenAI Actions / SSE endpoint manifest
      format = "json";
      const chatgptManifest = {
        schema_version: "v1",
        name_for_model: server.slug.replace(/-/g, "_"),
        name_for_human: server.name,
        description_for_model: server.description,
        description_for_human: server.tagline,
        auth: {
          type: "none",
        },
        api: {
          type: "openapi",
          url: `https://mcp-gateway.sudarshan.ai/v1/sse/${server.slug}/openapi.json`,
        },
        logo_url: "https://sudarshan.ai/logo.png",
        contact_email: "support@sudarshan.ai",
        legal_info_url: "https://sudarshan.ai/terms",
      };
      configContent = JSON.stringify(chatgptManifest, null, 2);
      break;
    }

    default: {
      const fallbackConfig = {
        mcpServers: {
          [server.slug]: {
            command: server.packageCommand,
            args: server.packageArgs,
            env: envEntries,
          },
        },
      };
      configContent = JSON.stringify(fallbackConfig, null, 2);
      break;
    }
  }

  return {
    client,
    clientName: clientMeta.name,
    configFilePath: configPath,
    configContent,
    format,
    cliCommand,
    envInstructions,
    troubleshootingNotes,
  };
}

/**
 * Returns safe removal instructions for a given client
 */
export function getSafeRemovalInstructions(serverSlug: string, client: McpClient): string {
  switch (client) {
    case "claude-code":
      return `Run: claude mcp remove ${serverSlug}`;
    case "codex-cli":
      return `Run: codex mcp unregister ${serverSlug}`;
    default:
      return `Open your client configuration file, locate the key "${serverSlug}" under "mcpServers", delete that block, and restart the editor.`;
  }
}
