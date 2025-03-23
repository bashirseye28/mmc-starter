import Stripe from "stripe";

// ✅ Initialize Stripe with Secret Key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});