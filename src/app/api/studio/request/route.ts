import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CustomMcpRequestSchema = z.object({
  customerName: z.string().min(2),
  organization: z.string().min(2),
  businessIndustry: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(7),
  requiredIntegration: z.string().min(2),
  targetApis: z.string().optional(),
  desiredWorkflow: z.string().min(10),
  preferredClient: z.string(),
  estimatedBudgetInr: z.string(),
  targetDeliveryDate: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CustomMcpRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`;

    // Store in Supabase / Database custom_mcp_requests table
    return NextResponse.json({
      success: true,
      enquiryId,
      message: "Custom MCP Development request registered successfully.",
      data,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
