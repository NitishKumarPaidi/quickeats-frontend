export default function FoodCard({ item, addToCart }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600">₹{item.price}</p>
        <button
          onClick={addToCart}
          className="mt-2 w-full bg-green-500 text-white p-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
