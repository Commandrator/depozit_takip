import React from "react";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { langPack, theme } from "../../index.jsx";
const CompanyPeriodDialog = ({
  dialogOpen,
  handleDialogAction,
  company,
  selectedCompanyId,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        {langPack.company_periods}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        test
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button
          endIcon={<Close />}
          color="error"
          variant="contained"
          sx={{
            mb: 2,
            mr: 2,
          }}
          onClick={handleDialogAction}
        >
          {langPack.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CompanyPeriodDialog;
