import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import usePeriod from "../../../hooks/usePeriod.tsx";
import Result from "./components/period.result.tsx";
import Create from "./components/period.create.tsx";
const PeriodContent = ({ selectedCompanyId }) => {
  const {
    periods,
    viewCreate,
    setViewCreate,
    isLoaded,
    page,
    range,
    handleChangeRange,
    handleChange,
    change,
    listPeriods,
    handleSubmit,
    handleSearch,
    handleClear,
    value,
    viewResult,
    results,
    searchRef,
    handleClickOutside,
    setViewResult
  } = usePeriod({
    selectedCompanyId,
  });
  useEffect(() => {
    if (!periods) listPeriods(selectedCompanyId);
  }, [periods, listPeriods, selectedCompanyId]);
  useEffect(() => {
    if (change) listPeriods(selectedCompanyId);
  }, [change, listPeriods, selectedCompanyId]);
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
            handleSubmit={handleSubmit}
            value={value}
            handleSearch={handleSearch}
            handleClear={handleClear}
            periods={periods}
            setViewCreate={setViewCreate}
            isLoaded={isLoaded}
            page={page}
            range={range}
            handleChangeRange={handleChangeRange}
            handleChange={handleChange}
            viewResult={viewResult}
            results={results}
            searchRef={searchRef}
            handleClickOutside={handleClickOutside}
            setViewResult={setViewResult}
          />
        )}
      </Stack>
    </Stack>
  );
};
export default PeriodContent;
