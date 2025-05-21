import DialogCreateDTO from "../../../../../interfaces/dialog.create.dto.ts";
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
} from "@mui/material";
import { langPack, theme } from "../../../../../index.jsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Save } from "@mui/icons-material";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
import useModule from "../../../../../hooks/Modules/index.tsx";
/**
 *
 * @param props Dolaylı aktarımda modül hata çıkartabildiği için doğrudan modül adı ile aktarım yaptım.
 * @returns
 */
const Create = (props: DialogCreateDTO<"deposite_type">) => {
  const { selectedCompanyId, setViewCreate, dialogType } = props;
  const { InputErrorAdapter } = useModule(dialogType);
  const { create, isValidInput, errors, inputValue } =
    useDialogContext<"deposite_type">({
      module: dialogType,
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
            label={langPack.deposite_type_name}
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue.name}
            onChange={(e) => isValidInput(e, "name")}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            sx={{ "& .MuiInputBase-input": { color: theme.text } }}
            margin="dense"
            autoComplete="off"
            label={langPack.price}
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            value={inputValue.current_price}
            onChange={(e) => isValidInput(e, "current_price")}
            error={!!errors.current_price}
            helperText={errors.current_price}
          />
          <TextField
            sx={{ "& .MuiInputBase-input": { color: theme.text } }}
            margin="dense"
            autoComplete="off"
            label={langPack.description}
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            value={inputValue.about}
            onChange={(e) => isValidInput(e, "about")}
            error={!!errors.about}
            helperText={errors.about}
          />
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
export default Create;