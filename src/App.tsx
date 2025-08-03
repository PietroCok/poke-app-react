import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import type { AppConfig } from '@/types';

import appConfig from '../config.json';

import { AuthProvider } from './context/AuthContext';
import { SelectionProvider } from './context/configurator/SelectionContext';
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Cart } from "./pages/Cart";
import { Favorites } from "./pages/Favorites";
import { RemoteCarts } from "./pages/RemoteCarts";
import { PersonalArea } from "./pages/PersonalArea";

const config: AppConfig = appConfig;

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>

            <Route path="/" element={
              <SelectionProvider>
                <Home {...config} />
              </SelectionProvider>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/remote-carts" element={<RemoteCarts />} />
            <Route path="/personal" element={<PersonalArea />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}



