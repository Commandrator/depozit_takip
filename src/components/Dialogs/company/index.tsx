import React, { useState } from "react";
import { Button, TextField, Stack, Paper, Box } from "@mui/material";
import { Save } from "@mui/icons-material";
import useCompany from "../../../hooks/useCompany.tsx";
import { langPack, theme } from "../../..";
const CreateCompanyDialogContent : React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAbout, setCompanyAbout] = useState<string>("");
  const [errors, setErrors] = useState<{
    companyName?: string;
    companyAbout?: string;
  }>({});
  const { createCompany, handleDialogClose } = useCompany();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { companyName?: string } = {};
    if (!companyName.trim()) {
      newErrors.companyName = langPack.company_name_cannot_be_blank;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await createCompany({ name: companyName, about: companyAbout });
    setErrors({}); // Reset errors after successful save
    handleDialogClose(); // Close the dialog
  };
  const isValidCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setvalueSetter: (value: string) => void,
    errorOption: string,
    message: string
  ) => {
    const value = e.target.value;
    const regex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 ]+$/; // Boş girişleri ve sadece boşlukları engelle
    if (regex.test(value) || !value) {
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
    <Stack spacing={2} sx={{ padding: "16px" }}>
      <Stack
        component={Paper}
        elevation={3}
        spacing={2}
        sx={{
          padding: "16px",
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
        }}
      >
        <TextField
          size="small"
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
          onChange={(e) =>
            isValidCompanyName(
              e,
              setCompanyName,
              "companyName",
              langPack.enter_letters_and_numbers_only
            )
          }
          error={!!errors.companyName}
          helperText={errors.companyName}
        />
        <TextField
          size="small"
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
          onChange={(e) =>
            isValidCompanyName(
              e,
              setCompanyAbout,
              "companyAbout",
              langPack.enter_letters_and_numbers_only
            )
          }
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSave}
            color="success"
            variant="contained"
            disabled={!companyName.length}
            endIcon={<Save />}
          >
            {langPack.save}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
export default CreateCompanyDialogContent;
