import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import AbstractController from "../controllers/abstract.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new AbstractController();

  router.post("/", authMiddleware, controller.createAbstract);
  router.get("/", authMiddleware, controller.getAbstracts);
  router.get("/user/:userId", authMiddleware, controller.getAbstractsByUser);
  router.get("/search", authMiddleware, controller.getAbstractByField);
  router.get("/:id", authMiddleware, controller.getAbstractById);
  router.put("/:id", authMiddleware, controller.updateAbstract);
  router.delete("/:id", authMiddleware, controller.deleteAbstract);

  return router;
}
