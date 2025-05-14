export function generateDonationId() {
  const timestamp = Date.now(); // ms since epoch
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit
  return `DON-${timestamp}-${random}`;
}