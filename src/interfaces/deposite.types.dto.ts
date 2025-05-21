export default interface DepositeTypeDTO{
    id: number,
    company_id: number,
    name: string,
    about?: string,
    current_price?: number | null,
    last_update: string,
    active: boolean,
    creation_date: string
}
interface DepositeTypesDTO{
    total: number;
    deposits: DepositeTypeDTO[];
}
export {DepositeTypesDTO, DepositeTypeDTO}