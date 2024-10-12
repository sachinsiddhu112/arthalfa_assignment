import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
dotenv.config();
const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT;

app.use("/products",productRoutes)

app.listen(PORT,() => {
    console.log(`Application is running on port:${PORT}`)
})