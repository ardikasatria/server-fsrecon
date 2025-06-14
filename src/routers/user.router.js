import express from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { isOwner } from "../middlewares/auth.middleware.js";

export default function () {
  const router = express.Router();
  const controller = new UserController();

  // create new user by admin
  router.post(
    "/",
    [authMiddleware, adminMiddleware],
    controller.createUserByAdmin
  );

  // get all users
  router.get("/", [authMiddleware], controller.searchUser);

  router.get("/role", [authMiddleware], controller.getUserRole);
  // get user by id
  router.get("/:id", [authMiddleware, isOwner], controller.getUserById);

  // get user by username
  router.get(
    "/:username",
    [authMiddleware, isOwner],
    controller.getUserByUsername
  );

  // update user by username
  router.post(
    "/:username",
    [authMiddleware, isOwner],
    controller.updateUserByusername
  );

  // update user by id
  router.put("/:id", [authMiddleware, isOwner], controller.updateUser);
  router.patch("/:id", [authMiddleware, isOwner], controller.updateUser);

  // update user by admin
  router.put(
    "/:id/admin",
    [authMiddleware, adminMiddleware],
    controller.updateUserAdmin
  );

  // delete user by id
  router.delete(
    "/:id",
    [authMiddleware, adminMiddleware],
    controller.deleteUser
  );

  // update user verification status
  router.put(
    "/verify/:id",
    [authMiddleware, adminMiddleware],
    controller.updateVerificationStatus
  );

  // abstract user from all groups
  router.get(
    "/:id/abstract",
    [authMiddleware, isOwner],
    controller.abstractsUser
  );
  router.get(
    "/:id/abstract/:abstractId",
    [authMiddleware, isOwner],
    controller.getAbstractUser
  );

  return router;
}
