import DashboardRounded from "@mui/icons-material/DashboardRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import AssessmentRounded from "@mui/icons-material/AssessmentRounded";
import AdminPanelSettingsRounded from "@mui/icons-material/AdminPanelSettingsRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import { PERMISSIONS } from "@app/shared";
import type { MenuItem } from "./menu.types";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard", label: "Dashboard", path: "/dashboard",
    icon: DashboardRounded, permissions: [PERMISSIONS.DASHBOARD_READ]
  },
  {
    id: "users", label: "Usuarios", icon: PeopleAltRounded,
    permissions: [PERMISSIONS.USERS_READ],
    children: [
      {
        id: "users-list", label: "Listado", path: "/users",
        icon: PeopleAltRounded, permissions: [PERMISSIONS.USERS_READ]
      }
    ]
  },
  {
    id: "reports", label: "Reportes", path: "/reports",
    icon: AssessmentRounded, permissions: [PERMISSIONS.REPORTS_READ]
  },
  {
    id: "administration", label: "Administración",
    icon: AdminPanelSettingsRounded,
    permissions: [PERMISSIONS.ROLES_READ, PERMISSIONS.ROLES_MANAGE],
    children: [
      {
        id: "roles", label: "Roles y permisos", path: "/roles",
        icon: AdminPanelSettingsRounded,
        permissions: [PERMISSIONS.ROLES_READ]
      },
      {
        id: "settings", label: "Configuración", path: "/settings",
        icon: SettingsRounded, permissions: [PERMISSIONS.SETTINGS_READ]
      }
    ]
  }
];
