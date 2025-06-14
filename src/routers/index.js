import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import notificationRouter from "./notification.router.js";
import abstractRouter from "./abstract.router.js";
import conferenceRouter from "./conference.router.js";
// import uploaderRouter from "./uploader.router.js";
import topicRouter from "./topic.router.js";
import paketRouter from "./paket.router.js";
import uploadRouter from "./upload.router.js";
import reviewerRouter from "./reviewer.router.js";
import reviewRouter from "./reviews.router.js";

export default function routes(app) {
  app.use("/auth", authRouter());
  app.use("/api/users", userRouter());
  app.use("/api/notifications", notificationRouter());
  app.use("/api/abstracts", abstractRouter());
  app.use("/api/conferences", conferenceRouter());
  app.use("/api/topics", topicRouter());
  app.use("/api/paket", paketRouter());
  app.use("/api/reviewers", reviewerRouter());
  app.use("/api/reviews", reviewRouter());
  app.use("/api/upload", uploadRouter());
}
