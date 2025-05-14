import React from "react";
import CompanyDTO from "./User.Company.DTO";
import CompaniesDTO from "./User.Companies.dto";
export default interface CompanyCardProps {
  company: CompanyDTO;
  handleDialogAction:(type:string, id:number) => void;
}
export interface SearchItemProps extends CompanyCardProps {
  value: string;
  setViewResult: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SearchResultProps {
  results?: CompaniesDTO;
  value: string;
  submitSearch: (name?: string) => void;
}