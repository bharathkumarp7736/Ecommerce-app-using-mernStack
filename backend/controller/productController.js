import Product from "../models/productModel.js";
import handleerror from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

//create product
export const addProducts = async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//update product
export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    //return res.status(500).json({success:false,message:"message not found"})
    return next(new handleerror("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

//delete product
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new handleerror("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
};

//get all products
export const getAllProducts = async (req, res, next) => {
  // const products = await Product.find();
  const resultPerPage = 5;
  const apiHelper = new APIHelper(Product.find(), req.query).search().filter();

  const filteredQuery = apiHelper.query.clone();
  const productCount = await filteredQuery.countDocuments();
  const totalPages = Math.ceil(productCount / resultPerPage);
  const page = Number(req.query.page) || 1;

  if (totalPages > 0 && page > totalPages) {
    return next(new handleerror("This page does not exist", 404));
  }

  apiHelper.pagination(resultPerPage);
  const products = await apiHelper.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage: page,
  });
};

//get single product
export const getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return next(new handleerror("Product not found", 404));
  }
  return res.status(200).json({ success: true, product });
};

//create or update review
export const createProductReview = async (req, res, next) => {
      // console.log("BODY:", req.body);
      // console.log("HEADERS:", req.headers);

  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    avatar:req.user.avatar.url,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new handleerror("Product not found", 404));
  }
  const reviewExist = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );
  if (reviewExist) {
    //update review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        reviewExist.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //create review or push review
    product.reviews.push(review);
  }
  //update number of reviews
  product.numOfReviews = product.reviews.length;
  //update ratings
  let totalRating = 0;
  product.reviews.forEach((review) => {
    totalRating += review.rating;
  });
  product.rating =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product,
    message: "Review added successfully",
  });
};

//admin can view his reviews
export const getProductReviews = async (req, res, next) => {
  const productId = req.query.id;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new handleerror("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

//admin can view all product
export const getAllProductsByAdmin = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//admin can delete review
export const adminDeleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId); //get product by id
  if (!product) {
    return next(new handleerror("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  ); //filter review by id
  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });
  const rating = reviews.length > 0 ? totalRating / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, rating, numOfReviews },
    { new: true, runValidators: true },
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
};
