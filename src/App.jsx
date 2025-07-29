import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LoadingSpinner from './components/common/LoadingSpinner';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import RemoteCarts from "./pages/RemoteCarts";
import PersonalArea from "./pages/PersonalArea";
import OrderPreview from "./pages/OrderPreview";

export default function App() {
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    const loadApp = async () => {
      // simulate loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      fetch('./config.json')
        .then(res => res.json())
        .then(data => setAppConfig(data))
        .catch(err => err)
    }

    loadApp();
  }, []);

  if (!appConfig) return (
    <LoadingSpinner
      color={"var(--main-color)"}
      duration={2}
      radius={40}
    />
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home config={appConfig} />} />
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

