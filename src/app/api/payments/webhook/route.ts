import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
    }

    // In production verify webhook HMAC:
    // const isValid = verifyWebhookSignature(rawBody, signature);
    // if (!isValid) return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "payment.captured":
        // Handle payment capture idempotently
        break;
      case "subscription.activated":
        // Handle subscription activation
        break;
      case "subscription.halted":
        // Handle subscription cancellation
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
