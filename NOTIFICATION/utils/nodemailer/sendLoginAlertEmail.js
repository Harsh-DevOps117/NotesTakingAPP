import transport from "./nodemaile.js";

export const sendLoginAlertEmail = async ({ email,  username }) => {
  if (!email || !username) {
    throw new Error("Invalid mail payload");
  }

  await transport.sendMail({
    from: {
      address: "hello@demomailtrap.co",
      name: "Security Alerts",
    },
    to: email,
    subject: "New login detected",
    text: `Hi ${username},

A new login was detected on your account.


If this wasn’t you, secure your account immediately.`,
    category: "login-alert",
  });
};
