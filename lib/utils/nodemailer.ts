import nodemailer from 'nodemailer';

import { gmailTransportConfig } from '@/lib/configs/nodemailer.config';

const emailUsr = process.env.EMAIL_USER;

type TSendEmailArgs = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const gmailTransporter = nodemailer.createTransport(gmailTransportConfig);

// See: https://nodemailer.com/message/
export const sendEmail = async (data: TSendEmailArgs) => {
  let info = await gmailTransporter.sendMail(data);
  return !!info?.messageId;
};

export const createVerificationEmail = ({
  email,
  url,
}: {
  email: string;
  url: string;
}): TSendEmailArgs => {
  const from = `Chat AI <${emailUsr}>`;
  const to = email;
  const subject = 'Verify Your Chat AI Email Address';
  const html = `
    <div style="text-align:center;padding:2rem;color:#151518;">
      <h1 style="font-size:1.5rem;font-weight:bold;margin:0;">
        Chat AI
      </h1>
      <p style="margin-top:1rem;margin-bottom:2rem;">
        Please click the button to confirm your email address.
      </p>
      <a style="color:#ffffff;background-color:#151518;padding:0.75rem 3rem;text-decoration:none; border-radius:10px;" href="${url}" target="_blank" rel="noopener noreferrer">Confirm</a>
    </div>
  `;

  return {
    from,
    to,
    subject,
    html,
  };
};
