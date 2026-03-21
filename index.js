import e from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

const app = e();
app.use(e.json());


//connect database
const mongoURL = "mongodb+srv://admin:admin123@kv-audio.u1uy4xz.mongodb.net/?appName=kv-audio"
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