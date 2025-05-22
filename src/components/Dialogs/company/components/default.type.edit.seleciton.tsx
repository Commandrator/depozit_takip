import React from "react";
import { Close, Edit, Save } from "@mui/icons-material";
import { theme } from "../../../../index.jsx";
import { Modules } from "../../../../hooks/Modules/index.tsx";
import useDialogContext from "../../../../hooks/useDilaogContext.tsx";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  IconButton,
} from "@mui/material";
interface OptionDTO {
  value: string;
  label: string;
}
interface EditInputDTO<M extends keyof Modules> {
  data: InstanceType<Modules[M]["Entity"]>;
  dataKey: string;
  label: string;
  required?: boolean;
  module: M;
  options: OptionDTO[];
}
const SelectionItem = <M extends keyof Modules>({
  data,
  dataKey,
  label,
  required,
  module,
  options,
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
      <FormControl
        fullWidth
        size="small"
        variant="outlined"
        error={!!errors[String(dataKey)]}
        disabled={edit}
      >
        <InputLabel id="discount-type-label">{label}</InputLabel>
        <Select
          labelId="discount-type-label"
          id="discount-type"
          value={inputValue[String(dataKey)]}
          onChange={(e) => isValidInput(e, dataKey)}
          label={label}
          sx={{
            backgroundColor: theme.background,
            "& .MuiInputBase-input": {
              color: theme.text,
            },
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
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors[String(dataKey)] && (
          <p className="text-red-500 text-xs mt-1">{errors[String(dataKey)]}</p>
        )}
      </FormControl>
      <IconButton onClick={handleEdit}>
        {edit ? <Edit /> : <Close />}
      </IconButton>
      <IconButton
        disabled={
          edit ||
          data[dataKey] === inputValue[String(dataKey)] ||
          (required && !inputValue[String(dataKey)])
        }
        onClick={() =>
          update(String(data.company_id), String(data.id), {
            [dataKey]: inputValue[String(dataKey)],
          })
        }
      >
        <Save />
      </IconButton>
    </Stack>
  );
};
export default SelectionItem;
