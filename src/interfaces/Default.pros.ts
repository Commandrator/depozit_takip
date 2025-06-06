import React from "react";
import { Modules } from "../hooks/Modules/index.tsx";
import { SubMenu } from "./content.props.ts";
export default interface DefaultProps {
  readonly className?: string;
}
export interface DeaultInterface<M> {
  result?: M;
  module: keyof Modules;
  subMenu?: SubMenu[];
  setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
  setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setInternalDialogResult: React.Dispatch<React.SetStateAction<Record<string, M>>>;
}