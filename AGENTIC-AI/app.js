import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";
import AI from "./routes/airoutes.routes.js";
import logger from "./utils/logger/logger.js";
configDotenv();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/v1/ai",AI);

app.listen(process.env.PORT, () => {
  logger.info("Server is running on port " + process.env.PORT);
  console.log("Server is running on port http://localhost:" + process.env.PORT);
});
