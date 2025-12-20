import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";

configDotenv();

if (!process.env.MAILTRAP_TOKEN) {
  throw new Error("MAILTRAP_TOKEN is missing");
}

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const PASSWORD = process.env.PASSWORD;


var transport = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: "53e3fab3c67564",
    pass: PASSWORD.toString(),
  }
});


export default transport;
