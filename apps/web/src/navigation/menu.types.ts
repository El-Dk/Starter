import type { SvgIconComponent } from "@mui/icons-material";
import type { Permission } from "@app/shared";

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon: SvgIconComponent;
  permissions?: Permission[];
  children?: MenuItem[];
}
