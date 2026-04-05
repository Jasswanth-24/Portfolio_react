const nodemailer = require('nodemailer');

/**
 * Create reusable transporter using Gmail SMTP
 */
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
};

/**
 * Verify transporter connection
 */
const verifyTransporter = async () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.warn('⚠️  EMAIL_USER or EMAIL_APP_PASSWORD not set. Emails will not be sent.');
    return false;
  }
  if (!process.env.NOTIFICATION_EMAIL) {
    console.warn('⚠️  NOTIFICATION_EMAIL not set. Notification emails will not be sent.');
  }
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email transporter is ready');
    return true;
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error.message);
    console.error('   Ensure EMAIL_USER and EMAIL_APP_PASSWORD are correct.');
    console.error('   For Gmail, use an App Password: https://myaccount.google.com/apppasswords');
    return false;
  }
};

module.exports = { createTransporter, verifyTransporter };
