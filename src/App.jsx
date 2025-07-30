import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import appConfig from '../config.json';

import AuthProvider from './context/AuthContext';
import SizeProvider from './context/configurator/SizeContext';

import ProtectedRoute from './components/common/ProtectedRoute'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import RemoteCarts from "./pages/RemoteCarts";
import PersonalArea from "./pages/PersonalArea";
import OrderPreview from "./pages/OrderPreview";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>

            <Route path="/" element={
              <SizeProvider>
                <Home config={appConfig} />
              </SizeProvider>
            } />
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



