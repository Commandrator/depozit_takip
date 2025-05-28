import { CompanyDTO } from "./CompanyDTO";
import { SubMenu } from "./content.props";

export default interface CompanyDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  selectedCompanyId?: number | null;
  dialogType: string;
  company?: CompanyDTO;
  subMenu?:SubMenu;
}
export interface InternalDialogProps {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  selectedCompanyId?: number | null;
  process_id?:number | string |null;
  dialogType: string;
  setDialogType:React.Dispatch<React.SetStateAction<string>>;
  subMenu:SubMenu;
}