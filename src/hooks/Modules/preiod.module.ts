import { Periods as DataAdapter, Period as Entity } from "../../classes/Periods.ts";
import { PeriodInputError as InputErrorAdapter, PeriodInput as InputAdapter } from "../../classes/period.input.value.ts";
const api: string = `${process.env.REACT_APP_API_URL}/app/admin/period/`;
/**
 * ### period
 * useDialogContext üzerinde kullanılan sınıf ve api'lerin,
 * dialog bağlamında gelen actions kısmı useModule aracılığıyla
 * kullanılır. 
 */
const period = {
    DataAdapter,
    InputErrorAdapter,
    InputAdapter,
    Entity,
    api
 };
export default period;