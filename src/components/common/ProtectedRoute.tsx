import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';

/**
 * Checks if the user is authenticated or is navigating in offline mode
 */
export function ProtectedRoute() {
  const { user, isOffline } = useAuth();
  const location = useLocation();

  if (user || isOffline) {
    return <Outlet />
  }

  console.log('User not logged. Redirecting to login page...');

  // Here we force to user to the login page and save the requested path
  return <Navigate to="/login" state={{ from: location }} replace />
}