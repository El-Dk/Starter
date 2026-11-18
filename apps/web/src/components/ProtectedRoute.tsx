import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { Permission } from "@app/shared";
import { useAuth } from "../auth/AuthContext";

export function ProtectedRoute({ permission }: { permission?: Permission }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (permission && !user.permissions.includes(permission)) {
    return <Navigate to="/forbidden" replace />;
  }
  return <Outlet />;
}
