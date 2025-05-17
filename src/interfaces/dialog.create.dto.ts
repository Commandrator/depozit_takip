import React from "react"
export default interface DialogCreateDTO{
    selectedCompanyId:string;
    setViewCreate:React.Dispatch<React.SetStateAction<boolean>>;
}