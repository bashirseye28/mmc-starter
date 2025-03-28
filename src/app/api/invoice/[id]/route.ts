import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.id);

    if (!session) {
      return NextResponse.json({ error: 'Session not found.' }, { status: 404 });
    }

    const metadata = session.metadata || {};
    const customerEmail = session.customer_email || 'N/A';
    const amountPaid = (session.amount_total || 0) / 100;

    // Create a simple PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const drawText = (text: string, y: number) => {
      page.drawText(text, {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    };

    drawText('Manchester Murid Community', 360);
    drawText('Registered Charity No: 1194666', 340);
    drawText('-----------------------------', 325);
    drawText(`Order ID: ${metadata['Order ID']}`, 305);
    drawText(`Name: ${metadata['Customer Name']}`, 285);
    drawText(`Email: ${customerEmail}`, 265);
    drawText(`Phone: ${metadata['Phone']}`, 245);
    drawText(`Shipping Method: ${metadata['Shipping Method']}`, 225);
    drawText(`Shipping Address: ${metadata['Shipping Address']}`, 205);
    drawText(`Shipping Cost: £${metadata['Shipping Cost']}`, 185);
    drawText(`Total Paid: £${amountPaid.toFixed(2)}`, 165);

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice-${params.id}.pdf`,
      },
    });
  } catch (err: any) {
    console.error('❌ Failed to generate PDF:', err.message);
    return NextResponse.json({ error: 'Failed to generate invoice.' }, { status: 500 });
  }
}