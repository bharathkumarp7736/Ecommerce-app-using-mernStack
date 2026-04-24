import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyOrders,
  cancelOrder,
} from "../features/products/order/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <PageTitle title="My Orders" />
      <Navbar />

      <main className="pt-20 min-h-screen bg-blue-200 p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-blue-300 p-5 rounded-xl shadow"
              >
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Total:</b> ₹ {order.totalPrice}</p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {/* TRACKING */}
                <div className="mt-4">
                  <p className="font-bold mb-2">Tracking:</p>

                  <div className="flex gap-3 text-sm">
                    <span
                      className={
                        order.orderStatus === "Processing"
                          ? "text-blue-600 font-bold"
                          : ""
                      }
                    >
                      Processing
                    </span>
                    →
                    <span
                      className={
                        order.orderStatus === "Shipped"
                          ? "text-blue-600 font-bold"
                          : ""
                      }
                    >
                      Shipped
                    </span>
                    →
                    <span
                      className={
                        order.orderStatus === "Delivered"
                          ? "text-green-600 font-bold"
                          : ""
                      }
                    >
                      Delivered
                    </span>
                  </div>
                </div>

                {/* STATUS */}
                <p className="mt-2 font-semibold">
                  Status: {order.orderStatus}
                </p>

                {/* CANCEL BUTTON */}
                {order.orderStatus !== "Delivered" &&
                  order.orderStatus !== "Cancelled" && (
                    <button
                      onClick={() =>
                        dispatch(cancelOrder(order._id))
                      }
                      className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Cancel Order
                    </button>
                  )}

                {order.orderStatus === "Cancelled" && (
                  <p className="text-red-600 font-bold mt-2">
                    Order Cancelled
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default MyOrders;