import Controller from "../controllers/tripConfirmation.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { isOwner } from "../middlewares/auth.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new Controller();

  router.get("/", authMiddleware, controller.getTripConfirmation);
  router.post("/", authMiddleware, controller.createTripConfirmation);
  router.put(
    "/:id",
    [authMiddleware, isOwner],
    controller.updateTripConfirmation
  );
  router.get("/:id", authMiddleware, controller.getTripConfirmation);
  router.delete(
    "/:id",
    [authMiddleware, isOwner],
    controller.deleteTripConfirmation
  );

  return router;
}
