import e from "express";
import mongoose from "mongoose";

const app = e();


//connect database
const mongoURL = "mongodb+srv://admin:admin123@kv-audio.u1uy4xz.mongodb.net/?appName=kv-audio"
mongoose.connect(mongoURL).then(()=>{
    console.log("Database connect successfully!");
}).catch((err)=>{
    console.log(err.message);
})


app.listen(3000, ()=>{
    console.log("App is running on port 3000 ⏸️");
});