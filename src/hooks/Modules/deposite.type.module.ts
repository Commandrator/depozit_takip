import { DepositeTypes as DataAdapter, DepositeType as Entity } from "../../classes/deposite.types.ts";
import { DepositeTypeInputtError as InputErrorAdapter, DepositeTypeInput as InputAdapter } from "../../classes/deposite.input.values.ts";
const api = process.env.REACT_APP_API_URL?.concat("/app/admin/deposite/type/");
const deposite_type = { DataAdapter, InputErrorAdapter, InputAdapter, Entity, api };
export default deposite_type;