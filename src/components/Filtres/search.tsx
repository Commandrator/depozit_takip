import React from "react";
import { Search, Close } from "@mui/icons-material";
import { Box, Input, IconButton } from "@mui/joy";
import { langPack } from "../..";

const SearchBar = ({ value, handleSearch, searchSubmit, searchClear }) => {
  return (
    <Box component="form" className="w-full max-w-md" onSubmit={searchSubmit}>
      <Input
        fullWidth
        value={value}
        onChange={handleSearch}
        placeholder={langPack.company_name}
        startDecorator={<Search />}
        endDecorator={
          <IconButton onClick={searchClear}>
            <Close/>
          </IconButton>
        }
      />
    </Box>
  );
};

export default SearchBar;
