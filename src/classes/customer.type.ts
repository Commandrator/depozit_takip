import CustomerTypeDTO, { CutromerTypes } from "../interfaces/customer.type.dto.ts";
export class CustomerType implements CustomerTypeDTO {
    id: number;
    company_id: number;
    name: string;
    discount: string | null;
    discount_type: string
    creation_date: string;
    last_update: string;
    default_deadline_day: number;
    constructor(params: CustomerTypeDTO) {
        if (params.id) this.id = Number(params.id);
        if (params.company_id) this.company_id = Number(params.company_id);
        if (params.name) this.name = params.name;
        if (params.discount_type) this.discount_type = params.discount_type
        if (params.discount !== undefined) this.discount = params.discount;
        if (params.last_update) this.last_update = params.last_update;
        if (params.creation_date) this.creation_date = params.creation_date;
        if (params.default_deadline_day !== undefined) this.default_deadline_day = params.default_deadline_day;
    }
}
export class CustoemrTypes {
    results: CustomerTypeDTO[] = [];
    total: number = 0;
    constructor(parameters: CutromerTypes) {
        if (parameters) {
            this.total = parameters.total;
            this.results = parameters.result;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): CustoemrTypes {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.results.filter(deliver => {
            const normalized = this.normalize(deliver.name);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new CustoemrTypes({ result: uniqueCompanies, total: this.total });
    }
}