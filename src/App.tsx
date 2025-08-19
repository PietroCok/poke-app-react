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
import { ThemeProvider } from './context/ThemeContext';
import { Registration } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { AdminUsersManagement } from './pages/AdminUsersManagement';
import { CartProvider } from './context/CartContext';
import { SharedCarts } from './pages/SharedCarts';
import { Invite } from './pages/Invite';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';

const config: AppConfig = appConfig;

export default function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router basename='poke-app-react'>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />

                <Route element={<ProtectedRoute />}>

                  <Route
                    element={<CartProvider />}
                  >

                    <Route element={<SelectionProvider />}>
                      <Route path="/" element={<Home {...config} />} />
                      <Route path="/cart" element={<Cart />} />
                    </Route>

                    <Route path='/shared-carts' element={<SharedCarts />} />
                    <Route path='/cart/invite/:cartId/:cartName' element={<Invite />} />

                  </Route>

                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/remote-carts" element={<RemoteCarts />} />
                  <Route path="/personal" element={<PersonalArea />} />
                  <Route path="*" element={<NotFound />} />

                </Route>

                <Route element={<ProtectedRoute roles={['admin']} />} >
                  <Route path='/admin/users' element={<AdminUsersManagement />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ModalProvider>
    </ToastProvider>
  )
}



