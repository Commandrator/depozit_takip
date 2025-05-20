import { Modules } from "../hooks/Modules";
import { CompanyDTO } from "./CompanyDTO";
export default interface ContentProps {
    selectedCompanyId: string;
    company?: CompanyDTO;
    dialogType: keyof Modules;
}