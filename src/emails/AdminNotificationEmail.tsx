// src/emails/AdminNotificationEmail.tsx
interface AdminNotificationEmailProps {
  name: string;
  amount: string;
  reference: string;
  date: string;
  email: string;
  receiptId: string;
}

export default function AdminNotificationEmail({
  name,
  amount,
  reference,
  date,
  email,
  receiptId,
}: AdminNotificationEmailProps) {
  return (
    <div>
      <h3>New Donation Received</h3>
      <ul>
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Amount:</strong> £{amount}</li>
        <li><strong>Reference:</strong> {reference}</li>
        <li><strong>Date:</strong> {date}</li>
        <li><strong>Receipt ID:</strong> {receiptId}</li>
      </ul>
    </div>
  );
}