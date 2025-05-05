import React from "react";
import CompanyDTO from "./User.Company.DTO";
export default interface CompanyCardProps {
  company: CompanyDTO;
  handleDialogAction:(type:string, id:number) => void;
}
export interface SearchItemProps extends CompanyCardProps {
  value: string;
  setViewResult: React.Dispatch<React.SetStateAction<boolean>>;
}