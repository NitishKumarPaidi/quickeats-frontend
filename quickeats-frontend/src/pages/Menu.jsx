import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import axios from "axios";

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/menu", {
          headers: {
            Authorization: token,
          },
        });
        setFoodItems(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p className="p-6">Loading menu...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
