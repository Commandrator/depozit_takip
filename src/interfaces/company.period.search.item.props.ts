import PeriodDTO from "./period.dto";
export default interface Period {
  period: PeriodDTO;
}
export interface SearchItemProps extends Period {
  value: string;
  submitSearch: (name?:string) => void;
}