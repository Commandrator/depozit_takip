import React, { useEffect } from "react";
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
  Skeleton,
  FormHelperText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { langPack, theme } from "../../../../../index.jsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Save } from "@mui/icons-material";
import DialogCreateDTO from "../../../../../interfaces/dialog.create.dto.ts";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
import useModule from "../../../../../hooks/Modules/index.tsx";
/**
 * # Müşteri oluşturma modülü
 *
 */
const CreateCustomer: React.FC<DialogCreateDTO<"customer">> = (
  props
): JSX.Element => {
  const { selectedCompanyId, setViewCreate, module } = props;
  const {
    listedData: customerTypes,
    list,
    setRange,
  } = useDialogContext<"customer_type">({
    module: "customer_type",
    selectedCompanyId,
  });
  const { create, isValidInput, errors, inputValue } =
    useDialogContext<"customer">({
      module,
      selectedCompanyId,
    });
  const { InputErrorAdapter } = useModule(module);
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(selectedCompanyId);
    setViewCreate((prev) => !prev);
  };
  useEffect(() => {
    if (!customerTypes["customer_type"]) {
      setRange("99");
      list(selectedCompanyId);
    }
  }, [customerTypes, list, selectedCompanyId, setRange]);
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
              label={langPack.name_surname}
              type="text"
              value={inputValue.name_surname}
              onChange={(e) => isValidInput(e, "name_surname")}
              error={!!errors.name_surname}
              helperText={errors.name_surname}
              sx={{
                "& .MuiInputBase-input": { color: theme.text },
              }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label={langPack.phone}
              inputProps={{ maxLength: 10 }}
              type="tel"
              required
              value={inputValue.phone}
              onChange={(e) => isValidInput(e, "phone")}
              error={!!errors.phone}
              helperText={errors.phone}
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
            <Box display="flex" gap={1} flexDirection="column">
              <FormControl
                fullWidth
                size="small"
                error={Boolean(errors.customer_type)}
              >
                <InputLabel id="customer-type-label" sx={{ color: theme.text }}>
                  {langPack.customer_type}
                </InputLabel>
                <Select
                  labelId="customer-type-label"
                  id="customer_type_id"
                  required
                  value={String(inputValue.customer_type_id)}
                  label={langPack.customer_type}
                  onChange={(e) => isValidInput(e, "customer_type_id")}
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
                  <MenuItem value="" disabled sx={{ display: "none" }}>
                    {langPack.customer_type}
                  </MenuItem>
                  {customerTypes["customer_type"]
                    ? customerTypes.customer_type.results.map((type) => (
                        <MenuItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </MenuItem>
                      ))
                    : ["a", "b", "c"].map((key, i) => (
                        <MenuItem key={`skeleton-${key}`} disabled>
                          <Skeleton variant="text" width={80 + i * 20} />
                        </MenuItem>
                      ))}
                </Select>
                {errors.customer_type && (
                  <FormHelperText>{errors.customer_type}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label={langPack.tc_id}
                inputProps={{ maxLength: 11 }}
                type="text"
                value={inputValue.tc_id}
                onChange={(e) => isValidInput(e, "tc_id")}
                error={!!errors.tc_id}
                helperText={errors.tc_id}
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-input": { color: theme.text },
                }}
              />
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label={langPack.tax_id}
                inputProps={{ maxLength: 10 }}
                type="text"
                value={inputValue.tax_id}
                onChange={(e) => isValidInput(e, "tax_id")}
                error={!!errors.tax_id}
                helperText={errors.tax_id}
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-input": { color: theme.text },
                }}
              />
            </Box>
            <TextField
              multiline
              rows={5}
              fullWidth
              size="small"
              variant="outlined"
              label={langPack.adress}
              type="text"
              value={inputValue.adres}
              onChange={(e) => isValidInput(e, "adres")}
              error={!!errors.adres}
              helperText={errors.adres}
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
              multiline
              rows={5}
              fullWidth
              size="small"
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              label={langPack.note}
              type="text"
              value={inputValue.note}
              onChange={(e) => isValidInput(e, "note")}
              error={!!errors.note}
              helperText={errors.note}
              autoComplete="off"
              sx={{
                "& .MuiInputBase-input": { color: theme.text },
              }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={inputValue.active}
                onChange={(e) => isValidInput(e, "active")}
              />
            }
            label={langPack.active}
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
                  disabled={new InputErrorAdapter(inputValue).hasError()}
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
export default CreateCustomer;
