import ReviewerController from "../controllers/reviewer.controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
export default function () {
  const router = express.Router();
  const controller = new ReviewerController();

  // Route to create a new reviewer
  router.post('/', authMiddleware, controller.createReviewer);

  // Route to verify a reviewer
  router.patch('/:id/verify', authMiddleware, adminMiddleware, controller.verifyReviewer);

  // Route to reject a reviewer application
  router.post('/:id/reject', authMiddleware, adminMiddleware, controller.rejectReviewer);

  // Route to get a list of all reviewers (filtered by pending verification if needed)
  router.get('/', authMiddleware, adminMiddleware, controller.listReviewers);

  // Route to get pending reviewers
  router.get('/pending', authMiddleware, adminMiddleware, controller.listPendingReviewers);

  // Route to assign abstract to a reviewer
  router.post('/assign-abstract', authMiddleware, adminMiddleware, controller.assignAbstractToReviewer);

  // Route to list users with role "reviewer"
  router.get('/reviewer-users', authMiddleware, adminMiddleware, controller.listUsersWithRoleReviewer);

  return router;
  return router;
}

