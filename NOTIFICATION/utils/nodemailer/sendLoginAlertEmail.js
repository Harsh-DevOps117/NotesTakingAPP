import transport from "./nodemaile.js";

export const sendLoginAlertEmail = async ({ email,  username }) => {
  if (!email || !username) {
    throw new Error("Invalid mail payload");
  }

  await transport.sendMail({
    from: {
      address: "8707460911HAR@GMAIL.COM",
      name: "Security Alerts",
    },
    to: email,
    subject: "New login detected",
    html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Successful</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="background-color:#ffffff; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.08); overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#6366f1); padding:30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                🎉 Login Successful
              </h1>
              <p style="margin:8px 0 0; color:#e0e7ff; font-size:14px;">
                Security confirmation for your account
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#111827;">
              <p style="font-size:18px; font-weight:600; margin:0 0 12px;">
                Hello <span style="color:#4f46e5;">${username}</span>,
              </p>

              <p style="font-size:15px; line-height:1.6; margin:0 0 16px; color:#374151;">
                We’re happy to let you know that a <strong>new login was successfully detected</strong> on your account.
                Everything looks good — this message is just to keep you informed.
              </p>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin:20px 0;">
                <tr>
                  <td style="font-size:14px; color:#374151;">
                    <strong>Account:</strong> ${username}<br />
                  </td>
                </tr>
              </table>

              <!-- Alert -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#fff7ed; border-left:5px solid #f97316; border-radius:6px; padding:14px;">
                <tr>
                  <td style="font-size:14px; color:#9a3412;">
                    ⚠️ <strong>Was this not you?</strong><br />
                    Please secure your account immediately by changing your password and reviewing recent activity.
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; line-height:1.6; margin:22px 0 0; color:#4b5563;">
                Keeping you safe is our priority. If you notice anything unusual, don’t hesitate to take action.
              </p>

              <p style="font-size:14px; margin:24px 0 0; color:#374151;">
                Stay secure,<br />
                <strong>Your Security Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:16px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#6b7280;">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
    category: "login-alert",
  });
};
