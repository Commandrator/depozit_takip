import React from "react";
import { CompanyDTO } from "../../interfaces/CompanyDTO";
import ManageCompanyDialog from "./Company.Manage.Dialog.tsx";
import CompanyPeriodDialog from "./Company.Period.Dialog.tsx";
import PersonnelDialog from "./Company.Personel.Dialog.tsx";
import MerchantDialog from "./Company.Merchant.Dialog.tsx";
interface CompanyDialogProps {
  dialogOpen: boolean;
  handleDialogAction: () => void;
  selectedCompanyId: number | null;
  dialogType: string;
  company: CompanyDTO;
}
const CompanyDialog = ({
  dialogOpen,
  handleDialogAction,
  selectedCompanyId,
  dialogType,
  company,
}: CompanyDialogProps) => {
  if (company)
    switch (dialogType) {
      case "company":
        return (
          <ManageCompanyDialog
            dialogOpen={dialogOpen}
            handleDialogAction={handleDialogAction}
            company={company}
            selectedCompanyId={selectedCompanyId}
          />
        )
      case "period":
        return (
          <CompanyPeriodDialog
            dialogOpen={dialogOpen}
            handleDialogAction={handleDialogAction}
            company={company}
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
      default:
        return null;
    }
  else return null;
};
export default CompanyDialog;
