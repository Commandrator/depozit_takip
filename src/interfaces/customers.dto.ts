import type CustomerTypeDTO from "./customer.type.dto";
export interface CustomerDTO{    
    id: number,
    company_id: number,
    name_surname: string,
    note: string | null,
    tc_id: string | null,
    tax_id: string | null,
    phone: string | null,
    adres: string | null,
    creation_date: string,
    last_update: string,
    created_by_id: string,
    customer_type: CustomerTypeDTO,
    active:boolean
}
export interface CustomersDTO{
    total:number;
    results: CustomerDTO[];
}
export default CustomersDTO;