// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-02-24.acacia",
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//     //   payment_method_types: ["card", "paypal", "apple_pay", "google_pay"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: "Your Order" },
//             unit_amount: 5000, // Amount in cents ($50.00)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${req.headers.origin}/checkout/success`,
//       cancel_url: `${req.headers.origin}/checkout/cancel`,
//     });

//     res.status(200).json({ id: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }