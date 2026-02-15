/**
 * Professional HTML email templates for portfolio contact system
 */

/**
 * Email 1 — Auto Reply to the person who contacted
 */
const getAutoReplyTemplate = ({ name, subject }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jasswanth | Portfolio</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00ff88 0%,#00d4ff 50%,#bf00ff 100%);padding:3px;border-radius:16px 16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#12121a;padding:40px 40px 30px;border-radius:14px 14px 0 0;text-align:center;">
                    <div style="font-size:40px;margin-bottom:10px;">🎮</div>
                    <h1 style="margin:0;font-size:24px;font-weight:700;color:#00ff88;letter-spacing:1px;">&lt;JASS /&gt;</h1>
                    <p style="margin:5px 0 0;font-size:12px;color:#666;letter-spacing:3px;text-transform:uppercase;">Full Stack Developer</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:linear-gradient(180deg,transparent 0%,#00ff8810 100%);padding:0 3px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#12121a;padding:35px 40px;">

                    <!-- Greeting -->
                    <p style="margin:0 0 25px;font-size:18px;color:#e0e0e0;">Dear <span style="color:#00ff88;font-weight:600;">${name}</span>,</p>

                    <p style="margin:0 0 20px;font-size:15px;color:#b0b0b0;line-height:1.8;">
                      Thank you for reaching out through my portfolio website.
                    </p>

                    <!-- Status Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#00ff8815 0%,#00d4ff10 100%);border:1px solid #00ff8830;border-radius:12px;padding:25px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50" style="vertical-align:top;">
                                <div style="width:40px;height:40px;background:linear-gradient(135deg,#00ff88,#00d4ff);border-radius:10px;text-align:center;line-height:40px;font-size:20px;">✅</div>
                              </td>
                              <td style="padding-left:15px;">
                                <p style="margin:0 0 5px;font-size:14px;font-weight:600;color:#00ff88;text-transform:uppercase;letter-spacing:1px;">Message Received</p>
                                <p style="margin:0;font-size:14px;color:#b0b0b0;line-height:1.6;">
                                  I have successfully received your message regarding <span style="color:#00d4ff;font-weight:500;">"${subject}"</span>. I truly appreciate your interest in connecting with me.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 20px;font-size:15px;color:#b0b0b0;line-height:1.8;">
                      I will review your message and get back to you as soon as possible. If your request is urgent, please feel free to reply to this email directly.
                    </p>

                    <p style="margin:25px 0 0;font-size:15px;color:#b0b0b0;line-height:1.8;">
                      Looking forward to connecting with you.
                    </p>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;">
                      <tr>
                        <td style="height:1px;background:linear-gradient(90deg,transparent,#00ff8840,#00d4ff40,transparent);"></td>
                      </tr>
                    </table>

                    <!-- Signature -->
                    <p style="margin:0 0 5px;font-size:15px;color:#b0b0b0;">Best Regards,</p>
                    <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#00ff88;">Jasswanth</p>

                    <!-- Contact Info -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;">
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:14px;color:#666;">📱</span>
                          <a href="tel:+919361184191" style="font-size:13px;color:#b0b0b0;text-decoration:none;margin-left:8px;">+91 9361184191</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:14px;color:#666;">💼</span>
                          <a href="https://www.linkedin.com/in/jasswanth-s" style="font-size:13px;color:#00d4ff;text-decoration:none;margin-left:8px;">linkedin.com/in/jasswanth-s</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <span style="font-size:14px;color:#666;">🐙</span>
                          <a href="https://github.com/Jasswanth-24" style="font-size:13px;color:#00d4ff;text-decoration:none;margin-left:8px;">github.com/Jasswanth-24</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:linear-gradient(135deg,#00ff88 0%,#00d4ff 50%,#bf00ff 100%);padding:0 3px 3px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#0d0d14;padding:25px 40px;border-radius:0 0 14px 14px;text-align:center;">
                    <p style="margin:0 0 10px;font-size:11px;color:#555;letter-spacing:1px;text-transform:uppercase;">Powered by</p>
                    <p style="margin:0;font-size:14px;color:#00ff88;font-weight:600;">&lt;JASS /&gt; Portfolio</p>
                    <p style="margin:8px 0 0;font-size:11px;color:#444;">© ${new Date().getFullYear()} Jasswanth. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Email 2 — Notification to Jasswanth when someone contacts
 */
const getNotificationTemplate = ({ name, email, subject, message, ipAddress, userAgent, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Request</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff6b6b 0%,#ffa500 50%,#ff00ff 100%);padding:3px;border-radius:16px 16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#12121a;padding:35px 40px 25px;border-radius:14px 14px 0 0;text-align:center;">
                    <div style="font-size:40px;margin-bottom:10px;">🔔</div>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffa500;">New Contact Request</h1>
                    <p style="margin:8px 0 0;font-size:12px;color:#666;letter-spacing:2px;text-transform:uppercase;">Portfolio Contact System</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 3px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#12121a;padding:35px 40px;">

                    <p style="margin:0 0 25px;font-size:16px;color:#e0e0e0;">Hello <span style="color:#00ff88;font-weight:600;">Jasswanth</span>,</p>

                    <p style="margin:0 0 25px;font-size:15px;color:#b0b0b0;line-height:1.7;">
                      You have received a new contact request from your portfolio website.
                    </p>

                    <!-- Alert Banner -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#ffa50015 0%,#ff6b6b10 100%);border-left:4px solid #ffa500;border-radius:0 8px 8px 0;padding:15px 20px;">
                          <p style="margin:0;font-size:13px;color:#ffa500;font-weight:600;">⚡ Received on ${formattedDate}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Contact Details Card -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a25;border:1px solid #ffffff10;border-radius:12px;overflow:hidden;margin:0 0 25px;">
                      
                      <!-- Card Header -->
                      <tr>
                        <td colspan="2" style="background:linear-gradient(90deg,#ffa50020,#ff6b6b10);padding:15px 20px;border-bottom:1px solid #ffffff10;">
                          <p style="margin:0;font-size:13px;font-weight:600;color:#ffa500;text-transform:uppercase;letter-spacing:1.5px;">📋 Contact Details</p>
                        </td>
                      </tr>

                      <!-- Name -->
                      <tr>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;width:120px;">
                          <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">👤 Name</p>
                        </td>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;">
                          <p style="margin:0;font-size:15px;color:#e0e0e0;font-weight:600;">${name}</p>
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;">
                          <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">📧 Email</p>
                        </td>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;">
                          <a href="mailto:${email}" style="font-size:15px;color:#00d4ff;text-decoration:none;font-weight:500;">${email}</a>
                        </td>
                      </tr>

                      <!-- Subject -->
                      <tr>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;">
                          <p style="margin:0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">🎯 Subject</p>
                        </td>
                        <td style="padding:15px 20px;border-bottom:1px solid #ffffff08;">
                          <p style="margin:0;font-size:15px;color:#ffa500;font-weight:500;">${subject}</p>
                        </td>
                      </tr>

                      <!-- Message -->
                      <tr>
                        <td colspan="2" style="padding:15px 20px;">
                          <p style="margin:0 0 10px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;">💬 Message</p>
                          <div style="background-color:#0a0a12;border:1px solid #ffffff08;border-radius:8px;padding:20px;">
                            <p style="margin:0;font-size:14px;color:#d0d0d0;line-height:1.8;white-space:pre-wrap;">${message}</p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Quick Actions -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 15px;">
                      <tr>
                        <td align="center" style="padding:5px;">
                          <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:linear-gradient(135deg,#00ff88,#00d4ff);color:#0a0a0f;font-size:14px;font-weight:700;text-decoration:none;padding:14px 35px;border-radius:8px;letter-spacing:0.5px;">↩️ Reply to ${name}</a>
                        </td>
                      </tr>
                    </table>

                    <!-- Metadata -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;">
                      <tr>
                        <td style="background-color:#0d0d14;border-radius:8px;padding:15px 20px;">
                          <p style="margin:0 0 5px;font-size:11px;color:#444;text-transform:uppercase;letter-spacing:1px;">System Info</p>
                          <p style="margin:0 0 3px;font-size:11px;color:#555;">IP: ${ipAddress || 'N/A'}</p>
                          <p style="margin:0;font-size:11px;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:500px;">${userAgent || 'N/A'}</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff6b6b 0%,#ffa500 50%,#ff00ff 100%);padding:0 3px 3px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#0d0d14;padding:20px 40px;border-radius:0 0 14px 14px;text-align:center;">
                    <p style="margin:0 0 5px;font-size:11px;color:#555;">🤖 This is an automated notification from your portfolio contact system.</p>
                    <p style="margin:0;font-size:11px;color:#444;">© ${new Date().getFullYear()} &lt;JASS /&gt; Portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = { getAutoReplyTemplate, getNotificationTemplate };
