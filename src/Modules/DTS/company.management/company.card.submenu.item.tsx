import React from "react";
import { MenuItem, ListItemIcon, Typography } from "@mui/material";
import { langPack, theme } from "../../../index.jsx";
const MenuItemComponent: React.FC<{ item: any; handleAction: any }> = ({
  item,
  handleAction,
}) => (
  <MenuItem
    onClick={() => handleAction(item.action)}
    sx={{
      color: item.color ?? theme.menuItem,
    }}
  >
    <ListItemIcon sx={{ color: item.color ?? theme.menuItem }}>
      {item.icon}
    </ListItemIcon>
    <Typography variant="inherit">{langPack[item.label]}</Typography>
  </MenuItem>
);
export default MenuItemComponent;