import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import TopicController from "../controllers/topic.controller.js";

export default function () {
  const router = express.Router();
  const controller = new TopicController();

  // Route to create a new topic
  router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    controller.createTopic
  );

  // Route to get all topics
  router.get(
    "/",
    authMiddleware,
    controller.getAllTopics
  );

  // Route to get a topic by id
  router.get(
    "/:id",
    authMiddleware,
    controller.getTopicById
  );

  // Route to update a topic by id
  router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.updateTopic
  );

  // Route to delete a topic by id
  router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.deleteTopic
  );

  return router;
}


