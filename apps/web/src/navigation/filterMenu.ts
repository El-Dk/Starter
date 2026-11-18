import type { Permission } from "@app/shared";
import type { MenuItem } from "./menu.types";

export function filterMenu(items: MenuItem[], permissions: Permission[]): MenuItem[] {
  return items.reduce<MenuItem[]>((visible, item) => {
    const allowed = !item.permissions?.length ||
      item.permissions.some((permission) => permissions.includes(permission));
    if (!allowed) return visible;

    const children = item.children
      ? filterMenu(item.children, permissions)
      : undefined;

    if (item.children && !children?.length) return visible;
    visible.push({ ...item, children });
    return visible;
  }, []);
}
