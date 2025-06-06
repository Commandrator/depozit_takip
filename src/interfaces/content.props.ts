import { Modules } from "../hooks/Modules";
import { CompanyDTO } from "./CompanyDTO";
import { FC } from "react";
export interface SubMenu<M extends keyof Modules> {
    id: string,
    label: string,
    action: string,
    icon?: JSX.Element,
    content: FC<ContentProps<M>> | null,
    subMenu?: SubMenu<M>[]

}
export default interface ContentProps<M extends keyof Modules> {
    selectedCompanyId: string;
    company?: CompanyDTO;
    dialogType: M;
    subMenu?: SubMenu<M>[];   
    setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
    setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setInternalDialogResult: React.Dispatch<React.SetStateAction<Record<string, M>>>;

}