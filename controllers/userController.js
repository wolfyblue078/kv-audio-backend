import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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



export const loginUser = async (req, res)=>{
    let data = req.body;

    try {

        let user = await User.findOne({email: data.email});

        if(!user){
            return res.status(403).json({
                msg: "User not found! 👤"
            })
        }

        let isPasswordCorrect = await bcrypt.compare(data.password, user.password);

        if(!isPasswordCorrect){
            return res.status(403).json({
                msg: "Password is incorrect 🔰"
            })
        }


        let token = jwt.sign({email: user.email, role: user.role, username: user.username}, "kv_secret_89", { expiresIn: "1d" });

        res.status(200).json({
            msg: "login successfully 👤❤️",
            "user details": {name : user.firstName, email: user.email, role: user.role },
            token: token
        })


    } catch(error) {
        res.status(400).json({message : error.message});
    }
    
}


export const getUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            msg: "users retrieved successfully 👤❤️",
            users
        })

    } catch(error) {
        res.status(400).json({message : error.message});
    }
}


export const isLoging = async (req,res)=>{
    let data = req.body;
    const user = await User.findOne({email: data.email});
}