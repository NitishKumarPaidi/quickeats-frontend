import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [cartCount] = useState(2); // later will connect to global state

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-500">QuickEats</h1>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-red-500">Home</Link></li>
        <li><Link to="/menu" className="hover:text-red-500">Menu</Link></li>
        <li className="relative">
          <Link to="/cart" className="hover:text-red-500">Cart</Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </li>
        <li><Link to="/login" className="hover:text-red-500">Login</Link></li>
      </ul>
    </nav>
  );
}
