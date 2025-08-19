import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';
import type { UserProfile } from "@/types";
import { useToast } from "@/context/ToastContext";

export interface ProtectedRouteProps {
  roles?: string[]
}

/**
 * Checks if the user is authenticated or is navigating in offline mode
 */
export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { user, isOffline, profile } = useAuth();
  const location = useLocation();
  const { showError } = useToast();

  if (!user && !isOffline) {
    // Here we force to user to the login page and save the requested path
    console.log('User not logged. Redirecting to login page...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Checks if the path requires the user to have a role
  if (roles && (!profile || !isUserAthorized(profile, roles))) {
    console.log('User unauthorized. Redirecting to home page...');
    showError('Utente non autorizzato')
    return <Navigate to="/" replace />;
  }

  return <Outlet />
}

const isUserAthorized = (profile: UserProfile, roles: string[]) => {
  if (roles.length == 0) {
    return true;
  }

  if (!profile || !profile.role) {
    return false;
  }

  for (const role of roles) {
    if (profile.role.indexOf(role) >= 0) {
      return true;
    }
  }

  return false;
}