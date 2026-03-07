import User from "../models/user.js";
import bcrypt from "bcrypt";

export const  registerUser = async (req, res)=>{

    try {
        const data = req.body;

        const result = await User.findOne({email : data.email});
        if(result){
            return res.status(400).json({message : "User already exists"});
        }


        //password security
        data.password = await bcrypt.hash(data.password, 10);



        const user = new User(data);
        await user.save();
        res.status(201).json({
            message : "User created successfully",
            "user details" : user
        });
    } catch (error) {
        res.status(400).json({message : error.message});
    }
    
}