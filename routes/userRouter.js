import e from "express";
import { registerUser } from "../controllers/userController.js";



const userRouter = e.Router();


userRouter.post("/new", registerUser);
//userRouter.post("/login", userController.loginUser);

export default userRouter;