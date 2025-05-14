import React from "react";
import { Search, Close } from "@mui/icons-material";
import { Box, Input, IconButton } from "@mui/joy";
import { langPack } from "../..";
interface SearchBarProps {
  value: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  searchClear: () => void;
}
const SearchBar : React.FC<SearchBarProps> = ({ value, handleSearch, searchSubmit, searchClear }) => {
  return (
    <Box component="form" className="w-full max-w-md" onSubmit={searchSubmit}>
      <Input
        fullWidth
        required
        autoFocus
        value={value}
        onChange={handleSearch}
        placeholder={langPack.search_word}
        startDecorator={<Search />}
        endDecorator={
          <IconButton onClick={searchClear} disabled={!value}>
            <Close/>
          </IconButton>
        }
      />
    </Box>
  );
};

export default SearchBar;
