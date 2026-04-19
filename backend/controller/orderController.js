import Order from "../models/orderModel.js";
import handleerror from "../helper/handleError.js";
import Product from '../models/productModel.js';

//create plaace order
export const createNewOrder = async (req, res, next) => {
    // console.log(req.body);
    const{shippingAddress, orderItems, paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    const order = await Order.create({
        shippingAddress,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,

    });

    res.status(201).json({
        success: true,
        order
    });
};

//get single order details
export const getOrderDetails=async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
    return next(new handleerror("Order not found", 404));
    };
    res.status(200).json({
        success:true,
        order,
    });
};


//get all order details
export const getAllOrders=async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});
    if(!orders){
            return next(new handleerror("Order not found", 404));
    };
    res.status(200).json({
        success:true,
        orders,
    });
};

//get all orders by admin
export const getAllOrdersByAdmin=async(req,res,next)=>{
    const orders=await Order.find().populate("user","name email");
    if(!orders){
            return next(new handleerror("Order not found", 404));
    };
    let totalAmount=0;
    orders.forEach((order)=>totalAmount += order.totalPrice)
    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    });
};

//admin delete orders 
export const deleteOrder=async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
        return next(new handleerror("Order not found", 404));
    }
    if(order.orderStatus!=='Delivered'){
        return next(new handleerror("This order is under processing so cannot be delete", 404));
    }
    await Order.deleteOne({_id:req.params.id});
     res.status(200).json({
        success:true,
        message:"order deleted successfully",
    });
};

//admin order update-----------------

export const updateOrderStatus=async(req,res,next)=>{
    const id=req.params.id;
    const order=await Order.findById(id);
    if(!order){
        return next(new handleerror("Order not found", 404));
    }
    if(order.orderStatus==="Delivered"){
        return next(new handleerror("This order is already been delivered", 404));
    }
    //update stock
    await Promise.all(order.orderItems.map((item)=>updateQuantity(item.product,item.quantity)));
    order.orderStatus=req.body.status;
    if(order.orderStatus==='Delivered'){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        order,
    });
};
async function updateQuantity(id,quantity) {
    const product = await Product.findById(id);
    if(!product){
        throw new Error('Product not found');
    }
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
    
}

//---------------------------------