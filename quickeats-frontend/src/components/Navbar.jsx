import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-500">QuickEats</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-red-500">Home</Link></li>
        <li><Link to="/menu" className="hover:text-red-500">Menu</Link></li>
        <li><Link to="/cart" className="hover:text-red-500">Cart</Link></li>
        <li><Link to="/login" className="hover:text-red-500">Login</Link></li>
      </ul>
    </nav>
  );
}
