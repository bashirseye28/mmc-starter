// components/admin/donations/types.ts
export interface Donation {
  id: string;
  donorName?: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  status: string;
  created: any; // Timestamp
  source?: string;
  sessionId?: string;
  reference?: string;
}