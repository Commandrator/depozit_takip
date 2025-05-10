import React from "react";
import { Add } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {  Tooltip, IconButton, Stack } from "@mui/material";
import { langPack, theme } from "../../../index.jsx";
import usePeriod from "../../../hooks/usePeriod.tsx";
import Loader from "./components/loader.tsx";
import Result from "./components/period.result.tsx";
import Create from "./components/period.create.tsx";
const PeriodContent = ({ selectedCompanyId }) => {
  const { periods, viewCreate, setViewCreate, isLoaded } = usePeriod({
    selectedCompanyId,
  });
  return (
    <Stack>
      <Tooltip title={langPack[viewCreate ? "back" : "create"]}>
        <IconButton
          sx={{ mb: 2, mr: 2, color: theme.menuItem.color }}
          onClick={() => {
            setViewCreate((prev) => !prev);
          }}
        >
          {viewCreate ? <ChevronLeftIcon /> : <Add />}
        </IconButton>
      </Tooltip>
      <Stack>
        {viewCreate ? (
          <Create
            selectedCompanyId={selectedCompanyId}
            setViewCreate={setViewCreate}
          />
        ) : isLoaded ? (
          <Result periods={periods} setViewCreate={setViewCreate} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Stack>
  );
};
export default PeriodContent;