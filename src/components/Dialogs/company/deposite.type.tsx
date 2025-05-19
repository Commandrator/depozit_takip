import React,{useEffect} from "react";
import type ContentProps from "../../../interfaces/content.props";
import { Stack } from "@mui/material";
import useDialogContext from "../../../hooks/useDilaogContext.tsx";
const DepositeTypeContent: React.FC<ContentProps> = ({
  selectedCompanyId,
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
    listedData,
    results,
    isLoaded,
    handleClickOutside,
    list,
    change,
  } = useDialogContext({module: "depositeType", selectedCompanyId });
  
    useEffect(() => {
      if (!listedData) list(selectedCompanyId);
    }, [listedData, list, selectedCompanyId]);
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
export default DepositeTypeContent;
