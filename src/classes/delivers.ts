import type { DeliversDTO, DeliverDTO } from "../interfaces/deliver.dto.ts";
export class Deliver implements DeliverDTO {
    id: number;
    company_id: number;
    employee: string;
    company_user_id?: string | null;
    created_date: string;
    last_update: string;
    active: boolean = true;
    constructor(params: DeliverDTO) {
        if (params.id) this.id = Number(params.id);
        if (params.company_id) this.company_id = Number(params.company_id);
        if (params.employee) this.employee = params.employee;
        if (params.company_user_id) this.company_user_id = params.company_user_id;
        if (params.last_update) this.last_update = params.last_update;
        if (params.active !== undefined) this.active = params.active;
        if (params.created_date) this.created_date = params.created_date;
    }
}
export class Delivers {
    results: DeliverDTO[] = [];
    total: number = 0;
    constructor(parameters: DeliversDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.results = parameters.delivers;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): Delivers {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.results.filter(deliver => {
            const normalized = this.normalize(deliver.employee);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new Delivers({ delivers: uniqueCompanies, total: this.total });
    }
}