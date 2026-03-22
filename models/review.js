import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isApproved:{
        type:Boolean,
        default:false
    }
})

const Review = mongoose.Model("Review", reviewSchema);
export default Review;