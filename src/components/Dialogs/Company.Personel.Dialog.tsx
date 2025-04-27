import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PersonelDialogProps from "../../interfaces/PersonelDialogProps";
import { langPack, theme } from "../..";
import { Close } from "@mui/icons-material";
const PersonelDialog = (props: PersonelDialogProps) => {
  const { dialogOpen, handleDialogAction, selectedCompanyId, company } = props;

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        {company.name}asdasds
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        <Typography>{company.about}</Typography>
      </DialogContent>
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
export default PersonelDialog;
