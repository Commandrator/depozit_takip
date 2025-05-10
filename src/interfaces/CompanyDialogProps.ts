import { CompanyDTO } from "./CompanyDTO";

export default interface CompanyDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  selectedCompanyId?: number | null;
  dialogType: string;
  company?: CompanyDTO;
}