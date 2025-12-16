import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

function validateConfig() {
  console.log("🔧 Validating Resend configuration...");
  console.log("Resend Config:", {
    hasApiKey: !!process.env.RESEND_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    senderName: process.env.SENDER_NAME,
  });

  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "Missing Resend configuration. Please check .env.local: RESEND_API_KEY"
    );
  }

  if (!process.env.SENDER_EMAIL) {
    throw new Error(
      "Missing sender configuration. Please check .env.local: SENDER_EMAIL"
    );
  }

  console.log("✅ Resend configuration is valid");
}
/**
 * Send confirmation email to user
 * @param {string} userEmail - Recipient email address
 * @param {string} userName - Recipient name
 * @param {string} inquiryType - Type of inquiry
 * @returns {Promise<object>} Email send result
 */
export async function sendConfirmationEmail(userEmail, userName, inquiryType) {
  try {
    validateConfig();

    console.log("📧 Starting email send process with Resend...");

    // Get current date
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString("en-US", dateOptions);

    const refId = `#REF-${Math.floor(100000 + Math.random() * 900000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://khales.ae";
    const logoUrl = `${baseUrl}/assets/Khales%20Logo%20K%20-%20favicon.png`;

    const emailHtml = `
      <!DOCTYPE html>
      <html dir="ltr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #1a1a1a; line-height: 1.6; }
          a { color: #66a109; text-decoration: none; font-weight: 600; }
          .email-wrapper { padding: 40px 10px; background-color: #f9f9f9; }
          .email-card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08); }
          .header { padding: 40px 40px 20px 40px; border-bottom: 1px solid #f0f0f0; }
          .brand-container { display: flex; align-items: center; gap: 12px; }
          .department-text { font-size: 14px; color: #777; margin-top: 10px; font-weight: 500; }
          .content { padding: 40px; }
          .accent-message { border-left: 4px solid #66a109; padding-left: 20px; margin-bottom: 30px; background-color: #fafafa; padding-top: 15px; padding-bottom: 15px; border-radius: 0 8px 8px 0; }
          h2 { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-top: 0; }
          p { margin-bottom: 20px; color: #333; font-size: 16px; }
          .checklist { list-style: none; padding: 0; margin: 25px 0; }
          .checklist li { position: relative; padding-left: 30px; margin-bottom: 12px; font-size: 16px; color: #333; }
          .checkmark { position: absolute; left: 0; top: 0; color: #66a109; font-weight: bold; font-size: 18px; }
          .footer { background-color: #f5f5f5; padding: 30px 40px; font-size: 13px; color: #888; border-top: 1px solid #eee; }
          .contact-row { margin-bottom: 10px; }
          @media only screen and (max-width: 480px) {
            .email-card { width: 100% !important; border-radius: 0 !important; }
            .content { padding: 25px !important; }
            .header { padding: 25px !important; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-card">
            <div class="header">
              <div class="brand-container">
                 <img src="${logoUrl}" alt="Khales Logo" width="40" height="40" style="display: block; border-radius: 4px;" />
                 <span style="font-size: 22px; font-weight: 700; color: #1a1a1a; margin-left: 10px;">Khales Group</span>
              </div>
              <div class="department-text">Inquiry Received &bull; ${currentDate}</div>
            </div>

            <div class="content">
              <div class="accent-message">
                <p style="margin:0; font-weight: 500;">
                  Dear <strong>${userName}</strong>,<br><br>
                  We have successfully received your message regarding <strong>${inquiryType}</strong>.
                </p>
              </div>

              <p>Thank you for reaching out to Khales Group. We value your interest and look forward to understanding how we can assist you.</p>

              <h3 style="font-size: 18px; font-weight: 700; margin-top: 30px;">What happens next?</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 20px;">We have logged your contact details in our system:</p>

              <ul class="checklist">
                <li><span class="checkmark">✔</span> Your inquiry has been routed to our engagement team</li>
                <li><span class="checkmark">✔</span> A representative will reach out shortly to introduce our services</li>
                <li><span class="checkmark">✔</span> We will schedule a brief discussion to understand your needs</li>
              </ul>

              <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                If you have any urgent matters, please don't hesitate to contact us directly.
              </p>
            </div>

            <div class="footer">
              <div class="contact-row">
                <strong>📞 +971 55 129 9880</strong> <span style="margin: 0 10px; color: #ccc;">|</span> 
                <strong>📧 info@khales.ae</strong>
              </div>
              <div style="margin-top: 20px;">
                &copy; 2024 Khales Group. All rights reserved.<br>
                <span style="font-size: 11px; opacity: 0.7;">Reference ID: ${refId}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
      to: userEmail,
      // 👇 THIS LINE SENDS A COPY TO YOUR SERVER/INBOX
      bcc: process.env.SENDER_EMAIL, // Or type a specific email like "it@khales.ae"
      subject: `Inquiry Received: ${inquiryType} (${refId})`,
      html: emailHtml,
    });

    if (result.error) {
      console.error("❌ Resend API error:", result.error);
      return { success: false, error: result.error };
    }

    console.log("✅ Confirmation email sent successfully via Resend");
    return { success: true, messageId: result.data.id, refId };
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error.message);
    return { success: false, error: error.message };
  }
}
