import mongoose from "mongoose";
import logger from "../logger/logger.js";

const DBINIT=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    logger.info("DB connected successfully")
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default DBINIT
