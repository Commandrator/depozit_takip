import React from "react";
import { TextField, IconButton, Stack } from "@mui/material";
import { Close, Edit, Save } from "@mui/icons-material";
import { theme } from "../../../../index.jsx";
import { Modules } from "../../../../hooks/Modules/index.tsx";
import useDialogContext from "../../../../hooks/useDilaogContext.tsx";
interface EditInputDTO<M extends keyof Modules> {
  data: InstanceType<Modules[M]["Entity"]>;
  type: string;
  dataKey: string;
  label: string;
  required?: boolean;
  module: M;
}
const EditInput = <M extends keyof Modules>({
  data,
  type,
  dataKey,
  label,
  required,
  module,
}: EditInputDTO<M>): JSX.Element => {
  const { isValidInput, errors, update, edit, handleEdit, inputValue } =
    useDialogContext({
      defKey: dataKey,
      defVal: data[dataKey],
      module,
      selectedCompanyId: String(data.company_id),
    });

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
        value={inputValue[String(dataKey)]}
        onClick={(e) => {
          if (type === "date") {
            e.currentTarget.querySelector("input")?.showPicker?.();
          }
        }}
        disabled={edit}
        onChange={(e) => isValidInput(e, dataKey)}
        error={!!errors[String(dataKey)]}
        helperText={errors[String(dataKey)]}
      />
      <IconButton onClick={handleEdit}>
        {edit ? <Edit /> : <Close />}
      </IconButton>
      <IconButton
        disabled={edit || data[dataKey] === inputValue[String(dataKey)]}
        onClick={() =>
          update(data.company_id, data.id, {
            [dataKey]: inputValue[String(dataKey)],
          })
        }
      >
        <Save />
      </IconButton>
    </Stack>
  );
};
export default EditInput;