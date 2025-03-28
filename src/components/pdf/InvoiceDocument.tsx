// components/pdf/InvoiceDocument.tsx
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  label: { fontWeight: "bold", marginRight: 5 },
});

const InvoiceDocument = ({
  metadata,
  customer_email,
  amount_paid,
}: {
  metadata: Record<string, string>;
  customer_email: string;
  amount_paid: number;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Optional Logo */}
      <Image src="/images/logo.png" style={{ height: 50, marginBottom: 10 }} />

      <Text style={styles.header}>Invoice</Text>

      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Customer:</Text> {metadata["Customer Name"]}
        </Text>
        <Text>
          <Text style={styles.label}>Email:</Text> {customer_email}
        </Text>
        <Text>
          <Text style={styles.label}>Order ID:</Text> {metadata["Order ID"]}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Shipping Info:</Text>
        <Text>{metadata["Shipping Address"]}</Text>
        <Text>Method: {metadata["Shipping Method"]}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Total Paid:</Text> £{amount_paid.toFixed(2)}
      </View>

      <Text style={{ marginTop: 20, fontSize: 10 }}>
        Registered Charity No: 1194666
      </Text>
    </Page>
  </Document>
);

export default InvoiceDocument;