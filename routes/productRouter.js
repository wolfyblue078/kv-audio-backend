import e from "express";
import { addProduct, getProduct } from "../controllers/productController.js";
import { authMiddleware } from "../controllers/userController.js";

let productRouter = e.Router();

productRouter.post("/new",authMiddleware, addProduct);
productRouter.get("/products", authMiddleware, getProduct);

export default productRouter;