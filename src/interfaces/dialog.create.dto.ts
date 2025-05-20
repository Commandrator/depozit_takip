import React from "react"
import { Modules } from "../hooks/Modules";
export default interface DialogCreateDTO{
    selectedCompanyId:string;
    setViewCreate:React.Dispatch<React.SetStateAction<boolean>>;
    dialogType: keyof Modules;
}