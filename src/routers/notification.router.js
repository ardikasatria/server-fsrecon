import NotificationController from "../controllers/notification.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new NotificationController();
  router.post("/", [authMiddleware], controller.createNotification);
  router.post(
    "/mark/:notificationId/read",
    [authMiddleware],
    controller.markAsRead
  );
  router.post(
    "/mark/:recipientId/read",
    [authMiddleware],
    controller.markAllAsRead
  );
  router.post(
    "/mark/:recipientId/unread",
    [authMiddleware],
    controller.markAllAsUnread
  );
  router.get("/", [authMiddleware], controller.getNotifications);
  router.delete(
    "/:notificationId",
    [authMiddleware],
    controller.deleteNotification
  );

  //   subscribe to notification
  router.post("/subscribe", [authMiddleware], controller.subscribe);
  //   unsubscribe to notification
  router.post("/unsubscribe", [authMiddleware], controller.unSubscription);

  router.get("/subscriptions", [authMiddleware], controller.getSubscriptions);

  router.post("/send", [authMiddleware], controller.sendNotification);

  router.post(
    "/boardcast",
    [authMiddleware],
    controller.sendBoardcastNotification
  );

  return router;
}
