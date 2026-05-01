import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/products/cart/cartSlice";
import toast from "react-hot-toast";

const Product = ({ product }) => {
  const [rating, setRating] = useState(product.rating || 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    dispatch(addToCart({ id: product._id, quantity: 1 }));
    toast.success("Added to cart");
  };

  return (
    <div className="bg-blue-200 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-blue-500">
      
      <Link to={`/product/${product._id}`} className="group block">
        <div className="h-56 overflow-hidden">
          <img
            src={product.image[0].url}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-700 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center gap-2">
          <Rating value={rating} onRatingChange={(r) => setRating(r)} />
          <span className="text-xs text-gray-500 font-semibold">
            ({product.numOfReviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-500 font-bold text-lg">
            ₹{product.price}
          </span>

          <button
            disabled={product.stock === 0}
            onClick={addToCartHandler}
            className="bg-blue-500 text-gray-300 px-4 py-1.5 rounded-md text-sm hover:bg-blue-400 transition cursor-pointer disabled:opacity-50"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;