import {CompanyDTO} from "./CompanyDTO";
interface ManageCompanyDialogProps{
    dialogOpen: boolean;
    handleDialogAction: () => void;
    selectedCompanyId: number | null;
    company: CompanyDTO;
}
export default ManageCompanyDialogProps;
// Compare this snippet from src/interfaces/PersonelDialogProps.ts: