import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ NEW STATE FOR REVIEWS
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState([]);

  // ================= FETCH =================
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  // ================= ORDER =================
  const updateOrder = async (id, status) => {
    try {
      await axios.put(`/api/v1/admin/order/update/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/order/${id}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PRODUCT =================
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/product/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= USER =================
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`/api/v1/admin/user/${id}`, { role });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ⭐ REVIEW =================
  const fetchReviews = async () => {
    if (!productId) return alert("Enter Product ID");

    try {
      const { data } = await axios.get(
        `/api/v1/admin/reviews?id=${productId}`
      );
      setReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `/api/v1/admin/reviews?id=${reviewId}&productId=${productId}`
      );
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UI =================
  return (
    <div className="flex min-h-screen bg-blue-100">

      {/* SIDEBAR */}
      <div className="w-60 bg-blue-500 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <button onClick={() => setTab("dashboard")} className="block w-full text-left hover:bg-blue-400 p-2 rounded">
          Dashboard
        </button>

        <button onClick={() => setTab("products")} className="block w-full text-left hover:bg-blue-400 p-2 rounded">
          Products
        </button>

        <button onClick={() => setTab("orders")} className="block w-full text-left hover:bg-blue-400 p-2 rounded">
          Orders
        </button>

        <button onClick={() => setTab("users")} className="block w-full text-left hover:bg-blue-400 p-2 rounded">
          Users
        </button>

        {/* ✅ NEW BUTTON */}
        <button onClick={() => setTab("reviews")} className="block w-full text-left hover:bg-blue-400 p-2 rounded">
          Reviews
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">

        {/* ================= DASHBOARD ================= */}
        {tab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <p>Total Orders</p>
                <h2 className="text-xl font-bold">{orders.length}</h2>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <p>Total Products</p>
                <h2 className="text-xl font-bold">{products.length}</h2>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <p>Total Users</p>
                <h2 className="text-xl font-bold">{users.length}</h2>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRODUCTS ================= */}
        {tab === "products" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            {products.map((p) => (
              <div key={p._id} className="bg-white p-4 mb-4 rounded shadow flex justify-between">
                <div>
                  <p><b>{p.name}</b></p>
                  <p>₹{p.price}</p>
                </div>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= ORDERS ================= */}
        {tab === "orders" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            {orders.map((o) => (
              <div key={o._id} className="bg-white p-4 mb-4 rounded shadow flex justify-between">
                <div>
                  <p>ID: {o._id}</p>
                  <p>Total: ₹{o.totalPrice}</p>
                  <p>Status: {o.orderStatus}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => updateOrder(o._id, "Processing")} className="bg-yellow-400 px-2 py-1 rounded">
                    Processing
                  </button>

                  <button onClick={() => updateOrder(o._id, "Shipped")} className="bg-blue-400 px-2 py-1 rounded">
                    Shipped
                  </button>

                  <button onClick={() => updateOrder(o._id, "Delivered")} className="bg-green-500 px-2 py-1 rounded">
                    Delivered
                  </button>

                  <button onClick={() => updateOrder(o._id, "Cancelled")} className="bg-red-500 text-white px-2 py-1 rounded">
                    Cancel
                  </button>

                  <button onClick={() => deleteOrder(o._id)} className="bg-black text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= USERS ================= */}
        {tab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            {users.map((u) => (
              <div key={u._id} className="bg-white p-4 mb-4 rounded shadow flex justify-between">
                <div>
                  <p><b>{u.name}</b></p>
                  <p>{u.email}</p>
                  <p>Role: {u.role}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateUserRole(u._id, "admin")}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make Admin
                  </button>

                  <button
                    onClick={() => updateUserRole(u._id, "user")}
                    className="bg-yellow-500 px-2 py-1 rounded"
                  >
                    Make User
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ⭐ REVIEWS ================= */}
        {tab === "reviews" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Reviews</h1>

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <button
                onClick={fetchReviews}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Load
              </button>
            </div>

            {reviews.map((r) => (
              <div key={r._id} className="bg-white p-4 mb-3 rounded shadow flex justify-between">
                <div>
                  <p><b>{r.name}</b></p>
                  <p>⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>

                <button
                  onClick={() => deleteReview(r._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;