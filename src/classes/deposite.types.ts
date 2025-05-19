import type { DepositeTypesDTO, DepositeTypeDTO } from "../interfaces/deposite.types.dto.ts";
export class DepositeTypes {
    deposits: DepositeTypeDTO[] = [];
    total: number = 0;
    constructor(parameters?: DepositeTypesDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.deposits = parameters.deposits;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): DepositeTypes {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.deposits.filter(deposit => {
            const normalized = this.normalize(deposit.name);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new DepositeTypes({ deposits: uniqueCompanies, total: this.total });
    }
}