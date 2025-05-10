import React from "react";
import ManageCompanyDialog from "./Company.Manage.Dialog.tsx";
import CompanyPeriodDialog from "./Company.Period.Dialog.tsx";
import PersonnelDialog from "./Company.Personel.Dialog.tsx";
import MerchantDialog from "./Company.Merchant.Dialog.tsx";
import CreateCompanyDialog from "./Company.Create.Dialog.tsx";
import CompanyDialogProps from "../../interfaces/CompanyDialogProps.ts";
const CompanyDialog = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  dialogType,
  company,
}: CompanyDialogProps) => {
  switch (dialogType) {
    case "company":
      return (
        <ManageCompanyDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
          company={company}
          selectedCompanyId={selectedCompanyId}
        />
      );
    case "period":
      return (
        <CompanyPeriodDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
          selectedCompanyId={selectedCompanyId}
        />
      );
    case "merchant":
      return (
        <MerchantDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
          company={company}
          selectedCompanyId={selectedCompanyId}
        />
      );
    case "personnel":
      return (
        <PersonnelDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
          company={company}
          selectedCompanyId={selectedCompanyId}
        />
      );
    case "create-company":
      return (
        <CreateCompanyDialog
          dialogOpen={dialogOpen}
          handleDialogAction={handleDialogAction}
          // handleDialogAction={handleCreateDialogAction}
        />
      );
    default:
      return null;
  }
};
export default CompanyDialog;
