import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
dotenv.config();



const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
//all product routes are available in routes/productRoutes.js
app.use("/api/v1/products",productRoutes);

app.listen(PORT,() => {
    console.log(`Application is running on port:${PORT}`)
})