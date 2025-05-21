import { Delivers as DataAdapter, Deliver as Entity } from "../../classes/delivers.ts";
import { DeliverInputError as InputErrorAdapter, DeliverInput as InputAdapter } from "../../classes/deliver.input.values.ts";
const api: string = `${process.env.REACT_APP_API_URL}/app/admin/deliver/`;
/**
 * ### deposite_type
 * useDialogContext üzerinde kullanılan sınıf ve api'lerin,
 * dialog bağlamında gelen actions kısmı useModule aracılığıyla
 * kullanılır. 
 */
const personnel = {
    DataAdapter, InputErrorAdapter, InputAdapter, Entity, api,
};
export default personnel;