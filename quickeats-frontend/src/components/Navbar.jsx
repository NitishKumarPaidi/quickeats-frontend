import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold">QuickEats</h1>
      <div className="flex gap-6 items-center">
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        {name ? (
          <>
            <span>Hi, {name}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
                to="/signup"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Signup
            </Link>
          </>
        )
        }
      </div>
    </nav>
  );
};

export default Navbar;
