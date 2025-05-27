import CompanyDTO from "./User.Company.DTO";
import CompaniesDTO from "./User.Companies.dto";
export default interface CompanyCardProps {
  result: CompanyDTO;
  handleDialogAction:(type:string, id:number) => void;
}
export interface SearchItemProps {  
  results: CompanyDTO;
  value: string;
  submitSearch: (name?: string) => void;
}
export interface SearchResultProps {
  results?: CompaniesDTO;
  value: string;
  submitSearch: (name?: string) => void;
}