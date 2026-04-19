import express from 'express';
import { addProducts, getAllProducts,getSingleProduct,updateProduct,deleteProduct, createProductReview,getProductReviews,getAllProductsByAdmin, adminDeleteReview } from '../controller/productController.js';
import { verifyUser,rollBasedAccess } from '../helper/userAuth.js';

const router = express.Router();
//user side
router.get("/products", getAllProducts);
router.route("/product/:id").get(getSingleProduct);
//user reviews
router.route("/review").put(verifyUser,createProductReview);


//admin side
//admin create,update,delete product
router.route("/admin/products/create").post(verifyUser,rollBasedAccess("admin"),addProducts);
router.route("/admin/product/:id").put(verifyUser,rollBasedAccess("admin"),updateProduct).delete(verifyUser,rollBasedAccess("admin"),deleteProduct);
//admin view all products
router.route("/admin/products").get(verifyUser,rollBasedAccess("admin"),getAllProductsByAdmin);
//admin view reviews and delete review
router.route("/admin/reviews").get(verifyUser,rollBasedAccess("admin"),getProductReviews).delete(verifyUser,rollBasedAccess("admin"),adminDeleteReview);

export default router;