const emailUsr = process.env.EMAIL_USER;
const emailPwd = process.env.EMAIL_PASSWORD;

export const gmailTransportConfig = {
  service: 'gmail',
  auth: {
    user: emailUsr,
    pass: emailPwd,
  },
};
