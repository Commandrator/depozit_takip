import React, { useEffect } from "react";
import useCompany from "../../../hooks/useCompany.tsx";
import { Pagination } from "@mui/material";
import useApp from "../../../hooks/useApp.tsx";
import { theme } from "../../../index.jsx";
import BasicSelect from "../../../components/BasicSelect.tsx";
import CompanyCard from "./company.card.tsx";
import DialogWithTab from "../../../components/Dialogs/dialog.with.tabs.tsx";
const CompanyMangement = () => {
  const { CreatePortal } = useApp();
  const {
    company,
    range,
    handleDialogAction,
    handleDialogClose,
    dialogType,
    dialogOpen,
    selectedCompanyId,
    companys,
    listCompanys,
    change,
    page,
    handleChange,
    handleChangeRange,
  } = useCompany();
  useEffect(() => {
    if (!companys) listCompanys();
  }, [companys, listCompanys]);
  useEffect(() => {
    if (change) listCompanys();
  }, [change, listCompanys]);
  return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="flex-grow space-y-5">
        {companys &&
          companys.companies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              handleDialogAction={handleDialogAction}
            />
          ))}
        {dialogOpen && CreatePortal(
          <DialogWithTab
            dialogOpen={dialogOpen}
            handleDialogClose={handleDialogClose}            
            dialogType={dialogType}
            company={company}
            selectedCompanyId={selectedCompanyId}
          />
        )}
      </div>
      {companys ? (
        <div className="w-full flex justify-between items-center px-4 py-4">
          <div className="flex-1 flex justify-center">
            <Pagination
              count={Math.max(1, Math.ceil(companys.total / Number(range)))}
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
      ) : null}
    </div>
  );
};
export default CompanyMangement;
