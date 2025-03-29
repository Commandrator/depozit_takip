import { CompanyDTO } from "./CompanyDTO.ts";
interface MerchantDialogProps {
    dialogOpen: boolean;
    handleDialogAction: () => void;
    selectedCompanyId: number | null;
    company?: CompanyDTO;
}
export default MerchantDialogProps;