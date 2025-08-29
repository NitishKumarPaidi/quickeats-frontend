import FoodCard from "../components/FoodCard";

const foodItems = [
  { id: 1, name: "Cheese Pizza", price: 250, image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Veg Burger", price: 150, image: "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "French Fries", price: 120, image: "https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Coke", price: 60, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function Menu() {
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
