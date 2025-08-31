import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  const handleAddToCart = async (menuItem) => {
    if (!userId) {
      setMessage("⚠️ Please login first!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/cart", {
        userId: parseInt(userId),
        menuId: menuItem.id,
        quantity: 1,
      });

      setMessage(`${menuItem.name} added to cart ✅`);
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("❌ Failed to add to cart");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Menu</h2>

      {message && (
        <p className="mb-4 text-center text-green-600 font-semibold">{message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-40 h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-2">₹{item.price}</p>

            <button
              onClick={() => handleAddToCart(item.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
