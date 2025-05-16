export default interface DeliverDTO{
    id: number,
    company_id: number,
    employee: string,
    company_user_id?: string,
    created_date: string,
    last_update: string,
    active: boolean
}
interface DeliversDTO{
    total: number;
    delivers: DeliverDTO[];
}
export {DeliversDTO, DeliverDTO}