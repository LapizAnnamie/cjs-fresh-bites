import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/mailer/transporter";
import { contactEmailTemplate } from "@/lib/mailer/templates/contactEmail";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = ContactSchema.parse(body);

    const html = contactEmailTemplate({ name, email, phone, message });
    const to = process.env.CONTACT_TO || process.env.MAIL_USER!;

    // send to site admin
    await transporter.sendMail({
      ...mailOptions,
      to,
      replyTo: email,
      subject: `📩 New Contact Message from ${name}`,
      html,
    });

    // confirmation to user
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; background: #fff7f8; padding: 25px; border-radius: 10px;">
          <h2 style="color: #b20000;">Hi ${name},</h2>
          <p>Thank you for your message! We'll get back to you shortly.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">— The ${
            process.env.SITE_NAME || "Team"
          }</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }
}
