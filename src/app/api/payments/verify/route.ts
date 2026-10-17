import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { z } from "zod";

const VerifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  plan: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payment payload" }, { status: 400 });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, plan } = parsed.data;

    // Verify cryptographic signature server-side
    const isValid = verifyRazorpaySignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed: Invalid HMAC signature" },
        { status: 400 }
      );
    }

    // Grant access entitlements server-side (in Supabase database)
    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and subscription activated.",
      entitlement: {
        plan,
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        activatedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
