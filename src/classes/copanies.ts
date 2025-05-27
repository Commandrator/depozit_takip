import CompaniesDTO from "../interfaces/User.Companies.dto";
import CompanyDTO from "../interfaces/User.Company.DTO";
export class Companies {
    results: CompanyDTO[];
    total: number;
    constructor(parameters: CompaniesDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.results = parameters.results;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): Companies {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.results.filter(company => {
            const normalized = this.normalize(company.name);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new Companies({ results: uniqueCompanies, total: this.total });
    }
}