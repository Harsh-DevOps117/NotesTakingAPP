import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";
import Router from "./routes/NotesRoutes.routes.js";
import dbConnection from "./utils/DBconnect/dbinit.js";
import logger from "./utils/logger/logger.js";

const app = express();
configDotenv()
dbConnection()
app.use(express.static("generated"))
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));


app.use("/v1/notes",Router)

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port http://localhost:${process.env.PORT}`)
});
