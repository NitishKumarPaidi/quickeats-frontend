import { useEffect, useState } from "react";
import api from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cart");
      }
    };
    fetchCart();
  }, []);

  const increment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/cart/${id}/increment`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    } catch (err) {
      setError("Failed to update item");
    }
  };

  const decrement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/cart/${id}/decrement`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    } catch (err) {
      setError("Failed to update item");
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setCart(cart.filter(item => item.id !== id));
    } catch (err) {
      setError("Failed to remove item");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart 🛒</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => decrement(item.id)} className="bg-gray-200 px-2 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item.id)} className="bg-gray-200 px-2 rounded">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}
