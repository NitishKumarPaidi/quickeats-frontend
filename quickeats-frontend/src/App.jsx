import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from './pages/Cart.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// PrivateRoute component
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
