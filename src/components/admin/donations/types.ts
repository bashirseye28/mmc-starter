export interface Donation {
  id: string;
  donorName?: string;
  customer_email: string;
  amount_total: number; // 💰 stored in pennies (e.g., 1000 = £10.00)
  currency: string;     // "GBP", "USD", etc.
  status: string;       // "paid", "unpaid", "failed", etc.
  reference?: string;   // Purpose like "Hall Payment"
  frequency?: "one-time" | "weekly" | "monthly"; // optional if recurring
  receipt_id?: string;  // Stripe metadata: "DON-123..."
  message?: string;     // Optional custom message
  sessionId?: string;   // Stripe session ID
  source?: string;      // "stripe", "manual", "cash", "bank", etc.
  created: any;         // Firestore Timestamp (cast with toDate())

  metadata?: {
    donor_name?: string;
    donor_email?: string;
    donation_reference?: string;
    donation_amount?: string;
    donation_frequency?: string;
    donation_date?: string;
    receipt_id?: string;
    message?: string;
  };
}