import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderReceipt(email, orderDetails) {
  await resend.emails.send({
    from: 'TechStore <onboarding@resend.dev>', // Use your domain if you buy one later
    to: email,
    subject: 'Order Confirmation - TechStore',
    html: `
      <h1>Thank you for your order!</h1>
      <p>We have received your payment of <strong>GH₵ ${orderDetails.amount}</strong>.</p>
      <p>We will ship your items shortly.</p>
    `
  });
}
