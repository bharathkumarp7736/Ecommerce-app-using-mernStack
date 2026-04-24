import express from 'express';
import product from './routes/productRoute.js';
import handleError from './middleware/error.js';
import user from './routes/userRoute.js';
import order from "./routes/orderRoute.js";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import paymentRoute from './routes/paymentRoute.js';

import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.onrender.com" // replace later when deployed
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//Routes
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1", paymentRoute);

//Error Handler
app.use(handleError);

export default app;