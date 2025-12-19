import { configDotenv } from "dotenv";
import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";

configDotenv();

if (!process.env.MAILTRAP_TOKEN) {
  throw new Error("MAILTRAP_TOKEN is missing");
}

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN,
  })
);

export default transport;
