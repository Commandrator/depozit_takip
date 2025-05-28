import { Modules } from "../hooks/Modules/index.tsx";
import { InternalDialogProps } from "./CompanyDialogProps.ts";
import { SubMenu } from "./content.props.ts";
export default interface DefaultProps {
  readonly className?: string;
}
export interface DeaultInterface<M> {
  result?: M;
  module: keyof Modules;
  subMenu?: SubMenu[];
  setInternalDialogProcessID: React.Dispatch<React.SetStateAction<InternalDialogProps["process_id"]>>;
  setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
  setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;
}