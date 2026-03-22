import e from "express";
import { addReview } from "../controllers/reviewController.js";

const reviewRouter = e.Router();

reviewRouter.post("/new", addReview);

export default reviewRouter;