import React from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Box,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { langPack, theme } from "../../../../../index.jsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Save } from "@mui/icons-material";
import DialogCreateDTO from "../../../../../interfaces/dialog.create.dto.ts";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
import useModule from "../../../../../hooks/Modules/index.tsx";
/**
 * # Müşteri Tipi oluşturma modülü
 *
 */
const CreateCustomerType: React.FC<DialogCreateDTO<"customer_type">> = (
  props
): JSX.Element => {
  const { selectedCompanyId, setViewCreate, module } = props;
  const { create, isValidInput, errors, inputValue } =
    useDialogContext<"customer_type">({
      module,
      selectedCompanyId,
    });
  const { InputErrorAdapter } = useModule(module);
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
            borderRadius: 3,
            backgroundColor: theme.background,
            color: theme.text,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: 3,
          }}
        >
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <TextField
              autoFocus
              required
              fullWidth
              size="small"
              variant="outlined"
              label={langPack.customer_type}
              type="text"
              value={inputValue.name}
              onChange={(e) => isValidInput(e, "name")}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                "& .MuiInputBase-input": { color: theme.text },
              }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label={langPack.deadline_day}
              type="number"
              value={inputValue.default_deadline_day}
              onChange={(e) => isValidInput(e, "default_deadline_day")}
              error={!!errors.default_deadline_day}
              helperText={errors.default_deadline_day}
              autoComplete="off"
              sx={{
                "& .MuiInputBase-input": { color: theme.text },
              }}
            />
          </Box>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label={langPack.discount}
              type="number"
              value={inputValue.discount}
              onChange={(e) => isValidInput(e, "discount")}
              error={!!errors.discount}
              helperText={errors.discount}
              autoComplete="off"
              sx={{
                "& .MuiInputBase-input": { color: theme.text },
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="discount-type-label" sx={{ color: theme.text }}>
                {langPack.discount_type}
              </InputLabel>
              <Select
                labelId="discount-type-label"
                id="discount-type"
                value={inputValue.discount_type}
                label={langPack.discount_type}
                onChange={(e) => isValidInput(e, "discount_type")}
                sx={{
                  backgroundColor: theme.background,
                  color: theme.text,
                  "& .MuiSelect-icon": { color: theme.text },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: theme.background,
                      color: theme.text,
                    },
                  },
                }}
              >
                <MenuItem value="fixed">{langPack.fixed}</MenuItem>
                <MenuItem value="percentage">{langPack.percentage}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Stack direction="row" spacing={1}>
            <Tooltip title={langPack.back}>
              <Button
                fullWidth
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
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="inherit"
                startIcon={<Save />}
                disabled={new InputErrorAdapter(inputValue).hasError()}
                sx={{
                  borderRadius: "20px",
                  color: theme.text,
                }}
              >
                {langPack.save}
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};
export default CreateCustomerType;
