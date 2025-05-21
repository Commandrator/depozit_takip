import React from "react"
import { Modules } from "../hooks/Modules";
export default interface DialogCreateDTO<M extends keyof Modules>{
    selectedCompanyId:string;
    setViewCreate:React.Dispatch<React.SetStateAction<boolean>>;
    module: M;
}