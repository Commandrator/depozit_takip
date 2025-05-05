import { Search, Close } from "@mui/icons-material";
import { Box, Input, IconButton } from "@mui/joy";
import React from "react";

const SearchBar = ({ value, handleSearch, searchSubmit, searchClear }) => {
  return (
    <Box component="form" className="w-full max-w-md" onSubmit={searchSubmit}>
      <Input
        fullWidth
        value={value}
        onChange={handleSearch}
        placeholder="Şirket adı"
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
