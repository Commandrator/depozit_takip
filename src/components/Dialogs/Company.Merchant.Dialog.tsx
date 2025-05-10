import React from "react";
import {
  Button,
  Dialog,
  DialogActions
} from "@mui/material";
import { Close } from "@mui/icons-material";
import MerchantDialogProps from "../../interfaces/MerchantDialogProps.ts";
import { theme, langPack } from "../../index.jsx";
const MerchantDialog = (props: MerchantDialogProps) => {
  const { dialogOpen, handleDialogAction, company } = props;

  if (!company) return null;
  return (
    <Dialog open={dialogOpen} onClose={handleDialogAction}>
      {/* <DialogTitle>{merchant.name}</DialogTitle>
      <DialogContent>
        <Typography>{merchant.description}</Typography>
      </DialogContent> */}
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button
          endIcon={<Close />}
          variant="contained"
          sx={{ backgroundColor: theme.closeButton }}
          onClick={handleDialogAction}
        >
          {langPack.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default MerchantDialog;
