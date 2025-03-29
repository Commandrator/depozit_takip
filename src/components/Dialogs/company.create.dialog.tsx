import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import useCompany from "../../hooks/useCompany";
import { langPack, theme } from "../..";

interface CreateCompanyDialogProps {
  dialogOpen: boolean;
  handleDialogAction: () => void;
}

const CreateCompanyDialog: React.FC<CreateCompanyDialogProps> = ({
  dialogOpen,
  handleDialogAction,
}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAbout, setCompanyAbout] = useState<string>("");
  const [errors, setErrors] = useState<{ companyName?: string }>({});
  const { createCompany } = useCompany();

  // Save the company and handle errors
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form refresh

    let newErrors: { companyName?: string } = {};

    // Validate company name
    if (!companyName.trim()) {
      newErrors.companyName = "Şirket adı boş olamaz!";
    }

    // If validation errors exist, update errors state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with company creation
    await createCompany({ name: companyName, about: companyAbout });
    setErrors({}); // Reset errors after successful save
    handleDialogAction(); // Close the dialog
  };

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
        {langPack.create_company}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        <TextField
          required
          autoFocus
          margin="dense"
          label={langPack.company_name}
          type="text"
          fullWidth
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={!!errors.companyName}
          helperText={errors.companyName}
        />
        <TextField
          margin="dense"
          label={langPack.about}
          type="text"
          fullWidth
          variant="outlined"
          value={companyAbout}
          onChange={(e) => setCompanyAbout(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button onClick={handleDialogAction} color="secondary">
          {langPack.cancel}
        </Button>
        <Button onClick={handleSave} color="primary">
          {langPack.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCompanyDialog;
