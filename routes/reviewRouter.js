import e from "express";
import { addReview } from "../controllers/reviewController.js";
import { authMiddleware } from "../controllers/userController.js";

const reviewRouter = e.Router();

reviewRouter.post("/new",authMiddleware, addReview);

export default reviewRouter;