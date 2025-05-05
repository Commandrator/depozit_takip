import React, { ReactNode } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { Tooltip } from "@mui/material";
import { ExitToApp, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import useApp from "../../hooks/useApp.tsx";
import ProcessList from "./Process.tsx";
import paths from "./paths/paths.dts.tsx";
import { langPack, theme } from "../../index.jsx";
interface DrawerScrollableSideBarProps {
  readonly children?: ReactNode;
}
function DrawerScrollableSideBar({ children }: DrawerScrollableSideBarProps) {
  const {
    auth,
    logout,
    handleOpen,
    sidebarClose,
    handleClose,
    dialogOpen,
    defaultNavActive,
  } = useApp();
  if (!auth) return null;
  return (
    <React.Fragment>
      <div className="fixed top-0 left-0 w-full z-10 bg-[#023535]">
        <div className="max-w-screen-lg mx-auto flex flex-col">
          {defaultNavActive ? (
            <div>
              <IconButton aria-label="menu" onClick={handleOpen}>
                <Menu sx={{ color: theme.menuItem.color }} />
              </IconButton>
            </div>
          ) : null}
          <div id="secound">{children}</div>
        </div>
      </div>
      <Drawer
        open={dialogOpen}
        onClose={handleClose}
        slotProps={{
          content: {
            sx: {
              backgroundColor: theme.background,
              color: theme.text,
            },
          },
        }}
      >
        <ModalClose
          slotProps={{
            root: {
              sx: { color: theme.menuItem.color },
            },
          }}
        />
        <DialogTitle
          variant="plain"
          sx={{ backgroundColor: theme.background, color: theme.text }}
        >
          {langPack.transactions}
        </DialogTitle>
        <DialogContent
          sx={{ backgroundColor: theme.background, color: theme.text }}
        >
          <ProcessList sidebarClose={sidebarClose} processes={paths} />
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.background,
            color: theme.text,
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar size="lg" />
            <div>
              <Typography level="title-md" sx={{ color: theme.text }}>
                {auth.username}
              </Typography>
              <Typography level="body-sm" sx={{ color: theme.text }}>
                {auth.email}
              </Typography>
            </div>
          </div>
          <Tooltip title="Oturumu Sonlandır">
            <IconButton onClick={logout}>
              <ExitToApp sx={{ color: theme.menuItem.color }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerScrollableSideBar;
