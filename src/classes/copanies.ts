import CompaniesDTO from "../interfaces/User.Companies.dto";
import CompanyDTO from "../interfaces/User.Company.DTO";
export class Companies {
    companies: CompanyDTO[];
    total: number;
    constructor(parameters: CompaniesDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.companies = parameters.companies;
        }
    }
}