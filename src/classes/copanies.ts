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
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUniqueCompanys(): Companies {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.companies.filter(company => {
            const normalized = this.normalize(company.name);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new Companies({ companies: uniqueCompanies, total: this.total });
    }
}