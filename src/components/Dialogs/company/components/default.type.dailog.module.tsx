import React, { useEffect } from "react";
import ContentProps from "../../../../interfaces/content.props";
import useDialogContext from "../../../../hooks/useDilaogContext.tsx";
import { Stack } from "@mui/material";
import Result from "./defalut.type.dialog.result.module.tsx";
const DefaultTypeDialog: React.FC<ContentProps> = ({
  selectedCompanyId,
  dialogType,
}) => {
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
  } = useDialogContext({ module: dialogType, selectedCompanyId });
  useEffect(() => {
    if (!listedData[dialogType]) {
      list(selectedCompanyId);
    }
  }, [listedData, list, selectedCompanyId, dialogType]);
  useEffect(() => {
    if (change) {
      list(selectedCompanyId);
    }
  }, [change, list, selectedCompanyId]);
  return (
    <Stack spacing={2} sx={{ padding: "16px" }}>
      <Stack spacing={2} sx={{ padding: "16px" }}>
        {viewCreate ? null : (
          //   <Create
          //     selectedCompanyId={selectedCompanyId}
          //     setViewCreate={setViewCreate}
          //     dialogType={dialogType}
          //   />
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
            listedData={listedData[dialogType]}
            results={results[dialogType]}
            isLoaded={isLoaded}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default DefaultTypeDialog;
