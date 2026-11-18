import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { menuItems } from "../../navigation/menu.config";
import { filterMenu } from "../../navigation/filterMenu";
import { Sidebar } from "./Sidebar";

export function MainLayout() {
  const { user, logout } = useAuth();
  const visibleMenu = filterMenu(menuItems, user?.permissions ?? []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={visibleMenu} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <AppBar position="sticky" color="inherit" elevation={0}
          sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Toolbar sx={{ justifyContent: "flex-end", gap: 1 }}>
            <IconButton><NotificationsNoneRounded /></IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.name?.[0] ?? "U"}</Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight={600}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Typography component="button" onClick={logout} sx={{
              border: 0, bgcolor: "transparent", color: "primary.main",
              cursor: "pointer", ml: 1
            }}>Salir</Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
