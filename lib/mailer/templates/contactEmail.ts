// lib/mailer/templates/contactEmail.ts
export function contactEmailTemplate({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const date = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
  });

  return `
  <div style="font-family: Arial, sans-serif; background: #fff7f8; padding: 20px; border-radius: 10px; border: 1px solid #f3cfd3; max-width: 600px; margin: auto;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #b20000; margin-bottom: 5px;">🍴 Contact Message</h1>
      <p style="color: #555; font-size: 14px;">${date}</p>
    </div>
    <div style="background: #ffffff; padding: 15px 20px; border-radius: 8px;">
      <p style="font-size: 16px; color: #333;">
        <strong style="color: #b20000;">Name:</strong> ${name}<br/>
        <strong style="color: #b20000;">Email:</strong> ${email}<br/>
        <strong style="color: #b20000;">Phone:</strong> ${phone || "—"}
      </p>
      <hr style="margin: 20px 0; border-color: #f5c6cb;">
      <p style="font-size: 15px; color: #333; white-space: pre-wrap;">${message}</p>
    </div>
    <div style="margin-top: 25px; text-align: center; color: #888; font-size: 12px;">
      <p>This message was sent from your website’s contact form.</p>
    </div>
  </div>
  `;
}
