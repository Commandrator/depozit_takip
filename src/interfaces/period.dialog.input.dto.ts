export default interface PeriodInputDTO {
  deadline: string;
  name: string;
}
export interface PeriodInputErrorDTO {
  deadline: string;
  name: string;
}
export interface DeliverInputDTO{
  employee: string;
  mail:string;
  active:boolean;
}
export interface DeliverInputErrorDTO{  
  employee: string;
  mail:string;
}