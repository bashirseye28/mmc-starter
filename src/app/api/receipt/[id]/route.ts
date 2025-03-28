import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

// ✅ Base64 logo (replace this full string with yours)
const MMC_LOGO_BASE64 = 'data:image/png;base64,...'; // full base64 string goes here

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

    const items = lineItems
      .filter((item: any) => item.description !== 'Shipping')
      .map((item: any) => {
        const quantity = item.quantity || 1;
        const unitPrice = (item.price?.unit_amount || 0) / 100;
        const product =
          typeof item.price?.product === 'string'
            ? item.description || 'Product'
            : item.price?.product?.name || item.description || 'Product';

        return {
          name: product,
          quantity,
          price: `£${unitPrice.toFixed(2)}`,
          total: `£${(unitPrice * quantity).toFixed(2)}`,
        };
      });

    const shippingMethod = metadata['Shipping Method'] || 'Standard Delivery';
    const shippingAddress = metadata['Shipping Address'] || 'N/A';
    const shippingCost = parseFloat(metadata['Shipping Cost'] || '0.00');

    const doc = new jsPDF();

    // ✅ Header + Branding
    if (MMC_LOGO_BASE64) {
      doc.addImage(MMC_LOGO_BASE64, 'PNG', 15, 10, 30, 30);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 118, 118);
    doc.text('Manchester Murid Community', 105, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.text('Registered Charity No: 1194666', 105, 27, { align: 'center' });

    // ✅ Customer Info
    doc.setFontSize(10);
    doc.setTextColor(30);
    doc.text(`Receipt for Order: ${metadata['Order ID'] || 'N/A'}`, 15, 48);
    doc.text(`Customer Name: ${metadata['Customer Name'] || 'N/A'}`, 15, 54);
    doc.text(`Email: ${email}`, 15, 60);

    // ✅ Items Table
    autoTable(doc, {
      startY: 70,
      head: [['Item Description', 'Qty', 'Unit Price', 'Subtotal']],
      body: items.map((item: any) => [
        item.name,
        String(item.quantity),
        item.price,
        item.total,
      ]),
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [0, 118, 118],
        textColor: 255,
        fontStyle: 'bold',
      },
    });

    const summaryStartY = (doc as any).lastAutoTable.finalY + 10;

    // ✅ Summary Section
    doc.setFontSize(10);
    doc.setTextColor(30);

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

    // ✅ Footer
    doc.setFontSize(12);
    doc.setTextColor(0, 118, 118);
    doc.text(
      'Thank you for supporting Manchester Murid Community.',
      105,
      summaryStartY + 35,
      { align: 'center' }
    );

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