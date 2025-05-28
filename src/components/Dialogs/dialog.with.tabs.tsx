import React, { createElement, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { theme, langPack } from "../../index.jsx";
import useDialog from "../../hooks/useDialog.tsx";
import CompanyDialogProps, {
  InternalDialogProps,
} from "../../interfaces/CompanyDialogProps.ts";
import { Close } from "@mui/icons-material";
import DialogWithTabsMenu from "./dialog.with.tabs.menu.tsx";
import DialogWithTabInternal from "./dailog.with.tabs.internal.tsx";
import { SubMenu } from "../../interfaces/content.props.ts";
const DialogWithTab: React.FC<CompanyDialogProps> = (props) => {
  const {
    dialogOpen,
    handleDialogClose,
    selectedCompanyId,
    dialogType,
    company,
  } = props;
  const { mainTabIndex, handleMainChange, menuItem, handleClose } = useDialog({
    handleDialogClose,
    dialogType,
  });
  const [openInternalDialog, setOpenInternalDialog] = useState<boolean>(false);
  const [internalDialogType, setInternalDialogType] = useState<string>("info");
  const [internalDialogProcessID, setInternalDialogProcessID] = useState<InternalDialogProps["process_id"]>(null);
  const handeCloseInternalDialog = () => setOpenInternalDialog(false);
  const elementOption = {
    company,
    selectedCompanyId,
    dialogType,
    subMenu: menuItem?.subMenu[mainTabIndex],
    setInternalDialogProcessID,
    setInternalDialogType,
    setOpenInternalDialog
  };
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
      {menuItem && menuItem.subMenu[mainTabIndex]?.content && (
        <DialogContent sx={{ padding: 0 }}>
          <DialogWithTabInternal
            dialogOpen={openInternalDialog}
            handleDialogClose={handeCloseInternalDialog}
            selectedCompanyId={selectedCompanyId}
            process_id={internalDialogProcessID}
            dialogType={internalDialogType}
            setDialogType={setInternalDialogType}
            subMenu={menuItem.subMenu[mainTabIndex] as SubMenu}
          />
          {createElement(
            menuItem.subMenu[mainTabIndex].content as React.FC<any>,
            { ...elementOption }
          )}
        </DialogContent>
      )}
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
