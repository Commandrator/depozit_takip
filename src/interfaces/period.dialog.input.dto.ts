export default interface PeriodInputDTO {
  deadline: string;
  name: string;
}
export interface PeriodInputErrorDTO {
  deadline: string;
  name: string;
}
export interface DeliverInputDTO {
  employee: string;
  mail: string;
  active: boolean;
}
export interface DeliverInputErrorDTO {
  employee: string;
  mail: string;
}
export interface DepositeTypeInputDTO {
  name: string;
  about: string;
  current_price: number;
  active: boolean;
}
export interface DepositeTypeErrorDTO {
  name: string;
  about: string;
  current_price?: number | string;
}
export interface CustomerTypeInutDTO{
  name: string,
  discount: number,
  default_deadline_day?: number,
  discount_type: string;  
}
export interface CustomerTypeErrorDTO {
  name: string,
  discount: string | number,
  default_deadline_day?: string | number
} 