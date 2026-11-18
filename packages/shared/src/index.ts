export const PERMISSIONS = {
  DASHBOARD_READ: "dashboard:read",
  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",
  ROLES_READ: "roles:read",
  ROLES_MANAGE: "roles:manage",
  REPORTS_READ: "reports:read",
  SETTINGS_READ: "settings:read"
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type PermissionOverrides = {
  grant: Permission[];
  revoke: Permission[];
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: Permission[];
}

export interface ApiError {
  message: string;
  details?: unknown;
}
