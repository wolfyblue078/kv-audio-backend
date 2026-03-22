import Review from "../models/review.js";

export const addReview = async (req,res)=>{
    try {
        let {comment, rating, productId} = req.body;
        let user = req.user;

        if(!user){
            return res.status(401).json("Please sign in and continue 🔰");
        }

        const newReview = new Review({email:user.email, comment, rating, productId, name: user.username});

        let alreadyReviewed = await Review.findOne({
            email: user.email,
            product: productId
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                message: "You already reviewed this product 😅"
            });
        }

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

export const getReviews = async (req,res)=>{

    try {
        let user = req.user;
        //check is logged
        if(!user){
            return res.status(401).json({
                message: "please login and continue !"
            })
        }

        if(user.role === "admin"){
            const reviews = await Review.find();

            return res.status(200).json({
                message: "Reviewes retrived successfuly 📭",
                reviews
            })
        } else{
            const reviews = await Review.find({isApproved: true});

            return res.status(200).json({
                message: "Reviewes retrived successfuly 📭",
                reviews
            })
    }
    } catch (error) {
         return res.status(500).json({
            message: error.message
        });
    }    
}