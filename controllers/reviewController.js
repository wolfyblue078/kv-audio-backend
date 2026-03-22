import Review from "../models/review.js";

export const addReview = async (req,res)=>{
    try {
        let reviewData = req.body;
        let user = req.user;

        if(!user){
            return res.status(404).json("Please sign in and continue 🔰");
        }

        reviewData.name = user.username;
        const newReview = new Review(reviewData);

        await newReview.save();

        res.status(201).json({
            message: "Review added successfuly !",
            Review: newReview
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error 🤖🚫"
        })
    }
    
}