// routes/paymentRoute.js
import express from "express";
import { createRazorpayOrder } from "../controller/paymentController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.post("/payment/create", verifyUser, createRazorpayOrder);

export default router;