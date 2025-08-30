import { useEffect, useState } from "react";
import api from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const userId = 1; // replace with logged-in user ID from JWT if needed

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increment = async (id, quantity) => {
    await api.put(`/cart/${id}?quantity=${quantity + 1}`);
    fetchCart();
  };

  const decrement = async (id, quantity) => {
    if (quantity > 1) {
      await api.put(`/cart/${id}?quantity=${quantity - 1}`);
      fetchCart();
    }
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => decrement(item.id, item.quantity)} className="bg-gray-200 px-2 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item.id, item.quantity)} className="bg-gray-200 px-2 rounded">+</button>
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
