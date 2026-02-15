import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// ─── MongoDB Connection (cached for serverless) ────────────────────────────
let cachedDb = null;

async function connectDB() {
  if (cachedDb && cachedDb.readyState === 1) {
    return cachedDb;
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  cachedDb = conn.connection;
  return cachedDb;
}

// ─── Mongoose Model ─────────────────────────────────────────────────────────
let ContactModel;

function getContactModel() {
  if (ContactModel) return ContactModel;

  const contactSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Please provide a valid email address',
        ],
        maxlength: [254, 'Email cannot exceed 254 characters'],
      },
      subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        minlength: [3, 'Subject must be at least 3 characters'],
        maxlength: [200, 'Subject cannot exceed 200 characters'],
      },
      message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [5000, 'Message cannot exceed 5000 characters'],
      },
      ipAddress: { type: String, select: false },
      userAgent: { type: String, select: false },
      isRead: { type: Boolean, default: false },
    },
    {
      timestamps: true,
      toJSON: {
        transform: function (doc, ret) {
          delete ret.__v;
          return ret;
        },
      },
    }
  );

  contactSchema.index({ createdAt: -1 });
  contactSchema.index({ email: 1 });
  contactSchema.index({ isRead: 1 });

  ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
  return ContactModel;
}

// ─── Email Service ──────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
}

async function sendAutoReply({ name, email, subject }) {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"Jasswanth | Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Re: ${subject} — Thank You for Reaching Out!`,
    html: getAutoReplyTemplate({ name, subject }),
  };
  return transporter.sendMail(mailOptions);
}

async function sendNotification({ name, email, subject, message, ipAddress, userAgent, createdAt }) {
  const transporter = createTransporter();
  const mailOptions = {
    from: `"Portfolio Contact System" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🔔 New Contact: "${subject}" from ${name}`,
    html: getNotificationTemplate({ name, email, subject, message, ipAddress, userAgent, createdAt }),
    replyTo: email,
  };
  return transporter.sendMail(mailOptions);
}

// ─── Email Templates ────────────────────────────────────────────────────────
function getAutoReplyTemplate({ name, subject }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#00ff88 0%,#00d4ff 50%,#bf00ff 100%);padding:3px;border-radius:16px 16px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#12121a;padding:40px 40px 30px;border-radius:14px 14px 0 0;text-align:center;">
              <div style="font-size:40px;margin-bottom:10px;">🎮</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#00ff88;letter-spacing:1px;">&lt;JASS /&gt;</h1>
              <p style="margin:5px 0 0;font-size:12px;color:#666;letter-spacing:3px;text-transform:uppercase;">Full Stack Developer</p>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:linear-gradient(180deg,transparent 0%,#00ff8810 100%);padding:0 3px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#12121a;padding:35px 40px;">
              <p style="margin:0 0 25px;font-size:18px;color:#e0e0e0;">Dear <span style="color:#00ff88;font-weight:600;">${name}</span>,</p>
              <p style="margin:0 0 20px;font-size:15px;color:#b0b0b0;line-height:1.8;">Thank you for reaching out through my portfolio website.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;"><tr>
                <td style="background:linear-gradient(135deg,#00ff8815 0%,#00d4ff10 100%);border:1px solid #00ff8830;border-radius:12px;padding:25px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td width="50" style="vertical-align:top;">
                      <div style="width:40px;height:40px;background:linear-gradient(135deg,#00ff88,#00d4ff);border-radius:10px;text-align:center;line-height:40px;font-size:20px;">✅</div>
                    </td>
                    <td style="padding-left:15px;">
                      <p style="margin:0 0 5px;font-size:14px;font-weight:600;color:#00ff88;text-transform:uppercase;letter-spacing:1px;">Message Received</p>
                      <p style="margin:0;font-size:14px;color:#b0b0b0;line-height:1.6;">I have successfully received your message regarding <span style="color:#00d4ff;font-weight:500;">"${subject}"</span>. I truly appreciate your interest in connecting with me.</p>
                    </td>
                  </tr></table>
                </td>
              </tr></table>
              <p style="margin:0 0 20px;font-size:15px;color:#b0b0b0;line-height:1.8;">I will review your message and get back to you as soon as possible.</p>
              <p style="margin:25px 0 0;font-size:15px;color:#b0b0b0;line-height:1.8;">Looking forward to connecting with you.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;"><tr>
                <td style="height:1px;background:linear-gradient(90deg,transparent,#00ff8840,#00d4ff40,transparent);"></td>
              </tr></table>
              <p style="margin:0 0 5px;font-size:15px;color:#b0b0b0;">Best Regards,</p>
              <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#00ff88;">Jasswanth</p>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:linear-gradient(135deg,#00ff88 0%,#00d4ff 50%,#bf00ff 100%);padding:0 3px 3px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#0d0d14;padding:25px 40px;border-radius:0 0 14px 14px;text-align:center;">
              <p style="margin:0 0 10px;font-size:11px;color:#555;letter-spacing:1px;text-transform:uppercase;">Powered by</p>
              <p style="margin:0;font-size:14px;color:#00ff88;font-weight:600;">&lt;JASS /&gt; Portfolio</p>
              <p style="margin:8px 0 0;font-size:11px;color:#444;">© ${new Date().getFullYear()} Jasswanth. All rights reserved.</p>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function getNotificationTemplate({ name, email, subject, message, ipAddress, userAgent, createdAt }) {
  const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#ff6b6b 0%,#ffa500 50%,#ff00ff 100%);padding:3px;border-radius:16px 16px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#12121a;padding:35px 40px 25px;border-radius:14px 14px 0 0;text-align:center;">
              <div style="font-size:40px;margin-bottom:10px;">🔔</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffa500;">New Contact Request</h1>
              <p style="margin:8px 0 0;font-size:12px;color:#666;letter-spacing:2px;text-transform:uppercase;">Portfolio Contact System</p>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:0 3px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#12121a;padding:35px 40px;">
              <p style="margin:0 0 25px;font-size:16px;color:#e0e0e0;">Hello <span style="color:#00ff88;font-weight:600;">Jasswanth</span>,</p>
              <p style="margin:0 0 25px;font-size:15px;color:#b0b0b0;line-height:1.7;">You have received a new contact request from your portfolio website.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px;"><tr>
                <td style="background:linear-gradient(135deg,#ffa50015 0%,#ff6b6b10 100%);border-left:4px solid #ffa500;border-radius:0 8px 8px 0;padding:15px 20px;">
                  <p style="margin:0;font-size:13px;color:#ffa500;font-weight:600;">⚡ Received on ${formattedDate}</p>
                </td>
              </tr></table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr>
                <td style="background-color:#1a1a2e;border:1px solid #2a2a3e;border-radius:10px;padding:20px;">
                  <p style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">From</p>
                  <p style="margin:0 0 15px;font-size:15px;color:#e0e0e0;font-weight:500;">${name} &lt;${email}&gt;</p>
                  <p style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">Subject</p>
                  <p style="margin:0 0 15px;font-size:15px;color:#ffa500;font-weight:500;">${subject}</p>
                  <p style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <p style="margin:0;font-size:14px;color:#b0b0b0;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </td>
              </tr></table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                <td style="background-color:#1a1a2e;border:1px solid #2a2a3e;border-radius:8px;padding:15px;">
                  <p style="margin:0 0 5px;font-size:11px;color:#555;">IP: ${ipAddress || 'N/A'}</p>
                  <p style="margin:0;font-size:11px;color:#555;">UA: ${userAgent || 'N/A'}</p>
                </td>
              </tr></table>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:linear-gradient(135deg,#ff6b6b 0%,#ffa500 50%,#ff00ff 100%);padding:0 3px 3px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#0d0d14;padding:20px 40px;border-radius:0 0 14px 14px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#444;">© ${new Date().getFullYear()} Jasswanth Portfolio Contact System</p>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Validation ─────────────────────────────────────────────────────────────
function validateContact({ name, email, subject, message }) {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.length < 2 || name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
  } else if (!/^[a-zA-Z\s'\-]+$/.test(name)) {
    errors.push({ field: 'name', message: 'Name can only contain letters, spaces, hyphens, and apostrophes' });
  }

  if (!email || !email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!subject || !subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (subject.length < 3 || subject.length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be between 3 and 200 characters' });
  }

  if (!message || !message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (message.length < 10 || message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must be between 10 and 5000 characters' });
  }

  return errors;
}

// ─── CORS Headers ───────────────────────────────────────────────────────────
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// ─── Serverless Handler ─────────────────────────────────────────────────────
export default async function handler(req, res) {
  setCorsHeaders(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    const { name, email, subject, message } = req.body;

    // Validate
    const validationErrors = validateContact({ name, email, subject, message });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Save to database
    const Contact = getContactModel();
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'],
    });

    // Send emails — MUST await in serverless, otherwise function terminates before emails send
    const emailResults = await Promise.allSettled([
      sendAutoReply({ name, email, subject }),
      sendNotification({
        name,
        email,
        subject,
        message,
        ipAddress: req.headers['x-forwarded-for'] || 'unknown',
        userAgent: req.headers['user-agent'],
        createdAt: contact.createdAt,
      }),
    ]);

    const emailStatus = emailResults.map((result, index) => {
      const label = index === 0 ? 'Auto-reply' : 'Notification';
      if (result.status === 'fulfilled') {
        console.log(`✅ ${label} email sent successfully`);
        return { type: label, sent: true };
      } else {
        console.error(`❌ ${label} email failed:`, result.reason?.message);
        return { type: label, sent: false, error: result.reason?.message };
      }
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
      emails: emailStatus,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};
