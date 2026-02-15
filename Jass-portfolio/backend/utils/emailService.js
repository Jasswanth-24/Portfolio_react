const { createTransporter } = require('../config/email');
const { getAutoReplyTemplate, getNotificationTemplate } = require('../utils/emailTemplates');

/**
 * Send auto-reply email to the person who submitted the contact form
 */
const sendAutoReply = async ({ name, email, subject }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Jasswanth | Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Re: ${subject} — Thank You for Reaching Out!`,
    html: getAutoReplyTemplate({ name, subject }),
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send notification email to Jasswanth when someone submits the contact form
 */
const sendNotification = async ({ name, email, subject, message, ipAddress, userAgent, createdAt }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact System" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🔔 New Contact: "${subject}" from ${name}`,
    html: getNotificationTemplate({ name, email, subject, message, ipAddress, userAgent, createdAt }),
    replyTo: email,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendAutoReply, sendNotification };
