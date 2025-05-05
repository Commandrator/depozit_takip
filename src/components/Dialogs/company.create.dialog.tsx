import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import useCompany from "../../hooks/useCompany.tsx";
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
  const [errors, setErrors] = useState<{ companyName?: string, companyAbout?:string }>({});
  const { createCompany } = useCompany();

  // Save the company and handle errors
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form refresh

    let newErrors: { companyName?: string } = {};

    // Validate company name
    if (!companyName.trim()) {
      newErrors.companyName = langPack.company_name_cannot_be_blank;
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
  const isValidCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setvalueSetter: (value: string) => void,
    errorOption:string,
    message:string
  ) => {
    const value = e.target.value;
    const regex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 ]+$/; // Boş girişleri ve sadece boşlukları engelle
    if (regex.test(value)) {
      setvalueSetter(value);
      setErrors((prev) => ({ ...prev, [errorOption]: "" })); // Hata varsa kaldır
    } else {
      setErrors((prev) => ({
        ...prev,
        [errorOption]: message,
      }));
    }
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
        className="space-y-4"
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        <TextField
          sx={{ "& .MuiInputBase-input": { color: theme.text } }}
          required
          autoFocus
          margin="dense"
          autoComplete="off"
          label={langPack.company_name}
          type="text"
          fullWidth
          variant="outlined"
          value={companyName}
          onChange={(e) => isValidCompanyName(e, setCompanyName, "companyName", langPack.enter_letters_and_numbers_only)}
          error={!!errors.companyName}
          helperText={errors.companyName}
        />
        <TextField
          sx={{ "& .MuiInputBase-input": { color: theme.text } }}
          margin="dense"
          autoComplete="off"
          label={langPack.about}
          type="text"
          fullWidth
          variant="outlined"
          value={companyAbout}
          error={!!errors.companyAbout}
          helperText={errors.companyAbout}
          onChange={(e) => isValidCompanyName(e, setCompanyAbout, "companyAbout", langPack.enter_letters_and_numbers_only)}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button
          onClick={handleDialogAction}
          color="primary"
          variant="contained"
          endIcon={<Close />}
        >
          {langPack.close}
        </Button>
        <Button
          onClick={handleSave}
          color="success"
          variant="contained"
          disabled={!companyName.length}
          endIcon={<Save />}
        >
          {langPack.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCompanyDialog;
