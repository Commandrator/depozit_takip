import React, { useEffect } from "react";
import type ContentProps from "../../../interfaces/content.props";
import { Stack } from "@mui/material";
import Create from "./components/deliver.create.tsx";
import useDeliver from "../../../hooks/useDeliver.tsx";
import Result from "./components/deliver.result.tsx";
const DeliverContent: React.FC<ContentProps> = ({
  selectedCompanyId
}): JSX.Element => {
  const {
    setViewCreate,
    viewCreate,
    viewResult,
    range,
    page,
    value,
    searchRef,
    handleSubmit,
    handleSearch,
    handleClear,
    handleChangeRange,
    handleChange,
    submitSearch,
    delivers,
    results,
    isLoaded,
    handleClickOutside,
    list,
    change
  } = useDeliver({ selectedCompanyId });
  useEffect(() => {
    if (!delivers) list(selectedCompanyId);
  }, [delivers, list, selectedCompanyId]);
  useEffect(() => {
    if (change) list(selectedCompanyId);
  }, [change, list, selectedCompanyId]);
  return (
    <Stack spacing={2} sx={{ padding: "16px" }}>
      <Stack spacing={2} sx={{ padding: "16px" }}>
        {viewCreate ? (
          <Create
            selectedCompanyId={selectedCompanyId}
            setViewCreate={setViewCreate}
          />
        ) : (
          <Result
            viewResult={viewResult}
            range={range}
            page={page}
            value={value}
            searchRef={searchRef}
            handleSubmit={handleSubmit}
            handleSearch={handleSearch}
            handleClear={handleClear}
            setViewCreate={setViewCreate}
            handleChangeRange={handleChangeRange}
            handleChange={handleChange}
            submitSearch={submitSearch}
            handleClickOutside={handleClickOutside}
            delivers={delivers}
            results={results}
            isLoaded={isLoaded}
          />
        )}
      </Stack>
    </Stack>
  );
};
export default DeliverContent;
