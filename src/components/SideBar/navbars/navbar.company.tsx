import { useEffect } from "react";
import { Button, IconButton, Box } from "@mui/material";
import { Add, Menu } from "@mui/icons-material";
import CompanyFilter from "../../../components/Filtres/company.filter.tsx";
import useApp from "../../../hooks/useApp.tsx";
import { langPack, theme } from "../../..";
import SearchBar from "../../Filtres/search.tsx";
import useCompany from "../../../hooks/useCompany.tsx";
import CompanySearchList from "./navbar.company.list.tsx";
const CompanyNav = () => {
  const { handleOpen } = useApp();
  const {
    handleSearch,
    handleClear,
    viewResult,
    results,
    value,
    handleCreateDialogAction,
    searchRef,
    handleClickOutside,
    handleSubmit,
    submitSearch,
  } = useCompany();
  useEffect(() => {
    if (!results?.companies || results.companies.length === 0) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [results, handleClickOutside]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-2 rounded-md">
        <div className="flex items-center gap-2">
          <IconButton aria-label="menu" onClick={handleOpen} size="small">
            <Menu sx={{ color: theme.menuItem.color }} />
          </IconButton>
          <h1 className="text-xl font-semibold whitespace-nowrap">
            {langPack.company_management}
          </h1>
        </div>
        <Button
          sx={{ color: theme.menuItem.color }}
          variant="outlined"
          color="inherit"
          endIcon={<Add sx={{ color: theme.menuItem.color }} />}
          onClick={handleCreateDialogAction}
        >
          {langPack.create}
        </Button>
      </div>
      <hr />
      <div className="flex justify-between flex-row my-2 px-4 md:px-0 gap-4">
        <CompanyFilter className="h-8" />
        <div className="relative w-full" ref={searchRef}>
          <SearchBar
            value={value}
            handleSearch={handleSearch}
            searchSubmit={handleSubmit}
            searchClear={handleClear}
          />
          {viewResult && (
            <Box
              className="w-full max-w-md"
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                mt: 1,
                zIndex: 10,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: theme.background,
                color: theme.text,
                p: 1.5,
                boxShadow: 3,
              }}
            >
              <CompanySearchList
                results={results}
                value={value}
                submitSearch={submitSearch}
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};
export default CompanyNav;
