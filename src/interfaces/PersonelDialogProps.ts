import { CompanyDTO } from "./CompanyDTO";
export default interface PersonelDialogProps{
    dialogOpen: boolean;
    handleDialogAction: () => void;
    selectedCompanyId: number | null;
    company: CompanyDTO | undefined;
}