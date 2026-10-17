export type McpCategory =
  | "Software Development"
  | "Git & GitHub"
  | "Cloud & Deployment"
  | "Databases"
  | "AI & LLM Tools"
  | "Browser Automation"
  | "Productivity"
  | "Design"
  | "Communication"
  | "E-commerce"
  | "Marketing & SEO"
  | "CRM & Sales"
  | "Finance & Accounting"
  | "Indian Business Automation";

export type McpClient =
  | "vscode"
  | "cursor"
  | "claude-desktop"
  | "claude-code"
  | "codex-cli"
  | "chatgpt"
  | "windsurf";

export interface McpClientMeta {
  id: McpClient;
  name: string;
  configFileName: string;
  configPathHint: {
    windows: string;
    macos: string;
    linux: string;
  };
  docUrl: string;
}

export type TransportType = "stdio" | "sse" | "websocket" | "stream";

export type PublisherType = "official" | "community" | "sudarshan";

export interface McpTool {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  requiredPermissions?: string[];
}

export interface McpEnvVar {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
  placeholder?: string;
  isSecret?: boolean;
}

export interface McpServer {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: McpCategory;
  publisher: {
    name: string;
    type: PublisherType;
    verified: boolean;
    url?: string;
    avatarUrl?: string;
  };
  pricing: {
    type: "free" | "paid" | "freemium";
    priceInr?: number;
    billingPeriod?: "monthly" | "one-time";
  };
  transport: TransportType;
  runtime: "node" | "python" | "docker" | "remote-sse";
  packageCommand: string;
  packageArgs: string[];
  environmentVariables: McpEnvVar[];
  supportedClients: McpClient[];
  tools: McpTool[];
  version: string;
  versionHistory: { version: string; releaseDate: string; notes: string }[];
  securityNotice?: string;
  requiredPermissions: string[];
  githubUrl?: string;
  documentationUrl?: string;
  npmUrl?: string;
  featured?: boolean;
  trending?: boolean;
  isIndianBusinessSuite?: boolean;
  stats: {
    downloads: number;
    stars: number;
    rating: number;
    reviewsCount: number;
  };
  useCases: string[];
}

export interface InstallationConfigResult {
  client: McpClient;
  clientName: string;
  configFilePath: string;
  configContent: string;
  format: "json" | "cli" | "yaml";
  cliCommand?: string;
  envInstructions: string[];
  troubleshootingNotes: string[];
}

export interface CustomMcpRequest {
  id?: string;
  customerName: string;
  organization: string;
  businessIndustry: string;
  contactEmail: string;
  contactPhone: string;
  requiredIntegration: string;
  targetApis: string[];
  desiredWorkflow: string;
  preferredClients: McpClient[];
  estimatedBudgetInr: string;
  targetDeliveryDate: string;
  detailedRequirements: string;
  status?: "pending" | "qualifying" | "proposal_sent" | "approved" | "in_development" | "delivered";
  createdAt?: string;
}
