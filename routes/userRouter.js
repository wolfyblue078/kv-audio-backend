import e from "express";
import { loginUser, registerUser } from "../controllers/userController.js";



const userRouter = e.Router();


userRouter.post("/new", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;