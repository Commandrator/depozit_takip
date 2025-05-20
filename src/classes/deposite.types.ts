import type { DepositeTypesDTO, DepositeTypeDTO } from "../interfaces/deposite.types.dto.ts";

export class DepositeType implements DepositeTypeDTO {
  id: number;
  company_id: number;
  name: string;
  about?: string;
  current_price?: number;
  last_update: string;
  active: boolean;
  creation_date: string;
  constructor(parameters: DepositeTypeDTO) {
    this.id = parameters.id;
    this.company_id = parameters.company_id;
    this.name = parameters.name;
    this.about = parameters.about;
    this.current_price = parameters.current_price;
    this.last_update = parameters.last_update;
    this.active = parameters.active;
    this.creation_date = parameters.creation_date;
  }
}

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