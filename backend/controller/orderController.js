import Order from "../models/orderModel.js";
import handleerror from "../helper/handleError.js";
import Product from "../models/productModel.js";

// ================= CREATE ORDER =================
export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

// ================= GET SINGLE ORDER =================
export const getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new handleerror("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// ================= USER ORDERS =================
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// ================= ADMIN ALL ORDERS =================
export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

// ================= DELETE ORDER =================
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new handleerror("Order not found", 404));
  }

  await Order.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Order deleted",
  });
};

// ================= UPDATE ORDER =================
export const updateOrderStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new handleerror("Order not found", 404));
  }

  // prevent if already delivered
  if (order.orderStatus === "Delivered") {
    return next(new handleerror("Already delivered", 400));
  }

  const status = req.body.status;

  // reduce stock ONLY once
  if (status === "Shipped") {
    await Promise.all(
      order.orderItems.map((item) =>
        updateQuantity(item.product, item.quantity)
      )
    );
  }

  // cancel
  if (status === "Cancelled") {
    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order Cancelled",
    });
  }

  order.orderStatus = status;

  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
};

// ================= STOCK UPDATE =================
async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}