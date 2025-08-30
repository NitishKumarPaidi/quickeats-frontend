import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import api from "../api";

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);

  const userId = 1; // replace with logged-in user ID from JWT if needed

  // Fetch menu items from backend
  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu");
      setFoodItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    try {
      await api.post("/cart", {
        userId,
        menuItemId: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
      });
      alert(`${item.name} added to cart!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <FoodCard key={item.id} item={item} addToCart={() => addToCart(item)} />
        ))}
      </div>
    </div>
  );
}
