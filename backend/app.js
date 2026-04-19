import express from 'express';
import product from './routes/productRoute.js';
import handleError from './middleware/error.js';
import user from './routes/userRoute.js';
import order from "./routes/orderRoute.js";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
//Routes
app.use("/api/v1/",product)
app.use("/api/v1/",user)
app.use("/api/v1/",order)
//Error Handler
app.use(handleError)
export default app;