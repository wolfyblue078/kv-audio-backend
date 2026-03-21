import e from "express";
import { addProduct } from "../controllers/productController.js";
import { authMiddleware } from "../controllers/userController.js";

let productRouter = e.Router();

productRouter.post("/new",authMiddleware, addProduct);


export default productRouter;