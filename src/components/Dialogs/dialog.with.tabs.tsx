import React, { createElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { theme, langPack } from "../../index.jsx";
import useDialog from "../../hooks/useDialog.tsx";
import CompanyDialogProps from "../../interfaces/CompanyDialogProps.ts";
import { Close } from "@mui/icons-material";
import DialogWithTabsMenu from "./dialog.with.tabs.menu.tsx";
const DialogWithTab: React.FC<CompanyDialogProps> = (props) => {
  const {
    dialogOpen,
    handleDialogClose,
    selectedCompanyId,
    dialogType,
    company
  } = props;
  const { mainTabIndex, handleMainChange, menuItem, handleClose } = useDialog({
    handleDialogClose,
    dialogType,
  });
  const elementOption ={
    company,
    selectedCompanyId,
    dialogType,
  }
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.menu.backgroundColor,
          color: theme.text,
          minHeight: "500px",
        },
      }}
    >
      <DialogTitle sx={{ padding: "8px 16px" }}>
        <DialogWithTabsMenu
          mainTabIndex={mainTabIndex}
          handleMainChange={handleMainChange}
          menuItem={menuItem}
        />
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        {menuItem &&
          menuItem.subMenu[mainTabIndex].content &&
          createElement(
            menuItem.subMenu[mainTabIndex].content as React.FC<any>,
            { ...elementOption }
          )}
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.menu.backgroundColor,
          borderTop: theme.border,
        }}
      >
        <Button
          endIcon={<Close />}
          variant="contained"
          sx={{ backgroundColor: theme.closeButton }}
          onClick={handleClose}
        >
          {langPack.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWithTab;
