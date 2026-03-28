import e from "express";
import { addReview, approveReview, deleteReview, getReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "../controllers/userController.js";

const reviewRouter = e.Router();

reviewRouter.post("/new",authMiddleware, addReview);
reviewRouter.get("/reviews", authMiddleware, getReviews);
reviewRouter.delete("/delete/:email",authMiddleware ,deleteReview);
reviewRouter.put("/approve/:email", authMiddleware, approveReview);

export default reviewRouter;