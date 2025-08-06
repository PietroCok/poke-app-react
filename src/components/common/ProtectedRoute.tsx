import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';

/**
 * Checks if the user is authenticated or is navigating in offline mode
 */
export function ProtectedRoute() {
  const { user, isOffline } = useAuth();

  if (user || isOffline) {
    return <Outlet />
  }

  console.log('User not logged. redirecting to login page...');

  return <Navigate to="/login" />
}