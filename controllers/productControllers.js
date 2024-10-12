import Product from '../db/connectDB.js';



export const fetchAllProducts = async (req, res) => {
    try {
        // Get all products
        const products = await Product.findAll();
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Side Error." })
    }
}

export const getProduct = async (req, res) => {
const { id } = req.params;
try{
// Get one product by ID
const product = await Product.findOne({ where: { id } });
if(!product){//product not found with given id.
    return res.status(404).json({message:"Product Not Found."}); 
}
res.status(200).json(product);
}
catch(err){
    console.log(err);
    res.status(500).json({error:"Server Side Error."});
}
}

export const createProduct = async (req, res) => {
    const { name, price, category, description } = req.body;
    //data validation to create new product.
    if (!name || !price || !category) {
        return res.status(400).json({ message: "Provide all details about product." })
    }
    //type checking of datatypes
    if (typeof name !== 'string' ||
        typeof price !== 'number' && !Number.isInteger(price) ||
        typeof category !== 'string' ||
        typeof description !== 'string') {
        return res.status(400).json({ message: "Invalid datatypes." });
    }
    try {
        const newProduct = await Product.create({
            name,
            price,
            category,
            description: description || "Not Provided."
        })
        await newProduct.save();
        res.status(200).json(newProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server side error." });
    }
}

export const updateProduct = async (req, res) => {
    const { name, price, category, description } = req.body;
    const { id } = req.params;

    if ((name != undefined && typeof name !== 'string') ||
        (price != undefined && typeof price !== 'number' && !Number.isInteger(price)) ||
        (category != undefined && typeof category !== 'string') ||
        (description != undefined && typeof description !== 'string')) {
        return res.status(400).json({ message: "Invalid datatypes." });
    }


    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product not found." })
        }
        const updatedProduct = await product.update(
            {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
                category: category || product.category
            },
            { where: { id: 1 } }
        );
        res.status(200).json(updatedProduct);

    }
    catch (err) {
        console.log("error in updating the product", err);
        res.status(500).json({ error: "Server side error." })
    }

}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try{
    // Get one product by ID
    const product = await Product.destroy({ where: { id } });
    if(!product){
        return res.status(404).json({message:"Product Not Found."}); 
    }
    res.status(200).json(product);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Server Side Error."});
    }
}

