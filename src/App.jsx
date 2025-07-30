import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthProvider, { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute'
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
      fetch('./config.json')
        .then(res => res.json())
        .then(data => setAppConfig(data))
        .catch(err => err)
      
      await new Promise(resolve => setTimeout(resolve, 2000));
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
    <AuthProvider config={appConfig}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home config={appConfig} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/remote-carts" element={<RemoteCarts />} />
            <Route path="/personal" element={<PersonalArea />} />
            <Route path="/order-preview" element={<OrderPreview />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}



