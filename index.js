import e from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

const app = e();
app.use(e.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization");

    if(token){
        token = token.replace("Bearer ", "");

        jwt.verify(token, "kv_secret_89", (err, decoded)=>{
            if(err){
                res.status(401).json({message: "Unauthorized"});
            } else {
                req.user = decoded;
                
            }
        })
    } 

    next();

})


//connect database
const mongoURL = "mongodb+srv://admin:admin123@kv-audio.u1uy4xz.mongodb.net/?appName=kv-audio"
mongoose.connect(mongoURL).then(()=>{
    console.log("Database connect successfully!");
}).catch((err)=>{
    console.log(err.message);
})


app.use("/api/user", userRouter);

app.listen(4000, ()=>{
    console.log("App is running on port 3000 ⏸️");
});