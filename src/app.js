import express from "express";
import http from "http";
import mongoose from "mongoose";
import configApp from "./application/express.js";
import configServer from "./application/server.js";
import connectionDb from "./application/connection.js";
import routesApp from "./routers/index.js";

import errorHandler from "./middlewares/error.middleware.js";
import config from "./config/config.js";
import webpush from "web-push";

webpush.setVapidDetails(
  `mailto:${config.email.user}`,
  config.webpush.publicKey,
  config.webpush.privateKey
);

const app = express();

configApp(app);

connectionDb(mongoose, config, {
  autoIndex: true,
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
}).connectToMongo();

routesApp(app);

app.use(errorHandler);

const server = http.createServer(app);
const serverInit = configServer(app, mongoose, server, config);

if (process.env.NODE_ENV !== 'test') {
  serverInit.startServer();
}

export { app, mongoose, server, serverInit };