import React from "react";
import { Close, Add } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Dialog,
  DialogTitle,
  ButtonGroup,
  Tooltip,
  IconButton,
} from "@mui/material";
import { langPack, theme } from "../../index.jsx";
import usePeriod from "../../hooks/usePeriod.tsx";
import CreatePeriod from "./Company.Period.Dialog.Create.tsx";
import PeriodListResult from "./Company.Period.Dialog.Result.tsx";
import DialogLoader from "./Company.Period.Dialog.Loader.tsx";
const CompanyPeriodDialog = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
}) => {
  const { periods, viewCreate, setViewCreate, isLoaded } = usePeriod({
    selectedCompanyId,
  });
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px", // İç boşluk ekleyelim
        }}
      >
        <span>{langPack.company_periods}</span>
        <ButtonGroup>
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
          <Tooltip title={langPack.close}>
            <IconButton
              sx={{ mb: 2, mr: 2, color: theme.menuItem.color }}
              onClick={handleDialogAction}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </DialogTitle>
      {viewCreate ? (
        <CreatePeriod
          selectedCompanyId={selectedCompanyId}
          setViewCreate={setViewCreate}
        />
      ) : isLoaded ? (
        <PeriodListResult periods={periods} setViewCreate={setViewCreate} />
      ) : (
        <DialogLoader />
      )}
    </Dialog>
  );
};
export default CompanyPeriodDialog;
