import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (to: string, subject: string, body: string) => {

  const transporter = nodemailer.createTransport({
    host: process.env.CONTACT_MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.CONTACT_MAIL_USER,
      pass: process.env.CONTACT_MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `${process.env.CONTACT_MAIL_NAME} <${process.env.CONTACT_MAIL_USER}>`,
    to,
    subject,
    html: body,
  });
};

export default sendMail;
