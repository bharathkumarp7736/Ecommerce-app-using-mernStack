import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../features/admin/adminSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  const updateHandler = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Orders</h2>

      {loading && <p>Loading...</p>}

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
          <p><b>ID:</b> {order._id}</p>
          <p><b>Status:</b> {order.orderStatus}</p>
          <p><b>Total:</b> ₹{order.totalPrice}</p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => updateHandler(order._id, "Shipped")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Ship
            </button>

            <button
              onClick={() => updateHandler(order._id, "Delivered")}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Deliver
            </button>

            <button
              onClick={() => deleteHandler(order._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;