import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import api from "../api";

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/menu", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFoodItems(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch menu");
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
