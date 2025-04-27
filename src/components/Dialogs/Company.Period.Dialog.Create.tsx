import React from "react";
import {
  DialogContent,
  Paper,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { langPack, theme } from "../../index.jsx";
import usePeriod from "../../hooks/usePeriod.tsx";
const CreatePeriod = ({ selectedCompanyId, setViewCreate }) => {
  const {
    createPeriod,
    errors,
    inputValue,
    checkEmpty,
    isValidCompanyName,
    setInputValue,
  } = usePeriod({ selectedCompanyId });
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await checkEmpty();
    await createPeriod(selectedCompanyId, inputValue);
    setViewCreate((prev) => !prev);
  };
  return (
    <DialogContent
      className="space-y-5"
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <Stack
        spacing={2}
        component={Paper}
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
        }}
      >
        <Box
          sx={{
            borderRadius: "12px",
            backgroundColor: theme.background,
            color: theme.text,
            padding: "10px",
          }}
        >
          <TextField
            sx={{ "& .MuiInputBase-input": { color: theme.text } }}
            tabIndex={0}
            required
            autoFocus
            size="small"
            margin="dense"
            autoComplete="off"
            label={langPack.period_name}
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue.name}
            onChange={(e) => {
              isValidCompanyName(
                e,
                setInputValue,
                "periodName",
                langPack.enter_letters_and_numbers_only,
                /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 ]+$/
              );
            }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            sx={{ "& .MuiInputBase-input": { color: theme.text } }}
            required
            margin="dense"
            autoComplete="off"
            label={langPack.expiration_date}
            type="date"
            size="small"
            fullWidth
            variant="outlined"
            value={inputValue["deadline"]}
            onClick={(e) =>
              e.currentTarget.querySelector("input")?.showPicker?.()
            }
            onChange={(e) => {
              isValidCompanyName(
                e,
                setInputValue,
                "deadline",
                langPack.invalid_date_format,
                /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
              );
            }}
            error={!!errors["deadline"]}
            helperText={errors["deadline"]}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSave}
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: "20px",
              color: theme.text,
            }}
          >
            {langPack.save}
          </Button>
        </Box>
      </Stack>
    </DialogContent>
  );
};
export default CreatePeriod;
