
import { BrevoClient } from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName = process.env.BREVO_SENDER_NAME;

if (!apiKey || !senderEmail || !senderName) {
  throw new Error("Brevo environment variables are missing.");
}

const brevo = new BrevoClient({ apiKey });

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const sendBrevoTestEmail = async (to: string) => {
  return brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: to }],
    subject: "Brevo test email - MERN Blog",
    textContent:
      "Congratulations! Your MERN Blog backend has successfully connected to Brevo.",
    htmlContent: `
      <h2>Brevo integration successful!</h2>
      <p>Your MERN Blog backend has successfully connected to Brevo.</p>
    `,
  });
};

export const sendNewsletterEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  const safeSubject = escapeHtml(subject);
  const safeContent = escapeHtml(content);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body style="margin:0;padding:24px;font-family:Arial,sans-serif;color:#1e293b;line-height:1.7">
        <div style="max-width:600px;margin:0 auto">
          <h1 style="font-size:24px">${safeSubject}</h1>

          <div style="white-space:pre-wrap">${safeContent}</div>

          <hr style="margin-top:32px;border:0;border-top:1px solid #e2e8f0" />

          <p style="font-size:12px;color:#64748b">
            You received this email because you subscribed to our newsletter.
          </p>
        </div>
      </body>
    </html>
  `;

  return brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [{ email: to }],
    subject,
    textContent: content,
    htmlContent,
  });
};
