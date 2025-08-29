export default function FoodCard({ item }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl mb-4" />
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-600 mb-2">₹{item.price}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
        Add to Cart
      </button>
    </div>
  );
}
