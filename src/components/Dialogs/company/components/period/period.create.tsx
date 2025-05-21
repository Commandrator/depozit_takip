import React from "react";
import { Paper, TextField, Button, Stack, Box, Tooltip } from "@mui/material";
import { langPack, theme } from "../../../../../index.jsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Save } from "@mui/icons-material";
import DialogCreateDTO from "../../../../../interfaces/dialog.create.dto.ts";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
const Create = (props: DialogCreateDTO<"period">) => {
  const { selectedCompanyId, setViewCreate, dialogType } = props;
  const {
    create,
    errors,
    inputValue,
    isValidInput,
  } = useDialogContext<"period">({
      module: dialogType,
      selectedCompanyId,
    });
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(selectedCompanyId);
    setViewCreate((prev) => !prev);
  };
  return (
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
          onChange={(e) => isValidInput(e, "name")}
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
          onChange={(e) => isValidInput(e, "deadline")}
          error={!!errors["deadline"]}
          helperText={errors["deadline"]}
        />
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
              onClick={handleSave}
              variant="outlined"
              color="inherit"
              startIcon={<Save />}
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
  );
};
export default Create;