import express from 'express';
import { rollBasedAccess, verifyUser } from '../helper/userAuth.js';
import {createNewOrder, deleteOrder, getAllOrders, getAllOrdersByAdmin, getOrderDetails, updateOrderStatus} from "../controller/orderController.js";
const router = express.Router();

router.route("/new/order").post(verifyUser,createNewOrder);
router.route("/order/:id").get(verifyUser,getOrderDetails);
router.route("/orders/user").get(verifyUser,getAllOrders);
router.route("/order/cancel/:id").put(verifyUser, updateOrderStatus);

//admin side
router.route("/admin/orders").get(verifyUser,rollBasedAccess("admin"),getAllOrdersByAdmin);
router.route("/admin/order/:id").delete(verifyUser,rollBasedAccess("admin"),deleteOrder);
router.route("/admin/order/update/:id").put(verifyUser,rollBasedAccess("admin"),updateOrderStatus);

export default router;