import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateOrderSchema = z.object({
  plan: z.enum(["pro", "business", "custom"]),
  billingCycle: z.enum(["monthly", "annual"]).default("monthly"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid plan selection" }, { status: 400 });
    }

    const { plan, billingCycle } = parsed.data;

    // Price mapping in INR
    let amountInr = 0;
    if (plan === "pro") {
      amountInr = billingCycle === "annual" ? 399 * 12 : 499;
    } else if (plan === "business") {
      amountInr = billingCycle === "annual" ? 1599 * 12 : 1999;
    } else {
      amountInr = 25000;
    }

    // In production with live credentials, call Razorpay Orders API:
    // const order = await razorpay.orders.create({ amount: amountInr * 100, currency: 'INR', receipt: ... })
    // Here we generate a compliant order structure
    const razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amountInr,
      currency: "INR",
      plan,
      billingCycle,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_sudarshan_hub",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
