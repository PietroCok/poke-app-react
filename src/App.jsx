import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import RemoteCarts from "./pages/RemoteCarts";
import PersonalArea from "./pages/PersonalArea";
import OrderPreview from "./pages/OrderPreview";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/remote-carts" element={<RemoteCarts />} />
        <Route path="/personal" element={<PersonalArea />} />
        <Route path="/order-preview" element={<OrderPreview />} />
      </Routes>
    </Router>
  )
}

