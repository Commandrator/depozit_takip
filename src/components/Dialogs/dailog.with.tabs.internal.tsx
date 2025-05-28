import React, { createElement,useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { theme, langPack } from "../../index.jsx";
import { InternalDialogProps } from "../../interfaces/CompanyDialogProps.ts";
import { Close } from "@mui/icons-material";
import DialogWithTabsMenu from "./dialog.with.tabs.menu.tsx";
import { MenuItem } from "../../interfaces/dailog.with.tab.menu.item.dto.ts";
const DialogWithTabInternal: React.FC<InternalDialogProps> = (props) => {
  const {
    dialogOpen,
    handleDialogClose,
    selectedCompanyId,
    process_id,
    dialogType,
    subMenu,
    setDialogType
  } = props;
    const findIndex = (aciton: string) => {
      if (!subMenu) return undefined;
      return subMenu.subMenu?.findIndex((data) => data.action === aciton);
    };
    const [mainTabIndex, setMainTabIndex] = React.useState(
      findIndex(dialogType) ?? 0
    );
    useEffect(() => {
      if (subMenu) {
        const index =  subMenu?.subMenu?.findIndex((data) => data.action === dialogType) ?? 0;
        setMainTabIndex(index);
      }
    }, [dialogType, subMenu]);
    const handleMainChange = (_, newValue) => {
      if (subMenu && subMenu.subMenu && subMenu.subMenu[newValue]) {
        setDialogType(subMenu.subMenu[newValue].action ?? "info");
      } else {
        setDialogType("info");
      }
      setMainTabIndex(newValue); 
    };
    const handleClose = () => {
      handleDialogClose();
      setMainTabIndex(0);
    };
  const elementOption = {
    selectedCompanyId,
    dialogType,
    process_id,
  };
  if (!subMenu.subMenu || subMenu.subMenu.length === 0) return null;
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
          menuItem={subMenu as MenuItem}
        />
      </DialogTitle>
      {subMenu && subMenu.subMenu[mainTabIndex]?.content && (
      <DialogContent sx={{ padding: 0 }}>
        {createElement(subMenu.subMenu[mainTabIndex].content as React.FC<any>, {
          ...elementOption,
        })}
      </DialogContent>)}
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

export default DialogWithTabInternal;
