import Product from '../db/connectDB.js';
import { Op } from 'sequelize';


export const fetchAllProducts = async (req, res) => {
    try {
        // Get all products with pagination or without pagination.
        //all other queries work same way with pagination or without pagination.
        const page = parseInt(req.query.page,10) ;
        const limit = parseInt(req.query.limit,10);
        const sortBy = req.query.sortBy ? req.query.sortBy.split(',') : ['id']; 
        const order = req.query.order === 'DESC' ? 'DESC' : 'ASC'; 
        const sortOrder = sortBy.map(field => [field, order]);
        const searchWithCatOrName = req.query.search ? req.query.search : "" ;
        //create query.
        let options = {
            where: {
              [Op.or]: [
                { name: { [Op.like]: `%${searchWithCatOrName}%` } },
                { category: { [Op.like]: `%${searchWithCatOrName}%` } },
              ],
            },
            order:sortOrder, 
          };
          //if limit and page provided in req.query,it means user want response in the form of pagination.
          if (limit && page) {
            options = {
              ...options,
              limit: limit, 
              offset: (page - 1) * limit, 
            };
          }
        const products = await Product.findAndCountAll(options);
        return res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(products?.count / limit),
            totalProducts: products?.count,
            products: products?.rows,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Side Error." })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Get one product by ID
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            //product not found with given id.
            return res.status(404).json({ message: "Product Not Found." });
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Side Error." });
    }
}

export const createProduct = async (req, res) => {
    const { name, price, category, description } = req.body;
    //data validation to create new product.
    if (!name || !price || !category) {
        return res.status(400).json({ message: "Provide all details about product." })
    }
    if (typeof name !== 'string' ||
        typeof price !== 'number' && !Number.isInteger(price) ||
        typeof category !== 'string' ||
        typeof description !== 'string') {
        return res.status(400).json({ message: "Invalid types of information." });
    }
    //create new product.
    try {
        const newProduct = await Product.create({
            name,
            price,
            category,
            description: description || "Not Provided."
        })
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error.." });
    }
}

export const updateProduct = async (req, res) => {
    const { name, price, category, description } = req.body;
    const { id } = req.params;
    //data validation on provided attributes.
    if ((name != undefined && typeof name !== 'string') ||
        (price != undefined && typeof price !== 'number' && !Number.isInteger(price)) ||
        (category != undefined && typeof category !== 'string') ||
        (description != undefined && typeof description !== 'string')) {
        return res.status(400).json({ message: "Invalid datatypes." });
    }
    try {
        //find the product with given id
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            //invalid id.
            return res.status(404).json({ message: "Product not found." })
        }
        const updatedProduct = await product.update(
            {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
                category: category || product.category
            }
        );
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        console.log("error in updating the product", err);
        res.status(500).json({ error: "Internal server error." })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Get one product by ID
        const product = await Product.destroy({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product Not Found." });
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error." });
    }
}

