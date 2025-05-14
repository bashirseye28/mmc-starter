// src/utils/stripePriceMap.ts

// Define a consistent Frequency type
export type Frequency = "one-time" | "weekly" | "monthly";

// Main map of price IDs from Stripe
export const priceMap: Record<number, Record<Frequency, string>> = {
  5: {
    "one-time": "price_1ROXpE2M54cogX5db7hl4KTA",
    weekly: "price_1ROXTh2M54cogX5d2RLAmjiv",
    monthly: "price_1ROXSY2M54cogX5dlXtCTYGd",
  },
  10: {
    "one-time": "price_1ROXpy2M54cogX5dWMQnlDnI",
    weekly: "price_1ROXZ82M54cogX5dSvRBns0y",
    monthly: "price_1ROXZ82M54cogX5dUG4SWqu2",
  },
  20: {
    "one-time": "price_1ROXqW2M54cogX5doqPxpKI9",
    weekly: "price_1ROXbo2M54cogX5dm5j8ilER",
    monthly: "price_1ROXbH2M54cogX5djB1C045J",
  },
  30: {
    "one-time": "price_1ROXr32M54cogX5du2PL1iqG",
    weekly: "price_1ROXds2M54cogX5dYydwA0Q6",
    monthly: "price_1ROXds2M54cogX5dtaqqd1oE",
  },
  50: {
    "one-time": "price_1ROXrW2M54cogX5dk2pb61xE",
    weekly: "price_1ROXgt2M54cogX5dT98aNTsu",
    monthly: "price_1ROXgt2M54cogX5d5ir6JgIk",
  },
  100: {
    "one-time": "price_1ROXuA2M54cogX5dFCIQsDeE",
    weekly: "price_1ROXk92M54cogX5dFEN2P572",
    monthly: "price_1ROXk92M54cogX5dVjPnI9X0",
  },
};

// Optional utility to get a priceId safely
export const getStripePriceId = (
  amount: number,
  frequency: Frequency
): string | null => {
  return priceMap[amount]?.[frequency] || null;
};