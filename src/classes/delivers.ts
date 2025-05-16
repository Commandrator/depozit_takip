import type { DeliversDTO, DeliverDTO } from "../interfaces/deliver.dto.ts";
export class Delivers {
    delivers: DeliverDTO[] = [];
    total: number = 0;
    constructor(parameters?: DeliversDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.delivers = parameters.delivers;
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): Delivers {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.delivers.filter(deliver => {
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