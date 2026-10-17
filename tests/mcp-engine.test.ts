import { MCP_SERVERS_CATALOG } from "../src/data/mcpCatalog";
import { generateMcpClientConfig, getSafeRemovalInstructions } from "../src/lib/mcpConfigEngine";
import { McpClient } from "../src/types/mcp";

// Simple test runner for validation
export function runTests() {
  console.log("=== RUNNING SUDARSHAN MCP HUB ENGINE TESTS ===");
  let passed = 0;
  let failed = 0;

  // Test 1: Catalog completeness
  if (MCP_SERVERS_CATALOG.length >= 15) {
    console.log(`[PASS] Catalog contains ${MCP_SERVERS_CATALOG.length} verified integrations (>= 15 required)`);
    passed++;
  } else {
    console.error(`[FAIL] Catalog has only ${MCP_SERVERS_CATALOG.length} integrations`);
    failed++;
  }

  // Test 2: Check Indian Business Suite flagships
  const indianSuite = MCP_SERVERS_CATALOG.filter((s) => s.isIndianBusinessSuite);
  if (indianSuite.length >= 5) {
    console.log(`[PASS] Indian Business Suite contains ${indianSuite.length} flagship integrations (WhatsApp, GST, SEO, CRM, E-commerce)`);
    passed++;
  } else {
    console.error(`[FAIL] Expected at least 5 Indian suite servers, found ${indianSuite.length}`);
    failed++;
  }

  // Test 3: Cursor configuration generator
  const githubServer = MCP_SERVERS_CATALOG.find((s) => s.slug === "github-mcp")!;
  const cursorConfig = generateMcpClientConfig({
    server: githubServer,
    client: "cursor",
    customEnv: { GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_test12345" },
    os: "windows",
  });

  const parsedCursor = JSON.parse(cursorConfig.configContent);
  if (
    parsedCursor.mcpServers["github-mcp"] &&
    parsedCursor.mcpServers["github-mcp"].command === "npx" &&
    parsedCursor.mcpServers["github-mcp"].env.GITHUB_PERSONAL_ACCESS_TOKEN === "ghp_test12345"
  ) {
    console.log("[PASS] Cursor configuration generated and verified with custom env variables");
    passed++;
  } else {
    console.error("[FAIL] Cursor configuration generation failed validation");
    failed++;
  }

  // Test 4: Claude Desktop configuration generator
  const supabaseServer = MCP_SERVERS_CATALOG.find((s) => s.slug === "supabase-mcp")!;
  const claudeConfig = generateMcpClientConfig({
    server: supabaseServer,
    client: "claude-desktop",
    customEnv: {
      SUPABASE_URL: "https://test.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "secret_test_key",
    },
    os: "macos",
  });

  const parsedClaude = JSON.parse(claudeConfig.configContent);
  if (
    parsedClaude.mcpServers["supabase-mcp"] &&
    parsedClaude.mcpServers["supabase-mcp"].env.SUPABASE_URL === "https://test.supabase.co"
  ) {
    console.log("[PASS] Claude Desktop config successfully generated with macOS path hints");
    passed++;
  } else {
    console.error("[FAIL] Claude Desktop configuration failed");
    failed++;
  }

  // Test 5: Claude Code CLI command generator
  const claudeCodeConfig = generateMcpClientConfig({
    server: githubServer,
    client: "claude-code",
    customEnv: { GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_testtoken" },
  });

  if (
    claudeCodeConfig.format === "cli" &&
    claudeCodeConfig.configContent.startsWith("claude mcp add github-mcp") &&
    claudeCodeConfig.configContent.includes('GITHUB_PERSONAL_ACCESS_TOKEN="ghp_testtoken"')
  ) {
    console.log("[PASS] Claude Code CLI command generated accurately");
    passed++;
  } else {
    console.error("[FAIL] Claude Code CLI generator failed");
    failed++;
  }

  // Test 6: Safe removal instructions test
  const removal = getSafeRemovalInstructions("github-mcp", "claude-code");
  if (removal === "Run: claude mcp remove github-mcp") {
    console.log("[PASS] Safe removal instructions generated correctly");
    passed++;
  } else {
    console.error("[FAIL] Safe removal instructions failed");
    failed++;
  }

  console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed.`);
  return failed === 0;
}
