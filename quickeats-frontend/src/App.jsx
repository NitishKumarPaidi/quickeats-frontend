
import Navbar from './components/Navbar.jsx'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Menu from "./pages/Menu.jsx"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  )
}

export default App
