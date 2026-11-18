import { useState } from "react";
import {
  Box, Collapse, Divider, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Tooltip, Typography
} from "@mui/material";
import MenuOpenRounded from "@mui/icons-material/MenuOpenRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ExpandLessRounded from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import { NavLink, useLocation } from "react-router-dom";
import type { MenuItem } from "../../navigation/menu.types";

const EXPANDED = 248;
const COLLAPSED = 72;

function MenuRows({ items, expanded, depth = 0 }: {
  items: MenuItem[]; expanded: boolean; depth?: number;
}) {
  const location = useLocation();
  const [open, setOpen] = useState<string[]>([]);

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const hasChildren = Boolean(item.children?.length);
        const active = Boolean(item.path && location.pathname === item.path);
        const groupActive = item.children?.some((child) =>
          child.path === location.pathname
        ) ?? false;
        const isOpen = open.includes(item.id) || groupActive;

        return (
          <Box key={item.id}>
            <Tooltip title={!expanded ? item.label : ""} placement="right">
              <ListItemButton
                component={item.path ? NavLink : "div"}
                to={item.path}
                selected={active || groupActive}
                onClick={() => {
                  if (hasChildren) setOpen((current) =>
                    current.includes(item.id)
                      ? current.filter((id) => id !== item.id)
                      : [...current, item.id]
                  );
                }}
                sx={{
                  minHeight: 46, mx: 1, mb: 0.5, px: 2,
                  pl: expanded ? 2 + depth * 2 : 2,
                  justifyContent: expanded ? "initial" : "center",
                  "&.Mui-selected": { bgcolor: "action.selected" },
                  "&.Mui-selected:hover": { bgcolor: "action.hover" }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0, mr: expanded ? 2 : 0, justifyContent: "center",
                  color: active || groupActive ? "primary.main" : "inherit"
                }}>
                  <Icon />
                </ListItemIcon>
                {expanded && <ListItemText primary={item.label} />}
                {expanded && hasChildren &&
                  (isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />)}
              </ListItemButton>
            </Tooltip>
            {hasChildren && expanded && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <MenuRows items={item.children!} expanded={expanded} depth={depth + 1} />
                </List>
              </Collapse>
            )}
          </Box>
        );
      })}
    </>
  );
}

export function Sidebar({ items }: { items: MenuItem[] }) {
  const [expanded, setExpanded] = useState(true);
  const width = expanded ? EXPANDED : COLLAPSED;

  return (
    <Drawer variant="permanent" sx={{
      width, flexShrink: 0,
      "& .MuiDrawer-paper": {
        width, boxSizing: "border-box", overflowX: "hidden",
        transition: "width 180ms ease", borderRight: 1, borderColor: "divider"
      }
    }}>
      <Box sx={{ height: 64, display: "flex", alignItems: "center",
        justifyContent: expanded ? "space-between" : "center", px: 2 }}>
        {expanded && <Typography fontWeight={700}>Starter App</Typography>}
        <IconButton onClick={() => setExpanded((value) => !value)} size="small">
          {expanded ? <MenuOpenRounded /> : <ChevronRightRounded />}
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 1.5 }}>
        <MenuRows items={items} expanded={expanded} />
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {expanded ? "Starter · v1.0.0" : "v1"}
        </Typography>
      </Box>
    </Drawer>
  );
}
