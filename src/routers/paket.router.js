import express from "express";
import PaketController from "../controllers/paket.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new PaketController();

  router.get("/", controller.searchPaket);
  router.get("/:id", controller.getPaketById);

  router.post("/", [authMiddleware, adminMiddleware], controller.createPaket);
  router.put("/:id", [authMiddleware, adminMiddleware], controller.updatePaket);
  router.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.deletePaket
  );

  router.post("/search", authMiddleware, controller.searchPaket);
  router.get("/conference/:conferenceId", controller.getPaketsByConferenceId);

  return router;
}
