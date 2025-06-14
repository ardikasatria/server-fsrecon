import morgan from "morgan";
import compression from "compression";
import express from "express";
import logger from "./logger.js";
import cors from "cors";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";
import cookieParser from "cookie-parser";
import config from "../config/config.js";

export default function expressConfig(app) {
  // setup express configuration here
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.static("public"));
  // setup session
  if (config.env === "development") {
    app.use(cors({
      origin: "*",
      credentials: true,
    }));
  } else {
    app.use(
      cors({
        origin: config.frontendURL,
        credentials: true,
      })
    );
  }

  // cors
  // helmet
  app.use(helmet({}));
  // rate limiter
  const rateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 1,
  });

  app.use((req, res, next) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send("Too Many Requests");
      });
  });

  // setup morgan
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}
