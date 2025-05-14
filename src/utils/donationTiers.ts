// src/utils/donationTiers.ts

import { Frequency } from "@/components/Donate/DonationIntent";

export type DonationTier = {
  amount: number;
  description: string;
  reference: string;
  defaultFrequency: Frequency;
};

export const donationTiers: DonationTier[] = [
  {
    amount: 5,
    description: "Provide food and drinks during our weekly Daahira gatherings.",
    reference: "Weekly Daahira Contribution",
    defaultFrequency: "weekly",
  },
  {
    amount: 10,
    description: "Contribute an Addiya to Touba in honour of our Murid tradition.",
    reference: "Monthly Addiya Touba",
    defaultFrequency: "monthly",
  },
  {
    amount: 20,
    description: "Provide books and supplies for one child in our Madrassah.",
    reference: "Sponsor a Child in our Madrassah",
    defaultFrequency: "one-time",
  },
  {
    amount: 30,
    description: "Help fund Keur Serigne Touba — our future Islamic Centre.",
    reference: "KST Monthly Contribution",
    defaultFrequency: "monthly",
  },
  {
    amount: 50,
    description: "Help feed individuals and families in need through our welfare programme.",
    reference: "Social and Welfare Support",
    defaultFrequency: "one-time",
  },
  {
    amount: 100,
    description: "Sponsor one full weekly hall rental for Daahira activities.",
    reference: "Daahira Hall Payment",
    defaultFrequency: "one-time",
  },
];