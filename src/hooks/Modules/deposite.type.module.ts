import { DepositeTypes as DataAdapter, DepositeType as Entity } from "../../classes/deposite.types.ts";
import { DepositeTypeInputtError as InputErrorAdapter, DepositeTypeInput as InputAdapter } from "../../classes/deposite.input.values.ts";
const api: string = `${process.env.REACT_APP_API_URL}/app/admin/deposite/type/`;
/**
 * ### deposite_type
 * useDialogContext üzerinde kullanılan sınıf ve api'lerin,
 * dialog bağlamında gelen actions kısmı useModule aracılığıyla
 * kullanılır. 
 */
const deposite_type = { DataAdapter, InputErrorAdapter, InputAdapter, Entity, api };
export default deposite_type;