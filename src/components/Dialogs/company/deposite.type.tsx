import React,{useEffect} from "react";
import type ContentProps from "../../../interfaces/content.props";
import { Stack } from "@mui/material";
import useDialogContext from "../../../hooks/useDilaogContext.tsx";
import Create from "./components/deposite.type.create.tsx";
import Result from "./components/deposite.type.result.tsx";
const DepositeTypeContent: React.FC<ContentProps> = ({
  selectedCompanyId,
  dialogType
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
  } = useDialogContext({module: dialogType, selectedCompanyId });
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
            dialogType={dialogType}
          />
        ) : (
          <Result         
            module={dialogType}
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
            listedData={listedData}
            results={results}
            isLoaded={isLoaded}
          />
        )}
      </Stack>
    </Stack>
  );
};
export default DepositeTypeContent;
