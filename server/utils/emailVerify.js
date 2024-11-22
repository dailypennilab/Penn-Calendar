const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendVerificationEmail(user) {
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  const verificationUrl = `$http://localhost:3000/verify-email?token=${token}`;

  const msg = {
    to: user.email,
    from: 'ilabmanager@dailypennsylvanian.com',
    subject: '[Penn Calendar] Verify Your Email Address',
    html: `
      <h1>Welcome to Penn Calendar!</h1>
      <p>Please verify your email address to activate your account.</p>
      <p><a href="${verificationUrl}">Click here to verify</a></p>
      <p>If you did not create an account, you can ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
  return token;
}

module.exports = sendVerificationEmail;
