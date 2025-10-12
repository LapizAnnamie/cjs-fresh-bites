import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export const mailOptions = {
  from: `"${process.env.SITE_NAME || "Website"}" <${process.env.MAIL_USER}>`,
};
