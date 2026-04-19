import express from "express";
import {registerUser,loginUser,logout,forgotPassword,resetPassword, profile,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,deleteUser} from "../controller/userController.js";
import { verifyUser,rollBasedAccess } from "../helper/userAuth.js";
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser,profile);
router.route("/password/update").put(verifyUser,updatePassword);
router.route("/profile/update").put(verifyUser,updateProfile);


router.route("/admin/users").get(verifyUser,rollBasedAccess("admin"),getAllUsers);
router.route("/admin/user/:id").get(verifyUser,rollBasedAccess("admin"),getSingleUser).put(verifyUser,rollBasedAccess("admin"),updateUserRole).delete(verifyUser,rollBasedAccess("admin"),deleteUser);
export default router;