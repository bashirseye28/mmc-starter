import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  amount: string;
  reference: string;
  date: string;
  receiptId: string;
}

export default function DonationReceiptEmail({
  name,
  amount,
  reference,
  date,
  receiptId,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your donation to MMC is confirmed</Preview>
      <Body style={{ backgroundColor: "#f5f5f5", fontFamily: "Arial" }}>
        <Container style={{ maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salaam {name},
            </Text>
            <Text>
              We’ve received your generous donation to Manchester Murid Community. Jazak’Allah khair!
            </Text>
            <Text><strong>Amount:</strong> £{amount}</Text>
            <Text><strong>Reference:</strong> {reference}</Text>
            <Text><strong>Date:</strong> {date}</Text>
            <Text><strong>Receipt ID:</strong> {receiptId}</Text>
            <Text style={{ marginTop: "30px" }}>
              May Allah reward you and your family abundantly.
            </Text>
            <Text>— MMC Finance Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}