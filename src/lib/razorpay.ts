import crypto from "crypto";

export interface CreateOrderParams {
  amountInr: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

/**
 * Verify Razorpay payment signature using HMAC SHA256
 */
export function verifyRazorpaySignature(params: VerifyPaymentParams): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.warn("RAZORPAY_KEY_SECRET is not set; in demo/dev mode verifying format only");
    return params.razorpayOrderId.startsWith("order_") && params.razorpayPaymentId.startsWith("pay_");
  }

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(params.razorpaySignature)
  );
}

/**
 * Verify Razorpay Webhook signature
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) return false;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}
