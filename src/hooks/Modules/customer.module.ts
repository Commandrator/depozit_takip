import { Customers as DataAdapter, Customer as Entity } from "../../classes/customer.ts";
import { CustomerInputErrorDTO as InputErrorAdapter, CustomerInput as InputAdapter } from "../../classes/customer.input.value.ts";
const api: string = `${process.env.REACT_APP_API_URL}/app/admin/customer/`;
const customer = {
    DataAdapter,
    InputErrorAdapter,
    InputAdapter,
    Entity,
    api
};
export default customer;