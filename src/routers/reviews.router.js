import express from "express";
import ReviewsController from "../controllers/reviews.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import reviewerMiddleware from "../middlewares/reviewer.middleware.js"; // Assuming you have a middleware to check if the user is a reviewer
import adminMiddleware from "../middlewares/admin.middleware.js";

export default function () {
    const router = express.Router();
    const controller = new ReviewsController();

    // Get all reviews with pagination
    router.get("/", authMiddleware, adminMiddleware, controller.getReviews);

    // Create a new review
    router.post("/", authMiddleware, adminMiddleware, reviewerMiddleware, controller.createReviews);

    // Update a review by ID
    router.put("/:id", authMiddleware, adminMiddleware, reviewerMiddleware, controller.updateReviews);

    // Delete a review by ID
    router.delete("/:id", authMiddleware, adminMiddleware, reviewerMiddleware, controller.deleteReviews);

    return router;
}