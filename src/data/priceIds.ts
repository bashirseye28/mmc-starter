// Centralized Stripe price ID config for Jaayante tiers
export const jaayantePriceIds: Record<string, string> = {
  sindiidi: process.env.NEXT_PUBLIC_PRICE_SINDIIDI!,
  wakaana: process.env.NEXT_PUBLIC_PRICE_WAKAANA!,
  jaalibatu: process.env.NEXT_PUBLIC_PRICE_JAALIBATU!,
  mawaahibu: process.env.NEXT_PUBLIC_PRICE_MAWAAHIBU!,
  midaadi: process.env.NEXT_PUBLIC_PRICE_MIDAADI!,
  "fathul-fattah": process.env.NEXT_PUBLIC_PRICE_FATHUL_FATTAH!, // ✅ now correctly points to updated price_1RNqNv...
};