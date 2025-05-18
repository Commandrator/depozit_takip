import PeriodInput from "../classes/period.input.value";
/**
 * usePeriot
 */
export default interface PeriodHookDTO {
  selectedCompanyId?: string;
  defKey?: keyof PeriodInput;
  defValue?: string;
}