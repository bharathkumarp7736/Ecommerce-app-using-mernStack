import User from "../models/userModel.js";
import handleError from "../helper/handleError.js";
import { sendToken } from "../helper/jwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import crypto from "crypto";
import console from "console";
import { v2 as cloudinary } from "cloudinary";

//register user
export const registerUser = async (req, res, next) => {
  const { name, email, password,avatar } = req.body;

  //check if all fields are entered
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

   // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           avatar, {
               folder:"avatars",
               width:150,
               crop:"scale",
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);



  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url  ,
    },
  });
  // const token=user.getJWTToken();
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token,
  // });
  sendToken(user, 201, res);
};

//login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new handleError("Please enter all fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new handleError("Invalid email or password", 401));
  }
  const isValidPassword = await user.verifyPassword(password);
  if (!isValidPassword) {
    return next(new handleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
};
//logout user
export const logout = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, options);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

//forgot password

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new handleError("User not found with this email", 404));
  }

  let resetToken;

  try {
    resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("REAL ERROR:", error);
    return next(new handleError("Could not generate reset token", 500));
  }
  // only for testing
  // res.status(200).json({
  //   success: true,
  //   message: "Reset token generated",
  //   resetToken,
  // });

  const resetPasswordUrl = `${req.protocol}://${req.host}/reset/${resetToken}`;
  const message = `Your password reset token is: ${resetPasswordUrl}. If you did not request this, please ignore this email.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log("REAL ERROR:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new handleError("Could not send email", 500));
  }
};


//reset password
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user=await User.findOne({resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });
  if (!user) {
    return next(new handleError("Invalid or expired reset token", 400));
  };
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new handleError("Passwords do not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);

  //testing
  // res.status(200).json({
  //   success: true,
  //   message: "Password updated successfully",
  // });


};

//get user profile
export const profile=async(req,res,next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  })
};

//update password
export const updatePassword=async(req,res,next)=>{
  const { oldPassword, newPassword, confirmPassword }=req.body;
  const user=await User.findById(req.user.id).select("+password");
  const isValidPassword=await user.verifyPassword(oldPassword);
  if(!isValidPassword){
    return next(new handleError("Old password is incorrect",400));
  }
  if(newPassword !== confirmPassword){
    return next(new handleError("New passwords and confirm password do not match",400));
  }
  user.password=newPassword;
  await user.save();
  sendToken(user, 200, res);

};

//update profile
export const updateProfile=async(req,res,next)=>{
  const { name, email,avatar }=req.body;
  const updatedUserDetails={ name, email };
  if(avatar && avatar !== ""){
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id;
    if(imageId){
      await cloudinary.uploader.destroy(imageId);
    }
    const uploadResult = await cloudinary.uploader
       .upload(
           avatar, {
               folder:"avatars",
               width:150,
               crop:"scale",
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    updatedUserDetails.avatar={
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url  ,
    }
  }
  const user=await User.findByIdAndUpdate(req.user.id, updatedUserDetails, { new: true, runValidators: true });
  if(!user){
    return next(new handleError("User not found",404));
  }
  res.status(200).json({
    success:true,
    message:"Profile updated successfully",
    user,
  })
};

//get all users --admin
export const getAllUsers=async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users,
  });
};

//get single user --admin
export const getSingleUser=async(req,res,next)=>{
  const user=await User.findById(req.params.id);

  if(!user){
    return next(new handleError("User not found",404));
  }
  res.status(200).json({
    success:true,
    user,
  })
};


//update user role --admin
export const updateUserRole=async(req,res,next)=>{
  const { role }=req.body;
  const user=await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
  if(!user){
    return next(new handleError("User not found",404));
  }
  res.status(200).json({
    success:true,
    message:"User role updated successfully",
    user,
  });
};


//delete user --admin
export const deleteUser=async(req,res,next)=>{
  const user=await User.findByIdAndDelete(req.params.id);
  if(!user){
    return next(new handleError("User not found",404));
  };
  res.status(200).json({
    success:true,
    message:"User deleted successfully",
  });
};

