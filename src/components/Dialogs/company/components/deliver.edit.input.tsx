import React from "react";
import { TextField, IconButton, Stack } from "@mui/material";
import { Close, Edit, Save } from "@mui/icons-material";
import { theme } from "../../../../index.jsx";
import useDeliver from "../../../../hooks/useDeliver.tsx";
import DeliverDTO from "../../../../interfaces/deliver.dto.ts";
import DeliverInput from "../../../../classes/deliver.input.values.ts";
interface EditInputDTO {
  data: DeliverDTO;
  type: string;
  dataKey: keyof DeliverInput;
  label: string;
  required?: boolean;
}
const EditInput: React.FC<EditInputDTO> = ({
  data,
  type,
  dataKey,
  label,
  required,
}) => {
  const { isValidInput, errors, update, edit, handleEdit, inputValue } =
    useDeliver({ defKey:dataKey, defVal:data[dataKey] });
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        sx={{ "& .MuiInputBase-input": { color: theme.text } }}
        required={required}
        margin="dense"
        autoComplete="off"
        label={label}
        type={type}
        size="small"
        fullWidth
        variant="outlined"
        value={inputValue[dataKey]}
        onClick={(e) => {
          if (type === "date") {
            e.currentTarget.querySelector("input")?.showPicker?.();
          }
        }}
        disabled={edit}
        onChange={(e) => isValidInput(e, dataKey)}
        error={!!errors[dataKey]}
        helperText={errors[dataKey]}
      />
      <IconButton onClick={() => handleEdit(data[dataKey], dataKey)}>
        {edit ? <Edit /> : <Close />}
      </IconButton>
      <IconButton
        disabled={edit || data[dataKey] === inputValue[dataKey]}
        onClick={() =>
          update(data.company_id, data.id, {
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
