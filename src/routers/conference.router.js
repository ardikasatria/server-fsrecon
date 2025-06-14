import express from "express";
import ConferenceController from "../controllers/conference.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new ConferenceController();

  router.get("/", [authMiddleware], controller.getConference);
  router.get("/:id", [authMiddleware], controller.getConferenceById);

  router.post(
    "/",
    [authMiddleware, adminMiddleware],
    controller.createConference
  );
  router.put(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.updateConference
  );
  router.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.deleteConference
  );

  router.post("/:id/join", [authMiddleware], controller.attendConference);
  router.post("/:id/unjoin", [authMiddleware], controller.unattendConference);

  return router;
}
