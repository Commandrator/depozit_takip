import React from "react";
import { TextField, IconButton, Stack } from "@mui/material";
import { Close, Edit, Save } from "@mui/icons-material";
import { theme } from "../../../../index.jsx";
import usePeriod from "../../../../hooks/usePeriod.tsx";
const EditInput = ({ period, type, dataKey, regex, label, message }) => {
  const {
    isValidCompanyName,
    errors,
    updatePeriod,
    edit,
    handleEdit,
    inputValue,
    setInputValue,
  } = usePeriod();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        sx={{ "& .MuiInputBase-input": { color: theme.text } }}
        required
        margin="dense"
        autoComplete="off"
        label={label}
        type={type}
        size="small"
        fullWidth
        variant="outlined"
        value={inputValue[dataKey]}
        onClick={(e) => e.currentTarget.querySelector("input")?.showPicker?.()}
        disabled={edit}
        onChange={(e) => {
          isValidCompanyName(e, setInputValue, dataKey, message, regex);
        }}
        error={!!errors[dataKey]}
        helperText={errors[dataKey]}
      />
      <IconButton onClick={() => handleEdit(period, dataKey)}>
        {edit ? <Edit /> : <Close />}
      </IconButton>
      <IconButton
        disabled={edit || period[dataKey] === inputValue[dataKey]}
        onClick={() =>
          updatePeriod(period.company_id, period.id, {
            [dataKey]: inputValue[dataKey],
          })
        }
      >
        <Save />
      </IconButton>
    </Stack>
  );
};

export default EditInput;
