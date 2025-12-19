import Redis from "ioredis";
import logger from "../logger/logger.js";

let redisClient;

const createRedisClient = () => {
  if (redisClient) return redisClient;

  redisClient = new Redis({
    host: "127.0.0.1",
    port: 6370,
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  });

  redisClient.on("connect", () => {
    logger.info("Redis connected");
  });

  redisClient.on("error", (err) => {
    logger.error("Redis error", err);
  });

  return redisClient;
};

export default createRedisClient;
