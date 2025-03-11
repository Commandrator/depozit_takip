import User from "./User"
import CompanyDTO from "./User.Company.DTO";
export default interface CompaniesDTO extends User{
    id: string;
    phone_number: string;
    address: string;
    created_at: string;
    updated_at: string;
    companies: CompanyDTO[];
}