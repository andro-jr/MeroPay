const nodemailer = require('nodemailer');

exports.generateOTP = (otp_length = 6) => {
  // Generate 6 digit OPT
  let otp = '';
  for (let i = 1; i <= otp_length; i++) {
    let randomVal = Math.round(Math.random() * 9);
    otp += randomVal;
  }
  return otp;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
