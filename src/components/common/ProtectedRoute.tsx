import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from "./LoadingSpinner";


/**
 * Checks if the user is authenticated or is navigating in offline mode
 */
export function ProtectedRoute() {
  const { isAuthenticated, isOffline, loading } = useAuth();

  if (loading) return (
    <LoadingSpinner
      color={"var(--main-color)"}
      duration={2}
      radius={40}
    />
  )

  if (isAuthenticated || isOffline) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}