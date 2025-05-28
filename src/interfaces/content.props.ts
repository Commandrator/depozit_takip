import { Modules } from "../hooks/Modules";
import { InternalDialogProps } from "./CompanyDialogProps";
import { CompanyDTO } from "./CompanyDTO";
import { FC } from "react";
export interface SubMenu {
    id: string,
    label: string,
    action: string,
    icon?: JSX.Element,
    content: FC<ContentProps> | null,
    subMenu?: SubMenu[]

}
export default interface ContentProps {
    selectedCompanyId: string;
    company?: CompanyDTO;
    dialogType: keyof Modules;
    subMenu?: SubMenu[];   
    setInternalDialogProcessID: React.Dispatch<React.SetStateAction<InternalDialogProps["process_id"]>>;
    setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
    setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;

}