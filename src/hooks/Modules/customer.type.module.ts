import { CustoemrTypes as DataAdapter, CustomerType as Entity } from "../../classes/customer.type.ts";
import { CustomerTypeInputtError as InputErrorAdapter, CustomerTypeInput as InputAdapter } from "../../classes/customer.type.input.value.ts";
const api: string = `${process.env.REACT_APP_API_URL}/app/admin/customer/type/`;
/**
 * ### customer_type
 * useDialogContext üzerinde kullanılan sınıf ve api'lerin,
 * dialog bağlamında gelen actions kısmı useModule aracılığıyla
 * kullanılır. 
 */
const customer_type = {
    DataAdapter,
    InputErrorAdapter,
    InputAdapter,
    Entity,
    api
};
export default customer_type;