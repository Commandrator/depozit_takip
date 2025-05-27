import type { DepositeTypesDTO, DepositeTypeDTO } from "../interfaces/deposite.types.dto.ts";

export class DepositeType implements DepositeTypeDTO {
    id: number;
    company_id: number;
    name: string;
    about?: string;
    current_price?: number | null = null;
    last_update: string;
    active: boolean;
    creation_date: string;
    constructor(params: DepositeTypeDTO) {
        if (params.id) this.id = Number(params.id);
        if (params.company_id) this.company_id = Number(params.company_id);
        if (params.name) this.name = params.name;
        if (params.about) this.about = params.about;
        if (params.current_price) this.current_price = params.current_price;
        if (params.last_update) this.last_update = params.last_update;
        if (params.active !== undefined) this.active = params.active;
        if (params.creation_date) this.creation_date = params.creation_date;
    }
}

export class DepositeTypes {
    results: DepositeTypeDTO[] = [];
    total: number = 0;
    constructor(parameters?: DepositeTypesDTO) {
        if (parameters) {
            if (parameters.total !== undefined) this.total = parameters.total;
            if (parameters.deposits !== undefined) this.results = parameters.deposits;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): DepositeTypes {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.results.filter(deposit => {
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