import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // Use `true` for 465, `false` for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(to: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Thank You for Volunteering!",
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for signing up as a volunteer with the Manchester Murid Community. Your support means a lot to us.</p>
        <p>We will review your submission and contact you soon.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>MMC Volunteer Team</strong></p>
      `,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}