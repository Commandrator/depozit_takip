import React, { ReactNode, useState, cloneElement } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Folder, NavigateNext } from "@mui/icons-material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { theme } from "../..";
const ProcessList = ({ processes, sidebarClose, level = 0 }) => {
  const [viewList, setViewList] = useState<boolean>(false);
  const handleClick = (
    path: string | undefined,
    nav: ReactNode | undefined
  ) => {
    if (path) sidebarClose(path);
    else setViewList((prev) => !prev);
  };
  return (
    <List disablePadding dense sx={{ pl: level * 2, m: 0, p: 0 }}>
      {processes.map((process) => (
        <ListItem
          key={process.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingY: 0,
            marginY: 0,
          }}
        >
          <div className="flex items-center w-full">
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              {process.children ? (
                viewList ? (
                  <FolderOpenIcon />
                ) : (
                  <Folder sx={{ color: theme.menuItem.color }} />
                )
              ) : process.icon ? (
                cloneElement(process.icon, {
                  sx: { color: theme.menuItem.color },
                })
              ) : (
                <NavigateNext sx={{ color: theme.menuItem.color }} />
              )}
            </ListItemIcon>
            <ListItemButton
              onClick={() => handleClick(process.path, process.secounderyNav)}
              disableRipple
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                "&:active": { backgroundColor: "transparent" },
                paddingY: 0,
                minHeight: "32px",
              }}
            >
              {process.label}
            </ListItemButton>
          </div>
          {process.children && process.children.length > 0 && (
            <Divider sx={{ width: "100%" }} />
          )}
          {viewList && process.children && process.children.length > 0 && (
            <ProcessList
              processes={process.children}
              sidebarClose={sidebarClose}
              level={level + 1}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
};
export default ProcessList;
