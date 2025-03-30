import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// ⚠️ Replace with your base64 logo (with full prefix: 'data:image/png;base64,...')
const BASE64_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // <-- REPLACE THIS

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

type ReceiptItem = {
  name: string;
  quantity: number;
  price: string;
  total: string;
};

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.id, {
      expand: ['line_items.data.price.product'],
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const metadata = session.metadata || {};
    const email = session.customer_email || 'N/A';
    const amountPaid = (session.amount_total || 0) / 100;

    const lineItems = (session as any).line_items?.data || [];

    const items: ReceiptItem[] = lineItems
      .filter((item: any) => item.description !== 'Shipping')
      .map((item: any): ReceiptItem => {
        const quantity = item.quantity || 1;
        const unitPrice = (item.price?.unit_amount || 0) / 100;

        const product = item.price?.product;
        const name =
          typeof product === 'object' && product !== null && 'name' in product
            ? (product as Stripe.Product).name
            : item.description || 'Product';

        return {
          name,
          quantity,
          price: `£${unitPrice.toFixed(2)}`,
          total: `£${(unitPrice * quantity).toFixed(2)}`,
        };
      });

    const shippingMethod = metadata['Shipping Method'] || 'Standard Delivery';
    const shippingAddress = metadata['Shipping Address'] || 'N/A';
    const shippingCost = parseFloat(metadata['Shipping Cost'] || '0.00');

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB');
    const formattedTime = now.toLocaleTimeString('en-GB');

    // 🧾 PDF Generation
    const doc = new jsPDF();

    // 🟢 Logo
    if (BASE64_LOGO) {
      doc.addImage(BASE64_LOGO, 'PNG', 15, 10, 30, 30);
    }

    // 🟢 Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 118, 118);
    doc.text('Manchester Murid Community', 105, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(51, 51, 51);
    doc.text('Registered Charity No: 1194666', 105, 27, { align: 'center' });

    // 🟢 Info
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(`Date: ${formattedDate}   Time: ${formattedTime}`, 15, 43);

    doc.setTextColor(33);
    doc.text(`Receipt for Order: ${metadata['Order ID'] || 'N/A'}`, 15, 51);
    doc.text(`Customer Name: ${metadata['Customer Name'] || 'N/A'}`, 15, 57);
    doc.text(`Email: ${email}`, 15, 63);

    // 🟢 Item Table
    autoTable(doc, {
      startY: 72,
      head: [['Item', 'Qty', 'Unit Price', 'Subtotal']],
      body: items.map((item) => [
        item.name,
        String(item.quantity),
        item.price,
        item.total,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0, 118, 118] },
      styles: { fontSize: 10 },
    });

    const summaryStartY = (doc as any).lastAutoTable?.finalY || 100;

    // 🟢 Summary
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text('Shipping Method:', 15, summaryStartY);
    doc.text(shippingMethod, 60, summaryStartY);

    doc.text('Shipping Address:', 15, summaryStartY + 6);
    doc.text(shippingAddress, 60, summaryStartY + 6);

    doc.text('Shipping Cost:', 15, summaryStartY + 12);
    doc.text(`£${shippingCost.toFixed(2)}`, 60, summaryStartY + 12);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Total Paid:', 15, summaryStartY + 20);
    doc.text(`£${amountPaid.toFixed(2)}`, 60, summaryStartY + 20);

    // 🟢 Footer
    doc.setFontSize(12);
    doc.setTextColor(0, 118, 118);
    doc.text(
      'Thank you for supporting Manchester Murid Community.',
      105,
      summaryStartY + 35,
      { align: 'center' }
    );

    // 🟢 Return as downloadable file
    const pdfBuffer = doc.output('arraybuffer');

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=receipt-${params.id}.pdf`,
      },
    });
  } catch (error: any) {
    console.error('❌ Receipt generation error:', error.message);
    return NextResponse.json({ error: 'Failed to generate receipt' }, { status: 500 });
  }
}