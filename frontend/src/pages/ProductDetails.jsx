import React, { useEffect, useState } from "react";
import PageTitle from "../Components/PageTitle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Rating from "../Components/Rating";
import {
  Calendar,
  MessageSquare,
  Minus,
  PackageCheck,
  PackageX,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import toast from "react-hot-toast";
import { calculateDiscount, formatDate } from "../utils/Formater";
import { addToCart, removeMessage } from "../features/products/cart/cartSlice";
import axios from "axios";

const ProductDetails = () => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState(""); // ✅ added
  const [quantity, setQuantity] = useState(1);

  const { loading, error, product } = useSelector((state) => state.product);
  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
  } = useSelector((state) => state.cart);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  // error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  // cart success
  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(removeMessage());
    }
  }, [success, message, dispatch]);

  // quantity
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error("cannot exceed available stock");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("quantity cannot be less than 1");
      return;
    }
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ id, quantity }));
  };

  // ✅ REVIEW SUBMIT LOGIC
  const submitReviewHandler = async (e) => {
    e.preventDefault();

    if (userRating === 0) {
      toast.error("Please select rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write comment");
      return;
    }

    try {
      const { data } = await axios.put("/api/v1/review", {
        rating: userRating,
        comment,
        productId: id,
      });

      toast.success(data.message);

      setUserRating(0);
      setComment("");

      // refresh product
      dispatch(getProductDetails(id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Review failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 ">
      <PageTitle title={`${product?.name} | Details`} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 ">
        {/* product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-blue-300 p-8">
          {/* image */}
          <div>
            <img
              className="w-full h-full object-cover"
              src={product?.image?.[0]?.url}
              alt={product?.name}
            />
          </div>

          {/* product info */}
          <div className="ml-10 mt-10 md:mt-0">
            <h2 className="text-3xl font-semibold">{product?.name}</h2>

            <div className="flex items-center gap-4">
              <Rating value={product?.rating} disabled />
              <span>{product?.numOfReviews} Reviews</span>
            </div>

            <div className="mt-4">
              <span className="text-3xl text-amber-600">
                ₹{product?.price}
              </span>
              <span className="line-through ml-3">
                ₹{product?.mrp}
              </span>
              <span className="text-green-600 ml-2">
                {calculateDiscount(product?.price, product?.mrp)}% OFF
              </span>
            </div>

            <p className="mt-4">{product?.description}</p>

            {/* stock */}
            {product?.stock > 0 ? (
              <p className="text-green-600">In Stock</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}

            {/* cart */}
            {product?.stock > 0 && (
              <div className="flex gap-4 mt-6">
                <div className="flex border rounded">
                  <button onClick={decreaseQuantity}>
                    <Minus />
                  </button>
                  <span className="px-3 items-center justify-center flex">{quantity}</span>
                  <button onClick={increaseQuantity}>
                    <Plus />
                  </button>
                </div>

                <button
                  onClick={addToCartHandler}
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            )}

            {/* ✅ REVIEW FORM (UI SAME, only logic added) */}
            <form
              onSubmit={submitReviewHandler}
              className="bg-green-50 p-6 rounded-2xl border border-blue-500 mt-10"
            >
              <h3 className="flex gap-2 font-bold mb-4 items-center text-md text-gray-700 uppercase tracking-tight">
                <MessageSquare size={18} />
                Share your feedback
              </h3>

              <div className="mb-4">
                <Rating
                  value={userRating}
                  disabled={false}
                  onRatingChange={(r) => setUserRating(r)}
                />
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-gray-200 p-4 rounded-xl border-2 border-blue-500 min-h-24"
                placeholder="How was the product and delivery?"
              />

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-gray-200 py-3 rounded-xl font-bold"
              >
                Post Review
              </button>
            </form>
          </div>
        </div>

        {/* reviews */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold mb-6">
            Customer Stories
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {product?.reviews?.map((rev, index) => (
              <div key={index} className="bg-blue-300 p-6 rounded">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p>{rev.name}</p>
                    <Rating value={rev.rating} disabled />
                  </div>
                </div>

                <p className="mt-3">{rev.comment}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(rev.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;