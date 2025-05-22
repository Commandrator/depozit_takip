export default interface CustomerTypeDTO {
    id: number,
    company_id: number,
    name: string,
    discount: string | null,
    discount_type: string,
    creation_date: string,
    last_update: string,
    default_deadline_day: number
}
interface CutromerTypes {
    total: number;
    result: CustomerTypeDTO[];
}
export { CutromerTypes, CustomerTypeDTO }