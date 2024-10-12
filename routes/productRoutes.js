import express from 'express'
import  { fetchAllProducts, createProduct,
     updateProduct, deleteProduct, getProduct 
    } from '../controllers/productControllers.js'
const router = express.Router();

router.get("/getAllProducts",fetchAllProducts);
router.get("/getProductById/:id", getProduct)
router.post("/createProduct", createProduct);
router.put('/updateProductById/:id', updateProduct);
router.delete('/deleteProductById/:id', deleteProduct);



export default router;