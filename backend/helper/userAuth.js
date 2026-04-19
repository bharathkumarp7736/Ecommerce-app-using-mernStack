import handleError from "./handleError.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";


//verify user
export const verifyUser=async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);
    if(!token){
        return next(new handleError("Please Login to access this resource",401));
    };
    const decodeData=jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log(decodeData);
    req.user=await User.findById(decodeData.id);
    // console.log(req.user);
    next();
};


//role based access
/*["admin,superAdmin"], ["user"]*/
export const rollBasedAccess=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new handleError(`Role: ${req.user.role} is not allowed to access this resource`,403));
        };
        next();
    };
};