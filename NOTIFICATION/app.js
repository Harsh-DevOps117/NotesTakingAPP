import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";

import { sendLoginAlertEmail } from "./utils/nodemailer/sendLoginAlertEmail.js";
import { consumeMsg } from "./utils/rabbitmq.js";

configDotenv();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));


consumeMsg("user.logged_in", async (data) => {
  console.log("RAW EVENT TYPE:", typeof data);
  console.log("RAW EVENT VALUE:", data);

  try {
    await sendLoginAlertEmail({
      email: data.userEmail,
      username: data.userId,
    });
  } catch (err) {
    console.error("Login alert email failed:", err.message);
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "Notification service running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
