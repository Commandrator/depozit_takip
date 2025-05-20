import { useEffect, FC } from "react";
import { Paper, Tooltip, Button, Stack, Pagination, Box } from "@mui/material";
import { theme, langPack } from "../../../../index.jsx";
import { Add as AddIcon } from "@mui/icons-material";
import Loader from "./loader.tsx";
import BasicSelect from "../../../BasicSelect.tsx";
import SearchBar from "../../../Filtres/search.tsx";
import ResultList from "./deposite.type.result.list.tsx";
import {type DialogDepositeTypeModuleDTO } from "../../../../interfaces/dialog.result.dto.ts";
import SearchResultList from "./deposite.type.result.search.list.tsx";
/**
 * # Dönem Arama sonuç sayfası
 *
 * @param param0
 * @returns
 */
const Result: FC<DialogDepositeTypeModuleDTO> = (props) => {
  const {
    listedData,
    setViewCreate,
    isLoaded,
    page,
    range,
    handleChangeRange,
    handleChange,
    handleSubmit,
    handleSearch,
    handleClear,
    value,
    viewResult,
    results,
    searchRef,
    handleClickOutside,
    submitSearch,
    module
  } = props;
  useEffect(() => {
    if (!results?.deposits || results.deposits.length === 0) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [results, handleClickOutside]);
  if (!isLoaded || !listedData) return <Loader />;
  return (
    <Stack spacing={2}>
      <Paper
        elevation={3}
        sx={{
          position: "sticky", // yapıştır
          top: 0,
          zIndex: 10, // diğer içeriklerin üstünde kalsın
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
                <SearchResultList
                  results={results}
                  value={value}
                  submitSearch={submitSearch}
                />
              </Box>
            )}
          </div>
          <Tooltip title={langPack.create_period}>
            <Button
              sx={{
                color: theme.menuItem.color,
                px: { xs: 1, sm: 2 },
                ml: { xs: 2, md: 0 },
                minWidth: { xs: "40px", sm: "64px" },
                borderRadius: { xs: "50%", md: "12px" },
                border: { xs: "none", sm: `1px solid ${theme.border}` },
                "& .button-text": {
                  display: { xs: "none", sm: "inline" },
                },
                whiteSpace: "nowrap",
              }}
              onClick={() => setViewCreate((prev) => !prev)}
              startIcon={<AddIcon />}
              color="inherit"
              variant="outlined"
            >
              <span className="button-text">{langPack.create_period}</span>
            </Button>
          </Tooltip>
        </Stack>
      </Paper>
      <Paper
        elevation={3}
        className="custom-scrollbar"
        sx={{
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
        }}
      >
        <Stack spacing={2}>
          <ResultList listedData={listedData} setViewCreate={setViewCreate} module={module} />
        </Stack>
      </Paper>
      <div className="w-full flex justify-between items-center px-4 py-4">
        <div className="flex-1 flex justify-center">
          <Pagination
            count={Math.max(1, Math.ceil(listedData.total / Number(range)))}
            size="small"
            page={page}
            sx={{
              color: theme.menuItem,
              "& .MuiPaginationItem-root": {
                color: theme.menuItem,
              },
              "& .Mui-selected": {
                color: theme.text,
                background: theme.menu.backgroundColor,
              },
            }}
            onChange={handleChange}
          />
        </div>
        <div>
          <BasicSelect range={range} handleChangeRange={handleChangeRange} />
        </div>
      </div>
    </Stack>
  );
};
export default Result;
