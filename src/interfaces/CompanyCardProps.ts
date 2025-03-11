import CompanyDTO from "./User.Company.DTO";
export default interface CompanyCardProps {
  company: CompanyDTO;
  handleDialogAction:(type:string, id:number) => void;
}