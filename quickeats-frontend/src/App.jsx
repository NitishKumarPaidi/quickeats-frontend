
import Navbar from './components/Navbar.jsx'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Menu from "./pages/Menu.jsx"
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
