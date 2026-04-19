import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [20, "Name cannot exceed 20 characters"],
      minLength: [2, "Name should have more than 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
        public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  },
);
//hashing password before saving user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 10);
});
//JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_SECRET_EXPIRE});
}
//compare password
userSchema.methods.verifyPassword=async function(userPassword){
  return await bcryptjs.compare(userPassword,this.password);
}
//create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken=crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire=Date.now()+15*60*1000;
  return resetToken;
};

export default mongoose.model("User", userSchema);
