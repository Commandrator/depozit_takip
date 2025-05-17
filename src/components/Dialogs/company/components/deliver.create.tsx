import React from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Box,
  Tooltip,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { langPack, theme } from "../../../../index.jsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Save } from "@mui/icons-material";
import DialogCreateDTO from "../../../../interfaces/dialog.create.dto.ts";
import useDeliver from "../../../../hooks/useDeliver.tsx";
import { DeliverInputError } from "../../../../classes/deliver.input.values.ts";
/**
 * # Personel oluşturma modülü
 *
 */
const Create: React.FC<DialogCreateDTO> = ({
  selectedCompanyId,
  setViewCreate,
}) => {
  const { create, isValidInput, errors, inputValue } = useDeliver({
    selectedCompanyId,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(selectedCompanyId);
    setViewCreate((prev) => !prev);
  };

  return (
    <form onSubmit={handleSave}>
      <Stack
        component={Paper}
        spacing={2}
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
            label={langPack.employee}
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue.employee}
            onChange={(e) => isValidInput(e, "employee")}
            error={!!errors.employee}
            helperText={errors.employee}
          />

          <TextField
            sx={{ "& .MuiInputBase-input": { color: theme.text } }}
            margin="dense"
            autoComplete="off"
            label={langPack.employee_connect_mail}
            type="email"
            size="small"
            fullWidth
            variant="outlined"
            value={inputValue.mail}
            onChange={(e) => isValidInput(e, "mail")}
            error={!!errors.mail}
            helperText={errors.mail}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {langPack.mail_notice}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={inputValue.active}
                onChange={(e) => isValidInput(e, "active")}
              />
            }
            label={langPack.active_employee}
          />

          <Stack direction="row" spacing={1}>
            <Tooltip title={langPack.back}>
              <Button
                fullWidth
                type="button"
                onClick={() => setViewCreate((prev) => !prev)}
                variant="outlined"
                color="inherit"
                startIcon={<ChevronLeftIcon />}
                sx={{
                  borderRadius: "20px",
                  color: theme.text,
                }}
              >
                {langPack.cancel}
              </Button>
            </Tooltip>
            <Tooltip title={langPack.save}>
              <span>
                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  startIcon={<Save />}
                  disabled={new DeliverInputError(inputValue).hasError()}
                  sx={{
                    borderRadius: "20px",
                    color: theme.text,
                  }}
                >
                  {langPack.save}
                </Button>
              </span>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default Create;
