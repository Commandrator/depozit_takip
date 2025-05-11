import React from "react";
import { Stack } from "@mui/material";
import usePeriod from "../../../hooks/usePeriod.tsx";
import Result from "./components/period.result.tsx";
import Create from "./components/period.create.tsx";
const PeriodContent = ({ selectedCompanyId }) => {
  const { periods, viewCreate, setViewCreate, isLoaded } = usePeriod({
    selectedCompanyId,
  });
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
            periods={periods}
            setViewCreate={setViewCreate}
            isLoaded={isLoaded}
          />
        )}
      </Stack>
    </Stack>
  );
};
export default PeriodContent;
