import UploaderController from "../controllers/uploader.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new UploaderController();

  router.post("/files", controller.uploadFiles);
  router.post("/images", controller.uploadImages);

  return router;
}
