import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

dotenv.config();

const app = e();
app.use(e.json());

//connect database
const mongoURL = process.env.mongoURL;
mongoose.connect(mongoURL).then(()=>{
    console.log("Database connect successfully!");
}).catch((err)=>{
    console.log(err.message);
})


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(4000, ()=>{
    console.log("App is running on port 4000 ⏸️");
});