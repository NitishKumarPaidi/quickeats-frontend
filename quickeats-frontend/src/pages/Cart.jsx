import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch cart items when page loads
  useEffect(() => {
    if (!userId) return;
    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Update quantity
  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:8080/api/cart/${id}?quantity=${quantity}`);
      setMessage("Quantity updated ✅");
      fetchCart();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setMessage("Failed to update ❌");
    }
  };

  // Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${id}`);
      setMessage("Item removed ✅");
      fetchCart();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error removing item:", err);
      setMessage("Failed to remove ❌");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.menu?.price || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {message && (
        <p className="mb-4 text-center text-green-600 font-semibold">{message}</p>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{item.menu?.name}</h3>
                <p className="text-gray-600">₹{item.menu?.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <p className="font-semibold">
                  ₹{item.quantity * (item.menu?.price || 0)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold">
              Total: ₹{totalPrice}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
