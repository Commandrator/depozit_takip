import React, { ReactNode, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp.jsx";
import ProcessList from "./Process.tsx";
import paths from "./paths/paths.dts.tsx";
interface DrawerScrollableSideBarProps {
  readonly childern?: ReactNode;
}
function DrawerScrollableSideBar({ childern }: DrawerScrollableSideBarProps) {
  const { auth, logout } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarClose = (path: string | undefined) => {
    if (path) navigate(path);
    setOpen(false);
  };
  if (!auth) {
    return null; // auth verisi yoksa hiçbir şey render edilmez
  }
  return (
    <React.Fragment>
      <div className="fixed top-0 left-0 w-full z-10 bg-[#023535]">
        <div className="max-w-screen-md mx-auto flex flex-col">
          <div>
            <IconButton aria-label="menu" onClick={() => setOpen(true)}>
              <Menu className="text-white" />
            </IconButton>
          </div>
          <div id="secound">
          {childern}
          </div>
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>İşlemler</DialogTitle>
        <DialogContent>
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
          }}
        >
          <div className="flex">
            <Avatar size="lg" />
            <div>
              <Typography level="title-md">{auth.username}</Typography>
              <Typography level="body-sm">{auth.email}</Typography>
            </div>
          </div>
          <Tooltip title="Oturumu Sonlandır">
            <IconButton onClick={logout}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerScrollableSideBar;
