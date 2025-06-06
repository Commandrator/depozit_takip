import { Modules } from "../hooks/Modules";
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
export interface InternalDialogProps<M extends keyof Modules> {
  dialogOpen: boolean;
  handleDialogClose: () => void;
  selectedCompanyId?: number | null;
  dialogType: string;
  setDialogType:React.Dispatch<React.SetStateAction<string>>;
  subMenu:SubMenu;
  internalDialogResult: InstanceType<Modules[M]["DataAdapter"]>
}