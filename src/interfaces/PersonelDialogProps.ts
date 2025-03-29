import { CompanyDTO } from "./CompanyDTO";
interface PersonelDialogProps{
    dialogOpen: boolean;
    handleDialogAction: () => void;
    selectedCompanyId: number | null;
    company: CompanyDTO;
}
export default PersonelDialogProps;