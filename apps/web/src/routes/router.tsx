import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../auth/AuthContext";
import { PERMISSIONS } from "@app/shared";
import { DashboardPage, ForbiddenPage, ReportsPage, RolesPage, SettingsPage, UsersPage } from "../pages/Pages";
import { LoginPage } from "../pages/LoginPage";

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <HomeRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/forbidden", element: <ForbiddenPage /> },
  {
    element: <ProtectedRoute />,
    children: [{
      element: <MainLayout />,
      children: [
        { element: <ProtectedRoute permission={PERMISSIONS.DASHBOARD_READ} />, children: [{ path: "/dashboard", element: <DashboardPage /> }] },
        { element: <ProtectedRoute permission={PERMISSIONS.USERS_READ} />, children: [{ path: "/users", element: <UsersPage /> }] },
        { element: <ProtectedRoute permission={PERMISSIONS.REPORTS_READ} />, children: [{ path: "/reports", element: <ReportsPage /> }] },
        { element: <ProtectedRoute permission={PERMISSIONS.ROLES_READ} />, children: [{ path: "/roles", element: <RolesPage /> }] },
        { element: <ProtectedRoute permission={PERMISSIONS.SETTINGS_READ} />, children: [{ path: "/settings", element: <SettingsPage /> }] }
      ]
    }]
  }
]);
