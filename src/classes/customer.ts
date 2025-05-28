import CustomerTypeDTO from "../interfaces/customer.type.dto.ts";
import CustomersDTO, { CustomerDTO } from "../interfaces/customers.dto.ts";
export class Customer implements CustomerDTO {
    id: number;
    company_id: number;
    name_surname: string;
    note: string | null = "";
    tc_id: string | null = "";
    tax_id: string | null = "";
    phone: string | null = "";
    adres: string | null = "";
    creation_date: string;
    last_update: string;
    created_by_id: string;
    customer_type: CustomerTypeDTO;    
    active:boolean = true;
    constructor(params: CustomerDTO) {
        if (params.id) this.id = Number(params.id);
        if (params.company_id) this.company_id = Number(params.company_id);
        if (params.name_surname) this.name_surname = params.name_surname;
        if (params.note) this.note = params.note;
        if (params.tc_id !== undefined) this.tc_id = params.tc_id;
        if (params.tax_id !== undefined) this.tax_id = params.tax_id;
        if (params.phone !== undefined) this.phone = params.phone;
        if (params.adres !== undefined) this.adres = params.adres;
        if (params.creation_date) this.creation_date = params.creation_date;
        if (params.last_update) this.last_update = params.last_update;
        if (params.created_by_id) this.created_by_id = params.created_by_id;
        if (params.customer_type) this.customer_type = params.customer_type;
        if (params.active !== undefined) this.active = params.active;
    }
}
export class Customers implements CustomersDTO {
    results: CustomerDTO[] = [];
    total: number = 0;
    constructor(parameters: CustomersDTO) {
        if (parameters.total !== undefined) this.total = parameters.total;
        if (parameters.results !== undefined) this.results = parameters.results;
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): CustomersDTO {
        const seenNames = new Set<string>();
        const uniqueCompanies = this.results.filter(data => {
            const normalized = this.normalize(data.name_surname);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new Customers({ results: uniqueCompanies, total: this.total });
    }
}