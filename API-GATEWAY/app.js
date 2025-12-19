import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import proxy from "express-http-proxy";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import Redis from "ioredis";
import { RedisStore } from "rate-limit-redis";
import logger from "./utils/logger/logger.js";


configDotenv();

const app = express();

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () =>
  logger.info("Redis connected")
);

redisClient.on("error", err =>
  logger.error("Redis error", err)
);

app.use(cors());
app.use(helmet());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const rateLimitOption = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args)
  }),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests"
    });
  }
});

app.use(rateLimitOption);

const proxyOptionAPI = {
  proxyReqPathResolver:(req)=>{
    return req.originalUrl.replace(/^\/api\/auth/, "/v1/auth");
  },
  proxyErrorHnadler:(err,req,res)=>{
    logger.error(err)
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}

const proxyOptionAPINOTES={
  proxyReqPathResolver:(req)=>{
    return req.originalUrl.replace(/^\/api\/notes/, "/v1/notes");
  },
  proxyErrorHnadler:(err,req,res)=>{
    logger.error(err)
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}

app.use("/api/auth",proxy("http://localhost:3001",{
  ...proxyOptionAPI,
  proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
    proxyReqOpts.headers["Content-Type"]="application/json"
    return proxyReqOpts
  },
  userResDecorator:(proxyRes,proxyResData,srcReq,srcRes)=>{
    logger.info(proxyRes.headers)
    return proxyResData
    },
  })
)

app.use("/api/notes",proxy("http://localhost:3002",{
  ...proxyOptionAPINOTES,
  proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
    proxyReqOpts.headers["Content-Type"]="application/json"
    return proxyReqOpts
  },
  userResDecorator:(proxyRes,proxyResData,srcReq,srcRes)=>{
    logger.info(proxyRes.headers)
    return proxyResData
    },
  })
)


app.get("/", (req, res) => {
  res.json({ status: "API Gateway running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`API Gateway running on http://localhost:${PORT}`);
});
