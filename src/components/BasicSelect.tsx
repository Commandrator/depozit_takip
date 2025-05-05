import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { langPack, theme } from "..";
import BasicSelectProps from "../interfaces/basic.select.props";
const BasicSelect = ({ range, setRange }: BasicSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => setRange(event.target.value);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="load-list"
          sx={{
            color: theme.text,
            "&.Mui-focused": {
              color: theme.text,
            },
            "&.MuiInputLabel-shrink": {
              color: theme.text,
            },
          }}
        >
          {langPack.load_range}
        </InputLabel>
        <Select
          size="small"
          labelId="load-list"
          id="load-list"
          value={range.toString()}
          label={langPack.load_range}
          onChange={handleChange}
          sx={{
            color: theme.text,
            backgroundColor: "transparent",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.background,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.background,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.background,
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              sx: {
                backgroundColor: theme.menu.backgroundColor, // dropdown arkaplanı
                color: theme.text,
              },
            },
          }}
        >
          <MenuItem value={10}>0-10</MenuItem>
          <MenuItem value={50}>0-50</MenuItem>
          <MenuItem value={100}>0-100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default BasicSelect;
