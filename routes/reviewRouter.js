import e from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import { authMiddleware } from "../controllers/userController.js";

const reviewRouter = e.Router();

reviewRouter.post("/new",authMiddleware, addReview);
reviewRouter.get("/reviews", authMiddleware, getReviews);
reviewRouter.delete("/:name", (req,res)=>{
    console.log(req.params.name);
})

export default reviewRouter;