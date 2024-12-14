import { Search } from "@mui/icons-material";
import { Input, IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

interface SearchBoxProps {
  filters: string[]; // Array of filter options passed via props (e.g. ["nameSurname", "phone"])
}
const SearchBox: React.FC<SearchBoxProps> = ({ filters }) => {
  const [value, setValue] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Ad-soyad, telefon, kimlik numarası ya da vergi numarası ile arayın...");
  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q", value); 
    const filterType = urlParams.get("filters");
    if (!filterType || filterType === "all") {
      urlParams.set("filters", "all");
    }
    const url = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, "", url);
  },[value]);
  useEffect(() => {
    if (filters.length > 0) {
      const textObject = {
        nameSurname: "Ad-soyad",
        phone: "telefon",
        tcId: "kimlik numarası",
        taxId: "vergi numarası",
      };
      const validFilters = filters
        .map((filter) => textObject[filter])
        .filter(Boolean);

      if (validFilters.length > 0) {
        const lastFilter = validFilters.pop();
        const placeholder =
          validFilters.length > 0
            ? `${validFilters.join(", ")} ya da ${lastFilter} ile arayın...`
            : `${lastFilter} ile arayın...`;
        setPlaceHolder(placeholder);
      } else {
        setPlaceHolder("Ad-soyad, telefon, kimlik numarası ya da vergi numarası ile arayın...");
      }
    }
  }, [filters]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      setValue(query);
    }
  }, []); 
  return (
    <form onSubmit={handleSubmit}>
      <Input
        fullWidth
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
      />
      <IconButton
        type="submit"
        sx={{
          ml: -5,
          '&:hover': { backgroundColor: 'transparent' },
          '&:active': { backgroundColor: 'transparent' },
          '&:focus': { backgroundColor: 'transparent' },
        }}
      >
        <Search />
      </IconButton>
    </form>
  );
};

export { SearchBox };
