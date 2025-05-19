export default interface DepositeTypeDTO{
    id: number,
    company_id: number,
    name: string,
    about?: string,
    current_price?: number,
    last_update: string,
    active: boolean
}
interface DepositeTypesDTO{
    total: number;
    deposits: DepositeTypeDTO[];
}
export {DepositeTypesDTO, DepositeTypeDTO}