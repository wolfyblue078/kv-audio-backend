import Review from "../models/review.js";

export const addReview = async (req,res)=>{
    try {
        let {comment, rating, productId} = req.body;
        let user = req.user;

        if(!user){
            return res.status(401).json("Please sign in and continue 🔰");
        }


        let alreadyReviewed = await Review.findOne({
                    email: user.email,
                    productId: productId
                });

                if (alreadyReviewed) {
                    return res.status(400).json({
                        message: "You already reviewed this product 😅"
                    });
                }
                
        const newReview = new Review({email:user.email, comment, rating, productId, name: user.username});

        

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

export const deleteReview = async (req,res)=>{
    try {
        let user = req.user;

            if(!user){
            return res.status(401).json({
                message: "please login and continue !"
            })
        }
        let review = await Review.findOne({
            email: req.params.email
        })

        if (!review) {
            return res.status(404).json({
                message: "No reviews found for this email ❌"
            });
        }


        if(user.role === "admin" || review.email === user.email){
            const email = req.params.email;
            const result = await Review.findOneAndDelete({email:email});
            

            return res.status(200).json("Reviews deleted successfully 👍");
        } else {
                return res.status(403).json({
                message: "Access denied 🚫"
            });
        }
        


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const approveReview = async(req,res)=>{
    try {
        //check is logged
        let user = req.user;
        if(!user){
            return res.status(403).json({
                message: "Please login and continue!"
            })
        }

        //check is admin
        if(!(user.role === "admin")){
            return res.status(404).json({
                message: "You're not allowed do do this operation 🚫"
            })
        }

        const email = req.params.email;

        //operation
        const review = await Review.updateOne({email: email}, {isApproved: true});
        if(!review){
            return res.status(404).json({
                message: "Review not found ❌"
            })
        }

        return res.status(201).json({
            message: "Review updated successfully ✅"
        })



    } catch (error) {
        return res.status(404).json({
               message: error.message
            })
    }
}