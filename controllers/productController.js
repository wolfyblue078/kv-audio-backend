import Product from "../models/product";

export const addProduct = async (req,res)=>{
    
    try {
        //check if exists
        const existing = await Product.findOne({ name });
        if (existing) return res.status(409).json({ message: "Product exists" });

        let data = req.body;
        const newProduct = new Product(data);

        await newProduct.save();
        console.log("New product:"+ newProduct.name +" added !")

        return res.status(201).json({
            message: "New product added successfully ✅",
            Product: newProduct
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
    
}